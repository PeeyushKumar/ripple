    import React, {Component} from 'react';
    import Panel from './Panel';
    import Tile from './Tile';

    class Board extends Component {

        constructor(props) {
            super(props);
            
            const count = this.props.count;
            const startNodeId = 84;
            const endNodeId = 95;

            const tiles = [];
            for (let i=0; i<count; i++) {
                
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
                tiles,
                found: false,
                startNodeId: 84,
                endNodeId: 95,
                selectedId: null,
                drawingWall: false,
            }
        }

        startSearching = () => {
            const tiles = this.state.tiles;
            const start = this.state.startNodeId;

            const visited = [];
            this.explore(tiles, start, visited);        
        }

        explore = (tiles, current, visited) => {

            const cols = this.props.cols;
            const count = this.props.count;

            if (current === this.state.endNodeId) {
                this.setState({
                    found : true
                })
            }
            
            if (this.state.found || visited.includes(current) || current < 0 || current >= count) {
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

            const selectedId = this.state.selectedId;

            if (selectedId == null) {
                return;
            }

            const tiles = this.state.tiles;
            const currentTileType = tiles[id].type;
            const movable = ["start", "end"]
            if (movable.includes(currentTileType)) {
                return;
            }
 
            let startNodeId = this.state.startNodeId;
            let endNodeId = this.state.endNodeId;

            const pickedType = tiles[selectedId].type;

            tiles[id].type = pickedType;
            tiles[selectedId].type = "empty";
            tiles[selectedId].picked = false;

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
                selectedId : null
            })
        }

        handleNodePick = (id) => {

            const tiles = this.state.tiles;
            const pickedType = tiles[id].type;

            const movable = ["start", "end"];

            if (pickedType === "empty") {
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
                    selectedId : id
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
                    <Panel
                        startSearching={this.startSearching}
                    ></Panel>
                    
                    <div className="board">
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