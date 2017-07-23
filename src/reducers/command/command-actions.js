import * as constants from '../constants';

export const addCommand = () => {
    return {
        type: constants.ADD_COMMAND,
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
