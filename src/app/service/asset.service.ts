import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AssetList} from '../models/AssetList';
import {Observable} from 'rxjs';
import {AssetData} from '../models/AssetData';
import {AssetDto} from '../models/AssetDto';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  baseurl = 'http://localhost:8080/visitor/asset';

  constructor(private httpClient: HttpClient) {
  }

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getPendingAssetRequest(empId: string): Observable<AssetList[]> {
    const url = this.baseurl + '/pendingAssetRequest/' + empId;
    return this.httpClient.get<AssetList[]>(url);
  }

  approveOrRejectAssetRequestMultiple(assetRequest: AssetList[]) {
    const body = JSON.stringify(assetRequest);
    return this.httpClient.post<boolean>(this.baseurl + '/approveOrRejectRequest', body, this.options);
  }

  getAssetList(empId: string): Observable<AssetData[]> {
    const url = this.baseurl + '/view-assetList/' + empId;
    return this.httpClient.get<AssetData[]>(url);
  }

  getAssetListForOdcManager(empId: string): Observable<AssetList[]> {
    const url = this.baseurl + '/assetList/' + empId;
    return this.httpClient.get<AssetList[]>(url);
  }

  getSearchList(serialNumber: string): Observable<AssetData[]> {
    return this.httpClient.get<AssetData[]>(this.baseurl + '/assetTraker/' + serialNumber);
  }

}
