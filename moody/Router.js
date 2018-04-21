import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './app/home';
import { RateScreen } from './app/rate';

const Router = StackNavigator({
  Home: { screen: HomeScreen },
  Rate: { screen: RateScreen },
});

export { Router };