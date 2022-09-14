import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import { BoothRepresentativeService } from 'src/app/Services/booth-representative.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as AppUtils from 'src/app/Utils/apputils';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'src/CONSTS';
@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.css']
})
export class RepresentativeComponent implements OnInit {
  eventName: string;
  eventId: string;
  roomId: string;
  inputModel: any = {};
  inputRepresentativeViewModel: any = {};
  noRecordFound = false;
  totalPages: any = 0;
  pageNumber: any = 0;
  isLastPage = false;
  isFirstPage = true;
  getByIdViewModel: any = {};
  reps: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  represetativeDropDownList = [];
  selectedRepresentativesArr: Array<string> = [];
  requiredField = true;
  dropdownSettings: IDropdownSettings = {};
  isEventRepresentativeExists = true;
  noImagePath='';

  constructor(
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private boothRepresentativeService: BoothRepresentativeService,
    private localStorage: LocalStorageService,
  ) {
    this.noImagePath = AppUtils.NoImageFoundPath;
    console.log(this.noImagePath);
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.eventName = this.localStorage.get('EventName');
    this.getRepresentatives();

    this.getEventRepresentatives();

  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getRepresentatives() {
    this.getByIdViewModel.id = this.roomId;
    this.boothRepresentativeService.getRepresentatives(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputRepresentativeViewModel = res.representatives;
        this.noRecordFound = false;
        this.dtTrigger.next();


      } else {
        this.noRecordFound = true;
      }
    });
  }


  deleteRepresentative(repId) {
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
        this.reps.modifiedBy = this.localStorage.get('UserId');
        this.reps.representativeId = repId;
        console.log(this.reps);
        this.boothRepresentativeService.deleteRepresentative(this.reps).subscribe((res) => {
          if (res.isSuccess) {
            Swal.fire({
              title: new SweetAlertMessage(this.translate).sweetalertDeletedHeader,
              text: new SweetAlertMessage(this.translate).sweetAlertDeletedSuccessMessage,
              icon: 'success'
            }).then(() => {
              this.boothRepresentativeService.getRepresentatives(this.getByIdViewModel).subscribe((resp) => {
                if (resp.isSuccess) {
                  this.inputRepresentativeViewModel = resp.representatives;
                  this.noRecordFound = false;
                  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    // Destroy the table first
                    dtInstance.destroy();
                    // Call the dtTrigger to rerender again
                    this.dtTrigger.next();
                  });
                } else {
                  this.noRecordFound = true;
                }
              });
              this.getEventRepresentatives();
            });
          } else {
            Swal.fire(
              new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
              res.message,
              'error'
            );
          }
          this.spinner.hide();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });

  }

  addRepresentative() {
    const model = [];
    this.selectedRepresentativesArr.forEach(element => {
      model.push({
        representativeId: AppUtils.emptyGuid,
        roomId: this.roomId,
        eventRepresntativeId: element,
        createdBy: this.localStorage.get('UserId'),
        modifiedBy: this.localStorage.get('UserId'),
      });
    });
    console.log(model);
    const eventadminUrl = '/admin/events/representative/' + this.roomId;
    this.spinner.show();
    const evntId: any = this.eventId;
    this.boothRepresentativeService.saveBoothRepresentative(model).subscribe((res) => {
      if (res.isSuccess) {
        // add all representatives in comet chat so that they can chat in future
        res.representatives.forEach(element => {
          // const uid =evntId.replaceAll('-', '') + '_' + element.roomId.replaceAll('-', '') + '_' + element.eventRepresentatives.eventRepresentativeId.replaceAll('-', '');
          const uid = element.roomId + '_' + element.eventRepresentatives.eventRepresentativeId;
         
          const user = new CometChat.User(uid);
          user.setName(element.eventRepresentatives.firstName + ' ' + element.eventRepresentatives.lastName);
          user.setRole('representative');
          CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(createdUser => {
            console.log('chatuser created', createdUser);
          }, error => {
            console.log('error', error);
          });
        });
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
          text: new SweetAlertMessage(this.translate).savedSuccessfully,
          icon: 'success'
        }).then(() => {


          window.location.href = '/admin/events/representative/' + this.roomId + '/' + this.eventId;
        });
        this.spinner.hide();

      } else {
        this.spinner.hide();
        Swal.fire({
          title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
          text: res.message,
          icon: 'error'
        }).then(function () {
          location.href = eventadminUrl;
        });
      }
    });
  }

  updateRepresentative(repId) {
    if (repId !== '') {
      this.getRepresentativeDetails(repId);
    } else {
      this.inputModel = {};
    }
  }

  getRepresentativeDetails(repId) {

    this.getByIdViewModel.id = repId;
    this.boothRepresentativeService.getRepresentativeDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputModel = res.representatives[0];
        this.inputModel.modifidBy = this.localStorage.get('UserId');
      }
    });

  }

  getEventRepresentatives() {
    this.spinner.show();
    const getEventRepViewModel: any = {};
    getEventRepViewModel.eventId = this.eventId;
    getEventRepViewModel.roomId = this.roomId;
    getEventRepViewModel.userId = this.localStorage.get('UserId');
    this.boothRepresentativeService.getEventRepresentatives(getEventRepViewModel).subscribe((res) => {
      if (res.isSuccess) {
        let availableRep: any = [];
        const temp: any = [];
        availableRep = res.eventRepresentatives;

        for (let i = 0; i < availableRep.length; i++) {
          temp.push({
            item_id: availableRep[i].eventRepresentativeId,
            item_text: availableRep[i].firstName + ' ' + availableRep[i].lastName + ' (' + availableRep[i].emailAddress + ')'
          });
        }
        this.represetativeDropDownList = temp;
        if (this.represetativeDropDownList.length > 0) {
          this.isEventRepresentativeExists = true;
        } else {
          this.isEventRepresentativeExists = false;
        }

      } else {
      }
      this.spinner.hide();
    });
  }


  setClass() {
    this.requiredField = true;
    if (this.selectedRepresentativesArr.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }
  }

  onItemSelect(item: any) {
    this.selectedRepresentativesArr.push(item.item_id);

  }

  onSelectAll(items: any) {
    for (let i = 0; i < items.length; i++) {
      if (this.selectedRepresentativesArr.indexOf(items[i].item_id) === -1) {
        this.selectedRepresentativesArr.push(items[i].item_id);
      }
    }
  }

  onItemDeSelect(item: any) {
    const index = this.selectedRepresentativesArr.indexOf(item.item_id, 0);
    this.selectedRepresentativesArr.splice(index, 1);
    if (this.selectedRepresentativesArr.length === 0) {
      this.requiredField = true;
    }
  }

  onDeSelectAll(items: any) {
    this.selectedRepresentativesArr = [];
    if (this.selectedRepresentativesArr.length === 0) {
      this.requiredField = true;
    }
  }

}
