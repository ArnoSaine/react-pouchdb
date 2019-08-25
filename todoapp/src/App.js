import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dynamic from 'Dynamic';
import AddDynamicElements from 'Dynamic/Add';
import AddResourceBundles from 'ResourceBundles/Add';
import useT from 'useT';
import useResetResourceBundles, {
  dbName as resourceBundles
} from 'ResourceBundles/useReset';
import { homepage } from '../package.json';
import DBEditor from 'DBEditor';
import { availableLanguages } from './i18n';
import { EditModeContext } from 'Dynamic/Editor/editMode';
import LanguageDetectorUrlSearchChange from 'LanguageDetectorUrlSearchChange';

const basename = process.env.NODE_ENV === 'development' ? undefined : homepage;

function App() {
  const t = useT();
  return (
    <Suspense fallback={`${t('loading')}...`}>
      <AddDynamicElements />
      <AddResourceBundles />
      <BrowserRouter basename={basename}>
        <LanguageDetectorUrlSearchChange />
        <EditModeContext>
          <Switch>
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
        </EditModeContext>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
