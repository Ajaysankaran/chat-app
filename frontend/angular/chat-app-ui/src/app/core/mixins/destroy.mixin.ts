import { Directive, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Mixable } from "./base";

export function DestroyMixin<T extends Mixable>(Base: T) {
    @Directive()
     class DestroyMixin extends Base implements OnDestroy {
        destroyed$ = new Subject<void>();

        constructor(...args: any[]) {
            super(...args);
        }

        ngOnDestroy(): void {
            this.destroyed$.next();
            this.destroyed$.complete();
        }
    }

    return DestroyMixin;
}