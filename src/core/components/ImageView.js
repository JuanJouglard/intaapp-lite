import {ImageEditor, ImageProcessor} from '../../shared';
import {mainThemeColor} from '../../configuration/colors';
import React, {Component} from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';

import SwitchSelector from 'react-native-switch-selector';
import {options} from '../../configuration/options';
import {Percentages} from './Percentages';

export class ImageView extends Component {
  imageProcessor;

  constructor(props) {
    super(props);
    this.state = {
      showOriginal: false,
      showEditor: false,
      originalImage: this.props.route.params.originalImage,
      processedImage: this.props.route.params.processedImage,
      percentageGreen: this.props.route.params.percentageGreen,
      percentageYellow: this.props.route.params.percentageYellow,
      percentageNaked: this.props.route.params.percentageNaked,
    };
    this.imageProcessor = ImageProcessor.getInstance();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <SwitchSelector
            style={styles.switch}
            initial={0}
            onPress={this.changeImage}
            textColor={'#4b8594'}
            selectedColor={'white'}
            buttonColor={'#4E7774'}
            fontSize={16}
            borderColor={'#000'}
            options={options}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image style={this.shouldRotate()} source={this.getImage()} />
          <TouchableOpacity
            onPress={this.showEditor(true)}
            style={styles.adjustButton}>
            <Icon name="edit" type="Entypo" style={styles.icon} />
          </TouchableOpacity>
          <ImageEditor
            image={this.state.originalImage}
            showOver={this.state.showEditor}
            updateImage={this.updateOriginalImage}
            onClose={this.showEditor(false)}
          />
        </View>
        <Percentages
          percentageGreen={this.state.percentageGreen}
          percentageYellow={this.state.percentageYellow}
          percentageNaked={this.state.percentageNaked}
        />
        <View style={styles.information} />
      </View>
    );
  }

  changeImage = value => {
    this.setState({showOriginal: value});
  };

  updateOriginalImage = async newUri => {
    let nativeReponse = await this.imageProcessor.processImage(
      'file://' + newUri,
    );

    this.setState(prevState => {
      let newState = {
        ...prevState,
      };
      newState.originalImage.setUri('file://' + newUri);

      newState.processedImage.setData(nativeReponse.img);
      newState.percentageGreen = nativeReponse.percentageGreen;
      newState.percentageYellow = nativeReponse.percentageYellow;
      newState.percentageNaked = nativeReponse.percentageNaked;

      return newState;
    });
  };

  getImage() {
    if (this.state.showOriginal) {
      return {
        uri: this.state.originalImage.getSource(),
      };
    } else {
      return {
        uri: this.state.processedImage.getSource(),
      };
    }
  }

  shouldRotate() {
    if (this.props.route.params.shouldRotate) {
      return {
        transform: [{rotate: '90deg'}],
        ...styles.image,
      };
    } else {
      return styles.image;
    }
  }

  showEditor = show => () => {
    this.setState({
      showEditor: show,
    });
  };
}

const styles = StyleSheet.create({
  adjustButton: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    backgroundColor: mainThemeColor(1),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
  imageContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: '95%',
    resizeMode: 'contain',
  },
  filterText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  information: {
    flex: 1,
  },
  icon: {
    color: 'white',
  },
  switchContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  switch: {
    width: '80%',
    zIndex: 99,
  },
});
