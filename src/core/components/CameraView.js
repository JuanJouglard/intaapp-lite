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
      const {img, percentage} = await NativeModules.NativeOpenCV.processImage(
        data.uri,
        [40, 50, 20],
        [70, 255, 255],
        //[25, 50, 20], YELLOW
        //[40, 255, 255], YELLOW
        //[0, 5, 50], GRAY
        //[179, 50, 255], GRAY
      );
      console.log('percentage', percentage);
      this.setState({base64: img});
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
            refer={ref => {
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
