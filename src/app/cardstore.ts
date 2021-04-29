import { CardSchema } from './cardschema';
export class CardStore {
  cards: Object = {};
  lastid = -1;
  _addCard(card: CardSchema) {
    card.id = String(++this.lastid);
    this.cards[card.id] = card;
    console.log('card added', this.cards, card);
    return card.id;
  }
  getCard(cardId: string) {
    return this.cards[cardId];
  }
  newCard(title: string, description: string): string {
    const card = new CardSchema();
    card.description = description;
    card.title = title;
    console.log(card);
    return this._addCard(card);
  }

  deleteCard(id) {
    delete this.cards[id];
  }
}
