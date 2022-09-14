import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from 'src/app/Services/client.service';
import { GetterSetterService } from 'src/app/Services/getter-setter.service';
import { Helper } from 'src/app/Utils/Helper';
import * as AppUtils from '../../../Utils/apputils';
import { SweetAlertMessage } from 'src/app/Utils/SweetAlertMessages';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CountryService } from 'src/app/Services/country.service';


@Component({
  selector: 'app-upsert-client',
  templateUrl: './upsert-client.component.html',
  styleUrls: ['./upsert-client.component.css']
})
export class UpsertClientComponent implements OnInit {

  IsAdd = true;
  eventUrl = AppUtils.EventUrl;
  isOrganizationLogoExists = false;
  inputClientModel: any = {};
  clientId = '00000000-0000-0000-0000-000000000000';
  getByIdViewModel: any = {};
  domainUrl = '';
  clientUrlSlug = '';
  allClients: any;
  countryList: any = [];
  isOrganizationLogoAvailable = false;
  shouldProcess = false;
  constructor(
    private spinner: NgxSpinnerService,
    private localStorage: LocalStorageService,
    public getterSetterService: GetterSetterService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private translate: TranslateService,
    private countryService: CountryService,

    private helper: Helper
  ) {
    this.localStorage.set('isEventSelected', 'false');
    this.domainUrl = AppUtils.EventUrl;
    this.IsAdd = true;
  }

  ngOnInit(): void {
    this.getCountry();
    this.inputClientModel = {};
    this.inputClientModel.countryCode = '';
    this.inputClientModel.createdBy = this.localStorage.get('UserId');
    this.inputClientModel.modifiedBy = this.localStorage.get('UserId');
    const clntId = this.route.snapshot.paramMap.get('id');
    if (clntId) {
      this.IsAdd = false;
      this.inputClientModel.clientId = clntId;
      this.getClientDetails(clntId);
    } else {
      this.inputClientModel.clientId = AppUtils.emptyGuid;
    }

    this.getAllClients();

  }


  getCountry() {
    this.spinner.show();
    this.countryService.getAllCountry().subscribe((res) => {
      this.countryList = res;
      this.spinner.hide();
    });

  }


  getClientDetails(clientId) {
    this.spinner.show();
    this.getByIdViewModel.id = clientId;
    this.clientService.getClientDetails(this.getByIdViewModel).subscribe((res) => {
      if (res.isSuccess) {
        this.inputClientModel = res.clients[0];
        const d = this.inputClientModel.contact;
        this.inputClientModel.contact1 = d.substr(d.length - 10);
        this.inputClientModel.countryCode = d.slice(0, (d.length - 10));
        if (this.inputClientModel.organizationLogo) {
          this.isOrganizationLogoAvailable = true;
          this.isOrganizationLogoExists = true;
        } else {
          this.isOrganizationLogoExists = false;
        }
        this.spinner.hide();
      }
    });
  }

  upsertClient() {
    if (this.IsAdd) {
      this.shouldProcess = true;
    } else {
      Swal.fire({
        title: new SweetAlertMessage(this.translate).sweetAlertUpdateMessage,
        text: new SweetAlertMessage(this.translate).sweetAlertWhitelistUpdateMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: new SweetAlertMessage(this.translate).yes,
        cancelButtonText: new SweetAlertMessage(this.translate).no
      }).then((result) => {
        if (result.value) {
          this.shouldProcess = true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.shouldProcess = false;
        }
        // this.spinner.hide();
      });
    }
    if (this.shouldProcess) {
      this.spinner.show();
      // console.log(this.inputClientModel);
      if (this.IsAdd) {
        this.inputClientModel.clientId = AppUtils.emptyGuid;
      }
      this.inputClientModel.contact = this.inputClientModel.countryCode + '' + this.inputClientModel.contact1;
      this.clientService.upsertClient(this.inputClientModel).subscribe((res) => {
        if (res.isSuccess) {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).success,
            text: new SweetAlertMessage(this.translate).savedSuccessfully,
            icon: 'success'
          }).then(function () {
            location.href = '/admin/clients';
          });
        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).sweetAlertErrorHeader,
            text: res.message,
            icon: 'error'
          });
        }
      });
    }
  }

   async onFileChange(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      // upload file to server
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        if (this.helper.validateImageFile(file.name)) {
          if (this.helper.validateBannerAndProfilePicImageSize(file, 'logo')) {
            const formData: FormData = new FormData();
            const img = new Image();
          img.src = window.URL.createObjectURL(file);
          var x = true;
          img.addEventListener('load', () => {
            if (img.width > 200 || img.height > 200) {
              this.spinner.hide();
              Swal.fire({
                title: new SweetAlertMessage(this.translate).invalidFileType,
                text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
                icon: 'error'
              });
            } else {
            formData.append('uploadFile', file, file.name);
            this.clientService.uploadOrganizationLogo(formData).subscribe((res) => {
              if (res.isSuccess) {
                this.isOrganizationLogoAvailable = true;
                this.inputClientModel.organizationLogo = res.message;
                this.isOrganizationLogoExists = true;
              }
              this.spinner.hide();
            });
          }
        }, false);
          } else {
            this.spinner.hide();
            // Swal.fire({
            //   title: new SweetAlertMessage(this.translate).invalidFileType,
            //   text: new SweetAlertMessage(this.translate).imageSizeShouldNotMoreThan200,
            //   icon: 'error'
            // });
            event.target.value = '';
          }

        } else {
          this.spinner.hide();
          Swal.fire({
            title: new SweetAlertMessage(this.translate).invalidFileType,
            text: new SweetAlertMessage(this.translate).onlypngjpgandjpegareallowed,
            icon: 'error'
          });
          event.target.value = '';
        }

      } else {
        this.spinner.hide();
      }
    }
  }


  deleteImage() {

    this.isOrganizationLogoAvailable = false;
    this.inputClientModel.organizationLogo = '';

  }
  getSlugUrl(event) {
    this.clientUrlSlug = this.allClients.filter(x => x.clientId === event.target.value)[0].urlSlug;
  }
  getAllClients() {
    this.inputClientModel.clientId = '';
    this.clientService.getAllClients().subscribe((res) => {
      if (res.isSuccess) {

        this.allClients = res.clients;
        // this.getEventDetails();
      } else {

      }

    });
  }
}
