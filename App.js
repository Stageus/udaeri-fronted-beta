import React from 'react';

import StorePage from './src/Screens/StorePage';
import StoreList from './src/Screens/StoreList';
import MiddleCat from './src/Screens/MiddleCat';

import * as Font from 'expo-font';
Font.loadAsync({
  'Bold': require('./assets/fonts/SpoqaHanSansNeo-Bold.otf'),
  'Light': require('./assets/fonts/SpoqaHanSansNeo-Light.otf'),
  'Medium': require('./assets/fonts/SpoqaHanSansNeo-Medium.otf'),
  'Regular': require('./assets/fonts/SpoqaHanSansNeo-Regular.otf'),
  'Thin': require('./assets/fonts/SpoqaHanSansNeo-Thin.otf'),
});

export default class extends React.Component {
  state = {
    isLoading: true
  };
  componentDidMount = async () => {
    // 1,000가 1초
    setTimeout(() => { this.setState({ isLoading: false }) }, 3000);
  }

  render() {
    /*
    if (this.state.isLoading) {
      return <Loading />
    } else {
      return (
        <LargeCat></LargeCat>
      )
    }
    */
    return <MiddleCat />
  }
}