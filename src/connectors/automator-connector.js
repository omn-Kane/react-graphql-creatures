import {connect} from 'react-redux';
import {setAutomating} from '../reducers/automator/automator-actions';
import {addCommand} from '../reducers/command/command-actions';

const mapStateToProps = (state, ownProps) => ({
    automating: state.automatorStore.automating,
    commands: state.commandStore.commands,
});

const mapDispatchToProps = {
    setAutomating,
    addCommand,
};

export default connect(mapStateToProps, mapDispatchToProps);
