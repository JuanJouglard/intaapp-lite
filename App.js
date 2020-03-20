import React, {PureComponent} from 'react';
import {Home} from './src/core/components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageView} from './src/core/components/ImageView';

const Stack = createStackNavigator();
class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Imagen" component={ImageView} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
