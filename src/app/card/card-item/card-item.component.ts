import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BehaviorSubject, map, tap } from 'rxjs';
import { CardItem } from '../../interface/card';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, FormsModule, NgFor, NgIf],
  templateUrl: './card-item.component.html'
})
export class CardItemComponent {

  _item!: CardItem;
  get item(): CardItem {
    return this._item;
  }
  @Input() set item(item: CardItem) {
    this._item = item;
    this.itemChangedSubject.next(item);
  }


  qtyArr = [1, 2, 3, 4, 5, 6, 7, 8];


  private itemChangedSubject = new BehaviorSubject<CardItem>(this.item);
  item$ = this.itemChangedSubject.asObservable();

  constructor(private cardService: HttpService) { }


  exPrice$ = this.item$.pipe(
    map(it => it.quantity * Number(it.card.price))
  );

  onQuantitySelected(quantity: number): void {

    this.cardService.updateInCard(this.item, Number(quantity));
  }

  onRemove(): void {
    this.cardService.removeFromCard(this.item);
  }
}
