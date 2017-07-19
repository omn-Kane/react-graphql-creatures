import React from 'react';
import '../containers/data-page/style.css'

const Creature = (creature) => {
    return (
        <tr>
            <td className="medium">{creature.Sex}</td>
            <td className="small">{creature.Stats.Age}</td>
            <td className="small">{creature.Stats.Longevity}</td>
            <td className="small">{creature.Stats.Agility}</td>
            <td className="small">{creature.Stats.Strength}</td>
            <td className="small">{creature.Stats.Intellect}</td>
            <td className="small">{creature.Stats.EpiceneChance}</td>
            <td className="small">{creature.Stats.MultiBirthChance}</td>
            <td><span>{creature.Action}</span></td>
        </tr>
    );
};

export default Creature;
