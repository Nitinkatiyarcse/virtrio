import { DATE } from "ngx-bootstrap/chronos/units/constants";
import { datepickerAnimation } from "ngx-bootstrap/datepicker/datepicker-animations";

export class eventRegistrationSets {
    registrationSetId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    timeZone: string;
    urlSlug: string;
    eventId: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
    isActive: boolean;
    languageId: string;
}