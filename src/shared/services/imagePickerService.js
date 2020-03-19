import ImagePicker from 'react-native-image-picker';

export class ImagePickerService {
  instance;

  options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    rotation: 360,
    quality: 1,
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
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          //alert(response.customButton);
        } else {
          console.log(
            'GalleryPicker -> launchCamera -> response.uri',
            response.uri,
          );
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
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          //alert(response.customButton);
        } else {
          resolve(response.uri);
        }
      });
    });
    return result;
  }
}
