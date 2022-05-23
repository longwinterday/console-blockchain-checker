import Messages from '../../libs/messages';
import Web3 from "web3";

export default abstract class Send { 
    private static provider: any;
    private static web3: Web3;

    public static init() {
        Send.provider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`);
        Send.web3 = new Web3(Send.provider);

        this.sendEther();
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

        const sigTx = await Send.web3.eth.accounts.signTransaction(tx, privKey);
        const { rawTransaction } = sigTx;
        
        try {
            const sendedTx = await Send.web3.eth.sendSignedTransaction(rawTransaction as string);
            console.log(sendedTx);
        } catch(e) {
            console.log(e);
        }
    }
}