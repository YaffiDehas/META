
import { all } from 'redux-saga/effects';
import { watchStores } from './branches/sagas';

export function* rootSaga() {
    yield all([
        watchStores(),
    ]);
}
