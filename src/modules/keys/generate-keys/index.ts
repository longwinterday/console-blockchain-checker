
import Messages from '../../../libs/messages';
import Chains from '../chains';
import Networks from '../networks';
import { Deriver } from '../../../libs/cwc';
const Mnemonic = require('bitcore-mnemonic');

export default abstract class Address { 

    public static init() {
        this.generateKeys();
    }
    
    public static generateKeys() {
        const phrase = Messages.getString('Input phrase(optional): ');
        const chain = this.getChainModule();
        const network: string = this.getNetwork();

        const mnemonic = new Mnemonic(phrase);
        const hdPrivKey = mnemonic.toHDPrivateKey();
        const xPriv = hdPrivKey.xprivkey;

        const path = Deriver.pathFor(chain.name, network);
        const deriveHdPrivKey = mnemonic.toHDPrivateKey().derive(path);

        const xPrivDerive = deriveHdPrivKey.xprivkey;
        const xPubDerive = deriveHdPrivKey.xpubkey.toString();
        const keys = Deriver.derivePrivateKey(chain.name, network, xPrivDerive, 0, false);
        const {
            address,
            privKey,
            pubKey
        } = keys;
  

        Messages.answer('BIP32 Root Key extended private key: ' + xPriv);
        Messages.answer('-----------------');
        Messages.answer('Derivation path: ' + path);
        Messages.answer('Extended private key: ' + xPrivDerive);
        Messages.answer('Extended public key: ' + xPubDerive);
        Messages.answer('-----------------');
        Messages.answer('Derivation path: ' + path + '/0/0');
        Messages.answer('Address: ' + address);
        Messages.answer('Private key: ' + privKey);
        Messages.answer('Public key: ' + pubKey);
    }

    public static getChainModule(): any {
        const chainMenuListNumber = Messages.renderMenuList({
            title: 'Choice chain: ',
            list: Chains
        });
        const chainMenuListIndex = Number(chainMenuListNumber) - 1;

        if ( 
            chainMenuListIndex < 0 
            && chainMenuListIndex > Chains.length - 1
        ) {
            this.init();
            return 0;
        }

        return Chains[chainMenuListIndex];
    }

    public static getNetwork(): string {
        const networkMenuListNumber: string = Messages.renderList({
            title: 'Choice network: ',
            list: Networks
        });
        const chainMenuListIndex = Number(networkMenuListNumber) - 1;

        if ( 
            chainMenuListIndex < 0 
            && chainMenuListIndex > Networks.length - 1
        ) {
            this.init();
            return '';
        }

        return Networks[chainMenuListIndex].value;
    }
}