import * as constants from '../constants';

const initialState = {
    session: "",
    day: 0,
};

export default function appStore(state = initialState, action = {}) {
    switch (action.type) {
        case constants.UPDATE_SESSION:
            return {
                ...state,
                session: action.session,
            };
        case constants.UPDATE_DAY:
            return {
                ...state,
                day: action.day,
            };
        default:
            return state;
    }
}
