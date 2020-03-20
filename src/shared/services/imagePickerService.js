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
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          resolve(response.uri);
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
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          resolve(response.uri);
        }
      });
    });
    return result;
  }
}
