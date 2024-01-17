
import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import branchesReducer from './branches/reducer';

export const reducers = combineReducers({
    stores: branchesReducer,
});

export type AppState = StateType<typeof reducers>;
