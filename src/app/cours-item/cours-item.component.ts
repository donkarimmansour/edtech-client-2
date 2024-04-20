import { Component, Input } from '@angular/core';
import { cours } from '../models/cours';

@Component({
  selector: 'app-cours-item',
  templateUrl: './cours-item.component.html',
  styleUrls: ['./cours-item.component.css']
})
export class CoursItemComponent {
  @Input()
  cours!: cours;
  

}
