/* @flow */
import React from 'react';

export default function getChildrenDimensions(children: any): ?FrameType {
  let bound;
  React.Children.forEach(children, (child) => {
    if (!bound) {
      bound = {
        x: child.props.properties.x,
        y: child.props.properties.y,
        x2: child.props.properties.x + child.props.properties.width,
        y2: child.props.properties.y + child.props.properties.height,
      };
    } else {
      bound = {
        x: Math.min(bound.x, child.props.properties.x),
        y: Math.min(bound.y, child.props.properties.y),
        x2: Math.max(bound.x2, child.props.properties.x + child.props.properties.width),
        y2: Math.max(bound.y2, child.props.properties.y + child.props.properties.height),
      };
    }
  });
  return bound && {
    x: bound.x,
    y: bound.y,
    width: bound.x2 - bound.x,
    height: bound.y2 - bound.y,
  };
}
