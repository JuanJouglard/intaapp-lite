import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Percentages} from './Percentages';
export class ImageView extends Component {
  constructor(props) {
    super(props);
    console.log('yellow', this.props.route.params.percentageYellow);
    console.log('green', this.props.route.params.percentageGreen);
    // console.log('image', this.props.route.params.image);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={this.rotation()}
            source={{
              uri: `data:image/png;base64,${this.props.route.params.image}`,
            }}
          />
        </View>
        <Percentages
          percentageGreen={this.props.route.params.percentageGreen}
          percentageYellow={this.props.route.params.percentageYellow}
        />
        <View style={styles.information} />
      </View>
    );
  }

  rotation() {
    if (this.props.route.params.shouldRotate) {
      return {transform: [{rotate: '90deg'}], ...styles.image, height: '120%'};
    } else {
      return styles.image;
    }
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  information: {
    flex: 2,
  },
});
