import React, {Component} from 'react'

class Cell extends Component {
    
    render() {
        const {row, col, isStart, isEnd, isWall, isVisited, isPath, movingStart, movingEnd} = this.props;

        let className="cell";

        if (isStart) {
            className += " cell-start";
            if (movingStart) className += " cell-moving";
        }
        
        if (isEnd) {
            className += " cell-end";
            if (movingEnd) className += " cell-moving";
        }
        
        if (isWall) className += " cell-wall";
            
        if (isVisited) className += " cell-visited";

        if (isPath) className += " cell-path";

        return(
            <div
                className="cell-container"
                onDragStart={(e) => {e.preventDefault()}}
                onMouseDown={() => this.props.handleOnMouseDown(row, col)}
                onMouseEnter={() => this.props.handleOnMouseEnter(row, col)}
            >
                <div className={className}></div>
            </div>
        );
    }
}

export default Cell;