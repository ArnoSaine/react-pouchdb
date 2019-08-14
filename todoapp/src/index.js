import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
