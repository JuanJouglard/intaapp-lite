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
} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {ImagePickerService} from '../../shared/services/imagePickerService';
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
        <Header style={{backgroundColor: '#1f2f33'}}>
          <Left />
          <Body>
            <Title>INTA</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.container}>
          <View style={styles.cardContainer}>
            <CardItem
              style={styles.card}
              header
              button
              onPress={this.launchCamera}>
              <Icon
                type="FontAwesome5"
                name="camera-retro"
                style={styles.icon}
              />
              <Text style={styles.descText}>TOMAR UNA FOTO CON LA CAMARA</Text>
            </CardItem>
          </View>
          <View style={styles.cardContainer}>
            <CardItem
              style={styles.card}
              header
              button
              onPress={this.launchGallery}>
              <Icon name="upload" type="AntDesign" style={styles.icon} />
              <Text style={styles.descText}>
                SELECCIONAR UNA FOTO DE LA GALERIA
              </Text>
            </CardItem>
          </View>
        </Content>
      </Container>
    );
  }

  launchCamera = async () => {
    const uriImage = await this.picker.getImageFromCamera();
    this.routeToImageView(uriImage);
  };

  async routeToImageView(uriImage) {
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
  }

  launchGallery = async () => {
    const uriImage = await this.picker.getImageFromGallery();
    this.routeToImageView(uriImage);
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
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(31, 47, 51, 0.3)',
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
