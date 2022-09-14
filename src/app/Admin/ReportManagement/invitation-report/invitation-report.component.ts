import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, GridApi } from 'ag-grid-enterprise';
import { GridReadyEvent } from 'ag-grid-community';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { formatDate } from '@angular/common';
import { ReportService } from 'src/app/Services/report.service';



@Component({
  selector: 'app-invitation-report',
  templateUrl: './invitation-report.component.html',
  styleUrls: ['./invitation-report.component.css']
})
export class InvitationReportComponent implements OnInit {

  eventName: string;
  eventId: string;
  noRecordFound = false;
  primaryAttendeeData: any = [];
  cellRenderer: any;
  fromDate: any;
  toDate: any;
  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions:any={};// DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();
  // getbyIdViewModel: any = {};
  getbyIdViewModel: any = {};
  attendeeData: any;
  registration: any;
  inviteDate: any;
  rowData: any;
  private gridApi!: GridApi;



  public columnDefs: ColDef[] = [
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1", sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 100, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'from', rowDrag: true, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    {
      field: 'to', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },
    {
      field: 'attendees', valueGetter(params) {
        return params.data.attendees.firstName + ' ' + params.data.attendees.lastName;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',
          },

          {
            filter: true,
          },
        ],
      },

    },
    {
      field: 'eventName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },
    {
      field: 'personalMessage', sortable: true, filter: 'agMultieColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',
          },

          {
            filter: true,
          },
        ],
      },

    },
    {
      field: 'inviteDate', cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleString() : ' ';
      }, sortable: true, enableRowGroup: true,
      enablePivot: true, filter: 'agDateColumnFilter', resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agMultieColumnFilter',
          },
          {
            filter: true,
          },
        ],
      },

    },
    {
      field: 'mobile', valueGetter(params) {
        return params.data.attendees.mobile;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },
    {
      field: 'registeredFrom', valueGetter(params) {
        return params.data.attendees.registeredFrom;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },

    {
      field: 'countryCode', valueGetter(params) {
        return params.data.attendees.countryCode;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },
    {
      field: 'isActive', valueGetter: params => {
        if (params.data.isActive === true) {
          return 'Yes';
        } else if (params.data.isActive === false) {
          return 'No';
        } else if (params.data.attendees) {
          return params.data.attendees.isActive;
        }

      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    {
      field: 'registerDate', valueGetter(params) {
        return params.data.attendees.registerDate;
      }, cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleString() : ' ';
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      },
    },
    {
      field: 'isEmailVerified', valueGetter(params) {
        return params.data.attendees.isEmailVerified;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },





  ];
  gridColumnApi: any;



  constructor(public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private localStorage: LocalStorageService,
    private attendeeService: AttendeesService,
    private reportService: ReportService



  ) {
    // this.eventId = this.route.snapshot.paramMap.get('id');
    // this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('id');
    // this.eventName = this.localStorage.get('EventName');
    // this.fromDate=new Date('2020-01-01');
    // this.toDate=new Date('2023-01-01');
    // this.getInvitation();

  }


  onBtnExport() {
    this.gridApi.exportDataAsExcel();
  }
  // hide() {
  //   this.gridColumnApi.setColumnsVisible(['inviteDate', 'mobile', 'registeredFrom'], false);
  // }

  // show() {
  //   this.gridColumnApi.setColumnsVisible(['inviteDate', 'mobile', 'registeredFrom'], true);
  // }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.fromDate = new Date('2020-01-01');
    this.toDate = new Date('2023-01-01');
    this.registration = '';
    this.getInvitation()


  }

  getInvitation() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getInvitation(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.invitationReports);
        this.attendeeData = res.invitationReports;
        this.primaryAttendeeData = res.invitationReports;
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
        this.rowData = res.invitationReports;
        console.log(this.rowData);
        // if (this.dtElement.dtInstance) {
        //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //     dtInstance.destroy();
        //     this.dtTrigger.next();
        //   });
        // } else {
        //   this.spinner.hide();
        //   this.dtTrigger.next();
        // }
      } else {
        this.spinner.hide();
        this.noRecordFound = true;
      }
    });
  }

  getValues() {
    const dta = this.primaryAttendeeData;
    this.attendeeData = dta.filter(u => u.registerDate > (this.fromDate));
  }
  getToDateValues() {
    const dta = this.primaryAttendeeData;
    this.attendeeData = dta.filter(u => u.registerDate > (this.toDate));
  }



  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   dom: 'Bfrtip',
    //     buttons: [
    //         'copy', 'csv', 'excel', 'print'
    //     ]
    // };


  }



  //   rerender(): void {
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       // Destroy the table first
  //       dtInstance.destroy();
  //       // Call the dtTrigger to rerender again
  //       this.dtTrigger.next();
  //     });
  //   }

}

