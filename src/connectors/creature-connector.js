import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import getCreatures from '../graphql/get-creatures';
import setCreatureAction from '../graphql/set-creature-action';
import setBulkActions from '../graphql/bulk-set-creatures-actions';

const mapStateToProps = (state, ownProps) => ({
    automating: state.automatorStore.automating,
    isTimerActive: state.automatorStore.isTimerActive,
    timer: state.automatorStore.timer,
    commands: state.commandStore.commands,
    usePagination: false,
});

export default compose(
    connect(mapStateToProps),
    getCreatures,
    setCreatureAction,
    setBulkActions,
);
