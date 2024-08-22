import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CarriageEffects } from './admin/redux/effects/carriages.effects';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppEffects } from './redux/effects/app.effects';
import { metaReducers, reducers } from './redux/reducers';
import { UserModule } from './user/user.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StationEffects } from './admin/redux/effects/stations.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    UserModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([AppEffects, CarriageEffects, StationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
