import React, { useEffect, useState } from "react";
import web3 from "../../config/web3";
import './home.scss';
import { useNavigate } from "react-router-dom";
const Home = () => {
    const [account, setAccount] = useState(null);
    const [surplus, setSurplus] = useState(null);
    const [contractBalance, setContractBalance] = useState(null);

    const [valueDeposit, setValueDeposit] = useState("")
    const [valueWithdraw, setValueWithdraw] = useState("")
    const [valueKill, setValueKill] = useState("")
    const navigate = useNavigate();
    const abi = [
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "kill",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ]

    useEffect(() => {
        const getAccount = localStorage.getItem("account");
        if(getAccount == null) navigate("/login")
        setAccount(getAccount)

        const getBalance = async () => {
            const balanceWei = await web3.eth.getBalance(getAccount);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            setSurplus(balanceEth);
        }

        const initWeb3 = async () => {
            if (window.ethereum) {
              const bytecode = "608060405234801561001057600080fd5b506101a6806100206000396000f3fe6080604052600436106100345760003560e01c80632e1a7d4d1461003957806341c0e1b514610067578063d0e30db01461007e575b600080fd5b6100656004803603602081101561004f57600080fd5b8101908080359060200190929190505050610088565b005b34801561007357600080fd5b5061007c6100d2565b005b6100866100eb565b005b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156100ce573d6000803e3d6000fd5b5050565b3373ffffffffffffffffffffffffffffffffffffffff16ff5b346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555056fea2646970667358221220a28d0f5e59cd90ea6f3a1c5c788837998f4a4e9ca948720712f28a6b12fbcc8e64736f6c634300060c0033";
      
              const contractAddress = localStorage.getItem("contractAddress")
              if(contractAddress == null) {
                const deploy = new web3.eth.Contract(abi);
                const deployedContract = await deploy
                  .deploy({ data: bytecode })
                  .send({ from: getAccount, gas: '3000000' });

                localStorage.setItem("contractAddress", deployedContract._address)

                const balanceWe = await web3.eth.getBalance(deployedContract._address);
                const balanceEt = web3.utils.fromWei(balanceWe, 'ether');
                setContractBalance(balanceEt);
              } else {
                const balanceWe = await web3.eth.getBalance(contractAddress);
                const balanceEt = web3.utils.fromWei(balanceWe, 'ether');
                setContractBalance(balanceEt);
              }

        
            } else {
              console.error('Web3 not detected. Install MetaMask!');
            }
          };
      
          initWeb3();

        getBalance();

    }, []);

    const handleDeposit = async () => {
        const contractAddress = localStorage.getItem("contractAddress")
        const contract = new web3.eth.Contract(abi, contractAddress);

        const res = await contract.methods.deposit().send({
            from: account,
            value: web3.utils.toWei(valueDeposit, 'ether'),
          });

          window.location.reload()
    }

    const handleWithdraw = async () => {
        const contractAddress = localStorage.getItem("contractAddress")
        const contract = new web3.eth.Contract(abi, contractAddress);
        const value = valueWithdraw * 1000000000000000000
        const res = await contract.methods.withdraw(value.toString()).send({
            from: account
          });

          window.location.reload()
    }

    const handleKill = async () => {
        const contractAddress = localStorage.getItem("contractAddress")
        const contract = new web3.eth.Contract(abi, contractAddress);
        const killTransaction = await contract.methods.kill().send({
            from: account
          });

          localStorage.removeItem("contractAddress")
        window.location.reload()
    }
 
    return(
        <div className="home">
            <div className="asset">
                <span>Số dư: {surplus} - Ether</span>
                <span>Số dư trong ví : {contractBalance} - Ether</span>
            </div>
            <div className="feature">
                <div className="item">
                    <button className="btn-item" onClick={handleDeposit}>Nạp tiền</button>
                    <input type="text" placeholder="nhập số lượng eth" value={valueDeposit} onChange={(e) => setValueDeposit(e.target.value)}/>
                </div>
                <div className="item">
                    <button className="btn-item" onClick={handleWithdraw}>Rút tiền</button>
                    <input type="text" placeholder="nhập số lượng eth" value={valueWithdraw} onChange={(e) => setValueWithdraw(e.target.value)}/>
                </div>
                <div className="item">
                    <button className="btn-item" onClick={handleKill}>Hủy ví</button>
                </div>
            </div>
        </div>
    )
}

export default Home;