import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

export class ImageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        style={styles.image}
        source={{uri: `data:image/png;base64,${this.props.route.params.image}`}}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 5,
    margin: 10,
  },
});
