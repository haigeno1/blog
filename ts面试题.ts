
// https://juejin.cn/post/6974713100826050591
// 实现 FuncReturnType 工具泛型，接受一个函数类型，并且推断出函数的返回值。

type FuncReturnType<T> = T extends (...args: any[]) => infer R ? R :never;
type fn = (name: string)=> boolean;
type T1 = FuncReturnType<fn>;







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