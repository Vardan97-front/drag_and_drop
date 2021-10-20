import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Button from './Buttons/Button';
import CreateReactModal from './Modals/CreateReactModal';
import SingleItem from './SingleItem';
import {
  dragDuration, dropOver, getItems, getSingleItem,
} from '../store/actions/CreateItemAction';

const SortableItem = SortableElement(({ value }) => (
  <li>
    <SingleItem
      key={value.id}
      title={value.title}
      description={value.description}
      id={value.id}
      status={value.status}
    />
  </li>
));

const SortableList = SortableContainer(({ items }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem key={`item-${value.id}`} index={index} value={value} />
    ))}
  </ul>
));

export default function List({ title, type, number }) {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const { date } = useSelector((state) => state.CreateItemReducer);
  const { singleItem } = useSelector((state) => state.CreateItemReducer);

  useEffect(() => {
    dispatch(getItems(type));
  }, []);

  const openCreateItemModal = () => {
    setOpenModal(!openModal);
  };

  const dragOver = (ev) => {
    dispatch(dragDuration(ev));
  };

  const dopOver = async (param, ev) => {
    const width = window.innerWidth / 3;
    let status = 'todo';

    if (width < ev.clientX && ev.clientX <= width * 2) {
      status = 'progress';
    } else if (ev.clientX > width * 2) {
      status = 'done';
    }

    dispatch(dropOver(status, singleItem.id, param.oldIndex, param.newIndex));
  };

  const drag = (param) => {
    const { index } = param;

    dispatch(getSingleItem(date[type][index].id));
  };

  return (
    <div className="list">
      <div className="listHeader">
        <span>{`${title} (${date[type].length})`}</span>
        {title === 'To Do' ? <Button text="Add" click={openCreateItemModal} /> : null}
      </div>
      <div className={`listBody ${number ? 'hover' : ''}`}>
        <div className="itemsBlock">
          <SortableList
            items={date[type]}
            onSortMove={dragOver}
            onSortStart={drag}
            onSortEnd={dopOver}
            shouldCancelStart={(ev) => ev.target.closest('.dragOff')}
          />
        </div>
      </div>
      {openModal ? (
        <CreateReactModal
          close={openCreateItemModal}
          text="Add Item"
        />
      ) : null}
    </div>
  );
}

List.defaultProps = {
  number: null,
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  number: PropTypes.bool,
};
