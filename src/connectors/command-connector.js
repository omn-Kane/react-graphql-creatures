import {connect} from 'react-redux';
import {updateCommand, removeCommand, lowerOrderCommand, higherOrderCommand} from '../reducers/command/command-actions';

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
    updateCommand,
    removeCommand,
    lowerOrderCommand,
    higherOrderCommand,
};

export default connect(mapStateToProps, mapDispatchToProps);
