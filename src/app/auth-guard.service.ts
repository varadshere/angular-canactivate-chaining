import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { of, Observable, throwError } from "rxjs";
import { delay, map, switchMap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean> | boolean {
    console.log("AuthGuard Activated");

    // const allowAccess: boolean = false;

    // if (!allowAccess) {
    //     console.log('redirecting to login');
    //     this.router.navigate(['login']);
    // }
    return of("auth").pipe(
      delay(5000),
      switchMap(data => {
        if (data === "auth") {
          return throwError("saml").pipe(
            map(saml => {
              if (saml === "saml") {
                return true;
              } else {
                return false;
              }
            }),
            catchError(err => {
              console.log("saml catch");
              return of(false);
            })
          );
        } else {
          return of(false);
        }
        // if (false) {
        //   return true;
        // }
        // return true;
      }),
      catchError(err => {
        return of(false);
      })
    );

    // .subscribe(data => {
    //   return of(true);
    // });
  }
}
