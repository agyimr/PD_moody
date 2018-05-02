import React, { Component } from 'react'
import { PanResponder, View, Animated } from 'react-native'
import Svg, { Line, Circle, G, Text } from 'react-native-svg'
import { PRIMARY, GREY, BLACK } from '../common/colors';

export class CircularSlider extends Component {

  constructor(props) {
    super(props)
    this.cartesianToPolar = this.cartesianToPolar.bind(this)
    this.polarToCartesian = this.polarToCartesian.bind(this)
    this.follow = true;
    const { outerSize, innerSize } = props
    this.state = {
      pan: new Animated.ValueXY(),
      cx: outerSize / 2,
      cy: outerSize / 2,
      r: (innerSize / 2) * 0.85
    }
  }

  componentWillMount = () => {

    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 };
    this._panListener = this.state.pan.addListener(value => this._val = value);

    // Initialize PanResponder with move handling
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([ null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderRelease: (e, gestureState) => {
        this.state.pan.setOffset({x: this._val.x, y: this._val.y});
        // _val.x, _val.y
        const range = (Math.sqrt(Math.pow(this._val.x, 2) + Math.pow(this._val.y, 2)) / 180) * 100;
        const angle = this.getAngle(this._val.x, this._val.y);
        
        this.props.onValueChange({ range, angle });
        this.state.pan.setValue({x: 0, y: 0});
      },
    })
  }

  getAngle(x, y) {
    return - Math.atan2(y, x) * 180 / Math.PI
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

  render() {
    const panStyle = { transform: this.state.pan.getTranslateTransform() };
    const { outerSize, value, onValueChange } = this.props;
    const { cx, cy, r } = this.state;
    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(value);
    return (
      <View>
        <View>
          <Svg onLayout={this.onLayout} width={outerSize} height={outerSize}>
            {/* background + texts */}
            <Circle cx={outerSize/2} cy={outerSize/2} r={outerSize/2} fill={GREY}/>
            <Text x={this.polarToCartesianText(22.5).x} y={this.polarToCartesianText(22.5).y} fill={this.getColor(value, 22.5)} textAnchor="middle">tense</Text>
            <Text x={this.polarToCartesianText(67.5).x} y={this.polarToCartesianText(67.5).y} fill={this.getColor(value, 67.5)} textAnchor="middle">irritated</Text>
            <Text x={this.polarToCartesianText(112.5).x} y={this.polarToCartesianText(112.5).y} fill={this.getColor(value, 112.5)} textAnchor="middle">excited</Text>
            <Text x={this.polarToCartesianText(157.5).x} y={this.polarToCartesianText(157.5).y} fill={this.getColor(value, 157.5)} textAnchor="middle">cheerful</Text>
            <Text x={this.polarToCartesianText(202.5).x} y={this.polarToCartesianText(202.5).y} fill={this.getColor(value, 202.5)} textAnchor="middle">relaxed</Text>
            <Text x={this.polarToCartesianText(247.5).x} y={this.polarToCartesianText(247.5).y} fill={this.getColor(value, 247.5)} textAnchor="middle">calm</Text>
            <Text x={this.polarToCartesianText(292.5).x} y={this.polarToCartesianText(292.5).y} fill={this.getColor(value, 292.5)} textAnchor="middle">sad</Text>
            <Text x={this.polarToCartesianText(337.5).x} y={this.polarToCartesianText(337.5).y} fill={this.getColor(value, 337.5)} textAnchor="middle">bored</Text>
            
          </Svg>
        </View>
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          {/* Selector */}
          <Animated.View {...this._panResponder.panHandlers} style={[panStyle, { width: 50, height: 50, backgroundColor: PRIMARY, borderRadius: 25 }]}/>
        </View>
      </View>
      
    )
  }

  componentWillUnmount() {this.state.pan.removeListener(this._panListener);}
}