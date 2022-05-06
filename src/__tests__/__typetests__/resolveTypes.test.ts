import {
  AnyNamedResolvers,
  ClassOf,
  FetchClasses,
  NamedResolvers,
  ResolveDependencyType,
  ResolverName,
  ResolveUsingSelfType,
  TryResolveUsingExistingResolvers,
} from "../../types";
import { Bar, Foo } from "../fakeClasses";
import { expectAssignable, expectNotAssignable, expectType } from "tsd";
import RawValueResolver from "../../resolvers/RawValueResolver";
import ObjectResolver from "../../resolvers/ObjectResolver";

const any = () => ({} as unknown as any);

describe("ResolveUsingSelfType", () => {
  test("ResolveUsingSelfType when typeof class is provided", () => {
    let a: ResolveUsingSelfType<typeof Bar> = any();
    expectType<Bar>(a);
  });

  test("ResolveUsingSelfType when typeof class is provided", () => {
    let a: ResolveUsingSelfType<() => { a: 123; b: "string" }> = any();
    expectType<{ a: 123; b: "string" }>(a);
  });

  test("ResolveUsingSelfType when typeof class is provided", () => {
    let a: ResolveUsingSelfType<() => { a: 123; b: "string" }> = any();
    expectType<{ a: 123; b: "string" }>(a);
  });
});

describe("ResolverName", () => {
  test("ResolverName resolves existing keys when container resolvers are defined", () => {
    type T = ResolverName<{
      a: RawValueResolver<string>;
      b: RawValueResolver<boolean>;
      foo: ObjectResolver<typeof Foo>;
    }>;
    expectAssignable<T>("a");
    expectAssignable<T>("b");
    expectNotAssignable<T>("c");
    expectNotAssignable<T>("foo");
  });

  test("ResolverName resolves to any when container resolvers are not defined", () => {
    type T = ResolverName;
    expectAssignable<T>("a");
    expectAssignable<T>("b");
  });

  test("FetchClasses fetches classes from ResolverName", () => {
    type T = FetchClasses<{
      a: RawValueResolver<string>;
      b: RawValueResolver<boolean>;
      foo: ObjectResolver<typeof Foo>;
      bar: ObjectResolver<typeof Bar>;
    }>;
    expectAssignable<T>(Foo);
    expectAssignable<T>(Bar);
  });

  test("ResolverName resolves to instance of class when typeof class is provided", () => {
    type T = ResolverName<{
      foo: ObjectResolver<typeof Foo>;
      bar: ObjectResolver<typeof Bar>;
      a: RawValueResolver<string>;
    }>;
    expectAssignable<T>(Foo);
    expectAssignable<T>(Bar);
  });
});

describe("TryResolveUsingExistingResolvers", () => {
  test("resolves existing resolvers", () => {
    type ExistingResolvers = {
      a: RawValueResolver<Date>;
      b: RawValueResolver<Set<bigint>>;
    };

    const a: TryResolveUsingExistingResolvers<"a", ExistingResolvers> = any();
    expectType<Date>(a);

    const b: TryResolveUsingExistingResolvers<"b", ExistingResolvers> = any();
    expectType<Set<bigint>>(b);

    // @ts-ignore
    const nonExistedKeyValue: TryResolveUsingExistingResolvers<
      "c",
      ExistingResolvers
    > = {} as unknown;
    expectType<never>(nonExistedKeyValue);
  });

  test("resolves any resolvers", () => {
    const a: TryResolveUsingExistingResolvers<"a", AnyNamedResolvers> = any();
    expectType<any>(a);
  });
});

// describe("ResolveDependencyType", () => {
//   test("ResolveDependencyType resolves to custom user type when container resolvers are not defined", () => {
//     type T = ResolveDependencyType2<Boolean, AnyNamedResolvers, string>;
//   });
// });
