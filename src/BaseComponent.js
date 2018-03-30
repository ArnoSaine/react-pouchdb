import { Component } from 'react';
import { contextTypes } from './PouchDB';
import shouldUpdate from './shouldUpdate';
import { omit } from './renderProps';

export default class BaseComponent extends Component {
  static contextTypes = contextTypes;
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
