export default `class Example extends React.Component {
  state = {
    x: 375 / 2 - 40,
    y: 667 / 2 - 40,
  };

  // onDragEnd is called at the end of the drag event. This is when position
  // control is returned to the component.
  _onDragEnd = ({ x, y }) => {
    this.setState({ x, y });
  };

  render() {
    // While a layer is dragging, Wasabi ignores the given x, y properties.
    return (
      <Layer
        properties={{
          x: this.state.x,
          y: this.state.y,
          width: 80,
          height: 80,
          backgroundColor: '#1693A5',
        }}
        draggable={true}
        onDragEnd={this._onDragEnd}
      />
    );
  }
}`;
