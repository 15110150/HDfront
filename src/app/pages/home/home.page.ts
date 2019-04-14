import {Component} from "@angular/core";
import {NavController, PopoverController, IonTabs, DomController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

 // search condition
 public search = {
  name: "Rio de Janeiro, Brazil",
  date: new Date().toISOString()
}

constructor(public nav: NavController, public popoverCtrl: PopoverController,
   public router: Router, private domCtrl: DomController) {
}

// go to result page
searchDoctors() {
  this.router.navigateByUrl('/search');
}


private adjustElementOnScroll(ev) {
  if (ev) {
      this.domCtrl.write(() => {
          // ...
      });
  }
}
}
