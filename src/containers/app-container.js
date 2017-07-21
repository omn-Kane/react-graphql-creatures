import React, { PureComponent } from 'react';
import DataPage from '../containers/data-page/data-page';
import CreaturesGraphql from '../connectors/creatures-graphql';
import connector from '../connectors/app-connector';

class AppContainer extends PureComponent {
    render() {
        return (
            <CreaturesGraphql>
                <div className="App">
                    <input type='text' placeholder='Session' ref={(ref) => this.sessionInput = ref} />
                    <input type='button' value='Submit' onClick={(e) => this.submit()} />
                    <div>
                        Day: {this.props.day}/{this.props.maxDay}
                        <input type='button' value='Up' onClick={(e) => this.up()} />
                        <input type='button' value='Down' onClick={(e) => this.down()} />
                    </div>
                    <div className="spacer"></div>
                    {
                        this.props.session ?
                        <DataPage Session={this.props.session} Day={this.props.day} setMaxDay={this.props.setMaxDay} maxDay={this.props.maxDay}/>
                        : null
                    }
                </div>
            </CreaturesGraphql>
        );
    }

    submit() {
        this.props.updateSession(this.sessionInput.value);
    }

    up() {
        if (this.props.day < this.props.maxDay) this.props.updateDay(this.props.day + 1);
    }

    down() {
        if (this.props.day > 0) this.props.updateDay(this.props.day - 1);
    }
}

export default connector(AppContainer);
