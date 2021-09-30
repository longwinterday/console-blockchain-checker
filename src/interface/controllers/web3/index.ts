import Web3 from "web3";
import process from 'process'
import Messages from '../../messages';

export default abstract class Web3Controller {

    private static infraProvider: any;

    private static web3: Web3;

    public static menuList = [
        { 
            title: 'Create ropsten account.' , 
            func: this.createAccount
        },
        {
            title: 'Get balance',
            func: this.getBalance
        },
        {
            title: 'Send etherium',
            func: this.sendEther
        }
    ];
    
    public static start() {
        Web3Controller.infraProvider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`);
        Web3Controller.web3 = new Web3(Web3Controller.infraProvider);

        const firstQuestion: string = Messages.renderList({
            title: 'Web3:',
            list: Web3Controller.menuList
        });

        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > Web3Controller.menuList.length
        ) {
            this.start();
            return 0;
        }

        Web3Controller.menuList[index - 1].func();
    }

    public static createAccount() {
       const account = Web3Controller.web3.eth.accounts.create();
       const { 
           address,
           privateKey,
       } = account;

       Messages.answer('PrivateKey: ' + privateKey);
       Messages.answer('Address: ' + address);
    }

    public static async getBalance() {
        const address = Messages.getString('Input address: ');
        
        const balance = await Web3Controller.web3.eth.getBalance(address);
        const ethBalance = Number(balance) / 1000000000000000000;
        
        Messages.answer('Balance:');
        Messages.answer(`${balance} wei(${ethBalance} ETH)`);
    }

    public static async sendEther() {
        const from = Messages.getString('From address: ');
        const to = Messages.getString('To address: ');
        const value = Messages.getString('Value: ');
        const gas = Messages.getString('Gas: ');
        const gasPrice = Messages.getString('Gas price: ');
        const privKey = Messages.getString('Private key: ');

        const tx = {
            from,
            to,
            value: Number(value),
            gas: Number(gas),
            gasPrice: Number(gasPrice),
            data: ''
        };

        const sigTx = await Web3Controller.web3.eth.accounts.signTransaction(tx, privKey);
        const { rawTransaction } = sigTx;
        
        try {
            const sendedTx = await Web3Controller.web3.eth.sendSignedTransaction(rawTransaction as string);
            console.log(sendedTx);
        } catch(e) {
            console.log(e);
        }
    }
    
}