import React, {useState, useEffect, useCallback} from 'react';
import Error from './Error';
import Spinner from './Spinner';
import {useSelector} from 'react-redux';
import {getConnection} from '../persistence';
import {getBillingInfo} from '../awsconnect';
import Billing from './Billing';

const BillingContainer = ({navigation, route}) => {
  const DATA_NOT_LOADED = 0;
  const DATA_LOADED = 1;
  const DATA_LOADING_FAILED = 2;

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [dataLoadingStatus, setDataLoadingStatus] = useState(DATA_NOT_LOADED);
  const [refreshing, setRefreshing] = React.useState(false);

  const currentRegion = useSelector(state => state.settings.region);

  useEffect(() => {
    // report to journey
  }, []);

  const loadData = async region => {
    try {
      setDataLoadingStatus(DATA_NOT_LOADED);
      const conn = await getConnection();
      const billing = await getBillingInfo(
        region,
        conn.accessKeyId,
        conn.secretAccessKey,
      );
      setData(billing);
      setDataLoadingStatus(DATA_LOADED);
    } catch (err) {
      setError(JSON.stringify(err, null, 1));
      setDataLoadingStatus(DATA_LOADING_FAILED);
      // TODO: reportErrorLoadingLambdaDetails();
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
      return (
        <Billing
          billingData={data}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      );
    case DATA_LOADING_FAILED:
      return <Error error={error} />;
  }
};

export default BillingContainer;
