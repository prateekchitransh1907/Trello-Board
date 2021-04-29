import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CardSchema } from '../cardschema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: CardSchema;
  @Output() deleteItemevent = new EventEmitter();
  constructor() {}
  ngOnInit() {
    console.log(this.card);
  }
  dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }
  deleteItem(id) {
    console.log('card id', id);
    this.deleteItemevent.emit(id);
  }
}
