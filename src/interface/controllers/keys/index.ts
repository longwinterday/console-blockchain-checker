import Messages from '../../messages';
import { 
    Deriver, 
    BitcoreLib 
} from '../../../modules/cwc';
const Mnemonic = require('bitcore-mnemonic');

export default abstract class KeysController { 

    public static start() {
        const firstQuestion: string = Messages.keysConttroller();
        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > 3
        ) {
            this.start();
            return 0;
        }

        if (index === 1) {
            this.generate();
        } else if (index === 2 ) {
            this.getPhrase();
        } else if (index === 3) {
            this.getChainPubKey();
        } else {
            this.getPublicKeyFromHDPublicKey();
        }
    }
    
    public static generate() {
        // "select scout crash enforce riot rival spring whale hollow radar rule sentence"
        // const phrase = Messages.getPhrase();
        const chain = Messages.getChain();
        const network = Messages.getNetwork();

        const mnemonic = new Mnemonic();
        const hdPrivKey = mnemonic.toHDPrivateKey('', network).derive(Deriver.pathFor(chain, network));
        const privKeyObj = hdPrivKey.toObject();
        const { xpubkey } = hdPrivKey;
        const { xprivkey } = privKeyObj;
        const pubKey = hdPrivKey.publicKey.toString();
        const privateKey = hdPrivKey.privateKey.toString();
        const address = Deriver.deriveAddress(chain, network, xpubkey, 0, false);
        
        Messages.answer('XPubkey: ' + xpubkey);
        Messages.answer('XPrivkey: ' + xprivkey);
        Messages.answer('Public key: ' + pubKey);
        Messages.answer('Private key: ' + privateKey);
        Messages.answer('Addres: ' + address);
    }

    public static getPhrase() {
        const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
        const phrase = mnemonic.phrase;

        Messages.answer(phrase);
    }

    public static getChainPubKey() {
        const masterPrivateKey = Messages.getMasterPrivateKey();
        const path = Messages.getBIPPath();
        const masterKeys = new BitcoreLib.HDPrivateKey(masterPrivateKey);
        const chainPubKey = masterKeys.deriveChild(path).toString();

        Messages.answer('Chain pub key: ' + chainPubKey);
    }

    public static getPublicKeyFromHDPublicKey() {
        const xPubKey = Messages.getMasterPrivateKey();
        const path = Messages.getBIPPath();
        const xPub = new BitcoreLib.HDPublicKey(xPubKey);
        const pub = xPub.deriveChild(path).publicKey;

        Messages.answer('Pub key: ' + pub);
    }


    
}