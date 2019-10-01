import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apisettings } from '../common';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public allannouncements: UserAnnouncements[];


  constructor(private http: HttpClient) {
    http.get<UserAnnouncements[]>(apisettings.baseUrl + '/api/annoucemnents/').subscribe(result => {
      this.allannouncements = result;
    }, error => console.error(error),);
  }
}

interface UserAnnouncements {
  userId: string;
  announcements: Announcement[];
}

interface Announcement {
  url: string;
  description: string;
}
