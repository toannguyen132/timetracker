import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { toReadbleTime } from '../lib/helper';

class Timer extends Component {
  static propTypes = {
    onTimeChange: PropTypes.func,
    defaultValue: PropTypes.number
  }

  state = { 
    startTime: null,
    counter: 0,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _onToggle = () => {
    const startTime = this.state.startTime;
    if (startTime === null) {
      this.setState({
        startTime: new Date(),
      })

      this._updateTime();
    } else {
      if (this.time) { clearTimeout(this.timer); }
      const duration = this._getDuration();
      const accumulate = this.props.defaultValue + Math.floor(duration.asSeconds());
      this.setState({
        startTime: null,
      });
      this.props.onTimeChange(accumulate);
    }
  }

  _updateTime = () => {
    this.timer = setTimeout(this._updateTime, 1000);

    const duration = this._getDuration();
    this.setState({
      counter: this.props.defaultValue + duration.asSeconds()
    });
  }

  _getDuration = () => {
    if (this.state.startTime === null) return moment.duration(0);
    const start = moment( this.state.startTime );
    const end = moment(  );
    const diff = moment.duration(end.diff(start));

    return diff;
  }

  _getTime = () => {
    // let duration = moment.duration(this.props.defaultValue, 'seconds');
    let duration = this.props.defaultValue;

    if (this._isRunning && this.state.counter > 0){
      // duration = moment.duration(this.state.counter, 'seconds');
      duration = this.state.counter;
    }

    return toReadbleTime(duration, true);
  }

  _isRunning = () => {
    return this.state.startTime !== null
  }

  render() { 
    const time = this._getTime();

    return ( 
      <View style={styles.container}>
        <Text
          style={styles.time}
          >{time}</Text>
        <Button
          icon={<Icon name={this._isRunning() ? "pause" : "play"} color="white" size={40} />}
          title=""
          buttonStyle={styles.button}
          onPress={this._onToggle}
          large
          outline
          rounded
          />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  time: {
    fontSize: 70
  },
  button: {
    marginTop: 40,
    padding: 15,
    width: 200,
    borderRadius: 100
  },
})

export default Timer;