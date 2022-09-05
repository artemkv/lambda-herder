import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  StatusBar,
  Text,
} from 'react-native';
import {flowNeedAcceptance} from '../state/actions';
import {useDispatch} from 'react-redux';
import {clearAcceptance, clearConnection} from '../persistence';
import {reportUnlinkAccount} from '../journeyconnector';
import theme from './theme';

const Settings = props => {
  const dispatch = useDispatch();

  const unlinkAccount = async _ => {
    await clearAcceptance();
    await clearConnection();
    reportUnlinkAccount();
    dispatch(flowNeedAcceptance());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ff6f00" />
      <View style={styles.buttonContainer}>
        <Button
          title="Unlink Account"
          style={styles.button}
          onPress={unlinkAccount}
        />
      </View>
      <Text style={styles.hint}>
        Removes saved Access Key ID and Secret Access Key, and cleares the
        Privacy Policy acceptance.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
    flex: 1,
  },
  hint: {
    marginHorizontal: 32,
    color: theme.color.font,
  },
  buttonContainer: {
    margin: 16,
  },
  button: {},
});

export default Settings;
