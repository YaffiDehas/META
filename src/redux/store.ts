import {
    Action,
    ThunkAction,
} from '@reduxjs/toolkit';
import {
    applyMiddleware,
    createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducers } from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

// Chart is completely useless on huge amounts of data, while tree view works perfectly fine
// We can use `stateSanitizer` to reduce elements with >100 children nodes,
// but it will be better to make contribution to redux-devtools and implement chart stacks similar to tree view layout
const enhancer = composeWithDevTools(applyMiddleware(
    sagaMiddleware,
));

const store = createStore(reducers, enhancer);

sagaMiddleware.run(rootSaga);

export {
    store,
    sagaMiddleware,
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
