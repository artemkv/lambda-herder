import React, {useState, useEffect, useCallback} from 'react';
import {listLambdas, getMetricData} from '../awsconnect';
import LambdaList from './LambdaList';
import Error from './Error';
import Spinner from './Spinner';
import {useSelector} from 'react-redux';
import EmptyState from './EmptyState';
import {getConnection} from '../persistence';

const LambdaListContainer = ({navigation}) => {
  const DATA_NOT_LOADED = 0;
  const DATA_LOADED = 1;
  const DATA_LOADING_FAILED = 2;

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [dataLoadingStatus, setDataLoadingStatus] = useState(DATA_NOT_LOADED);
  const [refreshing, setRefreshing] = React.useState(false);

  const currentRegion = useSelector(state => state.settings.region);

  const loadData = async region => {
    try {
      setDataLoadingStatus(DATA_NOT_LOADED);
      const conn = await getConnection();
      const lambdas = await listLambdas(
        region,
        conn.accessKeyId,
        conn.secretAccessKey,
      );
      let metricData = [];
      if (lambdas.length > 0) {
        metricData = await getMetricData(
          region,
          lambdas,
          conn.accessKeyId,
          conn.secretAccessKey,
        );
      }
      setData(metricData);
      setDataLoadingStatus(DATA_LOADED);
    } catch (err) {
      setError(JSON.stringify(err, null, 1));
      setDataLoadingStatus(DATA_LOADING_FAILED);
    }
  };

  useEffect(() => {
    loadData(currentRegion);
  }, [currentRegion]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData(currentRegion).then(_ => {
      setRefreshing(false);
    });
  }, [currentRegion]);

  switch (dataLoadingStatus) {
    case DATA_NOT_LOADED:
      return <Spinner />;
    case DATA_LOADED:
      if (data.length === 0) {
        return <EmptyState />;
      }
      return (
        <LambdaList
          lambdas={data}
          navigation={navigation}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      );
    case DATA_LOADING_FAILED:
      return <Error error={error} />;
  }
};

export default LambdaListContainer;
