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

export const setMaxDay = (maxDay) => {
    return {
        type: constants.SET_MAX_DAY,
        maxDay
    }
}
