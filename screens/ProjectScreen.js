import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import globalStyles from '../lib/styles';
import colors from '../lib/colors';
import TaskItem from '../components/TaskItem';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ProjectStore from '../store/project';
import TaskStore from '../store/task';

const EDIT = 'EDIT';
const ADD = 'ADD';
const DELETE = 'DELETE';

class MenuRight extends Component {

  _onSelected = (value) => {
    const navigation = this.props.navigation;
    if (value === ADD) {
      navigation.navigate('Timer', {});
    } else if (value === EDIT) {
      navigation.navigate('Timer', {project: navigation.getParam('project')}); 
    } else if (value === DELETE) {
      // TODO: delete item
    }
  }

  render() {

    const menuStyles = StyleSheet.create({
      menuItem: {
        fontSize: 50
      },
    })
    
    const optionsStyles = {
      optionsContainer: {
        marginTop: 35,
      },
      optionWrapper: {
        padding: 8,
      },
      optionText: {
        fontSize: 20
      }
    };
    
    return (
      <View>
        <Menu style={{marginRight: 10}} onSelect={this._onSelected}>
          <MenuTrigger>
            <Icon color={colors.primary} size={30} name="menu" />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption value={ADD} text='New Task' style={menuStyles.menuItem} />
            <MenuOption value={EDIT} text={"Edit"} style={menuStyles.menuItem}/>
            <MenuOption value={DELETE} text='Delete' style={menuStyles.menuItem} />
          </MenuOptions>
        </Menu>
      </View>
    )
  }
}

@observer
class ProjectScreen extends Component {

  state = {  }

  componentDidMount() {
    const project = this.props.navigation.getParam('project');
    this.props.taskStore.fetchTasks(project.id);
  }

  render() { 
    const {tasks} = this.props.taskStore;
    return ( 
      <View style={styles.container}>
        <FlatList 
          keyExtractor={(item) => item.id}
          data={tasks}
          renderItem={({item}) => <TaskItem navigation={this.props.navigation} data={item} />}
        />
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

/**
 * Screen Wrapper
 */
class ScreenWrapper extends Component {
  static navigationOptions = {
    title: 'Project',
  };

  static navigationOptions = ({ navigation }) =>{
    return {
      headerRight: <MenuRight 
        navigation={navigation}
        />,
    }
  }

  render() {
    return (
      <ProjectScreen 
        store={ProjectStore} 
        taskStore={TaskStore} 
        {...this.props} />
    );
  }
}

export default ScreenWrapper;