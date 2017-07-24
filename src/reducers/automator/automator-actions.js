import * as constants from '../constants';

export const setAutomating = (automating) => {
    return {
        type: constants.SET_AUTOMATING,
        automating
    }
}

export const activateTimer = (timer) => {
    return {
        type: constants.ACTIVATE_TIMER,
        timer,
    }
}

export const stopTimer = () => {
    return {
        type: constants.STOP_TIMER,
    }
}
