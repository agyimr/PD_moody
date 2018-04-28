import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity  } from 'react-native';
import { GREY, PRIMARY } from './colors';


export class ListItem extends React.PureComponent {
  

  render() {
    return (
      <TouchableOpacity style={{height: 95}}>
        <View style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <View style={{ height: "100%", width: 10, backgroundColor: PRIMARY }}></View>
          <View style={{ display: "flex", flexDirection: "column", borderBottomWidth: 1, paddingLeft: 15, borderBottomColor: GREY, flex: 7 }}>
            <Text style={{ fontWeight: "bold", paddingTop: 7, paddingBottom: 7 }}>{this.props.title}</Text>
            <Text>{this.props.description}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: GREY }}><Icon size={30} name="info-outline" color={GREY} /></View>
        </View>
      </TouchableOpacity>
    );
  }
}