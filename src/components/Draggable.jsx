import React from 'react';
import { bind } from 'lodash';

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pressed: false,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0
    }

    this.handleMouseDown = bind(this.handleMouseDown, this);
    this.handleMouseUp = bind(this.handleMouseUp, this);
    this.handleMouseMove = bind(this.handleMouseMove, this);
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.setState({
      pressed: true,
      startX: e.pageX,
      startY: e.pageY
    });
  }

  handleMouseUp(e) {
    e.preventDefault();
    this.setState({ pressed: false });
  }

  handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.pressed) {
      let offsetX, offsetY;
      const { startX, startY } = this.state;
      offsetX = e.pageX - startX;
      offsetY = e.pageY - startY;
      //console.log(`startX: ${startX}  offsetX: ${offsetX}`);
      this.setState({
        offsetX: offsetX,
        offsetY: offsetY
      });
    }
  }

  render() {
    return (
      <div
          style={{
            border: '1px solid red',
            position: 'relative',
            left: `${this.state.offsetX}`,
            top: `${this.state.offsetY}`
          }}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove} >
        {this.props.children}
       </div>
    )
  }
}
