import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {updateSession, updateSeason} from '../reducers/app/app-actions';
import getContext from '../graphql/get-context';
import endSeason from '../graphql/end-season';

const mapStateToProps = (state, ownProps) => ({
    Session: state.appStore.session,
    Season: state.appStore.season,
});

const mapDispatchToProps = {
    updateSession,
    updateSeason,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    getContext,
    endSeason,
);
