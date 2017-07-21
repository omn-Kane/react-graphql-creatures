import React, { PureComponent } from 'react';
import DataPage from '../containers/data-page/data-page';
import connector from '../connectors/app-connector';

class AppContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.endSeason = this.endSeason.bind(this);

        this.state = {
            Session: props.Session,
            Season: props.Season,
            MaxSeason: 0,
            data: props.data,
        };
    }

    render() {
        return (
            <div className="App">
                <input type='text' placeholder='Session' ref={(ref) => this.sessionInput = ref} />
                <input type='button' value='Submit' onClick={(e) => this.submit()} />
                <div>
                    Season: {this.state.Season}/{this.state.MaxSeason}
                    <input type='button' value='Up' onClick={(e) => this.up()} />
                    <input type='button' value='Down' onClick={(e) => this.down()} />
                </div>
                <div className="spacer"></div>
                {this.state.Session ? <DataPage {...this.props} {...this.state} endSeason={this.endSeason}/> : null}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.props.data) this.setState({data: nextProps.data});
        if (nextProps.Season !== this.state.Season) this.setState({Season: nextProps.Season});
        if (nextProps.data && nextProps.data.Context && nextProps.data.Context.Session !== this.state.Session) this.setState({Session: nextProps.data.Context.Session});
    }

    componentDidUpdate() {
        if (this.state.Season === 0 && this.state.data.Context.Season !== 0) this.setState({MaxSeason: this.state.data.Context.Season});
    }

    endSeason(Session, Season) {
        this.props.endSeason(Session, Season).then((res) => {
            this.setState({
                Season: res.data.EndSeason.Season,
                MaxSeason: res.data.EndSeason.Season,
                data: {...this.state.data, Context: res.data.EndSeason},
            });
        });
    }

    submit() {
        this.props.updateSession(this.sessionInput.value);
    }

    up() {
        if (this.state.Season < this.state.MaxSeason) this.props.updateSeason(this.state.Season + 1);
    }

    down() {
        if (this.state.Season > 0) this.props.updateSeason(this.state.Season - 1);
    }
}

export default connector(AppContainer);
