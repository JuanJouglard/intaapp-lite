import React, {Component} from 'react';
import {Text, Image, StyleSheet, View, Switch} from 'react-native';
import {Percentages} from './Percentages';
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
          <Text style={styles.filterText}>Aplicar</Text>
          <Switch
            trackColor={{false: '#c6c8c9', true: 'rgba(31,47,51,0.5)'}}
            thumbColor={this.state.showOriginal ? '#1f2f33' : '#fff'}
            style={styles.switch}
            onValueChange={this.changeImage}
            value={this.state.showOriginal}
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
      return {transform: [{rotate: '90deg'}], ...styles.image, height: '120%'};
    } else {
      return styles.image;
    }
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',

    borderWidth: 4,
    borderColor: 'black',
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
  filterText: {
    fontSize: 22,
  },
  information: {
    flex: 2,
  },
  switchContainer: {
    width: '90%',
    flex: 1,
    borderWidth: 4,
    borderColor: 'black',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  switch: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});
