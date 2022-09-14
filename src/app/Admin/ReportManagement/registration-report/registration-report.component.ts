import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { EventsRegistrationSetsService } from 'src/app/Services/events-registration-sets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Helper } from 'src/app/Utils/Helper';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TranslateService } from '@ngx-translate/core';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { SweetAlertMessage } from '../../../Utils/SweetAlertMessages';
import { ColDef, Column, ExcelExportParams, GridApi, GridReadyEvent } from 'ag-grid-community';
import { data } from 'jquery';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


@Component({
  selector: 'app-registration-report',
  templateUrl: './registration-report.component.html',
  styleUrls: ['./registration-report.component.css']
})
export class RegistrationReportComponent implements OnInit {
  eventName: string;
  eventId: string;
  attendeeData: any = [];
  primaryAttendeeData: any = [];
  noRecordFound = false;
  allRegistrationSetsByEvent: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions: any = {};// DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();
  sweetAlertMessage: any = new SweetAlertMessage(this.translate);
  getbyIdViewModel: any = {};
  fromDate: any;
  toDate: any;
  registration: any;
  isEventInvitaion = false;
  rowData: any;
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    // {
    //   field: "profileImage",
    //   headerClass: 'bg1',
    //   sortable: true,
    //   filter: true,
    //   resizable: true,
    //   minWidth : 150,
    //   flex: 1,
    //   cellRenderer: () => `<img style="height: 35px; width: 35px;border-radius: 20px;" src="https://vemsimageblobstorage.blob.core.windows.net/profileimage/NoImage.png" />`
    // },
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
      headerName: "First Name", field: 'firstName', rowDrag: true, minWidth: 200, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, headerClass: 'bg1',
    },

    {
      field: 'lastName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },

    {
      field: 'emailAddress', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },

    {
      field: 'registerDate', sortable: true, cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleString() : ' ';
      }, filter: 'agMultiColumnFilter', enableRowGroup: true,
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
      field: 'emailVerifyDate', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleString() : ' ';
      }, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [
          {
            filter: 'agDateColumnFilter',

          },
          {
            filter: true,
          },
        ],
      }
    },
    {
      field: 'mobile', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    {
      field: 'isEmailVerified', valueGetter: params => {
        if (params.data.isEmailVerified === true) {
          return 'Yes';
        } else if (params.data.isEmailVerified === false) {
          return 'No';
        }
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },


    // {
    //   field: 'isActive', valueGetter: params => {
    //     if (params.data.isActive === true) {
    //       return 'Yes';
    //     } else if (params.data.isActive === false) {
    //       return 'No';
    //     }

    //   }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    // },

    {
      field: 'registrationSetName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    // {
    //   field: 'customFields', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
    //   enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    // },
    {
      field: 'registeredFrom', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    {
      field: 'countryCode', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
  ];

  constructor
    (
      public router: Router,
      private route: ActivatedRoute,
      private helper: Helper,
      private spinner: NgxSpinnerService,
      private translate: TranslateService,
      private attendeeService: AttendeesService,
      private eventsRegistrationSetsService: EventsRegistrationSetsService,
      private localStorage: LocalStorageService
    ) {
    // this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('id');
    // this.eventName = this.localStorage.get('EventName');
    // this.fromDate = new Date('2020-01-01');
    // this.toDate = new Date('2023-01-01');
    // this.registration = '';
    // this.getEventAttendees();
  }


  onBtnExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('id');

    this.eventName = this.localStorage.get('EventName');
    this.fromDate = new Date('2020-01-01');
    this.toDate = new Date('2023-01-01');
    this.registration = '';
    this.getEventAttendees();


  }


  getRegistrationSets() {
    this.eventsRegistrationSetsService.getRegistrationSets(this.getbyIdViewModel).subscribe((res) => {
      if (res.eventRegistrationSets.length > 0) {
        this.allRegistrationSetsByEvent = res.eventRegistrationSets;
        const temp: any = [];
        this.allRegistrationSetsByEvent.forEach(item => {
          temp.push({ 'item_id': item.registrationSetId, 'item_text': item.name });
        });
        this.dropdownList = temp;

      }
    });

  }

  getEventAttendees() {

    this.spinner.show();
    this.attendeeService.getEventAttendees(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.attendees);
        this.attendeeData = res.attendees;
        this.primaryAttendeeData = res.attendees;
        this.attendeeData.forEach(element => {
          element.isChecked = false;

        });
        this.rowData = res.attendees;
        console.log(this.rowData);
        // if (this.dtElement.dtInstance) {
        //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //     // Destroy the table first
        //     dtInstance.destroy();
        //     // Call the dtTrigger to rerender again
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

  // registrationSelectValues(){
  //   this.getRegistrationSets();
  // }

  registrationDeSelectValues() {
    const dta = this.primaryAttendeeData;
    this.attendeeData = dta.filter(u => u.registrationSetid > (this.registration));
  }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   dom: 'Bfrtip',
    //   buttons: [
    //       'copy', 'csv', 'excel', 'print'
    //   ]
    // };
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   dom: 'Bfrtip',
    //   buttons: [
    //     'copy', 'csv', 'excel', 'print'
    //   ]
    // };

    this.allRegistrationSetsByEvent = [];
    // this.getRegistrationSets();
    this.dropdownList = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: new SweetAlertMessage(this.translate).selectAllText,
      unSelectAllText: new SweetAlertMessage(this.translate).unSelectAllText,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: new SweetAlertMessage(this.translate).selectRegistrationSetText
    };

    this.selectedItems = [
    ];
  }




  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }

}






