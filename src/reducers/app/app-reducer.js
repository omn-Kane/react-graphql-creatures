import * as constants from '../constants';

const initialState = {
    session: "BpLnfgDsc2WD8F2q",
    day: 0,
    maxDay: 0,
};

export default function appStore(state = initialState, action = {}) {
    switch (action.type) {
        case constants.UPDATE_SESSION:
            return {
                ...state,
                session: action.session,
                day: 0,
                maxDay: 0,
            };
        case constants.UPDATE_DAY:
            return {
                ...state,
                day: action.day,
            };
        case constants.SET_MAX_DAY:
            return {
                ...state,
                day: action.maxDay,
                maxDay: action.maxDay,
            };
        default:
            return state;
    }
}
