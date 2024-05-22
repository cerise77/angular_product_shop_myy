import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, scan, shareReplay, Subject, BehaviorSubject } from 'rxjs';
import { HttpData } from '../interface/data';
import {CardList} from '../models/cardList'
import { Action, CardItem } from "../interface/card";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public toggleBagSubject = new BehaviorSubject(false);

  private itemSubject = new Subject<Action<CardItem>>();
  itemAction$ = this.itemSubject.asObservable();
 
  private productSelectedSubject = new BehaviorSubject<string>('');
  productSelected$ = this.productSelectedSubject.asObservable();


  constructor(private http: HttpClient) { }


  getData():Observable<HttpData[]> {
    return this.http.get<HttpData[]>('assets/table.json');
  }

  
  addToCart(card: HttpData): void {
    this.itemSubject.next({
      item: { card, quantity: 1 },
      action: 'add'
    });
  }


  cartItems$ = this.itemAction$
  .pipe(
    scan((items, itemAction) =>
      this.modifyCart(items, itemAction), [] as CardItem[]),
    shareReplay(1)
  );



    subTotal$ = this.cartItems$.pipe(
      map(items => items.reduce((a, b) => a + (b.quantity * Number(b.card.price)), 0)),
    );
  

    deliveryFee$ = this.subTotal$.pipe(
      map((t) => (t < 1000 ? 100 : 0))
    );
  

    tax$ = this.subTotal$.pipe(
      map((t) => Math.round(t * 20) / 100)
    );


  totalPrice$ = combineLatest([
    this.subTotal$,
    this.deliveryFee$,
  ]).pipe(map(([st, d]) => st + d));


  private modifyCart(items: CardItem[], operation: Action<CardItem>): CardItem[] {
    if (operation.action === 'add') {

      const itemInCard = items.find(item => item.card.name === operation.item.card.name);
      if (itemInCard) {

        itemInCard.quantity += 1;
        return items.map(item => item.card.name === itemInCard.card.name ? itemInCard : item)
      } else {
        return [...items, operation.item];
      }
    } else if (operation.action === 'update') {
      return items.map(item => item.card.name === operation.item.card.name ? operation.item : item)
    } else if (operation.action === 'delete') {
      return items.filter(item => item.card.name !== operation.item.card.name);
    }
    return [...items];
  }


  removeFromCard(cardItem: CardItem): void {
    this.itemSubject.next({
      item: { card: cardItem.card, quantity: 0 },
      action: 'delete'
    });
  }

  updateInCard(cardItem: CardItem, quantity: number) {
    this.itemSubject.next({
      item: { card: cardItem.card, quantity },
      action: 'update'
    });
  }

   
}
