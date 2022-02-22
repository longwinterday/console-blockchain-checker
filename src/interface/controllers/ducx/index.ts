import Web3 from "web3";
import Messages from '../../messages';

export default abstract class DucxController {

    private static provider: any;

    private static web3: Web3;

    public static menuList = [
        { 
            title: 'Create account.' , 
            func: this.createAccount
        },
        // {
        //     title: 'Get balance',
        //     func: this.getBalance
        // },
        // {
        //     title: 'Send etherium',
        //     func: this.sendEther
        // },
        {
            title: 'Get token balance',
            func: this.getBalanceForAddress
        }
    ];
    
    public static start() {
        DucxController.provider = new Web3.providers.HttpProvider(`http://212.24.108.89:8546`);
        DucxController.web3 = new Web3(DucxController.provider);

        const firstQuestion: string = Messages.renderList({
            title: 'Web3:',
            list: DucxController.menuList
        });

        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > DucxController.menuList.length
        ) {
            this.start();
            return 0;
        }

        DucxController.menuList[index - 1].func();
    }

    public static createAccount() {
       const account = DucxController.web3.eth.accounts.create();
       const { 
           address,
           privateKey,
       } = account;

       Messages.answer('PrivateKey: ' + privateKey);
       Messages.answer('Address: ' + address);
    }

    public static async getBalance() {
        const address = Messages.getString('Input address: ');
        
        const balance = await DucxController.web3.eth.getBalance(address);
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

        const sigTx = await DucxController.web3.eth.accounts.signTransaction(tx, privKey);
        const { rawTransaction } = sigTx;
        
        try {
            const sendedTx = await DucxController.web3.eth.sendSignedTransaction(rawTransaction as string);
            console.log(sendedTx);
        } catch(e) {
            console.log(e);
        }
    }
    
    public static async getBalanceForAddress() {
        const walletAddress = Messages.getString('Wallet address: ');
        const tokenAddress = Messages.getString('Token addres: ');

        const minABI = [
            {
              constant: true,
              inputs: [{ name: "_owner", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "balance", type: "uint256" }],
              type: "function",
            },
          ];
          // @ts-ignore
          const contract = new DucxController.web3.eth.Contract(minABI, tokenAddress);
          
          async function getBalance() {
            const result = await contract.methods.balanceOf(walletAddress).call(); 
            const format = DucxController.web3.utils.fromWei(result); 
            Messages.answer('Balance: '+ format );
          }
          
          getBalance();
      }
}