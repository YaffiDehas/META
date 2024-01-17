import { createSelector } from 'reselect';
import { AppState } from '../reducers';

export const getStoresState = createSelector((state: AppState) => state, ({ stores }) => stores);
export const getCurrenciesListSelector = createSelector(getStoresState, ({ branches }) => branches);
export const getLoadingSelector = createSelector(getStoresState, ({ loading }) => loading);
