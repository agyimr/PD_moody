import React from 'react'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import { PRIMARY } from './colors';

export class CustomLineChart extends React.PureComponent {
    // DATA_STRUCTURE
    // data = [{ date: 1485907200000, value: 1 }, ...]

    formatDate(d) {
        const date = new Date(d);
        const months = ["Jan", "Febr", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return `${months[date.getMonth()]}`;
    }

    render() {
        const axesSvg = { fontSize: 14, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 };
        const xAxisHeight = 10;

        return (
            <View style={{ height: 200, flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
              <YAxis
                  data={this.props.data}
                  yAccessor={({item}) => item.value}
                  style={{ marginBottom: xAxisHeight }}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={this.props.data}
                    yAccessor={({item}) => item.value}
                    xAccessor={({item}) => item.date}
                    contentInset={verticalContentInset}
                    svg={{ stroke: PRIMARY, strokeWidth: 2 }}
                >
                <Grid/>
                </LineChart>
                <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={this.props.data}
                    // xAccessor={({item}) => item.date}
                    formatLabel={(value, index) => (index % 15 === 7 ? this.formatDate(value) : "")}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                />
              </View>
            </View>
        )
    }
}

