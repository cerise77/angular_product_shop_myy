import { Component, OnInit, inject } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import {CommonModule} from '@angular/common';
import {HttpService} from '../../service/http.service'
import { HttpData } from '../../interface/data';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  items: HttpData[] = [];

  constructor(private HttpRequest: HttpService){}

  ngOnInit(): void {
    this.HttpRequest.getData().subscribe(
      {next: (data: HttpData[]) => {this.items = data}}
    )
  }

  addToCart(item: HttpData) {

    this.HttpRequest.addToCart(item);
  }


}
