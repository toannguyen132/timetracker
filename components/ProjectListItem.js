import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { navigate } from 'react-navigation';
import globalStyles from '../lib/styles';

class ProjectListItem extends Component {

  static defaultProps = {
    key: '',
    name: '',
    onPress: () => {}
  }

  render() { 
    const { key, name, onPress } = this.props;
    return ( 
      <ListItem 
        title={name} 
        titleStyle={styles.mainText}
        bottomDivider={true}
        chevron={true}
        onPress={() => this.props.onPress({name, key})}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingTop: 15,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    fontSize: 25,
  },
  subText: {
    fontSize: 15,
    marginTop: 5,
    color: '#999'
  },
  timeText: {
    fontSize: 35,
    textAlign: 'right'
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: 'center'
  }
})

export default ProjectListItem;