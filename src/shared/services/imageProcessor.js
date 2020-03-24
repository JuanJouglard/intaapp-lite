import {NativeModules} from 'react-native';
import * as colorsRange from '../../configuration/colors';

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
      colorsRange.greenRange,
      colorsRange.yellowRange,
    );
  }
}
