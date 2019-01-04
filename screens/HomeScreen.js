import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {observer} from "mobx-react"
import ProjectListItem from '../components/ProjectListItem';
import ProjectStore from '../store/project';

@observer
class HomeScreen extends Component {

  componentDidMount() {
    this.props.store.fetchProjects();
  }

  _onPress = (project) => {
    const { navigate } = this.props.navigation;
    this.props.store.setCurrentProject(project.id);
    navigate('Project', {project})
  }

  render() { 

    const { projects } = this.props.store;

    return ( 
    <View>
      <FlatList 
        data={projects}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => <ProjectListItem {...item} onPress={() => this._onPress(item)}/>}
      />
    </View> 
    );
  }
}

/**
 * Screen Wrapper
 */
class HomeScreenWrapper extends Component {
  static navigationOptions = {
    title: 'Projects',
  };

  render() {
    return (
      <HomeScreen store={ProjectStore} {...this.props} />
    );
  }
}

export default HomeScreenWrapper;