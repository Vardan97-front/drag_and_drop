import { all, fork } from 'redux-saga/effects';
import CreateItemSaga from './CreateItemSaga';

export default function* watchers() {
  yield all([
    CreateItemSaga,
  ].map(fork));
}
