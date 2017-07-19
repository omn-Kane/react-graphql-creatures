import React from 'react';
import connector from '../connectors/landing-page-connector';

const LandingPage = ({ data: {loading, error, Context }, Day, setMaxDay}) => {
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
    if (Day === 0 && Context.Day !== 0) setMaxDay(Context.Day);

    return (
        <div>
            <h1>Session: {Context.Session}</h1>
            <h1>Day: {Context.Day}</h1>
            <h1>Food: {Context.Play.Food}</h1>
            <h1>Lumber: {Context.Play.Lumber}</h1>
            <h1>Housing Cost: {Context.Play.Housing}</h1>
            <h1>Creatures: {Context.Play.Creatures.length}/{Context.Play.Housing}</h1>
            <h1>Creatures Cost: {Context.Play.CreaturesCost}</h1>
        </div>
    );
};

export default connector(LandingPage);
