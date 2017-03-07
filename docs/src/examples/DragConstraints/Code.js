export default `class Example extends React.Component {
  state = {
    x: 375 / 2 - 40,
    y: 667 / 2 - 40,
  };

  _onDragEnd = ({ x, y }) => {
    this.setState({ x, y });
  };

  render() {
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
        draggableProperties={{
          constraintX: new DragConstraint({ min: 0, max: 375 - 80 }),
          constraintY: new DragConstraint({ min: this.state.y, max: this.state.y }),
        }}
        onDragEnd={this._onDragEnd}
      />
    );
  }
}`;
