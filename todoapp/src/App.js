import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dynamic from 'Dynamic';
import AddDynamicElements from 'DynamicElements/Add';
import AddResourceBundles from 'ResourceBundles/Add';
import useT from 'useT';
import useResetDynamicElements, {
  dbName as dynamicElements
} from 'DynamicElements/useReset';
import useResetResourceBundles, {
  dbName as resourceBundles
} from 'ResourceBundles/useReset';
import { homepage } from '../package.json';
import DBEditor from 'DBEditor';
import elements from './dynamicElements';
import { availableLanguages } from './i18n';

const basename = process.env.NODE_ENV === 'development' ? undefined : homepage;

function App() {
  const t = useT();
  return (
    <Suspense fallback={`${t('loading')}...`}>
      <AddDynamicElements />
      <AddResourceBundles />
      <BrowserRouter basename={basename}>
        <Switch>
          <Route
            path="/element-editor"
            render={() => (
              <DBEditor
                ids={elements}
                useReset={useResetDynamicElements}
                dbName={dynamicElements}
                propName="element"
              />
            )}
          />
          <Route
            path="/resource-editor"
            render={() => (
              <DBEditor
                ids={availableLanguages}
                useReset={useResetResourceBundles}
                dbName={resourceBundles}
                propName="bundle"
                translate
              />
            )}
          />
          <Route render={() => <Dynamic id="todoapp" />} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
