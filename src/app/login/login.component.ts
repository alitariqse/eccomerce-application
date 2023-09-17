import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  userData: any = [
    {
      username: 'user',
      password: 'user',
      role: 'user'
    },
    {
      username: 'admin',
      password: 'admin',
      role: 'admin'
    },
  ]

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) {

  }


  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  submit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      let loggedInUser = this.userData.find((x: any) => x.username === loginData.username && x.password === loginData.password);
      if (loggedInUser) {

        localStorage.setItem('currentUserData', JSON.stringify(loggedInUser))
        if (loggedInUser.role == 'admin') {
          this.router.navigate(['/admin']);
        } else if (loggedInUser.role == 'user') {
          this.router.navigate(['/']);
        }
      } else {
        this.toastr.error('Invalid username or password', 'Unauthorized!');
      }
    }
  }

}
