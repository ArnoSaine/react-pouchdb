import { Component } from 'react';
import { node, number, string } from 'prop-types';
import { create, close } from './pouchdbConnections';
import { Provider } from './DBContext';

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

  constructor(props) {
    super(props);
    const { children, maxListeners, ...options } = props;
    this.db = create(options);
    if (maxListeners) {
      this.db.setMaxListeners(maxListeners);
    }
  }

  componentWillUnmount() {
    const { children, maxListeners, ...options } = this.props;
    close(options);
  }

  render() {
    return <Provider value={this.db}>{this.props.children}</Provider>;
  }
}
