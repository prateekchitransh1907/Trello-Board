import {
  Component,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ListSchema } from '../ListSchema';
import { CardStore } from '../CardStore';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  @Output() deleteListEvent = new EventEmitter();

  displayAddCard = false;
  constructor() {}
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit(): void {}
  allowDrop($event) {
    $event.preventDefault();
  }
  drop($event) {
    console.log('event', $event);
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');
    console.log('data', data);
    let target = $event.target;
    console.log('target', target, document.getElementById(data));
    const targetClassName = target.className;
    while (target.className !== 'list') {
      target = target.parentNode;
    }
    target = target.querySelector('.cards');
    if (targetClassName === 'card') {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === 'list__title') {
      if (target.children.length) {
        console.log('child', target.children[0]);
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }
  onEnter(title: string, desc: string) {
    const cardId = this.cardStore.newCard(title, desc);
    console.log(cardId);
    this.list.cards.push(cardId);
    console.log(this.list);
  }

  deleteList(list) {
    this.deleteListEvent.emit(list);
  }
  deleteItem(ev) {
    console.log('delete item called in list ', ev, this.list.cards);
    const id = this.cardStore.deleteCard(ev);
    this.list.cards.splice(this.list.cards.indexOf(ev), 1);
  }
}
