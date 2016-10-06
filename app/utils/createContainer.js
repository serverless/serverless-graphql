import Relay from 'react-relay';
import createHelper from 'recompose/createHelper';

const createContainer = options => BaseComponent =>
  Relay.createContainer(BaseComponent, options);

export default createHelper(createContainer, 'createContainer', false);
