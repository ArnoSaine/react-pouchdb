import { BrowserRouter } from 'react-router-dom';
import { main, todoapp } from 'todomvc-app-css/index.css';
import { hot } from 'react-hot-loader';
import { PouchDB } from 'react-pouchdb/browser';
import Container from './Container';
import Footer from './Footer';
import Input from './Input';
import List from './List';
import ToggleAll from './ToggleAll';

const basename =
  process.env.NODE_ENV === 'development' ? undefined : '/react-pouchdb';

const App = () => (
  <Container>
    <BrowserRouter basename={basename}>
      <PouchDB name="todoapp">
        <section className={todoapp}>
          <header>
            <h1>todos</h1>
          </header>
          <Input />
          <section className={main}>
            <ToggleAll />
            <List />
            <Footer />
          </section>
        </section>
      </PouchDB>
    </BrowserRouter>
  </Container>
);

export default hot(module)(App);
