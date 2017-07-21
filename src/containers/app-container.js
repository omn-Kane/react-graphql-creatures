import React, { PureComponent } from 'react';
import DataPage from '../containers/data-page/data-page';
import connector from '../connectors/app-connector';

class AppContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.endDay = this.endDay.bind(this);

        this.state = {
            Session: props.Session,
            Day: props.Day,
            MaxDay: 0,
            data: props.data,
        };
    }

    render() {
        return (
            <div className="App">
                <input type='text' placeholder='Session' ref={(ref) => this.sessionInput = ref} />
                <input type='button' value='Submit' onClick={(e) => this.submit()} />
                <div>
                    Day: {this.state.Day}/{this.state.MaxDay}
                    <input type='button' value='Up' onClick={(e) => this.up()} />
                    <input type='button' value='Down' onClick={(e) => this.down()} />
                </div>
                <div className="spacer"></div>
                {this.state.Session ? <DataPage {...this.props} {...this.state} endDay={this.endDay}/> : null}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.props.data) this.setState({data: nextProps.data});
        if (nextProps.Day !== this.state.Day) this.setState({Day: nextProps.Day});
        if (nextProps.data && nextProps.data.Context && nextProps.data.Context.Session !== this.state.Session) this.setState({Session: nextProps.data.Context.Session});
    }

    componentDidUpdate() {
        if (this.state.Day === 0 && this.state.data.Context.Day !== 0) this.setState({MaxDay: this.state.data.Context.Day});
    }

    endDay(Session, Day) {
        this.props.endDay(Session, Day).then((res) => {
            this.setState({
                Day: res.data.EndDay.Day,
                MaxDay: res.data.EndDay.Day,
                data: {...this.state.data, Context: res.data.EndDay},
            });
        });
    }

    submit() {
        this.props.updateSession(this.sessionInput.value);
    }

    up() {
        if (this.state.Day < this.state.MaxDay) this.props.updateDay(this.state.Day + 1);
    }

    down() {
        if (this.state.Day > 0) this.props.updateDay(this.state.Day - 1);
    }
}

export default connector(AppContainer);
