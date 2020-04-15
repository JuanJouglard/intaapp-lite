import React, {PureComponent} from 'react';
import {Tour} from './src/guided-tour/Tour';
import {Home} from './src/core/components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageView} from './src/core/components/ImageView';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }
  async componentDidMount() {
    let oldUser = await AsyncStorage.getItem('@OldUser');
    this.setState({
      showRealApp: oldUser,
    });
  }

  _onDone = () => {
    this.setState({showRealApp: true});
    AsyncStorage.setItem('@OldUser', 'true');
  };

  render() {
    if (this.state.showRealApp) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Imagen"
              component={ImageView}
              options={{
                headerStyle: {
                  elevation: 0,
                  backgroundColor: '#1f2f33',
                },
                headerTintColor: '#f5f7f7',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return <Tour onDone={this._onDone} />;
    }
  }
}

export default App;
