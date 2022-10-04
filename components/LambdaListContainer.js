import React, {useState, useEffect, useCallback} from 'react';
import {listLambdas, getMetricData} from '../awsconnect';
import LambdaList from './LambdaList';
import Error from './Error';
import Spinner from './Spinner';
import {useSelector} from 'react-redux';
import EmptyState from './EmptyState';
import {getConnection} from '../persistence';
import {reportErrorLoadingLambdaList} from '../journeyconnector';

const LambdaListContainer = ({navigation}) => {
  const DATA_NOT_LOADED = 0;
  const DATA_LOADED = 1;
  const DATA_LOADING_FAILED = 2;

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [dataLoadingStatus, setDataLoadingStatus] = useState(DATA_NOT_LOADED);
  const [refreshing, setRefreshing] = React.useState(false);

  const currentRegion = useSelector(state => state.settings.region);
  const order = useSelector(state => state.settings.order);

  const loadData = async (region, order) => {
    try {
      setDataLoadingStatus(DATA_NOT_LOADED);
      const conn = await getConnection();
      const lambdas = await listLambdas(
        region,
        conn.accessKeyId,
        conn.secretAccessKey,
        order,
      );
      let metricData = [];
      if (lambdas.length > 0) {
        metricData = await getMetricData(
          region,
          lambdas,
          conn.accessKeyId,
          conn.secretAccessKey,
          order,
        );
      }
      setData(metricData);
      setDataLoadingStatus(DATA_LOADED);
    } catch (err) {
      setError(JSON.stringify(err, null, 1));
      setDataLoadingStatus(DATA_LOADING_FAILED);
      reportErrorLoadingLambdaList();
    }
  };

  useEffect(() => {
    loadData(currentRegion, order);
  }, [currentRegion, order]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData(currentRegion, order).then(_ => {
      setRefreshing(false);
    });
  }, [currentRegion, order]);

  const errorAdvise = `Make sure the account is correct and has AWSLambda_ReadOnlyAccess permissions.

If you want to switch to a different account, use "Settings -> Unlink account" option.`;

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
      return <Error error={error} advise={errorAdvise} />;
  }
};

export default LambdaListContainer;
