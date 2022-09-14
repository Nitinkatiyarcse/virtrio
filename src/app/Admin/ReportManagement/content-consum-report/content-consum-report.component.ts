import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AttendeesService } from 'src/app/Services/attendees.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-content-consum-report',
  templateUrl: './content-consum-report.component.html',
  styleUrls: ['./content-consum-report.component.css']
})
export class ContentConsumReportComponent implements OnInit {

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
      headerName: "First Name", field: 'firstName', rowDrag: true, minWidth: 200, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, headerClass: 'bg1',
    },

    {
      headerName: "Last Name", field: 'lastName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1'
    },
    {
      field: 'eventName', valueGetter: (params) => {
        return this.eventName;
      }, sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1', filterParams: {
        filters: [

          {
            filter: true,
          },
        ],
      },
    },

    {
      headerName: "email Address", field: 'email', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    {
      headerName: "Room Name", field: 'roomName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    {
      headerName: "Leaderboard Activity Name", field: 'leaderboardActivityName', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },
    {
      headerName: "Leaderboard Activity Type", field: 'leaderboardActivityType', sortable: true, filter: 'agMultiColumnFilter', enableRowGroup: true,
      enablePivot: true, resizable: true, flex: 1, minWidth: 200, headerClass: 'bg1',
    },

  ]


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    //private attendeeService: AttendeesService,
    private reportService: ReportService

  ) {
    // this.eventId = this.route.snapshot.paramMap.get('id');
    // this.eventName = this.localStorage.get('EventName');
    // this.fromDate=new Date('2020-01-01');
    // this.toDate=new Date('2023-01-01');
    // this.getContentConsumption();

  }


  onBtnExport() {
    this.gridApi.exportDataAsExcel();
  }

  //   hide(){
  //     this.gridColumnApi.setColumnsVisible(['columnNameOne',], false);
  // }

  //  show(){
  //     this.gridColumnApi.setColumnsVisible(['columnNameOne',], true);
  // }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getbyIdViewModel.id = this.route.snapshot.paramMap.get('id');
    this.eventName = this.localStorage.get('EventName');
    this.fromDate = new Date('2020-01-01');
    this.toDate = new Date('2023-01-01');
    this.registration = '';
    this.getContentConsumption();

  }


  getContentConsumption() {
    this.spinner.show();
    this.getbyIdViewModel.id = this.eventId;
    this.reportService.getContentConsumption(this.getbyIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.spinner.hide();
        this.noRecordFound = false;
        console.log(res.contentConsumptionViewModel);
        this.attendeeData = res.contentConsumptionViewModel;
        this.primaryAttendeeData = res.contentConsumptionViewModel;
        this.attendeeData.forEach(element => {
          element.isChecked = false;
        });
        this.rowData = res.contentConsumptionViewModel;
        console.log(this.rowData);
        //  if (this.dtElement.dtInstance) {
        //    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

        //      dtInstance.destroy();
        //      this.dtTrigger.next();
        //    });
        //  } else {
        //    this.spinner.hide();
        //    this.dtTrigger.next();
        //  }
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

  //  rerender(): void {
  //    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //      // Destroy the table first
  //      dtInstance.destroy();
  //      // Call the dtTrigger to rerender again
  //      this.dtTrigger.next();
  //    });
  //  }

}