import React, {PureComponent} from 'react';
import Command from '../containers/command-container';

class Automator extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            automating: false,
            commands: {},
            commandID: 0
        };
    }

    render() {
        return (
            <div>
                <div className="timer">
                    <input type='button' value='Stop Timer' onClick={(e) => this.stopTimer()} />
                    <input type='text' className="timer-field" placeholder='timer' defaultValue="1000" ref={(ref) => this.timerInput = ref} />
                    {this.state.automating ? <input type='button' value='Activate Timer' onClick={(e) => this.activateTimer()} /> : null}
                </div>
                <div>
                    <span>Automating: {this.state.automating.toString()} </span>
                    {
                        !this.state.automating ?
                        <input type='button' value='Activate Automation' onClick={(e) => this.setState({automating: true})} />
                        :
                        <input type='button' value='Disable Automation' onClick={(e) => this.setState({automating: false})} />
                    }
                </div>

                {Object.values(this.state.commands)}
                <input type='button' value='New Command' onClick={(e) => this.newCommand()} />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Session !== this.props.Session) clearInterval(this.timer);
    }

    newCommand() {
        const newCommandID = this.state.commandID + 1
        const removeCommand = () => {
            delete this.state.commands[newCommandID];
            const newCommands = {...this.state.commands}
            this.setState({commands: newCommands});
        }
        const command = <Command key={newCommandID} removeCommand={removeCommand} />
        this.setState({commands: {...this.state.commands, [newCommandID]: command}, commandID: newCommandID});
    }

    activateTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.props.endSeason(this.props.Session, this.props.Season), this.timerInput.value);
    }

    stopTimer() {
        clearInterval(this.timer);
    }
}

export default Automator;
