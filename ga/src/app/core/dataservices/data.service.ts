import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  header: HttpHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
  ) {
    this.header.set("Content-Type", "application/octet-stream");
  }

  startLoader(info: { url: any; data?: any; isLoader?: any; }) {
    // Start loader before API call
    if (info.isLoader !== false) {
      // this.loader.start();
    }
  }

  stopLoader(info: { url: any; data?: any; isLoader?: any; }) {
    // Reset the loader
    if (info.isLoader !== false) {
      // this.loader.stop();
    }
  }

  post(info: { url: string; data: any; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    return this.http.post(info.url, info.data).pipe(
      map((res: Response) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  put(info: { url: string; data: any; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    return this.http.put(info.url, info.data).pipe(
      map((res: Response) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  get(info: { url: string; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    return this.http.get(info.url).pipe(
      map((res: Response) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  getLocal(info: { url: string; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    return this.http.get(info.url).pipe(
      map((res: Response) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  delete(info: { url: string; isLoader?: boolean; }): Observable<Response> {
    this.startLoader(info);

    return this.http.delete(info.url).pipe(
      map((res: Response) => {
        return this.extractData(res, info);
      }),
      catchError((err: Response) => {
        console.error(err);
        return this.handleErrorPromise(err, info);
      })
    );
  }

  extractData(res: Response, info: { url: string; data?: any; isLoader?: boolean; }) {
    // Complete the loader as valid response is recieved
    this.stopLoader(info);
    return res;
  }

  handleErrorPromise(errorResponse: Response | any, info: { url: string; data?: any; isLoader?: boolean; }) {
    this.stopLoader(info);

    console.log(errorResponse.error.message || errorResponse.statusText);

    return Promise.reject(errorResponse);
  }
}
