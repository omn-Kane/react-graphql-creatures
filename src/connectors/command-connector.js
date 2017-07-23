import {connect} from 'react-redux';
import {updateCommand, removeCommand} from '../reducers/command/command-actions';

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
    updateCommand,
    removeCommand,
};

export default connect(mapStateToProps, mapDispatchToProps);
