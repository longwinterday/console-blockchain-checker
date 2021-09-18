import Messages from '../../messages';
import { Deriver } from '../../../modules/cwc';
const Mnemonic = require('bitcore-mnemonic');

export default abstract class MnemonicController { 

    public static start() {
        const firstQuestion: string = Messages.mnemonicLib();
        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > 2
        ) {
            this.start();
            return 0;
        }

        if (index === 1) {
            this.generate();
        } else {
            this.getPhrase();
        }
    }
    
    public static generate() {
        // "select scout crash enforce riot rival spring whale hollow radar rule sentence"
        const phrase = Messages.getPhrase();
        const chain = Messages.getChain();
        const network = Messages.getNetwork();

        const mnemonic = new Mnemonic(phrase);
        const hdPrivKey = mnemonic.toHDPrivateKey('', network).derive(Deriver.pathFor(chain, network));
        const privKeyObj = hdPrivKey.toObject();
        const { xpubkey } = hdPrivKey;
        const { xprivkey } = privKeyObj;
        const pubKey = hdPrivKey.publicKey.toString();
        const address = Deriver.deriveAddress(chain, network, xpubkey, 0, false);
        
        Messages.answer('xpubkey: ' + xpubkey);
        Messages.answer('xprivkey: ' + xprivkey);
        Messages.answer('public key: ' + pubKey);
        Messages.answer('addres: ' + address);
    }

    public static getPhrase() {
        const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
        const phrase = mnemonic.phrase;

        Messages.answer(phrase);
    }

}