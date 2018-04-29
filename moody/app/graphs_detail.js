import React from 'react';
import { View, Text } from 'react-native';
import { PRIMARY } from './common/colors';
import ProgressBar from 'react-native-progress/Bar';


export class GraphsDetail extends React.Component {

  convertProgress(progress) {
    outputStr = String(parseInt(progress * 100)) + '%';
    return outputStr;
  }

  render() {
    const { params } = this.props.navigation.state;


    return (
      <View>
        <View style={{ paddingTop: 20 }}>
          <Text style={{ color: PRIMARY, fontSize: 25, textAlign: 'center' }}>{params.category}</Text>
        </View>
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <Text style={{ fontSize: 30 }}>Activities</Text>
          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Text>Work</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 10 }} >
              <ProgressBar progress={params.activities.work} width={300} height={25} color={'#2196f3'} borderRadius={2} />
              <Text style={{ paddingLeft: 20 }}>{this.convertProgress(params.activities.work)}</Text>
            </View>
            <Text>Study</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 10 }} >
              <ProgressBar progress={params.activities.study} width={300} height={25} color={'#2196f3'} borderRadius={2} />
              <Text style={{ paddingLeft: 20 }}>{this.convertProgress(params.activities.study)}</Text>
            </View>
            <Text>Family</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 10 }} >
              <ProgressBar progress={params.activities.family} width={300} height={25} color={'#2196f3'} borderRadius={2} />
              <Text style={{ paddingLeft: 20 }}>{this.convertProgress(params.activities.family)}</Text>
            </View>
            <Text>Sport</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 10 }} >
              <ProgressBar progress={params.activities.sport} width={300} height={25} color={'#2196f3'} borderRadius={2} />
              <Text style={{ paddingLeft: 20 }}>{this.convertProgress(params.activities.sport)}</Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <Text style={{ fontSize: 30 }}>Advices</Text>
          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Text>{params.advices}</Text>
          </View>
        </View>
      </View>
    );
  }
}