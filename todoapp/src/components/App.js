import { BrowserRouter } from 'react-router-dom';
import { header, main, todoapp } from 'todomvc-app-css/index.css';
import { PouchDB } from 'react-pouchdb/browser';
import Container from './Container';
import Footer from './Footer';
import Input from './Input';
import List from './List';
import ToggleAll from './ToggleAll';

export default () => (
  <Container>
    <BrowserRouter>
      <PouchDB name="todoapp">
        <section className={todoapp}>
          <header className={header}>
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
