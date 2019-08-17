import { Route } from 'react-router-dom';
import Docs from './Docs';

export default function List() {
  return <Route path="/:filter?" component={Docs} />;
}
