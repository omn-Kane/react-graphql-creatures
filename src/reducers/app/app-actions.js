import * as constants from '../constants';

export const updateSession = (session) => {
    return {
        type: constants.UPDATE_SESSION,
        session
    }
}


export const updateDay = (day) => {
    return {
        type: constants.UPDATE_DAY,
        day
    }
}
