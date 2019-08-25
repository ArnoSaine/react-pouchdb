import { addComponents } from 'Dynamic';
import { Link, NavLink } from 'react-router-dom';
import { PouchDB } from 'react-pouchdb/browser';
import LanguageSelector from './LanguageSelector';
import Container from './Container';
import Footer from './Footer';
import Input from './Input';
import List from './List';
import ToggleAll from './ToggleAll';

addComponents({
  LanguageSelector,
  NavLink,
  PouchDB,
  Container,
  Footer,
  Input,
  List,
  Link,
  ToggleAll
});
