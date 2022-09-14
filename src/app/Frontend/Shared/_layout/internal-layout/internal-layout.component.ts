import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/Services/session-storage.service';

@Component({
  selector: 'app-internal-layout',
  templateUrl: './internal-layout.component.html',
  styleUrls: ['./internal-layout.component.css']
})
export class InternalLayoutComponent implements OnInit {

  eventId: any = '';
  constructor(
    private sessionStorageService: SessionStorageService
  ) {
    this.eventId = this.sessionStorageService.get('eventId');
  }

  ngOnInit(): void {
  }

}
