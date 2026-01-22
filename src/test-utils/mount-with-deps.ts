import { mount } from '@vue/test-utils';
import type { Component } from 'vue';
import type { MountingOptions } from '@vue/test-utils';

export function mountWithDeps(
  component: Component,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: MountingOptions<any> = {},
) {
  return mount(component, {
    ...options,
    global: {
      ...options.global,
    },
  });
}
