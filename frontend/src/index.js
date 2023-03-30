import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import Home from './Page/Home';
import Menu from './Page/Menu';
import About from './Page/About';
import Contact from './Page/Contact';
import Login from './Page/Login';
import Newproduct from './Page/Newproduct';
import Signup from './Page/Signup';
import { Store } from './redux/index';
import { Provider } from 'react-redux';
import Cart from './Page/Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route index element={<Home/>}/>
   {/* <Route path='menu' element={<Menu/>}/>*/}
    <Route path='menu/:filterby' element={<Menu/>}/>
    <Route path='about' element={<About/>}/>
    <Route path='contact' element={<Contact/>} />
    <Route path='login' element={<Login/>} />
    <Route path='newproduct' element={<Newproduct/>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path='cart' element={<Cart/>}/>


    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
