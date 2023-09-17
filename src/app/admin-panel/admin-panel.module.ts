import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AdminPanelRoutingModule,
    ProductsModule
  ],
  providers: [],
  bootstrap: []
})
export class AdminPanelModule { }
