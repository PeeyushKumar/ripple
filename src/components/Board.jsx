import React, {Component} from 'react';
import Help from './Help'
import Panel from './Panel';
import Node from './Node';


class Board extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            grid: null,
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
            endCol,
            searching: false,
            tracking: false
        })
    } 

    getGrid = () => this.state.grid.map(row => row.map(node => ({...node})));

    reset = () => {
        const {startRow, startCol, endRow, endCol} = this.state;
        this.createGrid(startRow, startCol, endRow, endCol);
    }

    clearSearch = (grid) => grid.forEach(row => row.forEach(node => this.clearNode(grid, node.row, node.col)));

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

        const makePath = (grid, path, i) => {
            if (i >= path.length) {
                this.setState({
                    tracking: false
                })
                return;
            }

            if (!this.state.tracking) return;

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

        this.setState({
            tracking: true
        })

        makePath(grid, path, 1);
    }

    erazeNode = (grid, row, col) => {
        this.clearNode(grid, row, col)
        grid[row][col].isStart = false;
        grid[row][col].isEnd = false;
        grid[row][col].isWall = false;   
    }

    clearNode = (grid, row, col) => {
        grid[row][col].isVisited = false;        
        grid[row][col].isPath = false;
        grid[row][col].parentRow = null;
        grid[row][col].parentCol = null;
    }

    moveStart = (grid, row, col) => {
        const {startRow, startCol} = this.state;

        this.erazeNode(grid, startRow, startCol);
        this.erazeNode(grid, row, col);
        grid[row][col].isStart = true;
    }

    moveEnd = (grid, row, col) => {
        const {endRow, endCol} = this.state;

        this.erazeNode(grid, endRow, endCol);
        this.erazeNode(grid, row, col);
        grid[row][col].isEnd = true;
    }

    makeWall = (grid, row, col) => {
        this.erazeNode(grid, row, col);
        grid[row][col].isWall = true;
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
        let {drawingWall, erazingWall, movingStart, movingEnd} = this.state;
        const grid = this.getGrid();

        if (grid[row][col].isStart) {
            if (!drawingWall && !erazingWall && !movingEnd) {
                movingStart = true;
            }  
        }

        else if (grid[row][col].isEnd) {
            if (!drawingWall && !erazingWall && !movingStart) {
                movingEnd = true;
            }
        }

        else if (grid[row][col].isWall) {
            if (!drawingWall && !movingStart && !movingEnd) {
                this.erazeNode(grid, row, col);
                erazingWall = true;
            }
        }

        else {
            if (!erazingWall && !movingStart && !movingEnd) {
                this.makeWall(grid, row, col)
                drawingWall = true;
            }
        }

        this.clearSearch(grid)

        this.setState({
            grid,
            movingStart,
            movingEnd,
            drawingWall,
            erazingWall,
            searching: false,
            tracking: false
        })
    }

    handleOnMouseEnter = (row, col) => {

        let {startRow, startCol, endRow, endCol, movingStart, movingEnd, drawingWall, erazingWall} = this.state; 
        const grid = this.getGrid();
        
        if (grid[row][col].isStart || grid[row][col].isEnd) return;

        else if (grid[row][col].isWall) {
            if (erazingWall) this.erazeNode(grid, row, col);
        }

        else if (movingStart) {
            this.moveStart(grid, row, col);
            startRow = row;
            startCol = col;
        }

        else if (movingEnd) {
            this.moveEnd(grid, row, col);
            endRow = row;
            endCol = col;
        }

        else if (drawingWall) this.makeWall(grid, row, col);

        this.setState({
            grid,
            startRow,
            startCol,
            endRow,
            endCol
        });
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

                {
                    this.state.grid === null ?
                    'Loading...' :
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
                }

            </div>
        );
    }
}

export default Board;
