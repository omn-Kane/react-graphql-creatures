import React, {PureComponent} from 'react';
import Creatures from '../components/creatures';

class DataPage extends PureComponent {
    render() {
        const { data: {loading, error, Context } } = this.props;
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
                    <span>Housing Cost: {Context.Play.Housing * Context.Play.Housing}</span>
                </div>
                <div className="resources">
                    <span>Creatures: {Context.Play.CreatureCount}/{Context.Play.Housing}</span>
                    <span>Creatures Cost: {Context.Play.CreaturesCost}</span>
                    <span>Current Season: {Context.Season}</span>
                </div>
                <div className="end-season-button"><span onClick={() => this.props.endSeason(Context.Session, Context.Season)}>End Season</span></div>
                <table className="table">
                    <thead className="tableheader">
                        <tr>
                            <td>Sex</td>
                            <td className="small"><div className="verticalText">Age</div></td>
                            <td className="small"><div className="verticalText">Longevity</div></td>
                            <td className="small"><div className="verticalText">Farming</div></td>
                            <td className="small"><div className="verticalText">Lumberjacking</div></td>
                            <td className="small"><div className="verticalText">Epicene Chance</div></td>
                            <td className="small"><div className="verticalText">Multi Birth Chance</div></td>
                            <td>Current Action</td>
                            <td className="edge">Possible Actions</td>
                            <td className="scroller"></td>
                        </tr>
                    </thead>
                    <Creatures
                        Session={Context.Session}
                        Season={Context.Season}
                        creatureCount={Context.Play.CreatureCount}
                        allowActions={Context.Season === this.props.MaxSeason}
                        endSeason={this.props.endSeason}/>
                </table>
            </div>
        );
    }
}

export default DataPage;
