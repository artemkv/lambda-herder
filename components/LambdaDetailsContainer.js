import React, {useState, useEffect, useCallback} from 'react';
import {getLogs} from '../awsconnect';
import LambdaDetails from './LambdaDetails';
import Error from './Error';
import Spinner from './Spinner';
import {useSelector} from 'react-redux';
import {getConnection} from '../persistence';
import {
  reportErrorLoadingLambdaDetails,
  reportNavigateToLambdaDetails,
} from '../journeyconnector';

const LambdaDetailsContainer = ({navigation, route}) => {
  const DATA_NOT_LOADED = 0;
  const DATA_LOADED = 1;
  const DATA_LOADING_FAILED = 2;

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [dataLoadingStatus, setDataLoadingStatus] = useState(DATA_NOT_LOADED);
  const [refreshing, setRefreshing] = React.useState(false);

  const currentRegion = useSelector(state => state.settings.region);

  useEffect(() => {
    reportNavigateToLambdaDetails();
  }, []);

  const loadData = async (region, lambdaName) => {
    try {
      setDataLoadingStatus(DATA_NOT_LOADED);
      const conn = await getConnection();
      const logs = await getLogs(
        region,
        lambdaName,
        conn.accessKeyId,
        conn.secretAccessKey,
      );
      setData(logs);
      setDataLoadingStatus(DATA_LOADED);
    } catch (err) {
      setError(JSON.stringify(err, null, 1));
      setDataLoadingStatus(DATA_LOADING_FAILED);
      reportErrorLoadingLambdaDetails();
    }
  };

  useEffect(() => {
    loadData(currentRegion, route.params.name);
  }, [currentRegion, route.params.name]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData(currentRegion, route.params.name).then(_ => {
      setRefreshing(false);
    });
  }, [currentRegion, route.params.name]);

  switch (dataLoadingStatus) {
    case DATA_NOT_LOADED:
      return <Spinner />;
    case DATA_LOADED:
      return (
        <LambdaDetails
          data={route.params}
          log={data}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      );
    case DATA_LOADING_FAILED:
      return <Error error={error} />;
  }
};

export default LambdaDetailsContainer;
