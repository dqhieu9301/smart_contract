import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import web3 from './config/web3';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Header from './components/header/header';
import Home from './components/home/home';
function App() {
//   useEffect(() => {
//     const ganacheUrl = 'http://127.0.0.1:8545';

//     const fetchData = async () => {
//       const accounts = await web3.eth.getAccounts();
//       console.log(accounts);
//   };

//   const createAccount = async () => {
//     // Tạo tài khoản mới
//     const newAccount = await web3.eth.personal.newAccount('test');
//     console.log(newAccount)
//     // Lấy danh sách tài khoản đã cập nhật
//     const updatedAccounts = await web3.eth.getAccounts();
//     console.log(updatedAccounts);

// };
// createAccount();
//   // Gọi hàm fetchData
//   // fetchData();

//   }, []);
  return (
    <BrowserRouter>
      <div className="App">
      <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
