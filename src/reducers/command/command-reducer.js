import * as constants from '../constants';

const initialState = {
    commandID: 0,
    commands: {},
};

export default function appStore(state = initialState, action = {}) {
    switch (action.type) {
        case constants.ADD_COMMAND: {
            let newCommandID = state.commandID + 1;
            let command = {commandID: newCommandID}
            let commands = {...state.commands, [newCommandID]: command};
            return {
                ...state,
                commands: commands,
                commandID: newCommandID
            };
        }
        case constants.UPDATE_COMMAND: {
            let commands = {...state.commands};
            commands[action.command.commandID] = action.command;
            return {
                ...state,
                commands: commands,
            };
        }
        case constants.REMOVE_COMMAND: {
            let commands = {...state.commands};
            delete commands[action.commandID];
            return {
                ...state,
                commands: commands,
            };
        }
        default:
            return state;
    }
}
