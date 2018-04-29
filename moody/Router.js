import { TabNavigator, StackNavigator } from 'react-navigation';
import { DiaryScreen } from './app/home_diary';
import { DiaryDetail } from './app/diary_detail';
import { GraphsScreen } from './app/graphs';
import { GraphsDetail } from './app/graphs_detail';
import { StatisticsScreen } from './app/statistics';
import { PRIMARY, WHITE } from './app/common/colors';

const DiaryStack = StackNavigator(
  {
    Diary: { screen: DiaryScreen },
    DiaryDetail: { screen: DiaryDetail },
  },
  { initialRouteName: 'Diary', headerMode: 'none', cardStyle: { backgroundColor: WHITE } }
);

const GraphStack = StackNavigator(
  {
    Graphs: { screen: GraphsScreen },
    GraphsDetail: { screen: GraphsDetail },
  },
  { initialRouteName: 'Graphs', headerMode: 'none', cardStyle: { backgroundColor: WHITE } }
);

const Router = TabNavigator({
  Diary: { screen: DiaryStack },
  Statistics: { screen: StatisticsScreen },
  Graphs: { screen: GraphStack },
}, { order: ['Statistics', 'Diary', 'Graphs'], initialRouteName: 'Diary', tabBarOptions: { style: { backgroundColor: PRIMARY } } });

export { Router };