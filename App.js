import React, {PureComponent} from 'react';
import CameraView from './src/core/components/CameraView';
import {GalleryPicker} from './src/core/components/GalleryPicker';
import {Home} from './src/core/components/Home';
class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Home />
      </>
    );
  }
}

export default App;
