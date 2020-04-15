import {
  Body,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Right,
  Text,
  Title,
  View,
  Left,
  Spinner,
} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import {ImagePickerService, ImageProcessor, HomeCard} from '../../shared';
import {mainThemeColor} from '../../configuration/colors';
import {slides} from '../../configuration/slides.js';
import {ImageModel} from '../../shared/models/ImageModel.js';

import {Tour} from '../../guided-tour/Tour';

import AppIntroSlider from 'react-native-app-intro-slider';

export class Home extends Component {
  picker;
  imageProcessor;

  constructor(props) {
    super(props);
    this.picker = ImagePickerService.getInstance();
    this.imageProcessor = ImageProcessor.getInstance();
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Container>
        <Header
          style={{
            backgroundColor: mainThemeColor(1),
          }}>
          <Left />
          <Body>
            <Title>INTA</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.container}>
          {this.state.loading ? (
            <Spinner color={mainThemeColor(1)} />
          ) : (
            <>
              <HomeCard
                onPress={this.launch('Camera')}
                icon={{
                  name: 'camera-retro',
                  type: 'FontAwesome5',
                }}
                text="TOMAR UNA FOTO CON LA CAMARA"
              />
              <HomeCard
                onPress={this.launch('Gallery')}
                icon={{
                  name: 'upload',
                  type: 'AntDesign',
                }}
                text="SELECCIONAR UNA FOTO DE LA GALERIA"
              />
            </>
          )}
        </Content>
      </Container>
    );
  }

  launch = picker => async () => {
    this.setState({loading: true});
    try {
      const {uri, data, width, height} = await this.picker[
        'getImageFrom' + picker
      ]();
      let imgModel = new ImageModel(data, height, width, uri);
      this.routeToImageView(imgModel);
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  async routeToImageView(originalImgModel) {
    const {
      img,
      percentageGreen,
      percentageYellow,
    } = await this.imageProcessor.processImage(originalImgModel.uri);

    this.setState({
      loading: false,
    });

    this.props.navigation.navigate('Imagen', {
      originalImage: originalImgModel,
      processedImage: new ImageModel(
        img,
        originalImgModel.height,
        originalImgModel.width,
      ),
      shouldRotate: originalImgModel.width < originalImgModel.height,
      percentageGreen: percentageGreen,
      percentageYellow: percentageYellow,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#20d2bb',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: mainThemeColor(0.3),
  },
  cardContainer: {
    flex: 1,
    padding: 25,
  },
  icon: {
    fontSize: 64,
    width: 'auto',
    color: 'rgba(31, 47, 51, 1)',
  },
  descText: {
    color: 'rgb(26, 40, 43)',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
});
