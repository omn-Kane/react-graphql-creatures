import React, {PureComponent} from 'react';
import './style.css'
import Creatures from '../../components/creatures';
import connector from '../../connectors/data-page-connector';

class DataPage extends PureComponent {
    render() {
        const { data: {loading, error, Context }, Session, Day } = this.props;
        if (loading) return <p>Loading ...</p>;
        if (error) return <p>{error.message}</p>;

        return (
            <div>
                <div className="resources">
                    <span>My session: {Context.Session}</span>
                </div>
                <div className="resources">
                    <span>Food: {Context.Play.Food}</span>
                    <span>Lumber: {Context.Play.Lumber}</span>
                    <span>Housing Cost: {Context.Play.Housing}</span>
                </div>
                <div className="resources">
                    <span>Creatures: {Context.Play.CreatureCount}/{Context.Play.Housing}</span>
                    <span>Creatures Cost: {Context.Play.CreaturesCost}</span>
                    <span>Current Day: {Context.Day}</span>
                </div>
                <div className="end-day-button" onClick={() => this.endDay()}><span>End Day</span></div>
                <table className="table">
                    <thead className="tableheader">
                        <tr>
                            <td>Sex</td>
                            <td className="small"><div className="verticalText">Age</div></td>
                            <td className="small"><div className="verticalText">Longevity</div></td>
                            <td className="small"><div className="verticalText">Farming</div></td>
                            <td className="small"><div className="verticalText">Lumberjacking</div></td>
                            <td className="small"><div className="verticalText">Constructing</div></td>
                            <td className="small"><div className="verticalText">Epicene Chance</div></td>
                            <td className="small"><div className="verticalText">Multi Birth Chance</div></td>
                            <td>Current Action</td>
                            <td className="edge">Possible Actions</td>
                            <td className="scroller"></td>
                        </tr>
                    </thead>
                    <Creatures Session={Session} Day={Day} creatureCount={Context.Play.CreatureCount} allowActions={Context.Day === this.props.maxDay} />
                </table>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.Day === 0 && this.props.data.Context.Day !== 0) this.props.setMaxDay(this.props.data.Context.Day);
    }

    endDay() {

    }
}

export default connector(DataPage);
