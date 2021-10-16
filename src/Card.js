import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import cn from 'classnames';
import _ from 'lodash';

export function Card(props) {
  return _.flowRight(
    props.connectDragSource,
    props.connectDropTarget
  )(
    <div
      className={cn('Card', {
        'Card--dragging': props.isDragging,
        'Card--spacer': props.isSpacer,
      })}
    >
      <div className='Card__title'>{props.title}</div>
      <div className='Card__description spaced'>{props.description}</div>
      <div className='Card__name spaced'>{props.name}</div>
      <div className='Card__email spaced'>{props.email}</div>
      <div className='Card__iconUrl spaced'>
        <img src={props.iconUrl} alt='avatar_icon' />
      </div>
      <div className='Card__priority spaced'>
        <span className={props.priority}>{props.priority}</span>
      </div>
    </div>
  );
}

export const DraggableCard = _.flowRight([
  DropTarget(
    'Card',
    {
      hover(props, monitor) {
        const { columnId, columnIndex } = props;
        const draggingItem = monitor.getItem();
        if (draggingItem.id !== props.id) {
          props.moveTask(draggingItem.id, columnId, columnIndex);
        }
      },
    },
    (connect) => ({
      connectDropTarget: connect.dropTarget(),
    })
  ),
  DragSource(
    'Card',
    {
      beginDrag(props) {
        return { id: props.id };
      },

      isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
])(Card);
