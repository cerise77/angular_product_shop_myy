import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';

import { HttpService } from '../../service/http.service';
import { CardItemComponent } from "../card-item/card-item.component";

@Component({
  selector: 'app-card-list',
  standalone: true,
  template: `
  <div *ngFor="let item of cartItems$ | async">
     <app-cart-item [item]='item'></app-cart-item>
  </div>
  `,
  imports: [AsyncPipe, NgFor, CardItemComponent]
})
export class CardListComponent implements OnInit {
  cartItems$ = this.cardService.cartItems$;

  constructor(private cardService: HttpService) { }

  ngOnInit(): void {

  }
}