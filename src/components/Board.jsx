import React, {Component} from 'react';
import Help from './Help'
import Panel from './Panel';
import Node from './Node';


class Board extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            grid: [[]],
            noOfRows: null,
            noOfCols: null,

            startRow: null,
            startCol: null,
            endRow: null,
            endCol: null,
            
            showHelp: false,
            searching: false,
            tracking: false,
            drawingWall: false,
            erazingWall: false,
            movingStart: false,
            movingEnd: false,   
        }
    }

    componentDidMount = () => {
        this.createGrid();

        window.addEventListener('resize', this.createGrid);
    }

    createGrid = (startRow=null, startCol=null, endRow=null, endCol=null) => {

        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.8;

        const ratio = width/height;

        const noOfRows = Math.floor(height/37);
        const noOfCols = Math.floor(noOfRows*ratio);


        if (!(startRow && startCol && endRow && endCol)) {
            startCol = Math.floor(noOfCols/2 - noOfCols/4)
            startRow = Math.floor(noOfRows/2)-1
    
            endCol = Math.floor(noOfCols/2 + noOfCols/4)
            endRow = Math.floor(noOfRows/2)-1
        }

        const grid = [];
        for (let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            const row = []
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                const node = {
                    row: rowIdx,
                    col: nodeIdx,
                    isStart: rowIdx === startRow && nodeIdx === startCol,
                    isEnd: rowIdx === endRow && nodeIdx === endCol,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    parentRow: null,
                    parentCol: null,
                }
                row.push(node);
            }
            grid.push(row);
        }

        this.setState({
            grid,
            noOfRows,
            noOfCols,     
            startRow,
            startCol,
            endRow,
            endCol       
        })
    } 

    reset = () => {
        const {startRow, startCol, endRow, endCol} = this.state;

        this.createGrid(startRow, startCol, endRow, endCol);
    }

    resetSearch = () => {
        const {noOfRows, noOfCols} = this.state;

        this.setState({
            searching: false,
            tracking: false
        })

        for(let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                this.erazeNode(rowIdx, nodeIdx, false, false);
            }
        }
    }

    resetVisited = () => {
        const {grid, noOfRows, noOfCols} = this.state;

        for(let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                grid[rowIdx][nodeIdx].isVisited = false;
            }
        }

        this.setState({
            grid
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

    isValidIndex = (row, col) => {
        const {noOfRows, noOfCols} = this.state;

        return (row >= 0 && row < noOfRows && col >= 0 && col < noOfCols)
    }

    startSearching = () => {
        const {grid, startRow, startCol} = this.state;

        this.setState({
            searching: true
        })

        setTimeout(() => {
            this.explore(grid, startRow, startCol);   
        }, 0);
    }

    explore = (grid, fromRow, fromCol, parentRow=null, parentCol=null) => {

        if (!this.isValidIndex(fromRow,fromCol)) return;

        const currentNode = grid[fromRow][fromCol];

        if (currentNode.isEnd) {
            currentNode.parentRow = parentRow;
            currentNode.parentCol = parentCol;
            grid[fromRow][fromCol] = currentNode;
            
            this.setState({
                grid,
                searching : false
            })
            
            if (this.state.tracking) return;
            
            this.track(currentNode.row, currentNode.col)
            this.setState({
                tracking: true
            })
            
        }
        
        if (!this.state.searching || currentNode.isVisited || currentNode.isWall) return;

        currentNode.isVisited = true;
        currentNode.parentRow = parentRow;
        currentNode.parentCol = parentCol;
        grid[fromRow][fromCol] = currentNode;

        this.setState({
            grid
        })

        setTimeout(() => {
            this.explore(grid, fromRow, fromCol+1, fromRow, fromCol);        
        }, 10);
        setTimeout(() => {
            this.explore(grid, fromRow+1, fromCol, fromRow, fromCol);
        }, 10);
        setTimeout(() => {
            this.explore(grid, fromRow, fromCol-1, fromRow, fromCol);
        }, 10);
        setTimeout(() => {
            this.explore(grid, fromRow-1, fromCol, fromRow, fromCol);            
        }, 10);

    }

    track = (row, col) => {
        const {grid} = this.state;
        const path = []
        while (!grid[row][col].isStart) {
            const parentRow = grid[row][col].parentRow;
            const parentCol = grid[row][col].parentCol;
            row = parentRow;
            col = parentCol;
            path.unshift(grid[row][col]);
        }

        const travel = (grid, path, i) => {
            if (i >= path.length) return;

            const node = path[i];
            const row = node.row;
            const col = node.col;
            const {startRow, startCol} = this.state;
            
            grid[startRow][startCol].isStart = false;
            grid[row][col].isPath = false;
            grid[row][col].isStart = true;

            this.setState({
                grid,
                startRow: row,
                startCol: col,
            })

            this.resetVisited()

            setTimeout(() => {
                travel(grid, path, i+1)
            }, 10);
        }

        const makePath = (grid, path, i) => {
            if (i >= path.length) {
                this.setState({
                    tracking: false
                })
                // travel(grid, path, 0);
                return;
            }

            const node = path[i];
            const row = node.row;
            const col = node.col;
            grid[row][col].isPath = true;
            this.setState({
                grid
            })
            setTimeout(() => {
                makePath(grid, path, i+1)
            }, 15);
        }

        makePath(grid, path, 1);
    }

    erazeNode = (row, col, primary=true, wall=true) => {
        const {grid} = this.state;

        if (primary)  {
            grid[row][col].isStart = false;
            grid[row][col].isEnd = false;
        }

        if (wall) {
            grid[row][col].isWall = false;
        }

        grid[row][col].isVisited = false;        
        grid[row][col].isPath = false;
        grid[row][col].parentRow = null;
        grid[row][col].parentCol = null;

        this.setState({
            grid
        })
    }

    erazeStart = () => {
        const {startRow, startCol} = this.state;
        
        this.erazeNode(startRow, startCol);
        
        this.setState({
            startRow: null,
            startCol: null
        })
    }

    erazeEnd = () => {
        const {endRow, endCol} = this.state;
        
        this.erazeNode(endRow, endCol);
        
        this.setState({
            endRow: null,
            endCol: null
        })
    }

    moveStart = (row, col) => {
        const {grid} = this.state;

        this.erazeStart();
        this.erazeNode(row, col);
        grid[row][col].isStart = true;

        this.setState({
            grid,
            startRow: row,
            startCol: col,
        })
    }

    moveEnd = (row, col) => {
        const {grid} = this.state;

        this.erazeEnd();
        this.erazeNode(row, col);
        grid[row][col].isEnd = true;

        this.setState({
            grid,
            endRow: row,
            endCol: col,
        })
    }

    makeWall = (row, col) => {
        const {grid} = this.state;

        this.erazeNode(row, col);
        grid[row][col].isWall = true;

        this.setState({
            grid,
        })
    }

    erazeWall = (row, col) => {
        this.erazeNode(row, col, false, true);
    }

    handleOnMouseUp = () => {
        this.setState({
            drawingWall: false,
            movingStart: false,
            movingEnd: false,
            erazingWall: false
        })
    }

    handleOnMouseDown = (row, col) => {
        const {grid, drawingWall, erazingWall, movingStart, movingEnd} = this.state;

        if (grid[row][col].isStart) {
            if (!drawingWall && !erazingWall && !movingEnd) {
                this.setState({
                    movingStart: true,
                })
            }  
        }

        else if (grid[row][col].isEnd) {
            if (!drawingWall && !erazingWall && !movingStart) {
                this.setState({
                    movingEnd: true,
                })
            }
        }

        else if (grid[row][col].isWall) {
            if (!drawingWall && !movingStart && !movingEnd) {
                this.erazeWall(row, col);
                this.setState({
                    erazingWall: true
                })
            }
        }

        else {
            if (!erazingWall && !movingStart && !movingEnd) {
                this.makeWall(row, col)
                this.setState({
                    drawingWall: true
                })
            }
        }

        this.resetSearch();
    }

    handleOnMouseEnter = (row, col) => {

        const {grid, drawingWall, erazingWall, movingStart, movingEnd} = this.state; 

        if (grid[row][col].isStart || grid[row][col].isEnd) {
            return;
        }

        if (grid[row][col].isWall) {
            if (erazingWall) this.erazeWall(row, col);
            return;
        }

        if (movingStart) this.moveStart(row, col);
        if (movingEnd) this.moveEnd(row, col);
        if (drawingWall) this.makeWall(row, col);

    }

    render() {
        const {grid} = this.state;

        return (
            <div 
                onContextMenu={e => e.preventDefault()}
                onMouseUp={this.handleOnMouseUp}
                className="board"
            >
                <Help
                    closeHelp={this.closeHelp}
                    show={this.state.showHelp}
                ></Help>

                <Panel
                    showHelp={this.showHelp}
                    startSearching={this.startSearching}
                    reset={this.reset}
                ></Panel>
                
                <div className="node-group">
                    {
                        grid.map((row, rowIdx) => (
                            <div key={rowIdx} className="node-row">{
                            row.map((node, nodeIdx) => (
                                <Node
                                    {...node}
                                    key={nodeIdx}
                                    movingStart={this.state.movingStart}
                                    movingEnd={this.state.movingEnd}
                                    handleOnMouseDown={this.handleOnMouseDown}
                                    handleOnMouseEnter={this.handleOnMouseEnter}
                                ></Node>
                            ))}
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Board;
