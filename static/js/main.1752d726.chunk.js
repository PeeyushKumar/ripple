(this.webpackJsonpripple=this.webpackJsonpripple||[]).push([[0],{20:function(e,t,n){},22:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(7),r=n.n(o),i=(n(20),n(21),n(22),n(15)),s=n(8),l=n(9),c=n(11),d=n(10),u=n(12),h=n(13),v=n(1),g=function(e){return Object(v.jsxs)(h.a,{show:e.show,onHide:e.closeHelp,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(v.jsx)(h.a.Header,{children:Object(v.jsx)(h.a.Title,{id:"contained-modal-title-vcenter",children:Object(v.jsx)("h2",{children:"Ripple"})})}),Object(v.jsxs)(h.a.Body,{children:[Object(v.jsx)("h4",{children:"Move Nodes"}),Object(v.jsx)("p",{children:"Click and Drag Start or End Node to move them to a new location."}),Object(v.jsx)("h4",{children:"Add Walls"}),Object(v.jsx)("p",{children:"Drag across blank spaces to create a wall."}),Object(v.jsx)("h4",{children:"Remove Walls"}),Object(v.jsx)("p",{children:"Drag on walls to remove them."}),Object(v.jsx)("h4",{children:"Enjoy"}),Object(v.jsx)("p",{children:"Hit go to start the simulation."})]}),Object(v.jsx)(h.a.Footer,{children:Object(v.jsx)(u.a,{onClick:e.closeHelp,children:"Close"})})]})},p=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(v.jsxs)("div",{className:"panel",children:[Object(v.jsx)(u.a,{className:"btn btn-primary",onClick:this.props.showHelp,children:"Help"}),Object(v.jsx)(u.a,{className:"btn btn-success btn-xs-block",onClick:this.props.startSearching,children:"Go"}),Object(v.jsx)(u.a,{className:"btn btn-secondary",onClick:this.props.reset,children:"Reset"})]})}}]),n}(a.Component),f=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.row,a=t.col,o=t.isStart,r=t.isEnd,i=t.isWall,s=t.isVisited,l=t.isPath,c=t.movingStart,d=t.movingEnd,u="node";return o&&(u+=" node-start",c?u+=" node-moving":console.log("")),r&&(u+=" node-end",d?u+=" node-moving":console.log("")),i&&(u+=" node-wall"),s&&(u+=" node-visited"),l&&(u+=" node-path"),Object(v.jsx)("div",{className:"node-container",onDragStart:function(e){e.preventDefault()},onMouseDown:function(){return e.props.handleOnMouseDown(n,a)},onMouseEnter:function(){return e.props.handleOnMouseEnter(n,a)},children:Object(v.jsx)("div",{className:u})})}}]),n}(a.Component),j=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).componentDidMount=function(){a.createGrid(),window.addEventListener("resize",a.createGrid)},a.createGrid=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=.9*window.innerWidth,i=.8*window.innerHeight,s=r/i,l=Math.floor(i/37),c=Math.floor(l*s);e&&t&&n&&o||(t=Math.floor(c/2-c/4),e=Math.floor(l/2)-1,o=Math.floor(c/2+c/4),n=Math.floor(l/2)-1);for(var d=[],u=0;u<l;u++){for(var h=[],v=0;v<c;v++){var g={row:u,col:v,isStart:u===e&&v===t,isEnd:u===n&&v===o,isWall:!1,isVisited:!1,isPath:!1,parentRow:null,parentCol:null};h.push(g)}d.push(h)}a.setState({grid:d,noOfRows:l,noOfCols:c,startRow:e,startCol:t,endRow:n,endCol:o})},a.reset=function(){var e=a.state,t=e.startRow,n=e.startCol,o=e.endRow,r=e.endCol;a.createGrid(t,n,o,r)},a.resetSearch=function(){var e=a.state,t=e.noOfRows,n=e.noOfCols;a.setState({searching:!1,tracking:!1});for(var o=0;o<t;o++)for(var r=0;r<n;r++)a.erazeNode(o,r,!1,!1)},a.resetVisited=function(){for(var e=a.state,t=e.grid,n=e.noOfRows,o=e.noOfCols,r=0;r<n;r++)for(var i=0;i<o;i++)t[r][i].isVisited=!1;a.setState({grid:t})},a.showHelp=function(){a.setState({showHelp:!0})},a.closeHelp=function(){a.setState({showHelp:!1})},a.isValidIndex=function(e,t){var n=a.state,o=n.noOfRows,r=n.noOfCols;return e>=0&&e<o&&t>=0&&t<r},a.startSearching=function(){var e=a.state,t=e.grid,n=e.startRow,o=e.startCol;a.setState({searching:!0}),setTimeout((function(){a.explore(t,n,o)}),0)},a.explore=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;if(a.isValidIndex(t,n)){var i=e[t][n];if(i.isEnd){if(i.parentRow=o,i.parentCol=r,e[t][n]=i,a.setState({grid:e,searching:!1}),a.state.tracking)return;a.track(i.row,i.col),a.setState({tracking:!0})}!a.state.searching||i.isVisited||i.isWall||(i.isVisited=!0,i.parentRow=o,i.parentCol=r,e[t][n]=i,a.setState({grid:e}),setTimeout((function(){a.explore(e,t,n+1,t,n)}),10),setTimeout((function(){a.explore(e,t+1,n,t,n)}),10),setTimeout((function(){a.explore(e,t,n-1,t,n)}),10),setTimeout((function(){a.explore(e,t-1,n,t,n)}),10))}},a.track=function(e,t){for(var n=a.state.grid,o=[];!n[e][t].isStart;){var r=n[e][t].parentRow,i=n[e][t].parentCol;e=r,t=i,o.unshift(n[e][t])}!function e(t,n,o){if(o>=n.length)a.setState({tracking:!1});else{var r=n[o],i=r.row,s=r.col;t[i][s].isPath=!0,a.setState({grid:t}),setTimeout((function(){e(t,n,o+1)}),15)}}(n,o,1)},a.erazeNode=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=a.state.grid;n&&(r[e][t].isStart=!1,r[e][t].isEnd=!1),o&&(r[e][t].isWall=!1),r[e][t].isVisited=!1,r[e][t].isPath=!1,r[e][t].parentRow=null,r[e][t].parentCol=null,a.setState({grid:r})},a.erazeStart=function(){var e=a.state,t=e.startRow,n=e.startCol;a.erazeNode(t,n),a.setState({startRow:null,startCol:null})},a.erazeEnd=function(){var e=a.state,t=e.endRow,n=e.endCol;a.erazeNode(t,n),a.setState({endRow:null,endCol:null})},a.moveStart=function(e,t){var n=a.state.grid;a.erazeStart(),a.erazeNode(e,t),n[e][t].isStart=!0,a.setState({grid:n,startRow:e,startCol:t})},a.moveEnd=function(e,t){var n=a.state.grid;a.erazeEnd(),a.erazeNode(e,t),n[e][t].isEnd=!0,a.setState({grid:n,endRow:e,endCol:t})},a.makeWall=function(e,t){var n=a.state.grid;a.erazeNode(e,t),n[e][t].isWall=!0,a.setState({grid:n})},a.erazeWall=function(e,t){a.erazeNode(e,t,!1,!0)},a.handleOnMouseUp=function(){a.setState({drawingWall:!1,movingStart:!1,movingEnd:!1,erazingWall:!1})},a.handleOnMouseDown=function(e,t){var n=a.state,o=n.grid,r=n.drawingWall,i=n.erazingWall,s=n.movingStart,l=n.movingEnd;o[e][t].isStart?r||i||l||a.setState({movingStart:!0}):o[e][t].isEnd?r||i||s||a.setState({movingEnd:!0}):o[e][t].isWall?r||s||l||(a.erazeWall(e,t),a.setState({erazingWall:!0})):i||s||l||(a.makeWall(e,t),a.setState({drawingWall:!0})),a.resetSearch()},a.handleOnMouseEnter=function(e,t){var n=a.state,o=n.grid,r=n.drawingWall,i=n.erazingWall,s=n.movingStart,l=n.movingEnd;o[e][t].isStart||o[e][t].isEnd||(o[e][t].isWall?i&&a.erazeWall(e,t):(s&&a.moveStart(e,t),l&&a.moveEnd(e,t),r&&a.makeWall(e,t)))},a.state={grid:[[]],noOfRows:null,noOfCols:null,startRow:null,startCol:null,endRow:null,endCol:null,showHelp:!1,searching:!1,tracking:!1,drawingWall:!1,erazingWall:!1,movingStart:!1,movingEnd:!1},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this,t=this.state.grid;return Object(v.jsxs)("div",{onContextMenu:function(e){return e.preventDefault()},onMouseUp:this.handleOnMouseUp,className:"board",children:[Object(v.jsx)(g,{closeHelp:this.closeHelp,show:this.state.showHelp}),Object(v.jsx)(p,{showHelp:this.showHelp,startSearching:this.startSearching,reset:this.reset}),Object(v.jsx)("div",{className:"node-group",children:t.map((function(t,n){return Object(v.jsx)("div",{className:"node-row",children:t.map((function(t,n){return Object(a.createElement)(f,Object(i.a)(Object(i.a)({},t),{},{key:n,movingStart:e.state.movingStart,movingEnd:e.state.movingEnd,handleOnMouseDown:e.handleOnMouseDown,handleOnMouseEnter:e.handleOnMouseEnter}))}))},n)}))})]})}}]),n}(a.Component);var O=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(j,{onDragStart:function(e){e.preventDefault()}})})};r.a.render(Object(v.jsx)(O,{}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.1752d726.chunk.js.map