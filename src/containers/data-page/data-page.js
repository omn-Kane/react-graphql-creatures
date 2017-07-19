import React from 'react';
import './style.css'
import Creature from '../../components/creature';
import connector from '../../connectors/data-page-connector';

const DataPage = ({ data: {loading, error, Context }, Day, setMaxDay}) => {
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
    if (Day === 0 && Context.Day !== 0) setMaxDay(Context.Day);

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
            <table className="table">
                <thead className="tableheader">
                    <tr>
                        <td className="medium">Sex</td>
                        <td className="small"><div className="verticalText">Age</div></td>
                        <td className="small"><div className="verticalText">Longevity</div></td>
                        <td className="small"><div className="verticalText">Farming</div></td>
                        <td className="small"><div className="verticalText">Lumberjacking</div></td>
                        <td className="small"><div className="verticalText">Constructing</div></td>
                        <td className="small"><div className="verticalText">Epicene Chance</div></td>
                        <td className="small"><div className="verticalText">Multi Birth Chance</div></td>
                        <td>Current Action</td>
                    </tr>
                </thead>
                <tbody>
                    {Context.Play.Creatures.map((props) => <Creature {...props}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default connector(DataPage);