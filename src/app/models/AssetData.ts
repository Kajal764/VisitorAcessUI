import {AssetInfo} from './AssetInfo';

export class AssetData {
  requestId: number;
  serialNumber: string;
  name: string;
  empId: string;
  type: string;
  odcName: string;
  reason: string;
  assetCondition: string;
  fromDate: Date;
  tillDate: Date;
  status: string;
  isCurrentOdc: boolean;
  assetInfos: AssetInfo[];
}
