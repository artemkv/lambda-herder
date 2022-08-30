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

const Settings = props => {
  const dispatch = useDispatch();

  const unlinkAccount = async _ => {
    await clearAcceptance();
    await clearConnection();
    dispatch(flowNeedAcceptance());
  };

  return (
    <SafeAreaView>
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
  hint: {
    marginHorizontal: 32,
  },
  buttonContainer: {
    margin: 16,
  },
  button: {},
});

export default Settings;
