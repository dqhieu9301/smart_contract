import React, { useEffect, useState } from "react";
import './login.scss';
import { useNavigate } from "react-router-dom";
import web3 from "../../config/web3";
const Login = () => {
    const [account, setAccount] = useState(null);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const account = localStorage.getItem("account");
        if(account != null) {
            navigate("/");
        }
    }, []);

    const handleCreateAccount = async () => {
        const newAccount = await web3.eth.personal.newAccount(password);
        await web3.eth.personal.unlockAccount(newAccount, password, 30000000000);

        const senderAccount = (await web3.eth.getAccounts())[0];

    const transactionHash = await web3.eth.sendTransaction({
      from: senderAccount,
      to: newAccount,
      value: web3.utils.toWei('10', 'ether'),
    });

        localStorage.setItem("account", newAccount);
        navigate("/");
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="password">
                    <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="button" onClick={handleCreateAccount}>
                    <button>Create account</button>
                </div>
            </div>
        </div>
    )
}

export default Login;