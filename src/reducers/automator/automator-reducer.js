import * as constants from '../constants';

const initialState = {
    automating: false,
};

export default function automatorStore(state = initialState, action = {}) {
    switch (action.type) {
        case constants.SET_AUTOMATING:
            return {
                ...state,
                automating: action.automating,
            };
        default:
            return state;
    }
}
