/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from './CONSTS';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic(providers).bootstrapModule(AppModule)
//   .catch(err => console.log(err));


const appSetting = new CometChat.AppSettingsBuilder().setRegion(COMETCHAT_CONSTANTS.REGION).subscribePresenceForAllUsers().build();
CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {

  console.log('app is ready to work');

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}, (error) => {
  console.log('Error In Init', error);
});

