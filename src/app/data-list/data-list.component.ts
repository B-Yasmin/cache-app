import { Component, OnInit } from '@angular/core';
import { DataCacheService } from '../data-cache.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  data: any;
  hasCache: boolean = false;

  constructor(private dataCacheService: DataCacheService) {}

  ngOnInit(): void {
    this.checkCache();
    this.loadData();
  }

  loadData(): void {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    this.dataCacheService.getData(apiUrl).subscribe(
      data => {
        this.data = data;
        this.checkCache();
        console.log('Data loaded:', this.data);
      },
      error => console.error('Error fetching data', error)
    );
  }

  checkCache(): void {
    this.hasCache = this.dataCacheService.hasCache();
    console.log('Check cache status:', this.hasCache);
  }

  clearCache(): void {
    this.dataCacheService.clearCache();
    this.checkCache();
    // Här kan vi vänta en kort stund innan vi laddar om data för att se till att cachen är rensad.
    setTimeout(() => {
      this.loadData(); // Ladda om datan efter att cachen har rensats
    }, 2000000); // 100 ms fördröjning
  }
}
