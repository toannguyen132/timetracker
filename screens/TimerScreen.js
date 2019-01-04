import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import Timer from '../components/Timer';
import globalStyles from '../lib/styles';
import colors from '../lib/colors';
import { injectStore } from '../lib/helper';
import TaskStore from '../store/task';

@observer
class TimerScreen extends Component {

  static navigationOptions = ({navigation}) => {
    let title = 'Task';
    try {
      title = navigation.getParam('task').name;
    } catch (e) {
    }

    return {
      title: title
    }
  };

  state = {  }

  _onChange = (value) => {
    console.log('new value: ', value);
  }

  render() { 
    const { time } = TaskStore.currentTask;
    console.log(JSON.stringify(TaskStore.currentTask));
    console.log(time);
    return ( 
    <View>
      <Timer defaultValue={time} onChange={this._onChange} />
    </View>
    );
  }
}
 
export default TimerScreen;