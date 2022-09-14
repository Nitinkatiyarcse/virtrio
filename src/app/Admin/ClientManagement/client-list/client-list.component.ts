import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ClientService } from 'src/app/Services/client.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList: any = {};
  noRecordFound = false;
  inputModel: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    order: [0, 'desc'],
    // columnDefs: [{
    //   targets: [0, 2],
    //   orderable: false
    // }]
  };
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private localStorage: LocalStorageService,
    public getterSetterService: GetterSetterService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.localStorage.set('isEventSelected', 'false');
    this.getClients();
  }

  ngOnInit(): void {
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getClients() {
    this.clientService.getAllClientsByLastModifieddate().subscribe((res) => {
      if (res.isSuccess) {
        this.noRecordFound = false;
        this.clientList = res.clients;
        // this.dtOptions = {
        //   pagingType: 'full_numbers',
        //   pageLength: 10,
        //   processing: true,
        //   order: [1, 'desc'],
        //   columnDefs: [{
        //     targets: [0],
        //     orderable: false
        //   }]
        // };
        this.dtTrigger.next();
      } else {
        this.noRecordFound = true;
      }

    });

  }

  deleteClient(client) {
    Swal.fire({
      title: new SweetAlertMessage(this.translate).sweetAlertDeleteMessage,
      text: new SweetAlertMessage(this.translate).sweetAlertDeleteSubMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: new SweetAlertMessage(this.translate).sweetAlertYesDeleteItButton,
      cancelButtonText: new SweetAlertMessage(this.translate).sweetAlertNoKepitButton
    }).then((result) => {

      if (result.value) {
        this.spinner.show();
        this.inputModel.clientId = client.clientId;
        this.inputModel.modifiedBy = this.localStorage.get('UserId');
        this.clientService.deleteClient(this.inputModel).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire(
              'Deleted successfully',
              res.message,
              'success'
            );
            this.clientService.getAllClientsByLastModifieddate().subscribe((innerRes) => {
              if (innerRes.isSuccess) {
                this.noRecordFound = false;
                this.clientList = innerRes.clients;
              } else {
                this.noRecordFound = true;
              }
            });
            this.spinner.hide();
            // Swal.fire({
            //   title: new SweetAlertMessage(this.translate).success,
            //   text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
            //   icon: 'success'
            // });
          } else {
            this.spinner.hide();
            // Swal.fire({
            //   title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            //   text: res.message,
            //   icon: 'error'
            // });
            Swal.fire(
              'Error',
              res.message,
              'error'
            );
          }
        });
      }
    });

  }
}
