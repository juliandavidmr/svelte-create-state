import { writable } from 'svelte/store';

export type SetTypeFn<T> = (val: T | Function) => void;
export type GetTypeFn<T> = () => T;

export function createState<T>(initialValue: T): [GetTypeFn<T>, SetTypeFn<T>] {
  if (typeof writable !== 'function') {
    throw `Please install 'svelte' package`;
  }

  const state = writable<T>(initialValue);
  let currentValue = initialValue;

  const set: SetTypeFn<T> = val => {
    if (typeof val === 'function') {
      state.update(val as never);
    } else {
      state.set(val);
    }
  }

  const get: GetTypeFn<T> = () => {
    return currentValue;
  }

  state.subscribe(val => {
    currentValue = val;
  });

  return [get, set];
}
