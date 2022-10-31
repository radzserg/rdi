export class Foo {
    public name: string;
    public service: Bar;
    public items: string[] = [];

    constructor(name: string, service: Bar) {
        this.name = name;
        this.service = service;
    }

    addItem(item: string) {
        this.items.push(item);
    }
}

export class Bar {
    public buzz() {
        return "buzz";
    }
}

export class Buzz { }

export abstract class AbstractFoo {
    public name: string;
    public service: Bar;
    public items: string[] = [];

    constructor(name: string, service: Bar) {
        this.name = name;
        this.service = service;
    }

    addItem(item: string) {
        this.items.push(item);
    }
}

export class FooChild extends AbstractFoo { }

export class A {
    constructor(private b: B) { }

    public sum(x: number, y: number) {
        return this.b.sum(x, y);
    }
}

export class B {
    constructor(private c: C) { }

    public sum(x: number, y: number) {
        return this.c.sum(x, y);
    }

    public add(value: any) {
        this.c.add(value);
    }

    public get() {
        return this.c.get();
    }
}

export class C {
    public sum(x: number, y: number) {
        return x + y;
    }

    private raw: any;
    public add(value: any) {
        this.raw = value;
    }
    public get() {
        return this.raw;
    }
}
