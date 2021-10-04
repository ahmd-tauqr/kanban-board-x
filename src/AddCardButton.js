import React from 'react';
const AddCardButton = ({ buttonRef, showModal }) => {
  return (
    <button
      className='btn btn-lg btn-danger center modal-button'
      ref={buttonRef}
      onClick={showModal}
    >
      Add Task
    </button>
  );
};
export default AddCardButton;
