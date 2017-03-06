export default `const MyProperties = [
  { x: 60, y: 200, width: 120, height: 60, backgroundColor: '#1693A5', opacity: 1 },
  { x: 100, y: 200, width: 120, height: 60, backgroundColor: '#1693A5', opacity: 0.8 },
  { x: 140, y: 200, width: 120, height: 60, backgroundColor: '#1693A5', opacity: 0.6 },
];

class Example extends React.Component {
  state =  {
    index: 0,
  };

  _onClick = () => {
    this.setState({
      index: (this.state.index + 1) % MyProperties.length,
    });
  };

  render() {
    return (
      <div>
        <Layer
          properties={MyProperties[this.state.index]}
          onClick={this._onClick}
        />
      </div>
    );
  }
}`;
