import { Directive } from "@angular/core";

export type Constructor<T = {}> = new (...args: any[]) => T;
export type Mixable = Constructor<{}>

@Directive()
export class BaseMixinComponent{}
