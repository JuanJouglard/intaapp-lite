import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {options, switchConfig} from '../../configuration';
import {ImageProcessor, ImageWithButton} from '../../shared';
import {Percentages} from './Percentages';

export class ImageView extends Component {
  imageProcessor;

  constructor(props) {
    super(props);
    this.state = {
      showOriginal: false,
      ...this.props.route.params,
    };
    this.imageProcessor = ImageProcessor.getInstance();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <SwitchSelector
            style={styles.switch}
            options={options}
            onPress={value =>
              this.setState({
                showOriginal: value,
              })
            }
            {...switchConfig}
          />
        </View>
        <ImageWithButton
          onImageAdjusted={this.updateOriginalImage}
          imageToEdit={this.state.originalImage}
          shouldRotate={this.props.route.params.shouldRotate}
          imageToShow={this.getImage()}
        />
        <Percentages
          percentageGreen={this.state.percentageGreen}
          percentageYellow={this.state.percentageYellow}
          percentageNaked={this.state.percentageNaked}
        />
        <View style={styles.information} />
      </View>
    );
  }

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
    let sourceOfImage = this.state.showOriginal
      ? this.state.originalImage.getSource()
      : this.state.processedImage.getSource();
    return {
      uri: sourceOfImage,
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  information: {
    flex: 1,
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
