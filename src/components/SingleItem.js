import React, { useState } from 'react';
import { DeleteOutline, Edit, MoreVert } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import CreateReactModal from './Modals/CreateReactModal';
import DeleteItemModal from './Modals/DeleteItemModal';
import {
  deleteItemRequest, deleteSingleItemInformation, getSingleItem,
} from '../store/actions/CreateItemAction';

export default function SingleItem({
  title, description, id,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();

  const openEditFunction = (ev) => {
    ev.stopPropagation();
    setOpenEdit(!openEdit);
  };

  const openEditItemModal = () => {
    setOpenModal(true);
    dispatch(getSingleItem(id));
  };

  const openDeleteItemModal = () => {
    setOpenDelete(true);
    dispatch(getSingleItem(id));
  };

  const close = () => {
    setOpenModal(false);
    setOpenDelete(false);
    dispatch(deleteSingleItemInformation());
  };

  const deleteItem = (deleteItemId) => {
    dispatch(deleteItemRequest(deleteItemId, () => {
      close();
    }));
  };

  return (
    <div draggable className="taskItem">
      <div className="editBlock">
        <h5>{title}</h5>
        <div className="more dragOff" onClick={openEditFunction}>
          <MoreVert className="moreSvg" />
          {openEdit
            ? (
              <>
                <div className="closeDiv" onClick={close} />
                <div className="editButtonsBlock">
                  <div onClick={openEditItemModal}>
                    <Edit />
                    <p>Edit</p>
                  </div>
                  <div onClick={openDeleteItemModal}>
                    <DeleteOutline />
                    <p>Delete</p>
                  </div>
                </div>
              </>
            )
            : null}
        </div>
      </div>
      <p>
        {_.truncate(description, {
          length: 100,
          separator: '...',
        })}
      </p>
      {openModal ? (
        <CreateReactModal
          close={close}
          text="Edit Item"
        />
      ) : null}
      {openDelete ? (
        <DeleteItemModal
          open={openDelete}
          close={close}
          deleteItem={deleteItem}
          title="Delete?"
        />
      ) : null}
    </div>
  );
}

SingleItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
