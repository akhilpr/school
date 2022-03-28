import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _snackBar: MatSnackBar, private ngxService: NgxUiLoaderService) { }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.ngxService.start();
        return next.handle(request).pipe(
            tap((event: any) => {
                this.ngxService.stop();
                if (event.status === 200) {
                    this._snackBar.open('Success', '', {
                        duration: 3000
                    });
                } else {
                    this._snackBar.open('Somthing went wrong', '', {
                        duration: 3000
                    });
                }

                return event;
            })
        );
    }
}