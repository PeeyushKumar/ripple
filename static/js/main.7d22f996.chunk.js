(this.webpackJsonpripple=this.webpackJsonpripple||[]).push([[0],{20:function(e,t,s){},22:function(e,t,s){},27:function(e,t,s){"use strict";s.r(t);var n=s(0),a=s(7),i=s.n(a),l=(s(20),s(21),s(22),s(15)),r=s(8),c=s(9),o=s(11),d=s(10),p=s(12),h=s(13),u=s(1),j=function(e){return Object(u.jsxs)(h.a,{show:e.show,onHide:e.closeHelp,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(u.jsx)(h.a.Header,{children:Object(u.jsx)(h.a.Title,{id:"contained-modal-title-vcenter",children:Object(u.jsx)("h2",{children:"Ripple"})})}),Object(u.jsxs)(h.a.Body,{children:[Object(u.jsx)("h4",{children:"Move Tiles"}),Object(u.jsx)("p",{children:"Click and Drag Start or End Tile to move them to a new location."}),Object(u.jsx)("h4",{children:"Add Walls"}),Object(u.jsx)("p",{children:"Drag across blank spaces to create a wall."}),Object(u.jsx)("h4",{children:"Enjoy"}),Object(u.jsx)("p",{children:"Hit go to start the simulation."})]}),Object(u.jsx)(h.a.Footer,{children:Object(u.jsx)(p.a,{onClick:e.closeHelp,children:"Close"})})]})},b=function(e){Object(o.a)(s,e);var t=Object(d.a)(s);function s(){return Object(r.a)(this,s),t.apply(this,arguments)}return Object(c.a)(s,[{key:"render",value:function(){return Object(u.jsxs)("div",{className:"panel",children:[Object(u.jsx)(p.a,{className:"btn btn-primary btn-lg",onClick:this.props.showHelp,children:"Help"}),Object(u.jsx)(p.a,{className:"btn btn-success btn-lg",onClick:this.props.startSearching,children:"Go"}),Object(u.jsx)(p.a,{className:"btn btn-secondary btn-lg",onClick:this.props.reset,children:"Reset"})]})}}]),s}(n.Component),O=function(e){Object(o.a)(s,e);var t=Object(d.a)(s);function s(){return Object(r.a)(this,s),t.apply(this,arguments)}return Object(c.a)(s,[{key:"render",value:function(){var e=this,t=this.props,s=t.id,n=t.type,a=t.picked,i="tile";switch(n){case"start":i+=" tile-start";break;case"end":i+=" tile-end";break;case"empty":i+=" tile-empty";break;case"wall":i+=" tile-wall";break;case"visited":i+=" tile-visited"}return a&&(i+=" tile-picked"),Object(u.jsx)("div",{onMouseUp:function(){return e.props.handleNodeDrop(s)},onMouseDown:function(){return e.props.handleNodePick(s)},onMouseEnter:function(){return e.props.handleMouseEnter(s)},className:i})}}]),s}(n.Component),f=function(e){Object(o.a)(s,e);var t=Object(d.a)(s);function s(e){var n;Object(r.a)(this,s),(n=t.call(this,e)).reset=function(){for(var e=n.state,t=e.startNodeId,s=e.endNodeId,a=e.noOfTiles,i=[],l=0;l<a;l++){var r={id:l,type:"empty",picked:!1};r.id===t&&(r.type="start"),r.id===s&&(r.type="end"),i.push(r)}n.setState({tiles:i,found:!1,pickedId:null,drawingWall:!1})},n.showHelp=function(){n.setState({showHelp:!0})},n.closeHelp=function(){n.setState({showHelp:!1})},n.startSearching=function(){var e=n.state,t=e.tiles,s=e.startNodeId;n.explore(t,s,[])},n.explore=function(e,t,s){var a=n.props.cols,i=n.props.noOfTiles;if(t===n.state.endNodeId&&n.setState({found:!0}),!(n.state.found||s.includes(t)||t<0||t>=i)){s.push(t);var l=e[t].type;"wall"!==l&&("start"!==l&&(e[t].type="visited"),n.setState({tiles:e}),setTimeout((function(){(t+1)%a!==0&&n.explore(e,t+1,s),t%a!==0&&n.explore(e,t-1,s),n.explore(e,t-a,s),n.explore(e,t+a,s)}),1))}},n.handleNodeDrop=function(e){n.setState({drawingWall:!1});var t=n.state.pickedId;if(n.setState({pickedId:null}),null!=t){var s=n.state.tiles;s[t].picked=!1;var a=s[e].type;if(!["start","end"].includes(a)){var i=n.state.startNodeId,l=n.state.endNodeId,r=s[t].type;s[e].type=r,s[t].type="empty",s[t].picked=!1,"start"===r?i=e:"end"===r&&(l=e),n.setState({tiles:s,startNodeId:i,endNodeId:l})}}},n.handleNodePick=function(e){var t=n.state.tiles,s=t[e].type;"empty"===s||"wall"===s?(t[e].type="wall",n.setState({tiles:t,drawingWall:!0})):["start","end"].includes(s)&&(t[e].picked=!0,n.setState({tiles:t,pickedId:e}))},n.handleMouseEnter=function(e){if(!1!==n.state.drawingWall){var t=n.state.tiles,s=t[e].type;["start","end"].includes(s)||(t[e].type="wall",n.setState({tiles:t}))}};for(var a=n.props.noOfTiles,i=[],l=0;l<a;l++){var c={id:l,type:"empty",picked:!1};261===c.id&&(c.type="start"),278===c.id&&(c.type="end"),i.push(c)}return n.state={noOfTiles:a,tiles:i,showHelp:!0,found:!1,startNodeId:261,endNodeId:278,pickedId:null,drawingWall:!1},n}return Object(c.a)(s,[{key:"render",value:function(){var e=this;return Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{closeHelp:this.closeHelp,show:this.state.showHelp}),Object(u.jsx)(b,{showHelp:this.showHelp,startSearching:this.startSearching,reset:this.reset}),Object(u.jsx)("div",{className:"tile-group",children:this.state.tiles.map((function(t){return Object(n.createElement)(O,Object(l.a)(Object(l.a)({},t),{},{key:t.id,handleNodeDrop:e.handleNodeDrop,handleNodePick:e.handleNodePick,handleMouseEnter:e.handleMouseEnter}))}))})]})}}]),s}(n.Component);var v=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(f,{rows:15,cols:36,noOfTiles:540})})};i.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.7d22f996.chunk.js.map