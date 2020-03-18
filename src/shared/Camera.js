import React from 'react';
import {RNCamera} from 'react-native-camera';
import {StyleSheet} from 'react-native';

export const Camera = props => {
  return (
    <RNCamera
      autoFocus={RNCamera.Constants.AutoFocus.on}
      captureAudio={false}
      ref={props.ref}
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
