import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from './Board';

// mock data from json
// import * as tasks from './data/tasks.json';
// import * as columns from './data/columns.json';

// const initialCards = JSON.parse(tasks).map((task, index) => ({
//   id: index + 1,
//   title: task.title,
//   description: task.description,
//   name: task.name,
//   email: task.email,
//   priority: task.priority,
//   iconUrl: task.iconUrl,
// }));

// const initialColumns = JSON.parse(columns).map((column, index) => ({
//   id: index + 1,
//   name: column.name,
// }));

let _columnId = 0;
let _cardId = 0;

const initialCards = Array.from({ length: 9 }).map(() => ({
  id: ++_cardId,
  title: 'Design kanban',
  description: 'description',
  name: 'Tauqeer Ahmad',
  email: 'tauqeer@yopmail.com',
  priority: 'medium',
  iconUrl: 'https://picsum.photos/20/20',
}));

const initialColumns = ['TODO', 'Doing', 'Done'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 3, i * 3 + 3).map((card) => card.id),
}));

class App extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,
  };

  addColumn = (_title) => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++_columnId,
      title,
      cardIds: [],
    };
    this.setState((state) => ({
      columns: [...state.columns, newColumn],
    }));
  };

  addCard = (
    columnId,
    _title,
    _description,
    _personName,
    _personEmail,
    _priority,
    _iconUrl
  ) => {
    const title = _title.trim();
    if (!title) return;

    const description = _description.trim();
    if (!description) return;

    const personName = _personName.trim();
    if (!personName) return;

    const personEmail = _personEmail.trim();
    if (!personEmail) return;

    const priority = _priority.trim();
    if (!priority) return;

    const newCard = { id: ++_cardId, title };
    this.setState((state) => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map((column) =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, newCard.id] }
          : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState((state) => ({
      columns: state.columns.map((column) => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          (ids) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          (ids) => ids.filter((id) => id !== cardId)
        )(column.cardIds),
      })),
    }));
  };

  render() {
    return (
      <Board
        cards={this.state.cards}
        columns={this.state.columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
        addColumn={this.addColumn}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
