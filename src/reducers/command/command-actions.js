import * as constants from '../constants';

export const addCommand = (command) => {
    return {
        type: constants.ADD_COMMAND,
        command
    }
}

export const updateCommand = (command) => {
    return {
        type: constants.UPDATE_COMMAND,
        command
    }
}

export const removeCommand = (commandID) => {
    return {
        type: constants.REMOVE_COMMAND,
        commandID
    }
}

export const lowerOrderCommand = (commandID) => {
    return {
        type: constants.LOWER_ORDER_COMMAND,
        commandID
    }
}

export const higherOrderCommand = (commandID) => {
    return {
        type: constants.HIGHER_ORDER_COMMAND,
        commandID
    }
}
