import React, {PureComponent} from 'react';

class CommandContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            action: '',
            stat: '',
            direction: '',
            value: '',
        };
    }

    render() {
        return (
            <div>
                { !this.state.action ? this.displayActions() : null}
                { !this.state.stat && this.state.action ? this.displayStats() : null}
                { !this.state.direction && this.state.stat ? this.displayDirection() : null}
                { !this.state.value && this.state.direction ? this.displayValueSelector() : null}
                { this.state.value !== '' ? this.displayCommand() : null}
            </div>
        );
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

    setRefValue(value) {
        this.valueInput.value = parseInt(this.valueInput.value) + value; // eslint-disable-line
    }

    setValue() {
        this.setState({value: this.valueInput.value});
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
                <span>{this.state.action} when: </span>
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
                <span>{this.state.action} when {this.state.stat} is: </span>
                <input type='button' value='Above' onClick={(e) => this.setDirection('Above')} />
                <input type='button' value='Below' onClick={(e) => this.setDirection('Below')} />
            </div>
        );
    }

    displayValueSelector() {
        return (
            <div>
                <span>{this.state.action} when {this.state.stat} is {this.state.direction}: </span>
                <input type='text' className="timer-field" placeholder='Value' defaultValue='0' ref={(ref) => this.valueInput = ref} />
                <input type='button' value='^' onClick={(e) => this.setRefValue(1)} />
                <input type='button' value='v' onClick={(e) => this.setRefValue(-1)} />
                <input type='button' value='Save' onClick={(e) => this.setValue()} />
            </div>
        );
    }

    displayCommand() {
        return (
            <div>
                <span>{this.state.action} when {this.state.stat} is {this.state.direction} {this.state.value} </span>
                <input type='button' value='Remove' onClick={(e) => this.props.removeCommand()} />
            </div>
        );
    }
}

export default CommandContainer;
