import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ParentServiceService } from 'src/app/core/services/parent/parent-service.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  studentForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    age: ['', [Validators.required]],
    class: ['', [Validators.required]],
    status: ['Pending'],
    id: JSON.parse(localStorage.getItem('parent')).id
  })
  submitted = false;
  constructor(private _bottomSheetRef: MatBottomSheetRef<StudentsComponent>, public fb: FormBuilder,
    private service: ParentServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  get myForm() {
    return this.studentForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.studentForm.valid) {
      this.service.createStudent(this.studentForm.value).subscribe((res: any) => {
        if (res.status === '200') {
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          this._bottomSheetRef.dismiss()
        }
      })
    }
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
