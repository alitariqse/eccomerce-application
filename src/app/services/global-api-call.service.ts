import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GlobalApiCallService {
    keys: any = [];
    urlsArray: any = [];
    constructor(private httpClient: HttpClient) {
    }


    postRequest(apiUrl: any, requestBody: any): Observable<any> {
        return this.httpClient.post<any>(apiUrl, requestBody);
    }


    postRequestWithBlob(apiUrl: any, requestBody: any, type?: any): Observable<any> {
        return this.httpClient.post(apiUrl, requestBody, { responseType: 'blob' })
            .pipe(
                map(res => new Blob([res], { type }))
            );
    }

    getRequestWithBlob(apiUrl: any, type?: any): Observable<any> {
        return this.httpClient.get(apiUrl, { responseType: 'blob' })
            .pipe(
                map(res => new Blob([res], { type }))
            );
    }

    putRequest(apiUrl: any, requestBody: any) {
        return this.httpClient.put<any>(apiUrl, requestBody);
    }

    getRequest(apiUrl: any, params?: any): Observable<any> {
        return this.httpClient.get<any>(apiUrl, { params });
    }

    deleteRequest(apiUrl: any, params?: any): Observable<any> {
        return this.httpClient.delete<any>(apiUrl, { params });
    }

}