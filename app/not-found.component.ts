import { Component } from "@angular/core";

@Component({
  selector: "not-found",
  template: `
    <div>
      404 - Not Found. <a routerLink="/">go home</a>?
    </div>
  `
})
export class NotFoundComponent {}
