import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Button, DatePickerAndroid, SectionList, TouchableOpacity, AsyncStorage } from 'react-native';
import { ListItem } from './common/listitem';
import { GREY, WHITE, PRIMARY } from './common/colors';

export class DiaryScreen extends React.Component {
  displayMessage = "You haven't rated so far.";
  state = { showMessage: true, displayData: [] };
  key = 0;

  formatData(database) {
    let data = [];
    database.forEach(item => {
      const date = new Date(item.date);
      const itemDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const index = data.findIndex(d => d.title.valueOf() === itemDate.valueOf());
      const newEntry = { 
        title: `${this.getDate(date)}, ${this.getWeekDay(date)}`,
        description: item.text,
        mood: this.getMood(item),
        rating: item.social_rate,
        activity: this.getActivity(item),
        key: this.key,
      }
      this.key += 1;
      if (index !== -1) { data[index].data.push(newEntry) }
      else {
        const divider = this.createDivider(itemDate);
        divider.data.push(newEntry);
        data.push(divider)
      }
    });
    data.forEach(d => { d.data = d.data.reverse() });
    return data.reverse();
  }

  getActivity(item) {
    let activities = [];
    if (item.work) activities.push("work");
    if (item.study) activities.push("study");
    if (item.family) activities.push("family");
    if (item.sport) activities.push("sport");
    return activities.join(", ");
  }

  getMood({ range, angle }) {
    const score = range * angle;
    const moods = ["irritated", "tense", "bored", "sad", "calm", "relaxed", "cheerful", "excited"];
    return moods[Math.floor((score + 18000) / 4500)]
  }

  getWeekDay(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[date.getDay()];
  }

  getDate(date) {
    switch (date.getDate()) {
      case 1:
          return `1st`;
      case 2:
          return `2nd`;
      case 3:
          return `3rd`;
      default:
        return `${date.getDate()}th`;
    }
  }

  createDivider(date) {
    const divider = { title: date, key: this.key, data: [] };
    this.key += 1;
    return divider;
  }


  async componentWillMount() {
    const database_string = await AsyncStorage.getItem("db");
    if (!database_string) return;

    const database = JSON.parse(database_string);

    if (database !== []) {
      this.data = this.formatData(database);
      this.setState({ showMessage: false, displayData: this.data });
    } else {
      this.setState({ showMessage: true, displayData: [] });
    }
  }

  async pickDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({ date: new Date() });
      if (action !== DatePickerAndroid.dismissedAction) {
        const filterDate = new Date(year, month, day);
        const displayData = this.data.filter(d => d.title.valueOf() < filterDate.valueOf() && (d.title.valueOf() + 2592000000) > filterDate.valueOf());
        this.setState({ displayData });
      } else {
        const displayData = this.data;
        this.setState({ displayData });
      }
    } catch ({code, message}) {
      const displayData = this.data;
      this.setState({ displayData });
      console.warn('Cannot open date picker', message);
    }
  }

  renderListItem(item) {
    return <ListItem
      onPress={() => {this.props.navigation.navigate('DiaryDetail', item)}}
      title={item.title}
      description={item.description}
      key={item.key}
    />
  }

  renderMessage() {
    return <Text style={{ padding: 15, fontSize: 15, fontStyle: "italic" }}>{this.displayMessage}</Text>;
  }

  renderList() {
    return <SectionList
      style={{ paddingLeft: 15, paddingRight: 15 }}
      sections={this.state.displayData}
      renderSectionHeader={({section}) => this.renderHeader(section)}
      stickySectionHeadersEnabled={true}
      renderItem={({item}) => this.renderListItem(item)}
    />
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showMessage ? this.renderMessage() : this.renderList()}

        
        <TouchableOpacity onPress={this.pickDate.bind(this)} 
          title="Search"
          style={[floating, { right: 20, bottom: 110, backgroundColor: PRIMARY } ]}>
          <Icon name="search" size={30} color={WHITE} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {this.onRateTodayPress()}} 
          title="Addrate" 
          style={[floating, { right: 20, bottom: 20, backgroundColor: PRIMARY }]}>
          <Icon name="add" size={30} color={WHITE} />
        </TouchableOpacity>
      </View>
    );
  }

  onRateTodayPress() {
    this.props.navigation.navigate('DailySummary');
  }

  renderHeader(section) {
    return (
      <View style={{ backgroundColor: WHITE, width: '100%' }} key={section.key}>
        <Text style={{ padding: 20 }}>{this.getHeader(section.title)}</Text>
      </View>
    );
  }

  getHeader(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
}

const floating = {
  width: 70,
  height: 70,
  position: "absolute",
  borderRadius: 35, 
  justifyContent: 'center', 
  alignItems: 'center',
  elevation: 10
};