// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import UserMenu from './UserMenu.vue';
import { mountWithDeps } from '../test-utils/mount-with-deps';

function createUser() {
  return {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    image: null,
  };
}

describe('UserMenu', () => {
  it('renders login button when user is missing', () => {
    const wrapper = mountWithDeps(UserMenu, {
      props: {
        user: null,
      },
    });

    const link = wrapper.get('a[href="/login"]');
    expect(link.text()).toContain('Log in');
    expect(wrapper.text()).not.toContain('Dashboard');
  });

  it('shows dropdown items when user is present', async () => {
    const wrapper = mountWithDeps(UserMenu, {
      props: {
        user: createUser(),
      },
    });

    const trigger = wrapper.get('button[aria-label="User menu"]');
    await trigger.trigger('click');

    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Log out');
  });

  it('renders avatar when user image is available', () => {
    const wrapper = mountWithDeps(UserMenu, {
      props: {
        user: {
          ...createUser(),
          image: 'https://example.com/avatar.png',
        },
      },
    });

    const avatar = wrapper.get('img[alt="Ada Lovelace avatar"]');
    expect(avatar.attributes('src')).toBe('https://example.com/avatar.png');
  });
});
