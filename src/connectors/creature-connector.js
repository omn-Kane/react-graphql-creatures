import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import getCreatures from '../graphql/get-creatures';
import setCreatureAction from '../graphql/set-creature-action';

const mapStateToProps = (state, ownProps) => ({
    automating: state.automatorStore.automating,
});

export default compose(
    connect(mapStateToProps),
    getCreatures,
    setCreatureAction,
);
