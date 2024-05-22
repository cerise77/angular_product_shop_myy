import { Component } from '@angular/core';
import {CardListComponent} from './card-list/card-list.component';
import { CardTotalComponent } from './card-total/card-total.component';

@Component({
  selector: 'app-card-shell',
  standalone: true,
  template: `
  <div class='row card-shell'>
    <div class='col-md-6'>
        <app-card-list></app-card-list>
    </div>
    <div class='col-md-6'>
        <app-card-total></app-card-total>
    </div>
  </div>
  `,
  styleUrls: ['./card-shell.component.scss'],
  imports: [ CardListComponent, CardTotalComponent]
})
export class CardShellComponent {

}
