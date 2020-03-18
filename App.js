import React, {PureComponent} from 'react';
import CameraView from './src/core/components/CameraView';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <CameraView />
      </>
    );
  }
}

export default App;
