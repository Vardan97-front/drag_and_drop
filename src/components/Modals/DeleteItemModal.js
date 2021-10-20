import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ErrorOutline } from '@mui/icons-material';

import Button from '../Buttons/Button';

export default function DeleteItemModal({
  open, close, title, deleteItem,
}) {
  const { singleItem } = useSelector((state) => state.CreateItemReducer);

  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      overlayClassName="DeleteItem"
    >
      <div className="deleteContainer">
        <div className="askBlock">
          <ErrorOutline />
          <span>{title}</span>
        </div>
        <span className="question">
          {`Are you sure to delete "${singleItem.title}"?`}
        </span>
        <div className="modalButtonsBlock">
          <Button click={close} text="Cancel" className="cancel" />
          <Button text="Delete" click={() => deleteItem(singleItem.id)} />
        </div>
      </div>
    </Modal>
  );
}

DeleteItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
