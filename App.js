import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {initialize} from 'journey3-react-native-sdk';
import Splash from './components/Splash';
import PrivacyPolicy from './components/PrivacyPolicy';
import ConnectionSettings from './components/ConnectionSettings';
import AppNavigation from './components/AppNavigation';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAcceptance,
  saveAcceptance,
  getConnection,
  saveConnection,
} from './persistence';
import {
  SPLASH,
  NEED_ACCEPTANCE,
  NEED_CONNECTION,
  ALL_GOOD,
} from './state/constants';
import {
  flowNeedAcceptance,
  flowNeedConnection,
  flowAllGood,
} from './state/actions';
import {jj} from './util';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const App = () => {
  useEffect(() => {
    initialize(
      'e04b43c9-69c1-4172-9dfd-a3ef1aa17d5e',
      '9d6261fe-e565-47bf-8a83-6ee801f43d43',
      '1.0',
      false,
    );
  }, []);

  const flowState = useSelector(state => state.flowState);
  const dispatch = useDispatch();

  const [connection, setConnection] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });

  const handleAcceptance = acc => {
    if (!acc.status) {
      dispatch(flowNeedAcceptance());
      return;
    }
    return getConnection().then(handleConnection);
  };

  const handleConnection = conn => {
    setConnection(conn);
    if (!conn.accessKeyId || !conn.secretAccessKey) {
      dispatch(flowNeedConnection());
      return;
    }
    dispatch(flowAllGood());
  };

  useEffect(() => {
    if (flowState === SPLASH) {
      wait(2000).then(getAcceptance).then(handleAcceptance);
    }
  }, [flowState]);

  const onPolicyAccepted = () => {
    saveAcceptance({
      status: true,
    })
      .then(getConnection)
      .then(handleConnection);
  };

  const onConnectionConfigured = (accessKeyId, secretAccessKey) => {
    saveConnection({
      accessKeyId,
      secretAccessKey,
    }).then(_ => {
      dispatch(flowAllGood());
      return;
    });
  };

  switch (flowState) {
    case SPLASH:
      return <Splash />;
    case NEED_ACCEPTANCE:
      return (
        <PrivacyPolicy isAccepted={false} onPolicyAccepted={onPolicyAccepted} />
      );
    case NEED_CONNECTION:
      return (
        <ConnectionSettings
          accessKeyId={connection.accessKeyId}
          secretAccessKey={connection.secretAccessKey}
          onConnectionConfigured={onConnectionConfigured}
        />
      );
    case ALL_GOOD:
      return <AppNavigation />;
  }
};

export default App;
