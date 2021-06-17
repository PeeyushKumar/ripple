import React, {Component} from 'react'

class Node extends Component {
    
    render() {
        const {row, col, isStart, isEnd, isWall, isVisited, isPath, movingStart, movingEnd} = this.props;

        let className="node";

        if (isStart) {
            className += " node-start";
            if (movingStart) className += " node-moving";
        }
        
        if (isEnd) {
            className += " node-end";
            if (movingEnd) className += " node-moving";
        }
        
        if (isWall) className += " node-wall";
            
        if (isVisited) className += " node-visited";

        if (isPath) className += " node-path";

        return(
            <div
                className="node-container"
                onDragStart={(e) => {e.preventDefault()}}
                onMouseDown={() => this.props.handleOnMouseDown(row, col)}
                onMouseEnter={() => this.props.handleOnMouseEnter(row, col)}
            >
                <div className={className}></div>
            </div>
        );
    }
}

export default Node;