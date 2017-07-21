import * as constants from '../constants';

export const updateSession = (session) => {
    return {
        type: constants.UPDATE_SESSION,
        session
    }
}

export const updateSeason = (season) => {
    return {
        type: constants.UPDATE_SEASON,
        season
    }
}
