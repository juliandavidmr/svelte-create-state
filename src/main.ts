/* eslint-disable @typescript-eslint/no-explicit-any */

import { writable } from 'svelte/store';


/** Unsubscribes from value updates. */
type Unsubscriber = () => void;

/** Cleanup logic callback. */
type Invalidator<T> = (value?: T) => void;
type Subscriber<T> = (value: T) => void;
type SetFn<T> = (value: T | Function) => void;
type GetFn<T> = () => T;
type Subscribe<T> = (run: Subscriber<T>, invalidate?: Invalidator<T>) => Unsubscriber;

/** Callback to update a value. */
type Updater<T> = (value: T) => T;

/** Readable interface for subscribing. */
export interface Readable<T> {
	/**
	 * Subscribe on value changes.
	 * @param run subscription callback
	 * @param invalidate cleanup callback
	 */
	subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber;
}

/** Writable interface for both updating and subscribing. */
export interface Writable<T> extends Readable<T> {
	/**
	 * Set value and inform subscribers.
	 * @param value to set
	 */
	set(value: T): void;

	/**
	 * Update value using callback and inform subscribers.
	 * @param updater callback
	 */
	update(updater: Updater<T>): void;
}

interface Parameters<T> {
  subscribe: Subscribe<T>;
  unsubscriber: Unsubscriber;
  state: Writable<T>;
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

  const getFn: GetFn<T> = () => {
    return currentValue;
  }

  const unsubscriber: Unsubscriber = state.subscribe((value => {
    currentValue = value;
  }))

  const params: Parameters<T> = {
    unsubscriber,
    subscribe: state.subscribe,
    state
  };

  return [getFn, setFn, params];
}
