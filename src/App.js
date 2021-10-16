import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from './Board';
import axios from 'axios';
// get unique ids
import { v4 as uuid } from 'uuid';
class App extends Component {
  state = {
    tasks: [],
    columns: [],
  };

  // when application launches.. get values for tasks and columns from api
  componentDidMount() {
    // read tasks from local json file
    axios.get(`./data/tasks.json`).then((res) => {
      const tasks = res.data;
      console.log('tasks: ', tasks);
      this.setState({ tasks });
    });
    // read columns from local json file
    axios.get(`./data/columns.json`).then((res) => {
      const columns = res.data;
      console.log('columns: ', columns);
      this.setState({ columns });
    });
  }

  addColumn = (_title) => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: uuid(),
      title,
      taskIds: [],
    };
    this.setState((state) => ({
      columns: [...state.columns, newColumn],
    }));
  };

  // add new Card function
  addTask = (
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

    const iconUrl = _iconUrl.trim();

    const newCard = {
      id: uuid(),
      title,
      description,
      personName,
      personEmail,
      priority,
      iconUrl,
    };
    this.setState((state) => ({
      tasks: [...state.tasks, newCard],
      columns: state.columns.map((column) =>
        column.id === columnId
          ? { ...column, taskIds: [...column.taskIds, newCard.id] }
          : column
      ),
    }));
  };
  // move particular Card from one column to another
  moveTask = (taskId, destColumnId, index) => {
    this.setState((state) => ({
      columns: state.columns.map((column) => ({
        ...column,
        taskIds: _.flowRight(
          // 2) If this is the destination column, insert the taskId.
          (ids) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), taskId, ...ids.slice(index)]
              : ids,
          // 1) Remove the taskId for all columns
          (ids) => ids.filter((id) => id !== taskId)
        )(column.taskIds),
      })),
    }));
  };

  render() {
    return (
      <Board
        tasks={this.state.tasks}
        columns={this.state.columns}
        moveTask={this.moveTask}
        addTask={this.addTask}
        addColumn={this.addColumn}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
