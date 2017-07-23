import * as constants from '../constants';

export const setAutomating = (automating) => {
    return {
        type: constants.SET_AUTOMATING,
        automating
    }
}
