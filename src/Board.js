import React from 'react';
import { Column } from './Column';
import { DraggableCard } from './Card';
import { TextForm } from './TextForm';

export function Board({ tasks, columns, moveTask, addTask, addColumn }) {
  console.log('inside board: ', { tasks, columns });
  return (
    <div className='Board'>
      {columns.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          addTask={addTask.bind(null, column.id)}
        >
          {column.taskIds
            .map((taskId) => tasks.find((task) => task.id === taskId))
            .map((task, index) => (
              <DraggableCard
                key={task.id}
                id={task.id}
                columnId={column.id}
                columnIndex={index}
                title={task.title}
                description={task.description}
                name={task.name}
                email={task.email}
                priority={task.priority}
                iconUrl={task.iconUrl}
                moveTask={moveTask}
              />
            ))}
          {column.taskIds.length === 0 && (
            <DraggableCard
              isSpacer
              moveTask={(taskId) => moveTask(taskId, column.id, 0)}
            />
          )}
        </Column>
      ))}
      <div className='Column'>
        <TextForm onSubmit={addColumn} placeholder='Add Column...' />
      </div>
    </div>
  );
}
