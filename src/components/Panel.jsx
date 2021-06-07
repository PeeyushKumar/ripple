import React, {Component} from 'react';

class Panel extends Component {
    render() {

        return (
            <div className="panel">
                <button
                    className="btn"
                    onClick={this.props.startSearching}
                >Go</button>

                <button
                    className="btn"
                    onClick={this.props.reset}
                >Reset</button>
            </div>
        )
    }
}

export default Panel;
