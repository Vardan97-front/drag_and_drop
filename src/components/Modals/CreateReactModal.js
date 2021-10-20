import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Close } from '@mui/icons-material';

import Input from '../Inputs/Input';
import Textarea from '../Inputs/Textarea';
import Button from '../Buttons/Button';

import {
  changeItemInformation,
  createItem,
  editItem,
} from '../../store/actions/CreateItemAction';

export default function CreateReactModal({ close, text }) {
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { singleItem } = useSelector((state) => state.CreateItemReducer);

  const changeValue = (path, value) => {
    dispatch(changeItemInformation(path, value));
    setErrors((prev) => ({ ...prev, [path]: null }));
  };

  const blurValue = (name) => {
    if (_.isEmpty(singleItem[name])) {
      setErrors((prev) => ({ ...prev, [name]: `${_.capitalize(name)} is required` }));
    } else if (name === 'description' && singleItem[name].length >= 400) {
      setErrors((prev) => ({ ...prev, [name]: `${_.capitalize(name)} can not be longer than 400 characters` }));
    } else if (name === 'title' && singleItem[name].length >= 100) {
      setErrors((prev) => ({ ...prev, [name]: `${_.capitalize(name)} can not be longer than 100 characters` }));
    }
  };

  const closeModal = () => {
    setErrors({});
    close();
  };

  const add = async (ev) => {
    ev.preventDefault();

    if (_.isEmpty(singleItem.title)) {
      setErrors((prev) => ({ ...prev, title: 'Title is required' }));
    } else if (_.isEmpty(singleItem.description)) {
      setErrors((prev) => ({ ...prev, description: 'Description is required' }));
    } else if (_.every(errors, (er) => er === null)) {
      if (text === 'Edit Item') {
        dispatch(editItem(singleItem, () => {
          closeModal();
        }));
      } else {
        dispatch(createItem(singleItem, () => {
          closeModal();
        }));
      }
    }
  };

  return (
    <Modal
      isOpen
      onRequestClose={closeModal}
      overlayClassName="createItem"
    >
      <div className="closeBlock">
        <p>{text}</p>
        <Close onClick={closeModal} />
      </div>
      <form className="createItemForm" onSubmit={add}>
        <div className="inputsBorderBlock">
          <div className="inputsBlock">
            <Input
              type="text"
              name="title"
              label="Title"
              value={singleItem.title}
              error={errors.title}
              change={changeValue}
              blur={blurValue}
            />
            <Textarea
              label="Description"
              name="description"
              value={singleItem.description}
              error={errors.description}
              change={changeValue}
              blur={blurValue}
              row={6}
            />
          </div>
        </div>
        <div className="modalButtonsBlock">
          <Button click={closeModal} text="Cancel" className="cancel" />
          <Button text="OK" type />
        </div>
      </form>
    </Modal>
  );
}

CreateReactModal.propTypes = {
  close: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
