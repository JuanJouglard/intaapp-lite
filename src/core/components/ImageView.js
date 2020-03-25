import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Percentages} from './Percentages';
export class ImageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.image}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  information: {
    flex: 2,
  },
});
