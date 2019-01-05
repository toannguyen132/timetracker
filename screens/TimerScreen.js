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
  state = {  }

  componentWillUnmount() {
    this.props.taskStore.setCurrentTask(null);
  }

  _onTimeChange = (value) => {
    this.props.taskStore.updateTaskTime(value);
  }

  render() { 
    const { time } = this.props.taskStore.currentTask;
    return ( 
    <View>
      <Timer defaultValue={time} onTimeChange={this._onTimeChange} />
    </View>
    );
  }
}

class TimerScreenWrapper extends Component {
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

  render() {
    return <TimerScreen {...this.props} taskStore={TaskStore} />
  }
}
 
export default TimerScreenWrapper;