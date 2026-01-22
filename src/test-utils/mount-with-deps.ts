import { mount } from '@vue/test-utils';
import type { Component } from 'vue';
import type { MountingOptions } from '@vue/test-utils';

export function mountWithDeps(
  component: Component,
  options: MountingOptions<any> = {},
) {
  return mount(component, {
    ...options,
    global: {
      ...options.global,
    },
  });
}
