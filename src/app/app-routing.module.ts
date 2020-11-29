import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {ActivationComponent} from './activation/activation.component';
import {LinkToSteamComponent} from './link-to-steam/link-to-steam.component';
import {SetupClientComponent} from './setup-client/setup-client.component';
import {PrecheckComponent} from './precheck/precheck.component';

const routes: Routes = [
  {path: '', redirectTo: 'precheck', pathMatch: 'full'},
  {path: 'precheck', component: PrecheckComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'activation', component: ActivationComponent},
  {path: 'linkToSteam', component: LinkToSteamComponent},
  {
    path: 'setupFafClient',
    children: [
      {path: '', redirectTo: 'download', pathMatch: 'full'},
      {path: '**', component: SetupClientComponent}]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
