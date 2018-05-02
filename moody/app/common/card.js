import React from 'react';
import { View, Text  } from 'react-native';
import { WHITE } from './colors';


export class Card extends React.PureComponent {

  render() {
    return (
      <View style={[ { borderRadius: 3, marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8, padding: 10, backgroundColor: WHITE }, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}