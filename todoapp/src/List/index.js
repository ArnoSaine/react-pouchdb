import React from 'react';
import { Route } from 'react-router-dom';
import Docs from './Docs';

export default () => <Route path="/:filter?" component={Docs} />;
