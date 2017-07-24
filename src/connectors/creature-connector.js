import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import getCreatures from '../graphql/get-creatures';
import setCreatureAction from '../graphql/set-creature-action';

const mapStateToProps = (state, ownProps) => ({
    automating: state.automatorStore.automating,
    isTimerActive: state.automatorStore.isTimerActive,
    timer: state.automatorStore.timer,
    commands: state.commandStore.commands,
});

export default compose(
    connect(mapStateToProps),
    getCreatures,
    setCreatureAction,
);
