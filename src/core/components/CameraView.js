import React, {PureComponent} from 'react';
import {Camera} from '../../shared/Camera';
import {CameraButton} from '../../shared/buttons/CameraButton';
import {NativeModules, View, Image} from 'react-native';

class CameraView extends PureComponent {
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
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
          />
          <CameraButton takePicture={this.takePicture} />
        </>
      );
    }
  }
}

export default CameraView;
