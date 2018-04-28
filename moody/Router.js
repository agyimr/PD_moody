import { TabNavigator } from 'react-navigation';
import { DiaryScreen } from './app/home_diary';
import { GraphsScreen } from './app/graphs';
import { StatisticsScreen } from './app/statistics';
import { PRIMARY } from './app/common/colors';

const Router = TabNavigator({
  Diary: { screen: DiaryScreen },
  Statistics: { screen: StatisticsScreen },
  Graphs: { screen: GraphsScreen },
}, { order: ['Statistics', 'Diary', 'Graphs'], initialRouteName: 'Diary', tabBarOptions: { style: { backgroundColor: PRIMARY } } });

export { Router };