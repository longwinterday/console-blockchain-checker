
import Messages from '../../../libs/messages';
import Chains from '../chains';

export default abstract class Address { 

    public static init() {
        this.getAddress();
    }
    
    public static getAddress() {
        const pubKeyStr: string = Messages.getString('Input public key: ');
        const chainModule: any = this.getChainModule();
        const pubKey = chainModule.PublicKey(pubKeyStr);
        const address = pubKey.toAddress().toString()

        Messages.answer('Address: ' + address);
    }

    public static getChainModule(): any {
        const chainMenuListNumber = Messages.renderMenuList({
            title: 'Choice chain: ',
            list: Chains
        });
        const chainMenuListIndex = Number(chainMenuListNumber);

        if ( 
            chainMenuListIndex < 0 
            && chainMenuListIndex > Chains.length - 1
        ) {
            this.init();
            return 0;
        }

        return Chains[chainMenuListIndex].module;
    }

}