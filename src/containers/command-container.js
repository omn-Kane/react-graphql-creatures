import React, {PureComponent} from 'react';
import connector from '../connectors/command-connector';

class CommandContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            commandID: props.commandID,
            action: '',
            stat: '',
            direction: '',
            value: 0,
            editing: false,
        };
    }

    render() {
        return (
            <div>
                { !this.state.action ? this.displayActions() : null}
                { !this.state.stat && this.state.action ? this.displayStats() : null}
                { !this.state.direction && this.state.stat && this.state.action ? this.displayDirection() : null}
                { this.state.direction && this.state.stat && this.state.action ? this.displayCommand() : null}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            action: nextProps.action,
            stat: nextProps.stat,
            direction: nextProps.direction,
            value: nextProps.value,
        });
    }

    componentDidUpdate() {
        this.props.updateCommand(this.state);
    }

    setAction(action) {
        this.setState({action});
    }

    setStat(stat) {
        this.setState({stat});
    }

    setDirection(direction) {
        this.setState({direction});
    }

    lowerValue() {
        if (this.state.value > 0) this.setState({value: this.state.value - 1});
    }

    higherValue() {
        this.setState({value: this.state.value + 1});
    }

    setValue() {
        if (!isNaN(this.valueInput.value) && this.valueInput.value !== '') this.setState({value: parseInt(this.valueInput.value)}); // eslint-disable-line
    }

    displayActions() {
        return (
            <div>
                <span>Action to take: </span>
                <input type='button' value='Breed' onClick={(e) => this.setAction('Breed')} />
                <input type='button' value='Farm' onClick={(e) => this.setAction('Farm')} />
                <input type='button' value='Lumberjack' onClick={(e) => this.setAction('Lumberjack')} />
                <input type='button' value='Construct' onClick={(e) => this.setAction('Construct')} />
                <input type='button' value='Sell' onClick={(e) => this.setAction('Sell')} />
            </div>
        );
    }

    displayStats() {
        return (
            <div>
                <input type='button' value={this.state.action} onClick={(e) => this.setAction('')} />
                <span> when </span>
                <input type='button' value='Age' onClick={(e) => this.setStat('Age')} />
                <input type='button' value='Longevity' onClick={(e) => this.setStat('Longevity')} />
                <input type='button' value='Farming' onClick={(e) => this.setStat('Farming')} />
                <input type='button' value='Lumberjacking' onClick={(e) => this.setStat('Lumberjacking')} />
                <input type='button' value='EpiceneChance' onClick={(e) => this.setStat('EpiceneChance')} />
                <input type='button' value='MultiBirthChance' onClick={(e) => this.setStat('MultiBirthChance')} />
            </div>
        );
    }

    displayDirection() {
        return (
            <div>
                <input type='button' value={this.state.action} onClick={(e) => this.setAction('')} />
                <span> when </span>
                <input type='button' value={this.state.stat} onClick={(e) => this.setStat('')} />
                <span> is </span>
                <input type='button' value='Above' onClick={(e) => this.setDirection('Above')} />
                <input type='button' value='Below' onClick={(e) => this.setDirection('Below')} />
            </div>
        );
    }

    displayCommand() {
        return (
            <div>
                <input type='button' value={this.state.action} onClick={(e) => this.setAction('')} />
                <span> when </span>
                <input type='button' value={this.state.stat} onClick={(e) => this.setStat('')} />
                <span> is </span>
                <input type='button' value={this.state.direction} onClick={(e) => this.setDirection('')} />
                <span> </span>
                <input type='text' className="timer-field" value={this.state.value} ref={(ref) => this.valueInput = ref} onChange={() => this.setValue()}/>
                <input type='button' value='^' onClick={(e) => this.higherValue()} />
                <input type='button' value='v' onClick={(e) => this.lowerValue()} />
                <span> </span>
                <input type='button' value='Remove' onClick={(e) => this.props.removeCommand(this.props.commandID)} />
            </div>
        );
    }
}

export default connector(CommandContainer);
