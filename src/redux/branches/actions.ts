import {
    createAction,
    createAsyncAction,
} from 'typesafe-actions';
import {
    Store,
} from './types';

export const getStores = createAsyncAction(
    'Stores/GET_STORES_REQUEST',
    'Stores/GET_STORES_SUCCESS',
    'Stores/GET_STORES_FAILURE',
)<void, Store[], string>();



