import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ParentServiceService } from 'src/app/core/services/parent/parent-service.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  studentData = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'class', 'status', 'delete'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  parentId = JSON.parse(localStorage.getItem('parent')).id;
  constructor(private service: ParentServiceService) { }

  ngOnInit(): void {
    this.getAllChild();
  }
  getAllChild() {
    const service1 = this.service.getStudent(this.parentId).subscribe((res: any) => {
      this.studentData = res;
      this.dataSource = new MatTableDataSource<any>(this.studentData);
      this.dataSource.paginator = this.paginator;
    });
    this.subscriptions.push(service1);
  }
  delete(id) {
    const service2 = this.service.deleteStudent(id).subscribe((res: any) => {
      this.getAllChild();
    });
    this.subscriptions.push(service2);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
