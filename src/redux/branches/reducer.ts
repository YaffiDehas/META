import { Reducer } from 'redux';
import {
    ActionType,
    getType,
} from 'typesafe-actions';
import * as actions from './actions';
import { StoresState, LoadingState } from './types';

type Actions = ActionType<typeof actions>;

const initialState: StoresState = {
    loading: LoadingState.IDLE,
    branches: []
};

const branchesReducer: Reducer<StoresState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.getStores.request): {
            return {
                ...state,
                loading: LoadingState.REQUEST
            };
        }
        case getType(actions.getStores.success): {
            return {
                ...state,
                branches: action.payload,
                loading: LoadingState.SUCCESS
            };
        }

        case getType(actions.getStores.failure): {
            return {
                ...state,
                loading: LoadingState.FAILURE
            };
        }

        default: {
            return state;
        }
    }
};

export default branchesReducer;
