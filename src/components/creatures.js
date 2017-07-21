import React, {PureComponent} from 'react';
import connector from '../connectors/creature-connector';

class Creatures extends PureComponent {
    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
    }

    render() {
        const { data: { loading, error, Creatures } } = this.props;

        if (loading && !Creatures) return <tbody key="tbody" className="scroller-y"><tr><td>Loading ...</td></tr></tbody>;
        if (error) return <tbody key="tbody" className="scroller-y"><tr><td>{error.message}</td></tr></tbody>;

        const creatures = Creatures.map((creature, index) =>
            <tr key={`creature-${creature.ID}`}>
                <td className="medium">{creature.Sex}</td>
                <td className="small">{creature.Stats.Age}</td>
                <td className="small">{creature.Stats.Longevity}</td>
                <td className="small">{creature.Stats.Agility}</td>
                <td className="small">{creature.Stats.Strength}</td>
                <td className="small">{creature.Stats.Intellect}</td>
                <td className="small">{creature.Stats.EpiceneChance}</td>
                <td className="small">{creature.Stats.MultiBirthChance}</td>
                <td><span>{creature.Action}</span></td>
                <td className="actions">
                    {
                        creature.Stats.Age > 2 && this.props.allowActions ?
                        <div>
                            <input type="button" value="Nothing" onClick={() => this.setInstruction(this.props.Session, creature.ID, 'Nothing')}/>
                            <input type="button" value="Breed" onClick={() => this.setInstruction(this.props.Session, creature.ID, 'Breeding')}/>
                            <input type="button" value="Farm" onClick={() => this.setInstruction(this.props.Session, creature.ID, 'Farming')}/>
                            <input type="button" value="Lumberjack" onClick={() => this.setInstruction(this.props.Session, creature.ID, 'Lumberjacking')}/>
                            <input type="button" value="Construct" onClick={() => this.setInstruction(this.props.Session, creature.ID, 'Constructing')}/>
                            <input type="button" value="Sell" onClick={() => this.setInstruction(this.props.Session, creature.ID, 'Sell')}/>
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

    componentWillUpdate(nextProps) {
        // This will add more creatures if you have more than 10 creatures and the current number of creatures loaded is 10
        if (nextProps.creatureCount > 10 && nextProps.data.Creatures && nextProps.data.Creatures.length === 10) {
            nextProps.data.fetchMoreCreatures();
        }
    }

    handleScroll({target: {scrollTop, offsetHeight, scrollHeight}}) {
        if (this.props.data.Creatures.length !== this.props.creatureCount && scrollTop + offsetHeight === scrollHeight) {
            console.log('Load More');
            this.props.data.fetchMoreCreatures();
        }
    }

    setInstruction(args) {
        this.props.data.setInstruction(args);
    }
};

export default connector(Creatures);
