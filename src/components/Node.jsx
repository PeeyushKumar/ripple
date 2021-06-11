import React, {Component} from 'react'

class Node extends Component {
    
    render() {
        const {row, col, isStart, isEnd, isWall, isVisited, isPicked, isPath} = this.props;

        let className = "node";

        if (isStart) {
            className += " node-start";
        }
        if (isEnd) {
            className += " node-end";
        }
        if (isWall) {
            className += " node-wall";
        }
        if (isVisited) {
            className += " node-visited";
        }
        if (isPicked) {
            className += " node-picked";
        }
        if (isPath) {
            className += " node-path";
        }

        return(
            <div
                onMouseUp={() => this.props.handleOnMouseUp(row, col)}
                onMouseDown={() => this.props.handleOnMouseDown(row, col)}
                onMouseEnter={() => this.props.handleOnMouseEnter(row, col)}
                className={className}
            ></div>
        );
    }
}

export default Node;