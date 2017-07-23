import React, {PureComponent} from 'react';
import Command from '../containers/command-container';
import connector from '../connectors/automator-connector';

class Automator extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            commands: {},
        };
    }

    render() {
        return (
            <div>
                {this.displayCommands()}
                <input type='button' value='New Command' onClick={(e) => this.props.addCommand()} />
                <div className="spacer"></div>
                {
                    !this.props.automating ?
                    <input type='button' value='Activate Automation' onClick={(e) => this.props.setAutomating(true)} />
                    :
                    <div>
                        <input type='button' value='Disable Automation' onClick={(e) => this.props.setAutomating(false)} />
                        <div className="timer">
                            <input type='button' value='Stop Timer' onClick={(e) => this.stopTimer()} />
                            <input type='text' className="timer-field" placeholder='timer' defaultValue="1000" ref={(ref) => this.timerInput = ref} />
                            <input type='button' value='Activate Timer' onClick={(e) => this.activateTimer()} />
                        </div>
                    </div>
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Session !== this.props.Session) clearInterval(this.timer);
    }

    displayCommands() {
        return Object.values(this.props.commands).map((command) => {
            return <Command key={command.commandID} commandID={command.commandID} action={command.action} stat={command.stat} direction={command.direction} value={command.value} />
        });
    }

    activateTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.state.automating ? this.props.endSeason(this.props.Session, this.props.Season) : clearInterval(this.timer);
        }, this.timerInput.value);
    }

    stopTimer() {
        clearInterval(this.timer);
    }
}

export default connector(Automator);
