import React from 'react';

const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          className='form-control'
          id='title'
          placeholder='Title'
          name='title'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          className='form-control'
          id='description'
          placeholder='Description'
          name='description'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          className='form-control'
          id='name'
          placeholder='Name'
          name='name'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-control'
          id='email'
          placeholder='Email'
          name='email'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='priority'>Priority</label>
        <select className='form-control' id='priority' name='priority'>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='iconUrl'>Icon</label>
        <input
          type='file'
          className='form-control'
          name='iconUrl'
          id='iconUrl'
        />
      </div>
      <div className='form-group'>
        <button className='form-control btn btn-primary' type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
