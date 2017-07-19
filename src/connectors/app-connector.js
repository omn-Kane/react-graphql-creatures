import {connect} from 'react-redux';
import {updateSession, updateDay, setMaxDay} from '../reducers/app/app-actions';

const mapStateToProps = (state, ownProps) => ({
    session: state.appStore.session,
    day: state.appStore.day,
    maxDay: state.appStore.maxDay,
});

const mapDispatchToProps = {
    updateSession,
    updateDay,
    setMaxDay,
};

export default connect(mapStateToProps, mapDispatchToProps);
