import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  studentsData = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'class', 'status'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: AdminService, private router: Router) {
  }
  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents() {
    this.service.getAllStudents().subscribe((res: any) => {
      this.studentsData = res;
      this.dataSource = new MatTableDataSource<any>(this.studentsData);
      this.dataSource.paginator = this.paginator;
    });
  }

  updateStatus(selected, id) {
    const data = { status: selected.value, id: id }
    this.service.updateStudentStatus(data).subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
