import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { StyleSheet, PickerIOS as Picker, View } from 'react-native';
import taskStore from '../store/task';
import { Input, Button } from 'react-native-elements';
import colors from '../lib/colors';

@observer
class TaskEditorScreen extends Component {
  state = {  }

  _onSave = () => {
    console.log('save task');
  }

  render() { 
    return (
      <View style={styles.container}>
        <CustomInput
          placeholder="Task Name"
          label="Task Name"
          />
        <Picker
          selectedValue={this.state.language}
          style={{ width: "100%" }}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Picker
          selectedValue={this.state.category}
          style={{ width: "100%" }}
          onValueChange={(category, itemIndex) => this.setState({category})}>
          <Picker.Item label="PM" value="PM" />
          <Picker.Item label="Program" value="Program" />
          <Picker.Item label="Design" value="Design" />
        </Picker>

        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={this._onSave} title="Save"/>
        </View>
      </View>
    );
  }
}

class TaskEditorScreenWrapper extends Component {
  static navigationOptions = ({navigation}) => {
    let task = navigation.getParam('task');
    return {
      title: task && task.name ? "Edit Task" : "New Task",

    }
  };

  render() {
    return <TaskEditorScreen {...this.props} taskStore={taskStore} />
  }
}

const CustomInput = (props) => (
  <Input 
    {...props}
    inputStyle={styles.input}
    inputContainerStyle={styles.inputContainer}
    containerStyle={{width: '100%'}}
    labelStyle={{marginStart: 10}}
    ></Input>
)

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    paddingStart: 10,
    paddingEnd: 10
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.lighter,
    borderRadius: 50
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 50
  }
})
 
export default TaskEditorScreenWrapper;

