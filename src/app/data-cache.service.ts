import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {
  private cacheSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private cache: any = null;

  constructor(private http: HttpClient) {}

  getData(apiUrl: string): Observable<any> {
    if (!this.cache) {
      console.log('Fetching new data from API');
      this.http.get(apiUrl).pipe(
        tap(data => {
          this.cache = data;
          this.cacheSubject.next(data);
          console.log('Data cached');
        })
      ).subscribe();
    } else {
      console.log('Returning cached data');
      this.cacheSubject.next(this.cache);
    }
    return this.cacheSubject.asObservable();
  }

  hasCache(): boolean {
    console.log('Cache exists:', !!this.cache);
    return !!this.cache;
  }

  clearCache(): void {
    this.cache = null;
    this.cacheSubject.next(null);
    console.log('Cache cleared');
  }
}
