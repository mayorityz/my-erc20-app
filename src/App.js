import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import contract from "./eth/build/contracts/DappTokenSale.json"; // sells the token
import erccontract from "./eth/build/contracts/DappToken.json"; // connects to the erc20 contract.

function App() {
  const ABI = contract.abi;
  const ercABI = erccontract.abi;

  let activeAccount;
  const checkAccountChange = window.ethereum.on("accountsChanged", () => {
    console.log("change occurs here!");
  });

  useEffect(() => {
    console.log("triggered");
  }, [checkAccountChange]);

  // former contract address 0x7D88AB95845cd60B2D670D75A9a4926Be6d3917b

  const SaleCon = "0x3192e7Ed865114026D462dD9ebB465B54c15Eadb";
  const ErcCon = "0x0440b94a99682B558398A4FeD666884A0DCdC689";
  // sale contract : 0x9155c3CBB7093865A2B3f35ab6E6b0Cd4b28b7Fc
  // erc contract : 0xAA0cE372262144aC1FaeF50E902b599c1eAC4c88

  // let web3 = window.ethereum;
  // web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  // console.log("provider : ", web3.givenProvider);

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );

  // if (typeof web3 !== "undefined") {
  //   web3 = new Web3(web3.currentProvider);
  // } else {
  //   console.log("No web3? You should consider trying MetaMask!");
  //   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  // }

  // For now, 'eth_accounts' will continue to always return an array
  // function handleAccountsChanged(accounts) {
  //   if (accounts.length === 0) {
  //     // MetaMask is locked or the user has not connected any accounts
  //     console.log('Please connect to MetaMask.');
  //   } else if (accounts[0] !== currentAccount) {
  //     currentAccount = accounts[0];
  //     // Do any other work!
  //   }
  // }

  const myContract = new web3.eth.Contract(ercABI, ErcCon);

  const myWallets = () => {
    let myWallets = web3.eth.accounts.wallet;
    console.log("length : ", myWallets);
    console.log("length : ", myWallets.length);
  };

  const newWallet = () => {
    let response = web3.eth.accounts.wallet.create(1);
    console.log(response);
  };

  const sendEther = async () => {
    web3.eth
      .sendTransaction({
        from: "0x7D88AB95845cd60B2D670D75A9a4926Be6d3917b",
        to: "0x9B6cE328a888Cf7066006b62575d96B56EF170b5",
        value: web3.utils.toWei("20"),
      })
      .then((ful) => {
        console.log(ful);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const accountBalance = async () => {
    await myContract.methods
      .balanceOf("0x9da37B4183662236888d166f4cA1A14b15CEC22d")
      .call()
      .then((result) => {
        console.log(result);
      });
    // let x = await web3.eth.getBalance(
    //   "0x8541ce0ba6fE4a59A06c036a8b720E9447916842"
    // );
    // console.log(web3.utils.fromWei(x));
  };

  const [data, setData] = useState({
    from: "",
    to: "",
    amt: "",
  });

  const updateformData = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let dataClone = { ...data };
    dataClone[name] = value;
    setData(dataClone);
  };

  const sendERC = async (e) => {
    e.preventDefault();
    console.log(data.to);
    console.log(data.amt);
    await myContract.methods
      .transfer(data.to, data.amt)
      .call()
      .then((result, error) => {
        console.log(result);
        console.log(error);
      });
  };

  /**
   *
   * Token Sale Contract
   */

  const tokenContract = new web3.eth.Contract(ABI, SaleCon, {
    from: "0x67e39c04AEC63c9a2Dd581Ff75aB0E3D8C58D3E7", // default from address
    // gasPrice: "20000000000",
    // gas: "5000000",
  });

  const buyTokens = async () => {
    console.log("purchasing tokens");
    const ADDRESS = await connectMetaMask();
    console.log("uUSER ADDRESS : ", ADDRESS);

    let amtOfTokens = 10000;

    let tPrice = await tokenContract.methods
      .tokenPrice()
      .call()
      .then((price) => {
        console.log("token price: ", price);
        return price;
      })
      .catch((e) => console.log(e.message));

    let purchase = tPrice * amtOfTokens; //calculates the eth from the frontend.
    console.log("price in wei :", purchase);

    await tokenContract.methods
      .buyTokens(amtOfTokens)
      .send({ from: ADDRESS, value: purchase })
      .then((result) => {
        // tokenContract.once("Sell", (err, event) => {
        //   console.log(event);
        // });
        console.log(result);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const connectMetaMask = async () => {
    console.log("connecting account to metamask");
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  };

  const payWithMetaMask = async () => {
    console.log("connecting via metamask");

    let amtOfTokens = 10000;
    let tPrice = await tokenContract.methods
      .tokenPrice()
      .call()
      .then((price) => {
        console.log("token price: ", price);
        return price;
      })
      .catch((e) => console.log(e.message));

    let purchase = tPrice * amtOfTokens;

    const ADDRESS = await connectMetaMask();

    await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: ADDRESS,
            to: "0x27dAF476B7CbDbA917259B42C99dbEfa3b6FdC48",
            value: "0x29a2241af62c0000",
            gasPrice: "20000000000",
            gas: "5000000",
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <button onClick={sendEther}>send ether!</button>
      <button onClick={newWallet}>Create New Wallet!</button>
      <button onClick={myWallets}>My Wallets!</button>
      <button onClick={buyTokens}>buy tokens</button>
      <button onClick={accountBalance}>account balance</button>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      <br />
      <h3>Send ERC20 TOKEN...</h3>
      <form onSubmit={sendERC}>
        <input
          placeholder="from account"
          name="from"
          onChange={updateformData}
        />
        <br />
        <input
          placeholder="to account"
          name="to"
          onChange={updateformData}
        />{" "}
        <br />
        <input placeholder="Amount" name="amt" onChange={updateformData} />{" "}
        <br />
        <button>Transfer Token</button>
      </form>
    </div>
  );
}

export default App;
