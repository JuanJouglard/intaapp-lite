import React, {PureComponent} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {NativeModules} from 'react-native';
import {RNCamera} from 'react-native-camera';

class App extends PureComponent {
  camera;

  constructor(props) {
    super(props);
    this.state = {
      base64: null,
    };
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        width: 1920,
        base64: true,
        fixOrientation: true,
        pauseAfterCapture: true,
      };
      const data = await this.camera.takePictureAsync(options);
      const msg = await NativeModules.NativeOpenCV.processImage(data.uri);
      this.setState({base64: msg});
    }
  };

  render() {
    if (this.state.base64) {
      return (
        <View style={{flex: 1}}>
          <Image
            style={{flex: 1, borderColor: 'black', borderWidth: 5, margin: 10}}
            source={{uri: `data:image/png;base64,${this.state.base64}`}}
          />
        </View>
      );
    } else {
      return (
        <>
          <RNCamera
            autoFocus={RNCamera.Constants.AutoFocus.on}
            captureAudio={false}
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
          />
          <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  }
}

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

export default App;
