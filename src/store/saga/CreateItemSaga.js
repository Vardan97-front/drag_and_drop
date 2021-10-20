import {
  takeLatest, put, call, takeEvery,
} from 'redux-saga/effects';
import {
  CREATE_ITEM_REQUEST,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAIL,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  GET_SINGLE_ITEM_REQUEST,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_FAIL,
  EDIT_ITEM_REQUEST,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  DROP_OVER_REQUEST,
  DROP_OVER_SUCCESS,
  DROP_OVER_FAIL,
} from '../actions/CreateItemAction';
import Api from '../../Api';

export default function* watcher() {
  yield takeLatest(CREATE_ITEM_REQUEST, handleTitleRegistration);
  yield takeEvery(GET_ITEMS_REQUEST, handleGetItems);
  yield takeLatest(GET_SINGLE_ITEM_REQUEST, handleGetSingleItems);
  yield takeLatest(EDIT_ITEM_REQUEST, handleEditItem);
  yield takeLatest(DELETE_ITEM_REQUEST, handleDeleteItem);
  yield takeLatest(DROP_OVER_REQUEST, handleChangeStatus);
}

function* handleTitleRegistration(action) {
  try {
    const { formData } = action.payload;

    const { data } = yield call(Api.createTask, formData);

    yield put({
      type: CREATE_ITEM_SUCCESS,
      payload: {
        data,
      },
    });

    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    console.warn(e);
    yield put({
      type: CREATE_ITEM_FAIL,
      message: e.message,
      payload: {
        errors: {
          current: e.message,
        },
      },
    });

    if (action.payload.cb) {
      action.payload.cb(e, e.response?.data);
    }
  }
}

function* handleGetItems(action) {
  try {
    const { status } = action.payload;

    const { data } = yield call(Api.getTasks, status);

    yield put({
      type: GET_ITEMS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (e) {
    console.warn(e);
    yield put({
      type: GET_ITEMS_FAIL,
      message: e.message,
      payload: {
        errors: {
          current: e.message,
        },
      },
    });
  }
}

function* handleGetSingleItems(action) {
  try {
    const { id } = action.payload;

    const { data } = yield call(Api.getSingleTask, id);

    yield put({
      type: GET_SINGLE_ITEM_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (e) {
    console.warn(e);
    yield put({
      type: GET_SINGLE_ITEM_FAIL,
      message: e.message,
      payload: {
        errors: {
          current: e.message,
        },
      },
    });
  }
}

function* handleEditItem(action) {
  try {
    const { formData } = action.payload;

    const { data } = yield call(Api.editSingleItem, formData);

    yield put({
      type: EDIT_ITEM_SUCCESS,
      payload: {
        data,
      },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    console.warn(e);
    yield put({
      type: EDIT_ITEM_FAIL,
      message: e.message,
      payload: {
        errors: {
          current: e.message,
        },
      },
    });

    if (action.payload.cb) {
      action.payload.cb(e, e.response?.data);
    }
  }
}

function* handleDeleteItem(action) {
  try {
    const { id } = action.payload;

    const { data } = yield call(Api.deleteItem, id);

    yield put({
      type: DELETE_ITEM_SUCCESS,
      payload: {
        data,
      },
    });

    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    console.warn(e);
    yield put({
      type: DELETE_ITEM_FAIL,
      message: e.message,
      payload: {
        errors: {
          current: e.message,
        },
      },
    });

    if (action.payload.cb) {
      action.payload.cb(e, e.response?.data);
    }
  }
}

function* handleChangeStatus(action) {
  try {
    const {
      status, id, oldIndex, newIndex,
    } = action.payload;

    const { data } = yield call(Api.changeStatus, status, id, oldIndex, newIndex);

    yield put({
      type: DROP_OVER_SUCCESS,
      payload: {
        prevStatus: data.prevStatus,
        newStatus: status,
        oldIndex,
        newIndex,
      },
    });
  } catch (e) {
    console.warn(e);
    yield put({
      type: DROP_OVER_FAIL,
      message: e.message,
      payload: {
        errors: {
          current: e.message,
        },
      },
    });
  }
}
