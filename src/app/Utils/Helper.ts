import { async } from '@angular/core/testing';
import { isModifier } from 'typescript';
import { NgbDateCustomParserFormatter } from '../Services/NgbDateCustomParserFormatter';

export class Helper {

    validateImageFile(name: String) {
        const ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'gif') {
            return true;
        } else {
            return false;
        }
    }




    validateMovieFile(name: String) {
        const ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() === 'mp4' || ext.toLowerCase() === 'wav') {
            return true;
        } else {
            return false;
        }
    }

    validateAudioFile(name: String) {
        const ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() === 'mp3') {
            return true;
        } else {
            return false;
        }
    }


    validateDocFile(name: String) {
        const ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() === 'pdf') {
            return true;
        } else {
            return false;
        }
    }

    validateCSVFile(name: String) {
        const ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() === 'csv' || ext.toLowerCase() === 'xls') {
            return true;
        } else {
            return false;
        }
    }



    validateProfileImageSize(file: any) {
        if (file.size <= 200 * 200) {
            return true;
        }
        return false;
    }

    validateVideoSize(file: any) {
        // if (file.size <= 1000000000) {
        //     return true;
        // }
        // return false;

        var fileSize = file.size; //size in b
        fileSize = fileSize / 1048576; //size in mb 
        if (fileSize <= 1000) {
            return true;
        }
        return false;
        //return true;

    }

    validateaudioSize(file: any) {
        if (file.size <= 100000000) {
            return true;
        }
        return false;
    }

    convertDateToLocalTimezone(date) {
        if (date) {
            return new Date(
                new Date(date).getTime()
                - new Date(date).getTimezoneOffset() * 60 * 1000);

            // return NgbDateCustomParserFormatter.formatDate(date);
        } else {
            return '';
        }
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    validateIconFileSize(file, val) {
        if (file.size <= val * val) {
            return true;
        }
        return false;
    }

    validateBannerAndProfilePicImageSize(file, type) {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        var x = true;
        img.addEventListener('load', () => this.loadCallBackImagValidation(img, type), false);
        return x;
        //  return false;

        // if (type === 'logo') {
        //     if (file.size > 200 * 200) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // } else if (type === 'banner') {
        //     if (file.size > 1280 * 720) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }
    }

    async loadCallBackImagValidation(img: any, type: string) {
        // Img loaded
        if (type === 'logo') {
            if (img.width > 200 || img.height > 200) {

                return false;
            } else {
                return true;
            }
        } else if (type === 'banner') {
            if (img.width > 1280 || img.height > 720) {
                return false;
            } else {
                return true;
            }
        }
    }

    validateRoomTemplateFile(file) {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.addEventListener('load', function () {
            // Img loaded

            if (img.width > 200 || img.height > 200) {
                return false;
            } else {
                return true;
            }

        });

    }

    removeSpecialCharacters(string) {
        return string.replace(/\s+/g, '');
    }

    dateCheck(from, to, check) {
        if (check.getTime() <= to.getTime() && check.getTime() >= from.getTime()) {
            return true;
        }
        return false;
    }

    combineDateAndTime = function (date, time) {
        var timeString = time.getHours() + ':' + time.getMinutes() + ':00';

        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Jan is 0, dec is 11
        var day = date.getDate();
        var dateString = '' + year + '-' + month + '-' + day;
        var combined = new Date(dateString + ' ' + timeString);

        return combined;
    };

    fotmatCombinedDateTime = function (date) {
        var timeString = (date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes()) + ':00';
        var combined = date.toLocaleDateString("en-US", { day: 'numeric' })
            + "-" + date.toLocaleDateString("en-US", { month: 'short' })
            + "-" + date.toLocaleDateString("en-US", { year: 'numeric' })
            + " " + timeString;

        return combined;
    };
}
