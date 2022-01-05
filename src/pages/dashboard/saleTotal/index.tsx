import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import SalesCard from './components/SalesCard';
import OfflineData from './components/OfflineData';
import { useRequest } from 'umi';
import type { AnalysisData } from './data';

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};


const SaleTotal: FC<AnalysisProps> = () => {
  const [currentTabKey, setCurrentTabKey] = useState<string>('');

  const { loading, data } = useRequest({
    url: '/api/saleTotal',
    method: 'get',
  });

  for (const key in data?.offlineData) {
    if (Object.prototype.hasOwnProperty.call(data?.offlineData, key)) {
      data.offlineData[key].data = eval(data?.offlineData[key].data);
    }
  }

  for (const key in data?.monthData) {
    if (Object.prototype.hasOwnProperty.call(data?.monthData, key)) {
      data.monthData[key].salesData = eval(data?.monthData[key].salesData);
      data.monthData[key].salesPieData = eval(data?.monthData[key].salesPieData);
    }
  }

  const handleTabChange = (key: string) => {
    setCurrentTabKey(key);
  };

  const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';
  return (
    <>
      <GridContent>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense>
        <br />
        <Suspense fallback={null}>
          <SalesCard
            loading={loading}
            monthData={data?.monthData || []}
            date={data?.date || []}
          />
        </Suspense>
      </GridContent>
    </>
  );
};


export default SaleTotal;
