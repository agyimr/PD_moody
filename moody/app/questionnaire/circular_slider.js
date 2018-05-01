import React, { Component } from 'react'
import { PanResponder, View } from 'react-native'
import Svg, { Line, Circle, G, Text } from 'react-native-svg'
import { PRIMARY, GREY, BLACK } from '../common/colors';

export class CircularSlider extends Component {

  constructor(props) {
    super(props)
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.cartesianToPolar = this.cartesianToPolar.bind(this)
    this.polarToCartesian = this.polarToCartesian.bind(this)
    const { outerSize, innerSize } = props
    this.state = {
      cx: outerSize / 2,
      cy: outerSize / 2,
      r: (innerSize / 2) * 0.85
    }
  }

  componentWillMount = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove
    })
  }

  polarToCartesian(angle) {
    const { cx, cy, r } = this.state;
    const a = (angle - 270) * Math.PI / 180.0;
    const x = cx + (r * Math.cos(a));
    const y = cy + (r * Math.sin(a));
    return { x, y };
  }

  polarToCartesianText(angle) {
    const { cx, cy } = this.state;
    const r = 160;
    const a = (angle - 270) * Math.PI / 180.0;
    const x = cx + (r * Math.cos(a));
    const y = cy + (r * Math.sin(a));
    return { x, y };
  }

  getColor(value, position) {
    min = position - 22.5;
    max = position + 22.5;
    if (value > min && value <= max){
      return PRIMARY
    }
    return BLACK
  }

  cartesianToPolar(x, y) {
    const { cx, cy } = this.state;
    return Math.round((Math.atan((y - cy) / (x - cx))) / (Math.PI / 180) + ((x > cx) ? 270 : 90));
  }

  handlePanResponderMove({ nativeEvent: { locationX, locationY } }) {
    this.props.onValueChange(this.cartesianToPolar(locationX, locationY))
  }

  render() {
    const { outerSize, value, onValueChange } = this.props;
    const { cx, cy, r } = this.state;
    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(value);
    return (
      <Svg onLayout={this.onLayout} width={outerSize} height={outerSize}>
        {/* background + texts */}
        <Circle cx={outerSize/2} cy={outerSize/2} r={outerSize/2} fill={GREY} {...this._panResponder.panHandlers} />
        <Text x={this.polarToCartesianText(22.5).x} y={this.polarToCartesianText(22.5).y} fill={this.getColor(value, 22.5)} textAnchor="middle">sad</Text>
        <Text x={this.polarToCartesianText(67.5).x} y={this.polarToCartesianText(67.5).y} fill={this.getColor(value, 67.5)} textAnchor="middle">bored</Text>
        <Text x={this.polarToCartesianText(112.5).x} y={this.polarToCartesianText(112.5).y} fill={this.getColor(value, 112.5)} textAnchor="middle">tense</Text>
        <Text x={this.polarToCartesianText(157.5).x} y={this.polarToCartesianText(157.5).y} fill={this.getColor(value, 157.5)} textAnchor="middle">irritated</Text>
        <Text x={this.polarToCartesianText(202.5).x} y={this.polarToCartesianText(202.5).y} fill={this.getColor(value, 202.5)} textAnchor="middle">excited</Text>
        <Text x={this.polarToCartesianText(247.5).x} y={this.polarToCartesianText(247.5).y} fill={this.getColor(value, 247.5)} textAnchor="middle">cheerful</Text>
        <Text x={this.polarToCartesianText(292.5).x} y={this.polarToCartesianText(292.5).y} fill={this.getColor(value, 292.5)} textAnchor="middle">relaxed</Text>
        <Text x={this.polarToCartesianText(337.5).x} y={this.polarToCartesianText(337.5).y} fill={this.getColor(value, 337.5)} textAnchor="middle">calm</Text>
        {/* Selector */}
        <Circle cx={cx} cy={cy} r={5} fill={PRIMARY} />
        <Line x1={cx} y1={cy} x2={endCoord.x} y2={endCoord.y} stroke={PRIMARY} strokeWidth="4" />
        <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
          <Circle cx={7.5} cy={7.5} r={15} fill={PRIMARY} />
          <Text key={value + ''} x={7.5} y={1} fontSize={10} fill={BLACK} textAnchor="middle">{value + ''}</Text>
        </G>
      </Svg>
    )
  }
}