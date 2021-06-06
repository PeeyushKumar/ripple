import React, {Component} from 'react';

class Panel extends Component {
    render() {

        return (
            <div className="panel">
                <button
                    onClick={this.props.startSearching}
                >Go</button>
            </div>
        )
    }
}

export default Panel;
