import * as constants from '../constants';

const initialState = {
    automating: false,
    isTimerActive: false,
    timer: 1000,
};

export default function automatorStore(state = initialState, action = {}) {
    switch (action.type) {
        case constants.SET_AUTOMATING:
            return {
                ...state,
                automating: action.automating,
            };
        case constants.ACTIVATE_TIMER:
            return {
                ...state,
                isTimerActive: true,
                timer: action.timer,
            };
        case constants.STOP_TIMER:
            return {
                ...state,
                isTimerActive: false,
            };
        default:
            return state;
    }
}
