import { Component, OnInit } from '@angular/core';
import { CardStore } from '../CardStore';
import { ListSchema } from '../ListSchema';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cardStore: CardStore;
  lists: ListSchema[];
  displayAddList = false;

  constructor() {}
  setMockData(): void {
    this.cardStore = new CardStore();
    const lists: ListSchema[] = [];
    this.lists = lists;

    if (localStorage.getItem('lists').length === 0) {
    } else {
      this.lists = JSON.parse(localStorage.getItem('lists'));
    }
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('lists')));
    this.setMockData();
  }

  toggleDisplayAddList() {
    console.log('show list', this.displayAddList);
    this.displayAddList = !this.displayAddList;
  }

  onEnter(title: string) {
    const obj = {
      name: title,
      cards: []
    };
    this.lists.push(obj);
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  deleteList(ev) {
    console.log('delete the list', ev);
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].name === ev.name) {
        this.lists.splice(i, 1);
        localStorage.setItem('lists', JSON.stringify(this.lists));
      }
    }
  }
}
