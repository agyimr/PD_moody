import { TabNavigator, StackNavigator } from 'react-navigation';
import { DiaryScreen } from './app/home_diary';
import { DiaryDetail } from './app/diary_detail';
import { GraphsScreen } from './app/graphs';
import { GraphsDetail } from './app/graphs_detail';
import { StatisticsScreen } from './app/statistics';
import { StatisticsDetail } from './app/statictics_detail';
import { PRIMARY } from './app/common/colors';

const DiaryStack = StackNavigator(
  {
    Diary: { screen: DiaryScreen },
    DiaryDetail: { screen: DiaryDetail },
  },
  { initialRouteName: 'Diary', headerMode: 'none' }
);

const GraphsStack = StackNavigator(
  {
    Graphs: { screen: GraphsScreen },
    GraphsDetail: { screen: GraphsDetail },
  },
  { initialRouteName: 'Graphs', headerMode: 'none' }
);

const StatisticsStack = StackNavigator(
  {
    Statistics: { screen: StatisticsScreen },
    StatisticsDetail: { screen: StatisticsDetail },
  },
  { initialRouteName: 'Statistics', headerMode: 'none' }
);

const Router = TabNavigator({
  Diary: { screen: DiaryStack },
  Statistics: { screen: StatisticsStack },
  Graphs: { screen: GraphsStack },
}, { order: ['Statistics', 'Diary', 'Graphs'], initialRouteName: 'Diary', tabBarOptions: { style: { backgroundColor: PRIMARY } } });

export { Router };