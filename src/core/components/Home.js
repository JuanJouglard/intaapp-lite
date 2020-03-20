import React, {Component} from 'react';
import {
  CardItem,
  Container,
  Header,
  Icon,
  Title,
  Content,
  Right,
  Body,
  Text,
} from 'native-base';
import {ImagePickerService} from '../../shared/services/imagePickerService';
import {StyleSheet, NativeModules} from 'react-native';

export class Home extends Component {
  picker;

  constructor(props) {
    super(props);
    this.picker = ImagePickerService.getInstance();
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>INTA</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.container}>
          <CardItem
            style={styles.card}
            header
            button
            onPress={this.launchCamera}>
            <Icon name="camera" />
            <Text>Tomar una foto con la camara</Text>
          </CardItem>
          <CardItem
            style={styles.card}
            header
            button
            onPress={this.launchGallery}>
            <Icon name="camera" />
            <Text>Seleccionar foto de la galeria</Text>
          </CardItem>
        </Content>
      </Container>
    );
  }

  launchCamera = async () => {
    const uriImage = await this.picker.getImageFromCamera();
    const {img, percentage} = await NativeModules.NativeOpenCV.processImage(
      uriImage,
      [40, 50, 20],
      [70, 255, 255],
      //[25, 50, 20], YELLOW
      //[40, 255, 255], YELLOW
      //[0, 5, 50], GRAY
      //[179, 50, 255], GRAY
    );
    this.props.navigation.navigate('Imagen', {
      image: img,
    });
  };

  launchGallery = async () => {
    const uriImage = await this.picker.getImageFromGallery();
    const {img, percentage} = await NativeModules.NativeOpenCV.processImage(
      uriImage,
      [40, 50, 20],
      [70, 255, 255],
      //[25, 50, 20], YELLOW
      //[40, 255, 255], YELLOW
      //[0, 5, 50], GRAY
      //[179, 50, 255], GRAY
    );
    this.props.navigation.navigate('Imagen', {
      image: img,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
  },
});
