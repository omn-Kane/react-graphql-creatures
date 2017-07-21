import * as constants from '../constants';

const initialState = {
    session: "",
    season: 0,
};

export default function appStore(state = initialState, action = {}) {
    switch (action.type) {
        case constants.UPDATE_SESSION:
            return {
                ...state,
                session: action.session,
            };
        case constants.UPDATE_SEASON:
            return {
                ...state,
                season: action.season,
            };
        default:
            return state;
    }
}
