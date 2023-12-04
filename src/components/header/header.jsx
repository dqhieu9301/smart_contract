import React, { useEffect, useState } from 'react';
import './header.scss';
import web3 from '../../config/web3';

const Header = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    useEffect(() => {
        const getAccount = localStorage.getItem("account");
        setAccount(getAccount)
    }, []);
    return (
      <header className="app-header">
        <div className="user-info">
          <span className="user-name">Tài khoản : {account}</span>
          {/* Thêm các thông tin người dùng khác nếu cần */}
        </div>
      </header>
    );
  };
  
  export default Header;