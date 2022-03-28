import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ParentServiceService } from 'src/app/core/services/parent/parent-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  submitted: boolean = false;
  registerForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    age: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required]]
  })
  constructor(public fb: FormBuilder, private route: Router, private service: ParentServiceService) { }

  ngOnInit(): void {
  }
  get myForm() {
    return this.registerForm.controls;
  }
  submit() {
    this.submitted = true;
    console.log(this.registerForm.valid);

    if (this.registerForm.valid) {
      const service = this.service.createParent(this.registerForm.value).subscribe((res: any) => {
        if (res.status === '200') {
          this.route.navigate(['/'])
        }
      })
      this.subscriptions.push(service)
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
