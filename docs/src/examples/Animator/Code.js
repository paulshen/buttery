export default `const MyProperties = [
  { x: 375 / 2 - 40, y: 140, width: 80, height: 80, backgroundColor: '#1693A5', opacity: 1 },
  { x: 375 / 2 - 50, y: 200, width: 100, height: 100, backgroundColor: '#1693A5', opacity: 0.8 },
  { x: 375 / 2 - 20, y: 320, width: 40, height: 40, backgroundColor: '#1693A5', opacity: 0.6 },
];

class Example extends React.Component {
  state = {
    index: 0,
    animator: null,
  };

  _onClick = (animatorType) => {
    this.setState({
      index: (this.state.index + 1) % MyProperties.length,
      animator: animatorType === 'spring' ? SpringAnimator() : new TimedAnimator({ duration: 200 }),
    });
  };

  render() {
    // We simply add an animator instance to the Layer. Whenever Layer
    // properties change, they are animated. Note that all given properties are
    // animated.
    return (
      <div>
        <button onClick={() => this._onClick('timed')}>Toggle with TimedAnimator</button>
        <button onClick={() => this._onClick('spring')}>Toggle with SpringAnimator</button>
        <Layer
          properties={MyProperties[this.state.index]}
          animator={this.state.animator}
        />
      </div>
    );
  }
}`;
