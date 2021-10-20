export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAIL = 'CREATE_ITEM_FAIL';

export function createItem(formData, cb) {
  return {
    type: CREATE_ITEM_REQUEST,
    payload: { formData, cb },
  };
}

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAIL = 'GET_ITEMS_FAIL';

export function getItems(status) {
  return {
    type: GET_ITEMS_REQUEST,
    payload: { status },
  };
}

export const GET_SINGLE_ITEM_REQUEST = 'GET_SINGLE_ITEM_REQUEST';
export const GET_SINGLE_ITEM_SUCCESS = 'GET_SINGLE_ITEM_SUCCESS';
export const GET_SINGLE_ITEM_FAIL = 'GET_SINGLE_ITEM_FAIL';

export function getSingleItem(id) {
  return {
    type: GET_SINGLE_ITEM_REQUEST,
    payload: { id },
  };
}

export const EDIT_ITEM_REQUEST = 'EDIT_ITEM_REQUEST';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_FAIL = 'EDIT_ITEM_FAIL';

export function editItem(formData, cb) {
  return {
    type: EDIT_ITEM_REQUEST,
    payload: { formData, cb },
  };
}

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAIL = 'DELETE_ITEM_FAIL';

export function deleteItemRequest(id, cb) {
  return {
    type: DELETE_ITEM_REQUEST,
    payload: { id, cb },
  };
}

export const DROP_OVER_REQUEST = 'DROP_OVER_REQUEST';
export const DROP_OVER_SUCCESS = 'DROP_OVER_SUCCESS';
export const DROP_OVER_FAIL = 'DROP_OVER_FAIL';

export function dropOver(status, id, oldIndex, newIndex) {
  return {
    type: DROP_OVER_REQUEST,
    payload: {
      status,
      id,
      oldIndex,
      newIndex,
    },
  };
}

export const DRAG_DURATION = 'DRAG_DURATION';

export function dragDuration(ev) {
  return {
    type: DRAG_DURATION,
    payload: { ev },
  };
}

export const CHANGE_ITEM_INFORMATION = 'CHANGE_ITEM_INFORMATION';

export function changeItemInformation(path, value) {
  return {
    type: CHANGE_ITEM_INFORMATION,
    payload: {
      path, value,
    },
  };
}

export const DELETE_SINGLE_ITEM_INFORMATION = 'DELETE_SINGLE_ITEM_INFORMATION';

export function deleteSingleItemInformation() {
  return {
    type: DELETE_SINGLE_ITEM_INFORMATION,
  };
}
