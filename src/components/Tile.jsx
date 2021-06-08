import React, {Component} from 'react'

class Tile extends Component {
    
    render() {
        const id = this.props.id;
        const type = this.props.type;
        const picked = this.props.picked;

        let className = "tile";

        switch(type) {
            case "start":
                className += " tile-start";
                break;
            case "end":
                className += " tile-end";
                break;
            case "empty":
                className += " tile-empty";
                break;
            case "wall":
                className += " tile-wall";
                break;
            case "visited":
                className += " tile-visited";
        }

        if (picked) {
            className += " tile-picked"
        }

        return(
            <div
                onMouseUp={() => this.props.handleNodeDrop(id)}
                onMouseDown={() => this.props.handleNodePick(id)}
                onMouseEnter={() => this.props.handleMouseEnter(id)}
                className={className}
            ></div>
        );
    }
}

export default Tile;