import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import PrivateRoutes from './utils/PrivateRoutes';
import AllProducts from './pages/AllProducts/AllProducts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
