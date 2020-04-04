import {StyleSheet, Image, Dimensions, View, Text} from 'react-native';
import React, {Component} from 'react';
import Popover from 'react-native-popover-view';
import {Button} from 'native-base';

export class ImageEditor extends Component {
  render() {
    console.log(this.props.image);

    return (
      <Popover popoverStyle={styles.popover} isVisible={this.props.showOver}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: this.props.image,
            }}></Image>
        </View>
        <View style={styles.settingsContainer}>
          <Text>Sliders</Text>
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
    flex: 3,
    width: '100%',
    borderColor: 'black',
    borderWidth: 5,
  },
  settingsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
});
