import React from 'react';
import Container from './Container';
import { v4 as uuid } from 'uuid';

export const Column = (props) => {
  const onSubmit = (event) => {
    const form = event.target;
    event.preventDefault();
    const formValues = {
      id: uuid(),
      title: event.target.title.value,
      description: event.target.description.value,
      name: event.target.name.value,
      email: event.target.email.value,
      priority: event.target.priority.value,
      iconUrl: event.target.iconUrl.value,
    };
    alert(
      `name: ${formValues.title} description: ${formValues.description} name: ${formValues.name} email: ${formValues.email} priority: ${formValues.priority} iconUrl: ${formValues.iconUrl}`
    );
    // send data for adding a card
    form.reset();
  };

  return (
    <div className='Column'>
      <div className='Column__title'>{props.title}</div>
      {props.children}
      <Container onSubmit={onSubmit} />
    </div>
  );
};
