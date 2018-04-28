import { TabNavigator, StackNavigator } from 'react-navigation';
import { DiaryScreen } from './app/home_diary';
import { DiaryDetail } from './app/diary_detail';
import { GraphsScreen } from './app/graphs';
import { StatisticsScreen } from './app/statistics';
import { PRIMARY } from './app/common/colors';

const DiaryStack = StackNavigator(
  {
    Diary: { screen: DiaryScreen},
    DiaryDetail: { screen: DiaryDetail },
  },
  { initialRouteName: 'Diary', headerMode: 'none' }
);

const Router = TabNavigator({
  Diary: { screen: DiaryStack },
  Statistics: { screen: StatisticsScreen },
  Graphs: { screen: GraphsScreen },
}, { order: ['Statistics', 'Diary', 'Graphs'], initialRouteName: 'Diary', tabBarOptions: { style: { backgroundColor: PRIMARY } } });

export { Router };