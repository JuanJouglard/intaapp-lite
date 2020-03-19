import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {NativeModules} from 'react-native';
import {ImagePickerService} from '../../shared/services/imagePickerService';
import RNFS from 'react-native-fs';

export class GalleryPicker extends Component {
  picker;

  constructor(props) {
    super(props);
    this.state = {
      base64: null,
    };
    this.picker = ImagePickerService.getInstance();
  }

  launchCamera = async () => {
    const uri = await this.picker.getImageFromCamera();
    const msg = await NativeModules.NativeOpenCV.processImage(uri);
    this.setState({base64: msg});
    RNFS.unlink(uri);
  };

  launchImageLibrary = async () => {
    const uri = await this.picker.getImageFromGallery();
    const msg = await NativeModules.NativeOpenCV.processImage(uri);
    this.setState({base64: msg});
    RNFS.unlink(uri).then(() => RNFS.scanFile(uri));
  };

  render() {
    if (this.state.base64) {
      return (
        <View style={{flex: 1}}>
          <Image
            style={{flex: 1, borderColor: 'black', borderWidth: 5, margin: 10}}
            source={{uri: `data:image/png;base64,${this.state.base64}`}}
          />
        </View>
      );
    } else {
      return (
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View style={styles.body}>
              <Text
                style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
                Pick Images from Camera & Gallery
              </Text>
              {/* <View style={styles.ImageSections}>
                <View>
                  {this.renderFileData()}
                  <Text  style={{textAlign:'center'}}>Base 64 String</Text>
                </View>
                <View>
                  {this.renderFileUri()}
                  <Text style={{textAlign:'center'}}>File Uri</Text>
                </View>
              </View> */}

              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.launchCamera}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Directly Launch Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.launchImageLibrary}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>
                    Directly Launch Image Library
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Fragment>
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },

  body: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
