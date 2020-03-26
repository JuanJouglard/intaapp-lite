import ImagePicker from 'react-native-image-picker';

export class ImagePickerService {
  instance;

  options = {
    mediaType: 'photo',
    cameraType: 'back',
    rotation: 360,
    quality: 1,
    noData: true,
    maxWidth: 1920,
    maxHeigth: 1920,
  };

  static getInstance() {
    if (!this.instance) {
      this.instance = new ImagePickerService();
    }
    return this.instance;
  }

  getImageFromCamera() {
    const result = new Promise((resolve, reject) => {
      ImagePicker.launchCamera(this.options, response => {
        if (response.didCancel) {
          reject('User cancelled image picker');
        } else if (response.error) {
          reject('ImagePicker Error: ' + response.error);
        } else {
          resolve({
            uri: response.uri,
            width: response.width,
            height: response.height,
          });
        }
      });
    });

    return result;
  }

  getImageFromGallery() {
    const result = new Promise((resolve, reject) => {
      ImagePicker.launchImageLibrary(this.options, response => {
        //console.log('Response = ', response);

        if (response.didCancel) {
          reject('User cancelled image picker');
        } else if (response.error) {
          reject('ImagePicker Error: ' + response.error);
        } else {
          resolve({
            uri: response.uri,
            width: response.width,
            height: response.height,
          });
        }
      });
    });
    return result;
  }
}
