import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from './service/http.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

  cardService = inject(HttpService);

  constructor(private HttpRequest: HttpService){}

  ngOnInit(): void {

  }

 
  cardCount$ = this.cardService.cartItems$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );


}