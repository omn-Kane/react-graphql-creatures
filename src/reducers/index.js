import { combineReducers } from 'redux';
import appStore from './app/app-reducer';

const reducers = combineReducers({
    appStore,
})

export default reducers;
