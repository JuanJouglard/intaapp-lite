import {Button} from 'native-base';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Popover from 'react-native-popover-view';
import {imageAdjusts} from '../../configuration';
import CustomImage from './CustomNativeImage';
import {Sliders} from './Sliders';

export class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      brightness: imageAdjusts[0].defaultValue,
      saturation: imageAdjusts[1].defaultValue,
      contrast: imageAdjusts[2].defaultValue,
      saveImg: false,
    };
  }

  render() {
    return (
      <Popover
        onCloseComplete={this.resetState}
        popoverStyle={styles.popover}
        isVisible={this.props.showOver}>
        <View style={styles.imageContainer}>
          <CustomImage
            onSave={this.save}
            saveImage={this.state.saveImg}
            resizeMode="contain"
            style={styles.image}
            src={{
              source: [
                {
                  uri: this.props.image.getSource(),
                },
              ],
              width: this.props.image.getWidth(),
              height: this.props.image.getHeight(),
            }}
            brightness={this.state.brightness}
            saturation={this.state.saturation}
            contrast={this.state.contrast}
          />
        </View>
        <View style={styles.settingsContainer}>
          <Sliders updateValue={this.updateValue} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} onPress={this.props.onClose} light>
            <Text style={styles.buttonText}>Cancelar</Text>
          </Button>
          <Button style={styles.button} onPress={this.saveImg} primary>
            <Text style={styles.buttonText}>Confirmar</Text>
          </Button>
        </View>
      </Popover>
    );
  }

  saveImg = () => {
    this.setState({
      saveImg: true,
    });
    this.props.onClose();
  };

  save = event => {
    this.props.updateImage(event.nativeEvent.uri);
  };

  resetState = () => {
    this.setState({
      saveImg: false,
    });
  };

  updateValue = type => value => {
    this.setState({
      [type]: value,
    });
  };
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
});
