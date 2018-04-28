import React from 'react';
import { View, Text  } from 'react-native';


export class Card extends React.PureComponent {

  render() {
    return (
      <View style={[ { elevation: 7, borderRadius: 3, marginTop: 2, paddingTop: 11, paddingBottom: 6, paddingLeft: 18, paddingRight: 18  }, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}