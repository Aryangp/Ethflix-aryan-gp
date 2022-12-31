//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// deployed address 0xD96a08E6a845014B1686EBeF5da19CFd2A7f2F6D

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Subscription{

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

address payable public  owner;
uint256 public forTesting;
IERC20 public secondaryTokenForPayment;

uint256 public paymentOption;

//struct for payment
struct Payment{
    address user;//who made the payment
    uint256 paymentMoment;//when was last payment made
    uint256 paymentExpires;//when will payment expire
}

//array of payment
Payment[] public payments;

//link user to payment
mapping (address=>Payment) public userPayment;

//fees
uint256 public ethFee;//whats the fees in eth
uint256 public erc20Fee;//whats the fees in erc20
//analytics
uint256 public totalPaymentsEth;
mapping (address=>uint256) public userTotalPaymentsEth;
uint256 public totalPaymentsErc20;
mapping (address=>uint256) public userTotalPaymentsErc20;


//constructor 
constructor(){
    owner=payable(msg.sender);//owner deployer
    forTesting=1;
    paymentOption=1;//payment in eth default
    totalPaymentsEth=0;
    totalPaymentsErc20=0;
    ethFee= 0.005 ether;
}

//modifer
modifier onlyOwner {
    require(msg.sender==owner,"You are not the owner");
    _;
}

//check if user paid - modifer
modifier userPaid {
    require(block.timestamp<userPayment[msg.sender].paymentExpires,"your payment expired !");
    _;
}

receive() external payable onlyOwner{

}

//make payment 

function paySubscription(uint256 _period) public payable
{
    if(paymentOption==1){
        require(msg.value==ethFee *_period,"value is not sufficient");
        totalPaymentsEth = totalPaymentsEth.add(msg.value);
        //compute total payment in eth

        userTotalPaymentsEth[msg.sender]=userTotalPaymentsEth[msg.sender].add(msg.value);
        //compute users total payments in Eth

    }else{
        secondaryTokenForPayment.safeTransferFrom(msg.sender,address(this),erc20Fee * _period);
        totalPaymentsErc20=totalPaymentsErc20.add(erc20Fee.mul(_period));
        userTotalPaymentsErc20[msg.sender] = userTotalPaymentsErc20[msg.sender].add(erc20Fee *_period ); 
        // Compute user's total payments in Erc20
    }

    Payment memory newPayment=Payment(msg.sender,block.timestamp,block.timestamp.add(_period * 30 days));

    payments.push(newPayment);//push the new payments in the payment array
    userPayment[msg.sender]=newPayment;//user last payment
}
   
   // Pay in advance
function payInAdvance(uint256 _period) public payable {
    if(paymentOption == 1) {
        require(msg.value == ethFee.mul(_period));
        totalPaymentsEth = totalPaymentsEth.add(msg.value); // Compute total payments in Eth
        userTotalPaymentsEth[msg.sender] = userTotalPaymentsEth[msg.sender].add(msg.value); 
        // Compute user's total payments in Eth
    } else {
        secondaryTokenForPayment.safeTransferFrom(msg.sender, address(this), erc20Fee * _period);
        totalPaymentsErc20 = totalPaymentsErc20.add(erc20Fee.mul(_period)); // Compute total payments in Erc20 tokens
        userTotalPaymentsErc20[msg.sender] = userTotalPaymentsErc20[msg.sender].add(erc20Fee *_period); 
        // Compute user's total payments in Erc20
    }
        uint256 newExpirationPeriod = userPayment[msg.sender].paymentExpires.add(_period* 30 days);
        Payment memory newPayment = Payment(msg.sender, block.timestamp, newExpirationPeriod);
        payments.push(newPayment); // Push the payment in the payments array
        userPayment[msg.sender] = newPayment; // User's last payment
    }

    // Setters
    function setEthFee(uint256 _newEthFee) public onlyOwner {
      ethFee = _newEthFee;
    }
    function setErc20Fee(uint256 _newErc20Fee) public onlyOwner {
      erc20Fee = _newErc20Fee;
    }
    function setNewOwner(address payable _newOwner) public onlyOwner {
      owner = _newOwner;
    }
    function setTokenForPayment(IERC20 _newToken) public onlyOwner {
      secondaryTokenForPayment = _newToken;
    }
    function setPaymentOption(uint256 _paymentOption) public onlyOwner {
      require(_paymentOption == 1 || _paymentOption == 2, "Invalid option!");
      paymentOption = _paymentOption;
}

    // Getters
    function lastPaymentOfUser(address _user) public view returns(uint256) {
       return userPayment[_user].paymentMoment;
    }
    function checkExpirationDate(address _user) public view returns(uint256){
         require(block.timestamp<userPayment[_user].paymentExpires,"you subscription expired");
         return userPayment[_user].paymentExpires;
    }

    function transferToOwner() public {
      require(owner.send(address(this).balance));
    }
 

  

}