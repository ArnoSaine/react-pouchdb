import { Component } from 'react';
import shouldUpdate from './shouldUpdate';
import { omit, propTypes as renderPropTypes } from './renderProps';
import { propTypes as dbPropTypes } from './withDB';

export default class BaseComponent extends Component {
  static propTypes = {
    ...renderPropTypes,
    ...dbPropTypes
  };

  componentDidMount() {
    this._isMounted = true;
    this._listen();
  }

  componentDidUpdate(prevProps) {
    if (shouldUpdate(prevProps, this.props)) {
      this.unlisten();
      this._listen();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unlisten();
  }

  setStateIfMounted(state) {
    if (!this._isMounted) {
      return;
    }
    this.setState(state);
    return true;
  }

  _listen() {
    this.listen(omit(this.props));
  }

  unlisten() {
    const { cancel } = this;
    if (cancel) {
      cancel();
    }
  }
}
