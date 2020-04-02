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
import {StyleSheet} from 'react-native';
import {ImagePickerService} from '../../shared/services/imagePickerService';
import {ImageProcessor} from '../../shared/services/imageProcessor';
import {mainThemeColor} from '../../configuration/colors';

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
              <View style={styles.cardContainer}>
                <CardItem
                  style={styles.card}
                  header
                  button
                  onPress={this.launch('Camera')}>
                  <Icon
                    type="FontAwesome5"
                    name="camera-retro"
                    style={styles.icon}
                  />
                  <Text style={styles.descText}>
                    TOMAR UNA FOTO CON LA CAMARA
                  </Text>
                </CardItem>
              </View>
              <View style={styles.cardContainer}>
                <CardItem
                  style={styles.card}
                  header
                  button
                  onPress={this.launch('Gallery')}>
                  <Icon name="upload" type="AntDesign" style={styles.icon} />
                  <Text style={styles.descText}>
                    SELECCIONAR UNA FOTO DE LA GALERIA
                  </Text>
                </CardItem>
              </View>
            </>
          )}
        </Content>
      </Container>
    );
  }

  launch = picker => async () => {
    this.setState({loading: true});
    try {
      const {uri, width, height} = await this.picker['getImageFrom' + picker]();
      this.routeToImageView(uri, width < height);
    } catch (error) {
      console.log(error);
    }
  };

  async routeToImageView(uriImage, shouldRotate) {
    const {
      img,
      percentageGreen,
      percentageYellow,
    } = await this.imageProcessor.processImage(uriImage);

    this.setState({
      loading: false,
    });

    this.props.navigation.navigate('Imagen', {
      image: img,
      originalImage: uriImage,
      shouldRotate: shouldRotate,
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
