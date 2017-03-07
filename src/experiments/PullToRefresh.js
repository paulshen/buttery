/* @flow */
import React from 'react';
import Radium from 'radium';

import { DragConstraint, Layer, SpringAnimator } from '../proto';

class App extends React.Component {
  state = {
    constraintY: DragConstraint({ min: 587 - 2000, max: 0, type: 'bounce' }),
    y: 0,
    scrollY: 0,
    isRefreshing: false,
  };

  _onTouchEnd = (p: Point) => {
    if (!this.state.isRefreshing && p.y > 80) {
      this.setState({
        constraintY: DragConstraint({ min: 587 - 2000, max: 80, type: 'bounce' }),
        scrollY: 80,
        isRefreshing: true,
      });
    }
  };

  _onAnimationEnd = () => {
    if (this.state.isRefreshing) {
      this.setState({
        constraintY: DragConstraint({ min: 587 - 2000, max: 0, type: 'bounce' }),
        scrollY: 0,
        isRefreshing: false,
      });
    }
  };

  _onDragEnd = (p: Point) => {
    if (!this.state.isRefreshing) {
      this.setState({ scrollY: p.y });
    }
  };

  _onMove = (p: Point) => {
    this.setState({ y: p.y });
  };

  render() {
    return (
      <div style={Styles.Root}>
        <div style={Styles.Chrome}>
          <Layer properties={{ x: 0, y: 0, width: 375, height: 80, backgroundColor: '#ADD8C7' }} />
          <Layer properties={{ x: 0, y: 80, width: 375, height: 587, backgroundColor: '#FCFBE3' }} style={{ overflow: 'hidden' }}>
            <Layer
              properties={{ x: 0, y: this.state.scrollY, width: 375, height: 2000 }}
              draggable={true}
              draggableProperties={{
                constraintX: DragConstraint({ min: 0, max: 0 }),
                constraintY: this.state.constraintY,
                momentum: true,
                onTouchEnd: this._onTouchEnd,
              }}
              onMove={this._onMove}
              onDragEnd={this._onDragEnd}
              animator={new SpringAnimator(0.0001, 0.02)}
              onAnimationEnd={this._onAnimationEnd}
            >
              <Layer
                properties={{ x: 167, y: -50, width: 40, height: 40, backgroundColor: `rgba(255,153,153,${Math.min(Math.max(this.state.y / 80, 0), 1)})` }}
              />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id massa libero. Etiam efficitur diam a purus consequat venenatis. Ut sit amet libero arcu. Vivamus orci metus, ornare in volutpat ut, varius eu massa. Sed ut sagittis lorem, sed viverra velit. Sed id viverra neque. Maecenas nec neque id turpis laoreet mollis tincidunt eget ante. Maecenas dapibus neque egestas euismod finibus. Nunc et finibus nunc. Donec nec libero justo.</p>
              <p>Pellentesque iaculis rutrum leo, sit amet placerat neque consectetur eget. Sed sapien enim, pellentesque nec dui id, tristique fringilla neque. Donec hendrerit convallis purus vitae dictum. Praesent at felis nec mauris vulputate elementum ut ac metus. Curabitur porttitor fermentum rutrum. Etiam bibendum diam at sollicitudin pharetra. In fringilla finibus ligula nec gravida. Aliquam quis mauris facilisis, sagittis quam eu, bibendum orci. In iaculis non nisi in facilisis. Donec ligula urna, blandit eu placerat nec, malesuada sed eros. Pellentesque quis metus sollicitudin, maximus augue eu, tincidunt felis. Fusce elementum augue ante, vel luctus nisi cursus ut.</p>
              <p>Nam quis sollicitudin arcu. Nunc a varius quam. Nunc velit arcu, rutrum sed volutpat eu, sodales id nulla. Morbi imperdiet ut orci nec ultricies. Fusce mattis nibh elementum, fermentum diam sit amet, bibendum turpis. Duis vulputate, tellus eu maximus vulputate, enim augue varius ex, sed fermentum diam arcu a turpis. In lacinia venenatis magna id vulputate. Nullam luctus sit amet ante vel lobortis. In justo dui, accumsan et mi sit amet, suscipit eleifend ligula. Ut eu nisl tempor, maximus eros id, vestibulum est. Integer ligula justo, suscipit quis dolor non, sagittis cursus nisl. Phasellus mattis, nulla pellentesque egestas elementum, nulla est varius orci, eu auctor urna purus hendrerit erat. Integer consequat ornare est, et consequat ligula bibendum id.</p>
              <p>Curabitur quis ultricies quam, eget gravida purus. Pellentesque nisi orci, laoreet sed sapien quis, eleifend consequat risus. Duis sit amet enim erat. Ut finibus, nisi et suscipit vehicula, ipsum lectus imperdiet diam, in semper augue odio ut sapien. Nulla iaculis, dui a aliquet vestibulum, nisi elit venenatis lorem, quis mollis neque nisl eu lectus. Phasellus ante sem, consectetur laoreet varius quis, malesuada quis libero. Sed suscipit, orci eu dapibus faucibus, purus tortor eleifend dolor, sed posuere odio magna eu augue.</p>
              <p>Vestibulum bibendum lorem diam, vel commodo dui maximus condimentum. Aliquam scelerisque mi a porttitor placerat. Vestibulum et erat quam. Maecenas scelerisque est consequat, sagittis elit et, egestas nisi. Nam suscipit erat risus, at iaculis dolor ultrices sit amet. Vivamus eu tempus dui, sit amet pellentesque mauris. Pellentesque est diam, aliquam vel nibh a, scelerisque ultrices felis. Ut laoreet quam ut lacus scelerisque, vel venenatis dui luctus.</p>
            </Layer>
          </Layer>
        </div>
      </div>
    );
  }
}
export default Radium(App);

const Styles = {
  Root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  Chrome: {
    border: '1px solid #cccccc',
    height: '667px',
    width: '375px',
  },
};
