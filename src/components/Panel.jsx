import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'

class Panel extends Component {
    render() {

        return (
            <div className="panel">

                <Button
                    className="btn btn-primary"
                    onClick={this.props.showHelp}
                >Help</Button>

                <Button
                    className="btn btn-success btn-xs-block"
                    onClick={this.props.startSearching}
                >Go</Button>

                <Button
                    className="btn btn-secondary"
                    onClick={this.props.reset}
                >Reset</Button>
            
            </div>
        )
    }
}

export default Panel;
