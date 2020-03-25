import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, View, Text} from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';
export class ImageView extends Component {
  constructor(props) {
    super(props);
    console.log('yellow', this.props.route.params.percentageYellow);
    console.log('green', this.props.route.params.percentageGreen);
    // console.log('image', this.props.route.params.image);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: `data:image/png;base64,${this.props.route.params.image}`,
            }}
          />
        </View>
        <Text style={{fontSize: 32}}>Cubrimiento</Text>
        <View style={styles.percentages}>
          <ProgressCircle
            color="#32CD32"
            progress={this.props.route.params.percentageGreen / 100}
            size={96}
            showsText={true}
            formatText={this.formatText(
              this.props.route.params.percentageGreen,
            )}
          />
          <ProgressCircle
            color="#fce303"
            progress={this.props.route.params.percentageYellow / 100}
            size={96}
            showsText={true}
            formatText={this.formatText(
              this.props.route.params.percentageYellow,
            )}
          />
          <ProgressCircle
            color="#f5f7f7"
            progress={this.props.route.params.percentageYellow / 100}
            size={96}
            showsText={true}
            formatText={this.formatText(
              this.props.route.params.percentageYellow,
            )}
          />
        </View>
      </View>
    );
  }

  formatText = progress => () => {
    return `${Math.floor(progress)}%`;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1 / 1,
  },
  percentages: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    backgroundColor: '#1f2f33',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
