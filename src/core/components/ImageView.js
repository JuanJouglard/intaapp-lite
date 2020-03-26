import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Percentages} from './Percentages';
import SwitchSelector from 'react-native-switch-selector';

export class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOriginal: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <SwitchSelector
            style={styles.switch}
            initial={0}
            onPress={this.changeImage}
            textColor={'#4b8594'} //'#7a44cf'
            selectedColor={'white'}
            buttonColor={'#71aebe'}
            fontSize={16}
            borderColor={'#000'}
            options={[
              {label: 'Mascara', value: false},
              {label: 'Original', value: true},
            ]}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image style={this.rotation()} source={this.getImage()} />
        </View>
        <Percentages
          percentageGreen={this.props.route.params.percentageGreen}
          percentageYellow={this.props.route.params.percentageYellow}
        />
        <View style={styles.information} />
      </View>
    );
  }

  changeImage = value => {
    this.setState({showOriginal: value});
  };

  getImage() {
    if (this.state.showOriginal) {
      return {uri: this.props.route.params.originalImage};
    } else {
      return {uri: `data:image/png;base64,${this.props.route.params.image}`};
    }
  }

  rotation() {
    if (this.props.route.params.shouldRotate) {
      return {transform: [{rotate: '90deg'}], ...styles.image};
    } else {
      return styles.image;
    }
  }
}

const styles = StyleSheet.create({
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
