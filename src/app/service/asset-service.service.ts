import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetList } from '../models/AssetList';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetServiceService {

  baseurl = 'http://localhost:8080/visitor/asset';

  constructor(private httpClient: HttpClient) {}

   options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getPendingAssetRequest(): Observable<AssetList[]> {
    const url = this.baseurl + '/pendingAssetRequest';
    return this.httpClient.get<AssetList[]>(url);
  }

  approveOrRejectAssetRequestMultiple(assetRequest: AssetList[]) {
    const body = JSON.stringify(assetRequest);
    return this.httpClient.post<boolean>(this.baseurl + '/approveOrRejectRequest', body, this.options);
  }
  getAssetList(empId:string): Observable<AssetList[]> {
    const url = this.baseurl + '/view-assetList/'+empId;
    return this.httpClient.get<AssetList[]>(url);
  }
  getAssetListForOdcManager(empId:string): Observable<AssetList[]> {
    const url = this.baseurl + '/assetList/'+empId;
    return this.httpClient.get<AssetList[]>(url);
  }
}
