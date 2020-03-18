import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export const CameraButton = props => {
  return (
    <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity onPress={props.takePicture} style={styles.capture}>
        <Text style={{fontSize: 14}}> SNAP </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
