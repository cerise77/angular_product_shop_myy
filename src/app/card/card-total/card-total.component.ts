import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-card-total',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, NgIf],
  templateUrl: './cart-total.component.html'
})
export class CardTotalComponent {

  cartItems$ = this.cartService.cartItems$;

  subTotal$ = this.cartService.subTotal$;

  deliveryFee$ = this.cartService.deliveryFee$;

  tax$ = this.cartService.tax$;

  totalPrice$ = this.cartService.totalPrice$;
  
  constructor(private cartService: HttpService) { }
}