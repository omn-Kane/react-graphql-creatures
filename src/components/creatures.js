import React, {PureComponent} from 'react';
import connector from '../connectors/creature-connector';
import {dynamicSort} from '../utils/utils';

class Creatures extends PureComponent {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            data: props.data,
            needsAutomating: true,
        };
    }

    render() {
        const { data: { loading, error, Creatures } } = this.state;

        if (loading && !Creatures) return <tbody key="tbody" className="scroller-y"><tr><td>Loading ...</td></tr></tbody>;
        if (error) return <tbody key="tbody" className="scroller-y"><tr><td>{error.message}</td></tr></tbody>;

        const creatures = Creatures.map((creature, index) =>
            <tr key={`creature-${creature.ID}`}>
                <td className="medium">{creature.Sex}</td>
                <td className="small">{creature.Stats.Age}</td>
                <td className="small">{creature.Stats.Longevity}</td>
                <td className="small">{creature.Stats.Farming}</td>
                <td className="small">{creature.Stats.Lumberjacking}</td>
                <td className="small">{creature.Stats.EpiceneChance}</td>
                <td className="small">{creature.Stats.MultiBirthChance}</td>
                <td><span>{creature.Action}</span></td>
                <td className="actions">
                    {
                        creature.Stats.Age > 2 && this.props.allowActions ?
                        <div>
                            <input type="button" value="Nothing" onClick={() => this.setAction(creature.ID, 'Nothing')}/>
                            <input type="button" value="Breed" onClick={() => this.setAction(creature.ID, 'Breed')}/>
                            <input type="button" value="Farm" onClick={() => this.setAction(creature.ID, 'Farm')}/>
                            <input type="button" value="Lumberjack" onClick={() => this.setAction(creature.ID, 'Lumberjack')}/>
                            <input type="button" value="Construct" onClick={() => this.setAction(creature.ID, 'Construct')}/>
                            <input type="button" value="Sell" onClick={() => this.setAction(creature.ID, 'Sell')}/>
                        </div>
                        : null
                    }
                </td>
            </tr>
        );

        return (
            <tbody key="tbody" className="scroller-y">
                {creatures}
            </tbody>
        );
    }

    componentDidMount() {
        document.getElementsByClassName('scroller-y')[0].addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.getElementsByClassName('scroller-y')[0].removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.props.data) this.setState({data: nextProps.data});
        if (nextProps.Season !== this.props.Season) this.setState({needsAutomating: true});
    }

    componentWillUpdate(nextProps) {
        // This will add more creatures if you have more than 10 creatures and the current number of creatures loaded is 10
        if (nextProps.usePagination && nextProps.creatureCount > 10 && nextProps.data.Creatures && nextProps.data.Creatures.length === 10) {
            nextProps.fetchMoreCreatures();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.needsAutomating && this.props.automating && this.props.allowActions && Object.keys(this.props.commands).length > 0) {
            this.setState({needsAutomating: false});
            let creatures = [];
            this.state.data.Creatures.forEach((creature) => {
                if (creature.Action !== 'Pregnant' && creature.Action !== 'Spawning') creatures.push(creature);
            });
            creatures.sort(dynamicSort('ID'));
            let commands = Object.values(this.props.commands);
            let creatureCommands = [];
            commands.sort(dynamicSort('orderID'));
            commands.forEach((command) => {
                let newCreaturesList = [];
                let numberOfCreatures = 0;
                creatures.forEach((creature, index) => {
                    if (numberOfCreatures < command.numberOfCreatures || command.numberOfCreatures === -1) {
                        if (command.stat === 'Sex') {
                            if (creature.Sex === command.sex) {
                                creatureCommands.push({ID: creature.ID, Action: command.action});
                                ++numberOfCreatures;
                            } else {
                                newCreaturesList.push(creature);
                            }
                        } else {
                            if ((command.direction === 'Above' && creature.Stats[command.stat] > command.value) ||
                                (command.direction === 'Below' && creature.Stats[command.stat] < command.value)) {
                                creatureCommands.push({ID: creature.ID, Action: command.action});
                                ++numberOfCreatures;
                            } else {
                                newCreaturesList.push(creature);
                            }
                        }
                    } else {
                        newCreaturesList.push(creature);
                    }
                    creatures = newCreaturesList;
                });
            });
            if (this.props.isTimerActive) {
                this.props.setBulkActions(this.props.Session, this.props.Season, creatureCommands);
                this.runTimer();
            }
        }
    }

    handleScroll({target: {scrollTop, offsetHeight, scrollHeight}}) {
        if (this.props.data.Creatures.length !== this.props.creatureCount && scrollTop + offsetHeight === scrollHeight) {
            console.log('Load More');
            this.props.fetchMoreCreatures();
        }
    }

    setAction(ID, Action) {
        this.props.setAction(this.props.Session, this.props.Season, ID, Action)
            .then((res) => {
                if (!this.props.isTimerActive) {
                    const newCreatures = this.state.data.Creatures.map((creature) => {
                        if (creature.ID !== ID) return creature;
                        return {...creature, Action: res.data.SetAction.Action}
                    });
                    this.setState({ data: {...this.state.data, Creatures: newCreatures} });
                }
            });
    }

    runTimer() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.props.endSeason(this.props.Session, this.props.Season), this.props.timer);
    }
};

export default connector(Creatures);
