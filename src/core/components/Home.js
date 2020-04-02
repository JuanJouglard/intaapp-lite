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
import {ImagePickerService} from '../../shared/services/imagePickerService';
import {ImageProcessor} from '../../shared/services/imageProcessor';

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
      showRealApp: false,
    };
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  _onDone = () => {
    this.setState({showRealApp: true});
  };
  _onSkip = () => {
    this.setState({showRealApp: true});
  };
  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    if (this.state.showRealApp) {
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
            {this.state.loading ? (
              <Spinner color="#1f2f33" />
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
    } else {
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      );
    }
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
    // backgroundColor: '#20d2bb',
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
  // ESTILOS PARA EL SLIDER
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 's1',
    title: 'Usá tu cámara',
    text:
      'Sacá una foto y obtene al instante el cubrimiento del suelo. Tendrás el porcentaje de material vegetal (vivo o muerto) y también el de suelo desnudo',
    image: require('../../guided-tour/assets/prueba12.jpg'),
    // uri:
    //   'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    backgroundColor: '#3395ff',
    // backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'O elegí de tu galería',
    text: 'Podes seleccionr fotos viejas o sacadas por otra persona',
    image: require('../../guided-tour/assets/pruebaalgo.jpeg'),
    // image: {
    //   uri:
    //     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    // },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
    },
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    text: ' 10% off on first Train booking',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
];
