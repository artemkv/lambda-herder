/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWithStore from './AppWithStore';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

AppRegistry.registerComponent(appName, () => AppWithStore);
