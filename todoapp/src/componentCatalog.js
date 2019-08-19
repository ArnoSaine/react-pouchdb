import { addComponents } from 'Dynamic';
import { NavLink } from 'react-router-dom';
import { PouchDB } from 'react-pouchdb/browser';
import Container from './Container';
import Footer from './Footer';
import Input from './Input';
import List from './List';
import ToggleAll from './ToggleAll';

addComponents({
  NavLink,
  PouchDB,
  Container,
  Footer,
  Input,
  List,
  ToggleAll
});
