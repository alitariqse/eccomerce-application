import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './guards/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eccomerce';

  constructor(private translate: TranslateService, private router: Router, public authService: AuthService, private elementRef: ElementRef, private renderer: Renderer2) { }


  ngOnInit(): void {
    if (!localStorage.getItem('currentLanguag')) {
      localStorage.setItem('currentLanguag', 'en')
      this.translate.setDefaultLang('en'); // Set the default language
      this.translate.use('en');
      this.changeTextDirection('en')

    } else {
      let currentLanguag: any = localStorage.getItem('currentLanguag')
      this.translate.setDefaultLang(currentLanguag); // Set the default language
      this.translate.use(currentLanguag);
      this.changeTextDirection(currentLanguag)
    }
  }

  switchLanguage(lang: string) {
    localStorage.setItem('currentLanguag', lang)
    this.translate.setDefaultLang(lang); // Set the default language
    this.translate.use(lang);
    this.changeTextDirection(lang)
    window.location.reload()
  }

  Logout() {
    localStorage.removeItem('currentUserData')
    this.router.navigate(['/login'])
  }
  changeTextDirection(langId: any) {
    const bodyElement = this.elementRef.nativeElement.ownerDocument.body;
    this.renderer.setAttribute(bodyElement, 'dir', langId == 'en' ? 'ltr' : 'rtl');
  }
}
