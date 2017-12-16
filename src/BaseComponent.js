import { Component } from 'react';
import { contextTypes } from './PouchDB';
import shouldUpdate from './shouldUpdate';
import { omit } from './renderProps';

export default class BaseComponent extends Component {
  static contextTypes = contextTypes;
  componentDidMount() {
    this._isMounted = true;
    this._listen(this.props);
  }
  componentWillReceiveProps(props) {
    if (shouldUpdate(this.props, props)) {
      this.unlisten();
      this._listen(props);
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
  _listen(props) {
    this.listen(omit(props));
  }
  unlisten() {
    const { cancel } = this;
    if (cancel) {
      cancel();
    }
  }
}
