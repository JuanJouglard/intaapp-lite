import React, {Component} from 'react';
import {
  CardItem,
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import {ImagePickerService} from '../../shared/services/imagePickerService';
import {StyleSheet} from 'react-native';

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
            <Text>Tomar una foto con la camara</Text>
          </CardItem>
          <CardItem
            style={styles.card}
            header
            button
            onPress={this.launchGallery}>
            <Text>Seleccionar foto de la galeria</Text>
          </CardItem>
        </Content>
      </Container>
    );
  }

  launchCamera = () => {
    this.picker.getImageFromCamera();
  };

  launchGallery = () => {
    this.picker.getImageFromGallery();
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
  },
});
