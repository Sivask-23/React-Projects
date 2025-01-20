
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RegForm from './Components/Authentication/RegForm';
import MainLayout from './Components/Common Pages/MainLayout';
import IndexPage from './Components/Common Pages/IndexPage';
import LoginForm from './Components/Authentication/LoginForm';
import UserLoginLandingPage from './Components/User pages/UserLoginLandingPage';
import AllCourses from './Components/Common Pages/AllCourses';
import MyCart from './Components/Common Pages/MyCart';
import CartProvider from './Components/Common Pages/CartProvider';
import SingleSubject from './Components/Common Pages/SingleSubject';
import { AuthContext } from './Components/Authentication/AuthContext';
import CheckOutPage from './Components/User pages/CheckOutPage';

function App() {
  return (
    <AuthContext>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<div className="App"><MainLayout/></div>}>
            <Route index element={<div className="App"><IndexPage/></div>}/>
            <Route path='/login' element={<div className="App"><LoginForm/></div>}/>
            <Route path='/register' element={<div className="App"><RegForm/></div>}/>
            <Route path='/user/land' element={<div className="App"><UserLoginLandingPage/></div>}/>
            <Route path='/courses' element={<div className="App"><AllCourses/></div>}/>
            <Route path='/courses/:id' element={<div className="App"><SingleSubject /></div>}/>
            <Route path='/mycart' element={<div className="App"><MyCart /></div>}/>
            <Route path='/checkout' element={<div className="App"><CheckOutPage /></div>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>  
    </AuthContext>  
  );
}

export default App;
