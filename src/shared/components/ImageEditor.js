import {mainThemeColor} from '../../configuration/colors.js';
import {StyleSheet, Image, Dimensions, View, Text} from 'react-native';
import React, {Component} from 'react';
import Popover from 'react-native-popover-view';
import {Button} from 'native-base';
import Slider from '@react-native-community/slider';
import {imageAdjusts} from '../../configuration/image-adjustment.js';
import {ImageProcessor} from '../services/imageProcessor';

export class ImageEditor extends Component {
  imageProcessor;

  constructor(props) {
    this.imageProcessor = ImageProcessor.getInstance();
  }

  adjustImage = sliderType => {
    return changedValue => {
      this.imageProcessor.adjustImage(
        this.props.image,
        sliderType,
        changedValue,
      );
    };
  };

  render() {
    console.log(this.props.image);

    return (
      <Popover popoverStyle={styles.popover} isVisible={this.props.showOver}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: this.props.image,
            }}
          />
        </View>
        <View style={styles.settingsContainer}>
          {this.getAdjustmentSliders()}
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} onPress={this.props.onClose} light>
            <Text style={styles.buttonText}>Cancelar</Text>
          </Button>
          <Button style={styles.button} onPress={this.props.onClose} primary>
            <Text style={styles.buttonText}>Confirmar</Text>
          </Button>
        </View>
      </Popover>
    );
  }

  getAdjustmentSliders() {
    return imageAdjusts.map(adjust => {
      return (
        <View key={adjust.key} style={styles.sliderContainer}>
          <Text>{adjust.title}</Text>
          <Slider
            style={{width: 300, height: 50}}
            value={adjust.defaultValue}
            minimumValue={adjust.minimumValue}
            maximumValue={adjust.maximumValue}
            minimumTrackTintColor={mainThemeColor(1)}
            thumbTintColor={mainThemeColor(1)}
            onValueChange={this.adjustImage(adjust.title)}
          />
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: 'white',
  },
  popover: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 4,
    width: '100%',
    borderColor: 'black',
    borderWidth: 5,
  },
  settingsContainer: {
    marginTop: 10,
    flex: 3,
    justifyContent: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
  },
});
