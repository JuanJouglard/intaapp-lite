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
import {ImageProcessor} from '../../shared/services/imageProcessor';

export class Home extends Component {
  picker;
  imageProcessor;

  constructor(props) {
    super(props);
    this.picker = ImagePickerService.getInstance();
    this.imageProcessor = ImageProcessor.getInstance();
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
    const {img, percentage} = await this.imageProcessor.processImage(uriImage);
    this.props.navigation.navigate('Imagen', {
      image: img,
    });
  };

  launchGallery = async () => {
    const uriImage = await this.picker.getImageFromGallery();
    const {
      img,
      percentageGreen,
      percentageYellow,
    } = await this.imageProcessor.processImage(uriImage);
    this.props.navigation.navigate('Imagen', {
      image: img,
      percentageGreen: percentageGreen,
      percentageYellow: percentageYellow,
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
