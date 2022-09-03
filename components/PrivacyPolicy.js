import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Button,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const PrivacyPoLicy = props => {
  const [isAccepted, setAccepted] = useState(props.isAccepted);

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#ff6f00" />
      <Text style={styles.h1}>Privacy Policy</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>Effective as of January 1st, 2022</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        This policy explains how "Monitor Lambda Functions" mobile application
        collects, stores, uses, transfers and shares Personal Data from its
        users.
      </Text>
      <Text style={styles.text} />
      <Text style={styles.h1}>Data We Collect about You</Text>
      <Text style={styles.text} />
      <Text style={styles.h2}>Personal Data</Text>
      <Text style={styles.text}>
        "Monitor Lambda Functions" does not require sign in, so we don't ask for
        any identifying data, such as user name or email address.
      </Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        To use the app, you may choose to provide the following data:
      </Text>
      <Text style={styles.text}>- accessKeyId for your AWS Account;</Text>
      <Text style={styles.text}>- secretAccessKey for your AWS Account;</Text>
      <Text style={styles.text}>
        This data is necessary to perform the application functions, which is
        monitoring your lambda functions deployed in AWS Cloud. These keys is
        stored in the the directory for application support files and never
        transferred outside of your device.
      </Text>
      <Text style={styles.text} />
      <Text style={styles.h2}>Usage Data</Text>
      <Text style={styles.text}>
        When you use the app, we collect anonymous statistics about your use of
        the app:
      </Text>
      <Text style={styles.text}>- Frequency of use;</Text>
      <Text style={styles.text}>- Features of the app that you use.</Text>
      <Text style={styles.text}>
        We use use Journey3: Anonymous Mobile Analytics Platform
        (https://journey3.net/) which requires storing temporary data related to
        the current session on your device, in the the directory for application
        support files.
      </Text>
      <Text style={styles.text} />
      <Text style={styles.h1}>Use of Your Personal Data</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        We use your Personal Data for the following purposes:
      </Text>
      <Text style={styles.text}>- To provide and maintain our services;</Text>
      <Text style={styles.text}>
        We don't share any of your Personal Data with any third parties.
      </Text>
      <Text style={styles.text} />
      <Text style={styles.h1}>Retention of Your Personal Data</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        We will retain your Personal Data only for as long as is necessary for
        the purposes set out in this Privacy Policy.
      </Text>
      <Text style={styles.text} />
      <Text style={styles.h1}>Security of Your Personal Data</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        The access keys are stored in the the directory for application support
        files and never transferred outside of your device. However, we cannot
        prevent this data from being accessed in case of unauthorized access to
        your device. To avoid any damage, use the access key that provides
        read-only access to your AWS Account and disable the key if the device
        gets lost or stolen.
      </Text>
      <Text style={styles.text} />
      <Text style={styles.h1}>Your Rights under the GDPR</Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        - The right to access, update or delete the information we have on you;
      </Text>
      <Text style={styles.text}>
        - Request correction of the Personal Data that we hold about you;
      </Text>
      <Text style={styles.text}>
        - Object to processing of your Personal Data;
      </Text>
      <Text style={styles.text}>- Request erasure of your Personal Data;</Text>
      <Text style={styles.text}>
        - Request the transfer of your Personal Data;
      </Text>
      <Text style={styles.text}>- Withdraw Your consent.</Text>
      <Text style={styles.text} />
      <Text style={styles.h1}>
        Exercising of Your GDPR Data Protection Rights
      </Text>
      <Text style={styles.text} />
      <Text style={styles.text}>
        You may access and modify the access keys at any moment using
        application settings screen.
      </Text>
      <Text style={styles.text} />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isAccepted}
          onValueChange={setAccepted}
          style={styles.checkbox}
        />
        <Text style={styles.label}>
          I have read and accepted the Privacy Policy.
        </Text>
      </View>
      <View style={styles.acceptButtonContainer}>
        <Button
          title="Continue to the app"
          disabled={!isAccepted}
          style={styles.acceptButton}
          onPress={props.onPolicyAccepted}
        />
      </View>
      <Text style={styles.text} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
    marginVertical: 16,
  },
  label: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
  acceptButtonContainer: {
    marginVertical: 16,
  },
  acceptButton: {},
});

export default PrivacyPoLicy;
