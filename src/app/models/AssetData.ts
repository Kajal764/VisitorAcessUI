import { AssetInfo } from "./AssetInfo";

export class AssetData{
    requestId:number;
    // serialNumber :string;
    // name :string;
    type :string;
    empId :string;
    odcName :string;
    reason :string;
    isCurrentOdc:boolean;
    assetCondition :string;
    fromDate :string;
    tillDate :string;
    status:string;
    assetInfos:AssetInfo[];
    // assetInfos:Array<AssetInfo>=[];
}