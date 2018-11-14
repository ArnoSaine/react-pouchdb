import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PouchDB } from 'react-pouchdb/browser';
import Container from './Container';
import Footer from './Footer';
import Input from './Input';
import List from './List';
import ToggleAll from './ToggleAll';

const basename =
  process.env.NODE_ENV === 'development' ? undefined : '/react-pouchdb';

function App() {
  return (
    <Suspense fallback="loading...">
      <Container>
        <PouchDB name="todoapp">
          <BrowserRouter basename={basename}>
            <section className="todoapp">
              <header>
                <h1>todos</h1>
              </header>
              <Input />
              <section className="main">
                <ToggleAll />
                <List />
                <Footer />
              </section>
            </section>
          </BrowserRouter>
        </PouchDB>
      </Container>
    </Suspense>
  );
}

export default App;
