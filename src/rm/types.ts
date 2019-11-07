export type Reducer<TState, TPayload = any> = (state: TState, payload: TPayload) => TState;
export type SideEffect<TState, TPayload = any> = (state: TState, payload: TPayload, effect: { [x: string]: (payload: TPayload) => void; }) => Promise<any> | void;



export type EffectAndActions = { [x: string]: (payload: any) => void; };
export type Reducers = { [x: string]: (arg0: any, arg1: any) => void; };
export type SideEffects = { [x: string]: (arg0: any, arg1: any, arg2: any) => void; };