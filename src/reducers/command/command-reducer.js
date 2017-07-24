import * as constants from '../constants';

// Session: DBQCpeU3yZB7bZr7
const initialState = {
    commandID: 0,
    commands: {},
    maxOrderID: 0,
};

export default function appStore(state = initialState, action = {}) {
    switch (action.type) {
        case constants.ADD_COMMAND: {
            let newCommandID = state.commandID + 1;
            let maxOrderID = state.maxOrderID + 1;
            let command = {...action.command, commandID: newCommandID, orderID: maxOrderID}
            let commands = {...state.commands, [newCommandID]: command};
            return {
                ...state,
                commands: commands,
                commandID: newCommandID,
                maxOrderID: maxOrderID,
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
            let currentCommand = commands[action.commandID];
            Object.values(commands)
                .filter((command) => command.orderID > currentCommand.orderID)
                .map((command) => command.orderID -= 1);
            delete commands[action.commandID];
            let maxOrderID = state.maxOrderID - 1;
            return {
                ...state,
                commands: commands,
                maxOrderID: maxOrderID,
            };
        }
        case constants.LOWER_ORDER_COMMAND: {
            let commands = {...state.commands};
            let currentCommand = commands[action.commandID];
            if (currentCommand.orderID !== 1) {
                let newOrderID = currentCommand.orderID - 1;
                let otherCommand = Object.values(commands).find((command) => command.orderID === newOrderID);
                if (otherCommand) otherCommand.orderID = currentCommand.orderID;
                currentCommand.orderID = newOrderID;
            }
            return {
                ...state,
                commands: commands,
            };
        }
        case constants.HIGHER_ORDER_COMMAND: {
            let commands = {...state.commands};
            let currentCommand = commands[action.commandID];
            if (currentCommand.orderID !== state.maxOrderID) {
                let newOrderID = currentCommand.orderID + 1;
                let otherCommand = Object.values(commands).find((command) => command.orderID === newOrderID);
                if (otherCommand) otherCommand.orderID = currentCommand.orderID;
                currentCommand.orderID = newOrderID;
            }
            return {
                ...state,
                commands: commands,
            };
        }
        default:
            return state;
    }
}
