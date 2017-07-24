import React, {PureComponent} from 'react';
import connector from '../connectors/command-connector';

class CommandContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            commandID: props.commandID,
            orderID: props.orderID,
            action: props.action,
            stat: props.stat,
            direction: props.direction,
            sex: props.sex,
            value: props.value,
            numberOfCreatures: props.numberOfCreatures,
        };
    }

    render() {
        return (
            <div>
                <div className="command-remove">
                    <input type='button' value='Remove' onClick={(e) => this.props.removeCommand(this.props.commandID)} />
                </div>
                <div className="command-remove">
                    <input type='button' value='^' onClick={(e) => this.higherCommand()} />
                    <input type='button' value='v' onClick={(e) => this.lowerCommand()} />
                </div>
                { !this.state.action ? this.displayActions() : null }
                { this.state.action ?
                    <div className="inline">
                        <input type='button' value={this.state.action} onClick={(e) => this.setAction('')} />
                        <span> </span>
                        <input type='text' className="timer-field" value={this.state.numberOfCreatures === -1 ? 'all' : this.state.numberOfCreatures} ref={(ref) => this.numberOfCreaturesInput = ref} onChange={() => this.setNumberOfCreatures()}/>
                        <input type='button' value='^' onClick={(e) => this.higherNumberOfCreatures()} />
                        <input type='button' value='v' onClick={(e) => this.lowerNumberOfCreatures()} />
                    </div> :
                    null
                }
                { !this.state.stat && this.state.action ? this.displayStats() : null }
                { this.state.stat && this.state.action ?
                    <div className="inline">
                        <span>when </span>
                        <input type='button' value={this.state.stat} onClick={(e) => this.setStat('')} />
                    </div> :
                    null
                }
                { !this.state.direction && this.state.stat !== 'Sex' && this.state.stat && this.state.action ? this.displayDirection() : null }
                {
                    this.state.direction && this.state.stat && this.state.action ?
                    <div className="inline">
                        <span>is </span>
                        <input type='button' value={this.state.direction} onClick={(e) => this.setDirection('')} />
                    </div> :
                    null
                }
                { this.state.direction && this.state.stat && this.state.action ?
                    <div className="inline">
                        <input type='text' className="timer-field" value={this.state.value} ref={(ref) => this.valueInput = ref} onChange={() => this.setValue()}/>
                        <input type='button' value='^' onClick={(e) => this.higherValue()} />
                        <input type='button' value='v' onClick={(e) => this.lowerValue()} />
                    </div>
                    :
                    null
                }
                { !this.state.sex && this.state.stat === 'Sex' && this.state.stat && this.state.action ? this.displaySex() : null }
                {
                    this.state.sex && this.state.stat && this.state.action ?
                    <div className="inline">
                        <span>is </span>
                        <input type='button' value={this.state.sex} onClick={(e) => this.setSex('')} />
                    </div> :
                    null
                }
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

    setSex(sex) {
        this.setState({sex});
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

    setNumberOfCreatures(stat) {
        if (!isNaN(this.numberOfCreaturesInput.value) && this.numberOfCreaturesInput.value !== '') this.setState({numberOfCreatures: parseInt(this.numberOfCreaturesInput.value)}); // eslint-disable-line
    }

    lowerNumberOfCreatures() {
        if (this.state.numberOfCreatures > -1) this.setState({numberOfCreatures: this.state.numberOfCreatures - 1});
    }

    higherNumberOfCreatures() {
        this.setState({numberOfCreatures: this.state.numberOfCreatures + 1});
    }

    lowerCommand() {
        this.props.higherOrderCommand(this.state.commandID);
    }

    higherCommand() {
        this.props.lowerOrderCommand(this.state.commandID);
    }

    displayActions() {
        return (
            <div className="inline">
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
            <div className="inline">
                <span>when </span>
                <input type='button' value='Sex' onClick={(e) => this.setStat('Sex')} />
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
            <div className="inline">
                <span>is </span>
                <input type='button' value='Above' onClick={(e) => this.setDirection('Above')} />
                <input type='button' value='Below' onClick={(e) => this.setDirection('Below')} />
            </div>
        );
    }

    displaySex() {
        return (
            <div className="inline">
                <span>is </span>
                <input type='button' value='Male' onClick={(e) => this.setSex('Male')} />
                <input type='button' value='Female' onClick={(e) => this.setSex('Female')} />
                <input type='button' value='Epicene' onClick={(e) => this.setSex('Epicene')} />
            </div>
        );
    }
}

export default connector(CommandContainer);
