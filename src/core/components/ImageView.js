import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

export class ImageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: `data:image/png;base64,${this.props.route.params.image}`,
            }}
          />
        </View>
        <View style={styles.percentages}></View>
      </View>
    );
  }
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
  },
  percentages: {
    flex: 2,
  },
});
