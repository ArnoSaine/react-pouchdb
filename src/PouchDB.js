import { Component } from 'react';
import { instanceOf, node, number, string } from 'prop-types';
import PouchDBModule from 'pouchdb';
import { create, close } from './pouchdbConnections';

export const contextTypes = {
  db: instanceOf(PouchDBModule).isRequired
};

export default class PouchDB extends Component {
  static propTypes = {
    children: node,
    maxListeners: number,
    name: string.isRequired
  };
  static defaultProps = {
    children: null,
    maxListeners: undefined
  };
  static childContextTypes = contextTypes;
  constructor(props) {
    super(props);
    const { children, maxListeners, ...options } = props;
    this.db = create(options);
    if (maxListeners) {
      this.db.setMaxListeners(maxListeners);
    }
  }
  getChildContext() {
    const { db } = this;
    return {
      db
    };
  }
  componentWillUnmount() {
    const { children, maxListeners, ...options } = this.props;
    close(options);
  }
  render() {
    return this.props.children;
  }
}
