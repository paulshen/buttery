export default `class Example extends React.Component {
  state = {
    x: 375 / 2 - 40,
  };

  _onDragEnd = ({ x }) => {
    this.setState({ x });
  };

  render() {
    return (
      <Layer
        properties={{
          x: this.state.x,
          y: 293,
          width: 80,
          height: 80,
          backgroundColor: '#1693A5',
        }}
        draggable={true}
        draggableProperties={{
          constraintX: DragConstraint({ min: 0, max: 375 - 80 }),
          constraintY: DragConstraint({ min: 293, max: 293 }),
        }}
        onDragEnd={this._onDragEnd}
      />
    );
  }
}`;
