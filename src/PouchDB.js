import { Component } from 'react';
import { instanceOf, node, number, string } from 'prop-types';
import PouchDBModule from 'pouchdb';

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
    const { maxListeners, name, ...options } = props;
    const db = new PouchDBModule(name, options);
    if (maxListeners) {
      db.setMaxListeners(maxListeners);
    }
    this.db = db;
  }
  getChildContext() {
    const { db } = this;
    return {
      db
    };
  }
  componentWillUnmount() {
    this.db.close();
  }
  render() {
    return this.props.children;
  }
}
