import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export interface VisitDataType {
  x: string;
  y: number;
}

export type SearchDataType = {
  index: number
  name: string;
  salesData: DataItem[];
  salesPieData: DataItem[];
};

export type OfflineDataType = {
  name: string;
  cvr: number;
  data: DataItem[] ;
};

export interface OfflineChartData {
  date: string;
  type: string;
  value: number;
}

export type RadarData = {
  name: string;
  label: string;
  value: number;
};

export interface AnalysisData {
  visitData: DataItem[];
  visitData2: DataItem[];
  salesData: DataItem[];
  searchData: SearchDataType[];
  salesTypeData: DataItem[];
  salesTypeDataOnline: DataItem[];
  salesTypeDataOffline: DataItem[];
  radarData: RadarData[];
}
