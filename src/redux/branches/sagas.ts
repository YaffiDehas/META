import {
    all,
    call,
    takeLatest,
    put
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
    getType,
} from 'typesafe-actions';
import { getStores } from './api';
import * as actions from './actions';
import { Store } from './types';

export function* requestGetStores() {
    try {
        const response: AxiosResponse<Store[]> = yield call(() => getStores());
        yield put(actions.getStores.success(response.data));

    } catch (e) {
        yield put(actions.getStores.failure(''));
    }
}

export function* watchGetStores() {
    yield takeLatest(getType(actions.getStores.request), requestGetStores);
}

export function* watchStores() {
    yield all([
        call(watchGetStores),
    ]);
}
