// 方便定义字面量类型
export const tupleStr = <T extends string[]>(...args: T) => args

export const tupleNum = <T extends number[]>(...args: T) => args
