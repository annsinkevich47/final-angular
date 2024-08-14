import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { startServer } from '@planess/train-a-backend';

import { AppModule } from './app/app.module';

startServer()
  .then(() =>
    platformBrowserDynamic().bootstrapModule(AppModule, {
      ngZoneEventCoalescing: true,
    })
  )
  .catch(err => console.error(err));
