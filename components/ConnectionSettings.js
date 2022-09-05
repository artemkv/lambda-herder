import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
} from 'react-native';
import theme from './theme';

const ConnectionSettings = props => {
  const [accessKeyId, setAccessKeyId] = useState(props.accessKeyId);
  const [secretAccessKey, setSecretAccessKey] = useState(props.secretAccessKey);

  const [buttonText, setButtonText] = useState('Continue to the app');

  useEffect(() => {
    setButtonText(
      accessKeyId && secretAccessKey
        ? 'Continue to the app'
        : 'Continue with demo data',
    );
  }, [accessKeyId, secretAccessKey]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ff6f00" />
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Access Key ID</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable
            placeholder="Your Access Key ID"
            placeholderTextColor={theme.color.placeholder}
            value={accessKeyId}
            onChangeText={setAccessKeyId}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Secret Access Key</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable
            placeholder="Your Secret Access Key"
            placeholderTextColor={theme.color.placeholder}
            value={secretAccessKey}
            onChangeText={setSecretAccessKey}
          />
        </View>
        <Text style={styles.hint}>
          We recommend using a dedicated account with AWSLambda_ReadOnlyAccess
          permissions.
        </Text>
        <Text style={styles.hint}>
          If you leave one of these fields empty, if will see the randomly
          generated demo data.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={buttonText}
          style={styles.button}
          onPress={() =>
            props.onConnectionConfigured(accessKeyId, secretAccessKey)
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
  },
  labelContainer: {},
  label: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 4,
    fontSize: 22,
    fontWeight: '600',
    color: theme.color.font,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    color: theme.color.font,
  },
  hint: {
    marginHorizontal: 32,
    marginVertical: 16,
    color: theme.color.font,
  },
  buttonContainer: {
    margin: 16,
  },
  button: {},
});

export default ConnectionSettings;
