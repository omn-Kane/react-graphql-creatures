import React, {PureComponent} from 'react';
import Command from '../containers/command-container';
import connector from '../connectors/automator-connector';
import {dynamicSort} from '../utils/utils';

class Automator extends PureComponent {
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
                            <input type='button' value='Stop Timer' onClick={(e) => this.props.stopTimer()} />
                            <input type='text' className="timer-field" placeholder='timer' defaultValue="1000" ref={(ref) => this.timerInput = ref} />
                            <input type='button' value='Activate Timer' onClick={(e) => this.props.activateTimer(this.timerInput.value)} />
                        </div>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        const sellFemaleCommand = {
            action: 'Sell',
            numberOfCreatures: -1,
            stat: 'Sex',
            sex: 'Female',
        };
        const sellMultiBirthCommand = {
            action: 'Sell',
            numberOfCreatures: -1,
            stat: 'MultiBirthChance',
            direction: 'Below',
            value: 115,
        };
        const sellEpiceneCommand = {
            action: 'Sell',
            numberOfCreatures: -1,
            stat: 'EpiceneChance',
            direction: 'Below',
            value: 95,
        };
        const breedCommand = {
            action: 'Breed',
            numberOfCreatures: 30,
            stat: 'Age',
            direction: 'Above',
            value: 20,
        };

        this.props.addCommand(sellFemaleCommand);
        this.props.addCommand(breedCommand);
        this.props.addCommand(sellEpiceneCommand);
        this.props.addCommand(sellMultiBirthCommand);
    }

    displayCommands() {
        return Object.values(this.props.commands).sort(dynamicSort('orderID')).map((command) => {
            return <Command key={command.commandID} {...command} />
        });
    }
}

export default connector(Automator);
