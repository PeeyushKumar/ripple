import React, {Component} from 'react'

class Tile extends Component {
    
    render() {
        const id = this.props.id;
        const type = this.props.type;
        const visited = this.props.visited;
        const picked = this.props.picked;

        let className = "tile";

        if (type === "start") {
            className += " tile-start";
        }

        else if (type === "end") {
            className += " tile-end";
        }

        else if (type === "wall") {
            className += " tile-wall"
        }

        else if (visited === true) {
            className += " tile-visited";
        }

        if (picked) {
            className += " tile-picked"
        }



        return(
            <button
                onMouseUp={() => this.props.handleNodeDrop(id)}
                onMouseDown={() => this.props.handleNodePick(id)}
                onMouseEnter={() => this.props.handleMouseEnter(id)}
                className={className}
            ></button>
        );
    }
}

export default Tile;