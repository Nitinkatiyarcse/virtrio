import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { RoomsService } from 'src/app/Services/rooms.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Helper } from 'src/app/Utils/Helper';
import { ActivatedRoute } from '@angular/router';
import * as AppUtils from 'src/app/Utils/apputils';

@Component({
  selector: 'app-create-event-template',
  templateUrl: './create-event-template.component.html',
  styleUrls: ['./create-event-template.component.css']
})
export class CreateEventTemplateComponent implements OnInit {

  eventName: string;
  allRoomTypes = [];
  inputRoomModel: any = {};
  eventId: any;
  doProcess = false;
  constructor(

    private localStorageService: LocalStorageService,
    private roomService: RoomsService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private helper: Helper, private route: ActivatedRoute

  ) {
    this.inputRoomModel.roomTypeId = '';
    this.eventName = this.localStorageService.get('EventName');
    this.inputRoomModel.createdBy = this.localStorageService.get('UserId');
    this.inputRoomModel.modifiedBy = this.localStorageService.get('UserId');
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.inputRoomModel.eventId=this.eventId;
    if (this.route.snapshot.paramMap.get('tmplId')) {
      this.inputRoomModel.roomTemplateId = this.route.snapshot.paramMap.get('tmplId');
      this.getRoomTemplateDetails(this.inputRoomModel.roomTemplateId);
    }
    else {
      this.inputRoomModel.roomTemplateId = AppUtils.emptyGuid;
    }
    this.getRoomTypes();
  }

  ngOnInit(): void {
  }

  getRoomTypes() {
    const roomTypeReques: any = {};
    roomTypeReques.id = this.localStorageService.get('UserId');
    this.roomService.getRoomTypes(roomTypeReques).subscribe((res) => {
      if (res.isSuccess) {
        this.allRoomTypes = res.roomTypes;
      }
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      // upload file to server
      this.spinner.show();
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {

        const file: File = fileList[0];
        if (this.helper.validateImageFile(file.name)) {
          const formData: FormData = new FormData();
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          var x = true;
          img.addEventListener('load', () => {
            if (img.width > 1280 || img.height > 720) {
              this.spinner.hide();
              Swal.fire({
                title: new SweetAlertMessage(this.translate).invalidFileType,
                text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan1920,
                icon: 'error'
              });
            } else {
              formData.append('uploadFile', file, file.name);
              this.roomService.uploadRoomTemplate(formData).subscribe((res) => {
                if (res.isSuccess) {
                  this.inputRoomModel.roomTemplateUrl = res.message;
                }
                this.spinner.hide();
              });
              
            }
          });

        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
          event.target.value = '';
        }

      }
    } else {
      this.spinner.hide();
    }
  }

  deleteemailTemplate() {
    this.inputRoomModel.roomTemplateUrl = '';
  }

  saveRoomTemplate() {
    if (this.inputRoomModel.roomTemplateUrl === '') {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
        text: new SweetAlertMessage(this.translate).pleaseuploadTemplate,
        icon: 'error'
      });
    } else {
      console.log(this.inputRoomModel);
      this.roomService.upsertRoomTemplates(this.inputRoomModel).subscribe((res)=>{
        if(res.isSuccess){
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertSuccessHeader,
            text:new SweetAlertMessage(this.translate).savedSuccessfully,
            icon: 'success'
          }).then(()=>{
            window.location.href = '/admin/events/roomtemplates/' + this.eventId;
          });
        } else{
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text:res.message,
            icon: 'error'
          });
        }
      })
    }
  }

  getRoomTemplateDetails(roomTemplateId){
    const getByIdViewModel:any={};
    getByIdViewModel.id=roomTemplateId;
    this.roomService.GetRoomTemplatesById(getByIdViewModel).subscribe((res)=>{
      if(res.isSuccess){
        this.inputRoomModel.roomTemplateId=res.roomTemplates[0].roomTemplateId;
        this.inputRoomModel.roomTemplate=res.roomTemplates[0].roomTemplate;
        this.inputRoomModel.roomTemplateUrl=res.roomTemplates[0].roomTemplateUrl;
        this.inputRoomModel.roomTypeId=res.roomTemplates[0].roomTypeId;
        this.inputRoomModel.eventId=res.roomtemplates[0].eventId;
      } else{
        location.href='/admin/login';
      }
    });
  }
}
