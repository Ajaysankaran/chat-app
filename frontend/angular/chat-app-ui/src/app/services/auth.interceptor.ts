import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, take } from "rxjs";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const user = inject(UserService).getUser();
    const router = inject(Router);
    if (user && user.isAuthenticated) {
        req = req.clone({
            setHeaders: {
                'user-id': user.userId
            }
        })
    } else {
        router.navigate(['/login'])
    }

    return next(req);
}