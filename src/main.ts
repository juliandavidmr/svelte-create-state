/* eslint-disable @typescript-eslint/no-explicit-any */

import { writable } from 'svelte/store';


/** Unsubscribes from value updates. */
type Unsubscriber = () => void;

/** Cleanup logic callback. */
type Invalidator<T> = (value?: T) => void;
type Subscriber<T> = (value: T) => void;
type SetFn<T> = (value: T | Function) => void;
type GetFn<T> = () => T | Subscriber<T>;
type Subscribe<T> = (run: Subscriber<T>, invalidate: Invalidator<T>) => Unsubscriber;

interface Parameters<T> {
  subscribe: Subscribe<T>;
  unsubscriber: Unsubscriber;
}

export function createState<T>(initialValue: T): [GetFn<T>, SetFn<T>, Parameters<T>] {
  const state = writable<T>(initialValue);
  let currentValue = initialValue;

  const setFn: SetFn<T> = val => {
    if (typeof val === 'function') {
      state.update(val as never);
    } else {
      state.set(val);
    }
  }

  const getFn: GetFn<T> = (fn?: Subscriber<T>) => {
    if (typeof fn === 'function') {
      return state.subscribe.call(fn);
    } else {
      return currentValue;
    }
  }

  const unsubscriber: Unsubscriber = state.subscribe((value => {
    currentValue = value;
  }))

  const params: Parameters<T> = {
    unsubscriber,
    subscribe: state.subscribe
  };

  return [getFn, setFn, params];
}
