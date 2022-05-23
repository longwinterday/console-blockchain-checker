import Messages from '../../libs/messages';
import Web3 from "web3";

export default abstract class Balance { 
    private static provider: any;
    private static web3: Web3;

    public static init() {
        Balance.provider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`);
        Balance.web3 = new Web3(Balance.provider);

        this.getBalance();
    }
    
    public static async getBalance() {
        const address = Messages.getString('Input address: ');
        
        const balance = await Balance.web3.eth.getBalance(address);
        const ethBalance = Number(balance) / 1000000000000000000;
        
        Messages.answer('Balance:');
        Messages.answer(`${balance} wei(${ethBalance} ETH)`);
    }
}