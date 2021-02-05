import {AssetInfo} from './AssetInfo';

export class AssetData {
  requestId: number;
  serialNumber: string;
  description: string;
  empId: string;
  type: string;
  odcName: string;
  fromDate: Date;
  tillDate: Date;
  status: string;
  currentOdc: boolean;
  movement: string;
  requestStatus: string;
  assetInfos: AssetInfo[];
}
