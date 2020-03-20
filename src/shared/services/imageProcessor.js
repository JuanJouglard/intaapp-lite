import {NativeModules} from 'react-native';

export class ImageProcessor {
  instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new ImageProcessor();
    }
    return this.instance;
  }

  async processImage(uriImage) {
    return NativeModules.NativeOpenCV.processImage(
      uriImage,
      [40, 50, 20],
      [70, 255, 255],
      //[25, 50, 20], YELLOW
      //[40, 255, 255], YELLOW
      //[0, 5, 50], GRAY
      //[179, 50, 255], GRAY
    );
  }
}
