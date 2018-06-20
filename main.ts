import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// compile in browser
platformBrowserDynamic().bootstrapModule(AppModule);
