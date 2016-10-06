import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import Block from '../index';

describe('Block', () => {
  it('renders the content', () => {
    const component = renderer.create(
      <Block>Content</Block>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders the content with the padding className', () => {
    const component = renderer.create(
      <Block padding>Content</Block>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders the content with a custom provided className', () => {
    const component = renderer.create(
      <Block className="test">Content</Block>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
