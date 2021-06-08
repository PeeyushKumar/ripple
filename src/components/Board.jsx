import React, {Component} from 'react';
import Help from './Help'
import Panel from './Panel';
import Tile from './Tile';

class Board extends Component {

    constructor(props) {
        super(props);
        
        const noOfTiles = this.props.noOfTiles;
        const startNodeId = 261;
        const endNodeId = 278;

        const tiles = [];
        for (let i=0; i<noOfTiles; i++) {
            
            const newTile = {
                id : i,
                type : "empty",
                picked : false
            }

            if (newTile.id === startNodeId) {
                newTile.type = "start"
            }
            if (newTile.id === endNodeId) {
                newTile.type = "end"
            }

            tiles.push(newTile);
        }

        this.state = {
            noOfTiles,
            tiles,
            showHelp: true,
            found: false,
            startNodeId,
            endNodeId,
            pickedId: null,
            drawingWall: false,
        }
    }

    reset = () => {

        const {startNodeId, endNodeId, noOfTiles} = this.state;

        const tiles = [];
        for (let i=0; i<noOfTiles; i++) {
            const newTile = {
                id : i,
                type : "empty",
                picked : false
            }

            if (newTile.id === startNodeId) {
                newTile.type = "start"
            }
            if (newTile.id === endNodeId) {
                newTile.type = "end"
            }

            tiles.push(newTile);
        }

        this.setState({
            tiles,
            found: false,
            pickedId: null,
            drawingWall: false,
        })
    }

    showHelp = () => {
        this.setState({
            showHelp: true
        })
    }

    closeHelp = () => {
        this.setState({
            showHelp: false
        })
    }

    startSearching = () => {
        const {tiles, startNodeId} = this.state;

        const visited = [];
        this.explore(tiles, startNodeId, visited);        
    }

    explore = (tiles, current, visited) => {

        const cols = this.props.cols;
        const noOfTiles = this.props.noOfTiles;

        if (current === this.state.endNodeId) {
            this.setState({
                found : true
            })
        }
        
        if (this.state.found || visited.includes(current) || current < 0 || current >= noOfTiles) {
            return;
        }

        visited.push(current);

        const type = tiles[current].type;
        if (type === "wall") {
            return;
        }

        if (type !== "start") {
            tiles[current].type = "visited";
        }

        this.setState({
            tiles
        });

        setTimeout(() => {
            if ((current+1) % cols !== 0) {
                this.explore(tiles, current+1, visited);
            }
            if (current % cols !== 0) {
                this.explore(tiles, current-1, visited);
            }

            this.explore(tiles, current-cols, visited);
            this.explore(tiles, current+cols, visited);
        }, 1);
    }

    handleNodeDrop = (id) => {
        this.setState({
            drawingWall: false
        })

        const pickedId = this.state.pickedId;
        this.setState({
            pickedId: null
        })

        if (pickedId == null) {
            return;
        }

        const tiles = this.state.tiles;
        
        tiles[pickedId].picked = false;

        const currentTileType = tiles[id].type;
        const movable = ["start", "end"]
        if (movable.includes(currentTileType)) {
            return;
        }

        let startNodeId = this.state.startNodeId;
        let endNodeId = this.state.endNodeId;

        const pickedType = tiles[pickedId].type;

        tiles[id].type = pickedType;
        tiles[pickedId].type = "empty";
        tiles[pickedId].picked = false;

        if (pickedType === "start") {
            startNodeId = id;
        }
        else if (pickedType === "end") {
            endNodeId = id;
        }

        this.setState({
            tiles: tiles,
            startNodeId : startNodeId,
            endNodeId : endNodeId,
        })
    }

    handleNodePick = (id) => {

        const tiles = this.state.tiles;
        const pickedType = tiles[id].type;

        const movable = ["start", "end"];

        if (pickedType === "empty" || pickedType === "wall") {
            tiles[id].type = "wall";
            this.setState({
                tiles,
                drawingWall: true
            })
        }

        else if (movable.includes(pickedType)) {
            tiles[id].picked = true;
            this.setState({
                tiles,
                pickedId : id
            })
        }
    }

    handleMouseEnter = (id) => {
        const drawingWall = this.state.drawingWall; 
        if (drawingWall === false) {
            return;
        }

        const movable = ["start", "end"]
        const tiles = this.state.tiles;
        const type = tiles[id].type;
        if (movable.includes(type)) {
            return;
        }

        tiles[id].type = "wall";

        this.setState({
            tiles
        })
    }

    render() {
        return (
            <div>
                <Help
                    closeHelp={this.closeHelp}
                    show={this.state.showHelp}
                ></Help>

                <Panel
                    showHelp={this.showHelp}
                    startSearching={this.startSearching}
                    reset={this.reset}
                ></Panel>
                
                <div className="tile-group">
                    {
                        this.state.tiles.map( tile => <Tile 
                            {...tile} 
                            key={tile.id}
                            handleNodeDrop={this.handleNodeDrop}
                            handleNodePick={this.handleNodePick}
                            handleMouseEnter={this.handleMouseEnter}
                        ></Tile>)
                    }
                </div>
            </div>
        );
    }
}

export default Board;
