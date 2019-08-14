import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PouchDB } from 'react-pouchdb/browser';
import AddResourceBundle from 'AddResourceBundle';
import useT from 'useT';
import Container from './Container';
import Footer from './Footer';
import Input from './Input';
import List from './List';
import ToggleAll from './ToggleAll';
import { homepage } from '../package.json';
import ResourceEditor from './ResourceEditor';

const basename = process.env.NODE_ENV === 'development' ? undefined : homepage;

function App() {
  const t = useT();
  return (
    <Suspense fallback={`${t('loading')}...`}>
      <BrowserRouter basename={basename}>
        <Switch>
          <Route path="/resource-editor" component={ResourceEditor} />
          <Route
            render={() => (
              <PouchDB name="todoapp">
                <Container>
                  <AddResourceBundle />
                  <section className="todoapp">
                    <header>
                      <h1>{t('header')}</h1>
                    </header>
                    <Input />
                    <section className="main">
                      <ToggleAll />
                      <List />
                      <Footer />
                    </section>
                  </section>
                </Container>
              </PouchDB>
            )}
          />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
