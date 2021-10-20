import _ from 'lodash';

import {
  CREATE_ITEM_SUCCESS,
  GET_ITEMS_SUCCESS,
  DELETE_ITEM_SUCCESS,
  DRAG_DURATION,
  GET_SINGLE_ITEM_SUCCESS,
  EDIT_ITEM_SUCCESS,
  DROP_OVER_SUCCESS,
  CHANGE_ITEM_INFORMATION,
  DELETE_SINGLE_ITEM_INFORMATION,
} from '../actions/CreateItemAction';

const initialState = {
  singleItem: {},
  date: {
    todo: [],
    progress: [],
    done: [],
  },
  number: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ITEM_SUCCESS: {
      const { result } = action.payload.data;
      const { date } = state;

      date.todo.push(result);

      return {
        ...state,
        date: { ...date },
        singleItem: {},
      };
    }

    case GET_ITEMS_SUCCESS: {
      const { result } = action.payload.data;
      const { date } = state;

      date[result[0].status] = result;

      return {
        ...state,
        date: {
          ...date,
          todo: [...date.todo],
          progress: [...date.progress],
          done: [...date.done],
        },
      };
    }

    case GET_SINGLE_ITEM_SUCCESS: {
      const { result } = action.payload.data;

      return {
        ...state,
        singleItem: result,
      };
    }

    case EDIT_ITEM_SUCCESS: {
      const { singleItem, date } = state;

      console.log(date[singleItem.status], singleItem);
      console.log(_.findIndex(date[singleItem.status], (d) => d.id === singleItem.id));
      // eslint-disable-next-line max-len
      date[singleItem.status].splice(_.findIndex(date[singleItem.status], (d) => d.id === singleItem.id), 1, singleItem);

      return {
        ...state,
        singleItem: {},
        date: { ...date },
      };
    }

    case DELETE_ITEM_SUCCESS: {
      const { singleItem, date } = state;

      date[singleItem.status] = _.filter(date[singleItem.status], (d) => d.id !== singleItem.id);

      return {
        ...state,
        singleItem: {},
        date: { ...date },
      };
    }

    case DROP_OVER_SUCCESS: {
      const { singleItem, date } = state;
      const {
        prevStatus,
        newStatus,
        oldIndex,
        newIndex,
      } = action.payload;

      const prevTask = _.find(date[prevStatus], (d) => d.position === oldIndex);

      if (prevStatus === newStatus) {
        if (oldIndex !== newIndex) {
          if (oldIndex < newIndex) {
            // eslint-disable-next-line no-plusplus
            for (let i = oldIndex + 1; i <= newIndex; i++) {
              const task = _.find(date[prevStatus], (d) => d.position === i);

              task.position = i - 1;
            }
          } else {
            // eslint-disable-next-line no-plusplus
            for (let i = oldIndex - 1; i >= newIndex; i--) {
              const task = _.find(date[prevStatus], (d) => d.position === i);

              task.position = i + 1;
            }
          }

          prevTask.position = newIndex;

          date[prevStatus].splice(oldIndex, 1);

          date[prevStatus].splice(newIndex, 0, prevTask);
        }
      } else {
        if (oldIndex !== date[prevStatus].length - 1) {
          // eslint-disable-next-line no-plusplus
          for (let i = oldIndex + 1; i < date[prevStatus].length; i++) {
            const task = _.find(date[prevStatus], (d) => d.position === i);

            task.position = i - 1;
          }
        }

        // eslint-disable-next-line max-len
        date[prevStatus].splice(oldIndex, 1);

        singleItem.status = newStatus;

        singleItem.position = date[newStatus].length;

        date[newStatus].push(singleItem);
      }

      return {
        ...state,
        number: null,
        singleItem: {},
        date: { ...date },
      };
    }

    case DRAG_DURATION: {
      const { ev } = action.payload;
      let { number } = state;
      const width = window.innerWidth / 3;

      if (width >= ev.clientX) {
        number = 1;
      } else if (width < ev.clientX && ev.clientX <= width * 2) {
        number = 2;
      } else {
        number = 3;
      }

      return {
        ...state,
        number,
      };
    }

    case CHANGE_ITEM_INFORMATION: {
      const { path, value } = action.payload;
      let { singleItem } = state;

      singleItem = { ...singleItem, [path]: value };

      return {
        ...state,
        singleItem,
      };
    }

    case DELETE_SINGLE_ITEM_INFORMATION: {
      return {
        ...state,
        singleItem: {},
      };
    }

    default: {
      return state;
    }
  }
}
