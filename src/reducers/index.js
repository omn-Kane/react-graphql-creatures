import { combineReducers } from 'redux';
import appStore from './app/app-reducer';
import automatorStore from './automator/automator-reducer';
import commandStore from './command/command-reducer';

const reducers = combineReducers({
    appStore,
    automatorStore,
    commandStore,
})

export default reducers;
