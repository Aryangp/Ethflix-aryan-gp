import { createContext, useContext, useState } from "react";
import abi from "../utils/Subscription.json";
import { ethers } from "ethers";
const EthContext = createContext();

export const EthContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [lastMoment, setLastmoment] = useState();
  const [expireDate, setExpireDate] = useState();
  const contractAbi = abi.abi;
  // I did not put this in .env file because user can see this on goreli etherscan and details 
  const contractAddress = "0xD96a08E6a845014B1686EBeF5da19CFd2A7f2F6D";
  const ownerAddress="0xf647a7872bc2193d8e3626cfeec1004690d7f21f"
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
        setCurrentAccount(account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const paySubscription = async (period) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        let Subscription = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const pay={value:ethers.utils.parseEther(`${0.005 * period}`)};
        const tx = await Subscription.paySubscription(period, pay);
        await tx.wait();
        console.log("subscription purchased :", tx.hash);
        console.log("== done ==");
        console.log(currentAccount);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const paymentDetails = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        let Subscription = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        console.log("started gettin detail of user");
        const lastMonmetOfPayment = await Subscription.lastPaymentOfUser(
         currentAccount
        );
        console.log("date of last payment of user: ", lastMonmetOfPayment._hex);
        const lastHex=parseInt(lastMonmetOfPayment._hex) 
 
        const ExpireDateOfPayment = await Subscription.checkExpirationDate(
          currentAccount
        );
        console.log("date of last payment of user: ", ExpireDateOfPayment._hex);
        const expireHex= parseInt(ExpireDateOfPayment._hex);
    
        console.log("== done ==");
        console.log(lastHex);
        console.log(expireHex);
        return {
          lastMoment:lastHex,
          expireMoment:expireHex
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EthContext.Provider
      value={{
        isWalletConnected,
        connectWallet,
        paySubscription,
        paymentDetails,
        currentAccount,
        lastMoment,
        expireDate,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export const EthData = () => {
  return useContext(EthContext);
};
