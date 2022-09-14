import { Component, OnInit } from '@angular/core';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  eventDetails: any = {};
  constructor(private getterSetterService: GetterSetterService) {

  }

  ngOnInit(): void {
    this.getterSetterService.eventDetails.subscribe(res => {
      this.eventDetails = res.event;

    });
  }
}
