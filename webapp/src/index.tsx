import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  BrowserRouter as Router,
} from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import AuthLayout from 'layouts/Auth';
import AdminLayout from 'layouts/Admin';
import { ChakraProvider, Button } from '@chakra-ui/react';

ReactDOM.render(
  <Router>
    {/* <Switch> */}
    <Route path={`/admin`} component={AdminLayout} />
    <Route path={'/auth'} component={AuthLayout} />
    <Redirect from={`/`} to='/admin/dashboard' />
    {/* </Switch> */}
  </Router>,
  document.getElementById('root')
);
// ReactDOM.render(
//   <ChakraProvider>
//     <Button>test</Button>
//   </ChakraProvider>,
//   document.getElementById('root')
// );
// ReactDOM.render(
//   <HashRouter>
//     <AuthLayout />
//   </HashRouter>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
