import Messages from '../../messages';
import { 
    Deriver, 
    BitcoreLib,
    BitcoreLibCash,
    BitcoreLibDoge,
    BitcoreLibLtc,
    DucatusLib
} from '../../../modules/cwc';
const Mnemonic = require('bitcore-mnemonic');

export default abstract class KeysController { 

    public static networks = [
        { text: 'mainnet'},
        { text: 'testnet'}
    ]

    public static chains = [
        { text: 'BTC', provider: BitcoreLib },
        { text: 'BCH', provider: BitcoreLibCash },
        { text: 'DUC', provider: DucatusLib },
        { text: 'DUCX', provider: DucatusLib},
        { text: 'DOGE', provider: BitcoreLibDoge},
        { text: 'LTC', provider: BitcoreLibLtc},
        { text: 'ETH', provider: BitcoreLib},
        { text: 'XRP', provider: BitcoreLib}
    ]

    public static menuList = [
        { 
            text: 'Generate keys.' , 
            func: this.generateKeys
        },
        { 
            text: 'Get mnemonic phrase.' , 
            func: this.getPhrase
        }
    ]

    public static start() {
        const firstQuestion: string = Messages.renderList({
            title: "Keys:",
            list: KeysController.menuList
        });
        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > this.menuList.length
        ) {
            this.start();
            return 0;
        }

        KeysController.menuList[index - 1].func();
    }
    
    public static generateKeys() {
        // First mnemonic phrase: "select scout crash enforce riot rival spring whale hollow radar rule sentence"
        // Second mnemonic phrase: "beach brick claw bright around aspect tumble lake phone extend expose grunt"
        const phrase = Messages.getPhrase();
        const chain = Messages.renderList({
            title: 'Choice chain',
            list: KeysController.chains
        });
        const chainIndex = Number(chain);
        const chainItem = KeysController.chains[Number(chainIndex) - 1];
        const chainName = KeysController.chains[Number(chainIndex) - 1].text;

        let network = Messages.renderList({
            title: 'Choice network',
            list: KeysController.networks
        });
        const networkIndex = Number(network);
        network = KeysController.networks[Number(networkIndex) - 1].text;
        
        const mnemonic = new Mnemonic();
        const seed = mnemonic.toSeed(phrase);

        const HDPrivateMasterKey = chainItem.provider.HDPrivateKey.fromSeed(seed, network);
        Messages.answer('HD master public key: ' + HDPrivateMasterKey.xprivkey);
        Messages.answer('HD master private key: ' + HDPrivateMasterKey.xpubkey);

        const path = Deriver.pathFor(chainName, network);
        Messages.answer('Path: ' + path);

        const HDChainPrivateKey = HDPrivateMasterKey.derive(path);
        Messages.answer('HD master private key: ' + HDChainPrivateKey.xpubkey);
        Messages.answer('HD master public key: ' + HDChainPrivateKey.xprivkey);
        Messages.answer('Private key by chain: ' + HDChainPrivateKey.privateKey.toString());
        Messages.answer('private key(WIF): ' + HDChainPrivateKey.privateKey.toWIF());
        Messages.answer('Public key by chain: ' + HDChainPrivateKey.publicKey.toString());

        const address = HDChainPrivateKey.publicKey.toAddress(network);
        Messages.answer('Address chain: ' + address);
    }

    public static getPhrase() {
        const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
        const phrase = mnemonic.phrase;

        Messages.answer(phrase);
    }

}