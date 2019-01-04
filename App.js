import { StyleSheet, View } from 'react-native';
import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import TimerScreen from './screens/TimerScreen';
import ProjectScreen from './screens/ProjectScreen';
import { MenuProvider } from 'react-native-popup-menu';

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Project: {screen: ProjectScreen},
  Timer: {screen: TimerScreen},
});
const AppContainer = createAppContainer(AppNavigator)

const App = () => (
  <MenuProvider>
    <AppContainer />
  </MenuProvider>
);

// taskService.seed();


export default App;

// export default class App extends React.Component {

//   state = {
//     text: '',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Timer />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
