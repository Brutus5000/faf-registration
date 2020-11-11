import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StepsModule} from 'primeng/steps';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {CaptchaModule} from 'primeng/captcha';
import {TabViewModule} from 'primeng/tabview';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TosComponent} from './legal/tos/tos.component';
import {PrivacyStatementComponent} from './legal/privacy-statement/privacy-statement.component';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {RegistrationComponent} from './registration/registration.component';
import {ActivationComponent} from './activation/activation.component';
import {LinkToSteamComponent} from './link-to-steam/link-to-steam.component';
import {SetupClientComponent} from './setup-client/setup-client.component';
import {TestComponent} from './test/test.component';
import {MessagesModule} from 'primeng/messages';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    TosComponent,
    PrivacyStatementComponent,
    RegistrationComponent,
    ActivationComponent,
    LinkToSteamComponent,
    SetupClientComponent,
    TestComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    CardModule,
    CaptchaModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ScrollPanelModule,
    StepsModule,
    TabViewModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
