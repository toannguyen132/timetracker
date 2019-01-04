import moment from 'moment';
import { View } from 'react-native';
import React from 'react';

export const toReadbleTime = (seconds, withSeconds = false) => {
  const duration = moment.duration(seconds, 'seconds');
  const hour = Math.floor(duration.asHours()).toString().padStart(2, '0');
  const minute = Math.floor(duration.minutes()).toString().padStart(2, '0');
  const sec = Math.floor(duration.seconds()).toString().padStart(2, '0');

  if (withSeconds) {
    return `${hour}:${minute}:${sec}`;
  } else {
    return `${hour}:${minute}`;
  }
}

export const injectStore = (Component, stores) => {
  return (props) => (
    <Component {...props} {...stores}>{props.children}</Component>
  )
}