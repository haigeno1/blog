// https://github.com/microsoft/TypeScript/blob/8da3eff7b0dbb68c17a950c006edf143456b28cc/src/lib/es5.d.ts#L1442

declare type PromiseConstructorLike = new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => PromiseLike<T>;

interface PromiseLike<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}

/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}

interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}

/**
 * Make all properties in T optional
 */
 type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
* Make all properties in T required
*/
type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
* Make all properties in T readonly
*/
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
* From T, pick a set of properties whose keys are in the union K
*/
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
* Construct a type with a set of properties K of type T
*/
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

/**
* Exclude from T those types that are assignable to U
*/
type Exclude<T, U> = T extends U ? never : T;

/**
* Extract from T those types that are assignable to U
*/
type Extract<T, U> = T extends U ? T : never;

/**
* Construct a type with the properties of T except for those in type K.
*/
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Exclude null and undefined from T
 */
 type NonNullable<T> = T extends null | undefined ? never : T;

 /**
  * Obtain the parameters of a function type in a tuple
  */
 type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
 
 /**
  * Obtain the parameters of a constructor function type in a tuple
  */
 type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
 
 /**
  * Obtain the return type of a function type
  */
 type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
 
 /**
  * Obtain the return type of a constructor function type
  */
 type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
 




// https://juejin.cn/post/6974713100826050591
// 实现 FuncReturnType 工具泛型，接受一个函数类型，并且推断出函数的返回值。

type FuncReturnType<T> = T extends (...args: any[]) => infer R ? R :never;
type fn = (name: string)=> boolean;
type T1 = FuncReturnType<fn>;


// 如果T包含的类型 是 U包含的类型的 '子集', 当T为联合类型的时候，会进行拆分
type Diff<T, U> = T extends U ? never : T; // 找出T的差集
type Filter<T, U> = T extends U ? T : never; // 找出交集

type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // => "b" | "d"
// <"a" | "b" | "c" | "d", "a" | "c" | "f">
// 相当于
// <'a', "a" | "c" | "f"> |
// <'b', "a" | "c" | "f"> |
// <'c', "a" | "c" | "f"> |
// <'d', "a" | "c" | "f">
type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // => "a" | "c"
// <"a" | "b" | "c" | "d", "a" | "c" | "f"> 同上

let demo1: Diff<number, string>; // => number






// LeetCode ts面试题 https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md
// 分析解法 juejin.cn/post/6895365262099693575   https://codesandbox.io/s/4tmtp?file=/src/index.tsx
 

// 实际使用
interface Action<T> {
  payload?: T
  type: string
}

class EffectModule {
  count = 1
  message = "hello!"

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: "delay",
    }))
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message",
    }
  }
}

// 答案填充区域
// 修改 Connect 的类型，让 connected 的类型变成预期的类型
// type Connect = (module: EffectModule) => any;

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds(),
  }),
})

type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}

export const connected: Connected = connect(new EffectModule())




// 解法区域
// 获取函数名
type PickMethods<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type EffectModuleMethods = PickMethods<EffectModule> // "delay" | "setMessage"

// 把旧方法转换为新方法
type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>
type newAsyncMethod<T, U> = (input: T) => Action<U>
type syncMethod<T, U> = (action: Action<T>) => Action<U>
type newSyncMethod<T, U> = (action: T) => Action<U>

type MethodsTransformation<T> = T extends asyncMethod<infer A, infer B>
  ? newAsyncMethod<A, B>
  : T extends syncMethod<infer C, infer D>
  ? newSyncMethod<C, D>
  : never

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => {
  [N in EffectModuleMethods]: MethodsTransformation<EffectModule[N]>
}