import React from 'react';
import { Layer, Frame, Animated, Drag, spring } from 'buttery';

export default class Example extends React.Component {
  state = {
    menuX: -375,
  };

  _showMenu = () => {
    this.setState({
      menuX: 0,
    });
  };

  _onDragEnd = ({ x }) => {
    this.setState({
      menuX: x < -60 ? -375 : 0,
    });
  };

  render() {
    let { menuX } = this.state;
    return (
      <Layer frame={Frame(0, 0, 375, 667)} style={{ overflow: 'hidden' }}>
        <Layer
          frame={Frame(40, 40, 40, 40)}
          onClick={this._showMenu}
          style={{ backgroundColor: '#49c6ae' }}
        />
        <Layer
          frame={Frame(
            Drag(Animated(menuX, spring(170, 26)), { min: -375, max: 0 }),
            0,
            375,
            667
          )}
          onDragEnd={this._onDragEnd}
        >
          <Layer
            frame={Frame(0, 0, 200, 667)}
            style={{ backgroundColor: '#49c6ae' }}
          />
        </Layer>
      </Layer>
    );
  }
}
