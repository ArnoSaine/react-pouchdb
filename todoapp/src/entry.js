import { render } from 'react-dom';
import AppContainer from 'frontend-app/lib/react/AppContainer';
import App from './components/App';

const root = document.body.appendChild(document.createElement('div'));

function renderer() {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  );
}

if (process.env.npm_lifecycle_event === 'dev-server') {
  renderer();
  module.hot.accept('./components/App', renderer);
} else {
  render(<App />, root);
}
