import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import { observer } from 'mobx-react';
import Swipeout from 'react-native-swipeout';
import globalStyles from '../lib/styles';
import colors from '../lib/colors';
import { toReadbleTime, injectStore } from '../lib/helper';
import { Button } from 'react-native-elements';
import TaskStore from '../store/task';

@observer
class TaskItem extends Component {

  state = {  }

  _onEdit = () => {

  }

  _onDelete = () => {

  }

  _onPress = () => {
    // this.props.navigation.navigate('Timer')
    // console.log(this.props.data)
    this.props.taskStore.setCurrentTask(this.props.data);
    this.props.navigation.navigate('Timer', {task: this.props.data});
  }

  render() { 
    console.log(this.props.data);
    const { project, category, name, time } = this.props.data;
    const buttons = [{
      text: "Edit",
      onPress: this._onEdit,
      type: 'primary',
    }, {
      text: "Delete",
      onPress: this._onDelete,
      type: 'delete',
    }];

    return ( 
      <Swipeout backgroundColor='transparent' right={buttons}>
        <TouchableHighlight onPress={this._onPress} style={styles.touchable} underlayColor={colors.superlight}>
          <View style={styles.container}>
            <Left onPress={this._onPress}>
              <ProjectText project={project} category={category}/>
              <NameText name={name}/>
            </Left>
            <Time time={toReadbleTime(time)} />
          </View> 
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const Left = ({children}) => (
  <View style={styles.left}>{children}</View>
)

const ProjectText = ({project, category}) => (
  <View style={styles.project}>
    <Text style={styles.projectText}>{project.name || 'Sample Project'} / {category || "sample category"}</Text>
  </View>
);

const NameText = ({name}) => (
  <View>
    <Text style={styles.nameText}>{name || 'sample name'}</Text>
  </View>
);

const CategoryText = ({name}) => (
  <View>
    <Text style={styles.categoryText}>{name || 'sample category'}</Text>
  </View>
);

const Time = ({time}) => (
  <View style={styles.right}>
    <Text style={styles.time}>{time || '00:00'}</Text>
  </View>
);

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    padding: 10
  },
  container: {
    ...globalStyles.container,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  right: {

  },
  project: {},
  projectText: {
    fontSize: 15,
    color: colors.light
  },
  nameText: {
    fontSize: 20,
    color: colors.dảk
  },
  time: {
    fontSize: 24,
    color: colors.primary
  }
});

export default injectStore(TaskItem, {taskStore: TaskStore});