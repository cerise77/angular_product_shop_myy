import { Component } from '@angular/core';
import {ProductsListComponent} from '../products-list/products-list.component'

@Component({
  selector: 'app-product-shell',
  standalone: true,
  template: `
  <div class='row'>
    <div class='col-md-4'>
        <app-products-list></app-products-list>
    </div>
</div>
  `,
  imports: [ProductsListComponent]
})
export class ProductShellComponent {

}
