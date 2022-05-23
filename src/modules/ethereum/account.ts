import Messages from '../../libs/messages';
import Web3 from "web3";

export default abstract class Account { 
    private static provider: any;
    private static web3: Web3;

    public static init() {
        const infura = Messages.getString('Input infura api key: ');
        Account.provider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infura}`);
        Account.web3 = new Web3(Account.provider);

        this.createAccount();
    }
    
    public static createAccount() {
       const account = Account.web3.eth.accounts.create();
       const { 
           address,
           privateKey,
       } = account;

       Messages.answer('PrivateKey: ' + privateKey);
       Messages.answer('Address: ' + address);
    }
}