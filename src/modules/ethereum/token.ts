import Messages from '../../libs/messages';
import Web3 from "web3";

export default abstract class Token { 
    private static provider: any;
    private static web3: Web3;

    public static init() {
        const infura = Messages.getString('Input infura api key: ');
        Token.provider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infura}`);
        Token.web3 = new Web3(Token.provider);

        this.getBalanceForAddress();
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
            const format = Token.web3.utils.fromWei(result); 
            Messages.answer('Balance: '+ format );
          }
          
          getBalance();
      }
}