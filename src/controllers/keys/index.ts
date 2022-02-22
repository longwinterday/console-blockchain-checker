import Messages from '../messages';
import { 
    Deriver, 
    BitcoreLib,
    BitcoreLibCash,
    BitcoreLibDoge,
    BitcoreLibLtc,
    DucatusLib
} from '../../modules/cwc';
const Mnemonic = require('bitcore-mnemonic');

export default abstract class KeysController { 

    public static networks = [
        { title: 'livenet', name: 'livenet' },
        { title: 'mainnet', name: 'mainnet'},
        { title: 'testnet', name: 'testnet'}
    ];

    public static chains = [
        { title: 'Bitcoin', name: 'BTC', provider: BitcoreLib },
        { title: 'Bitcoin Cash', name: 'BCH', provider: BitcoreLibCash },
        { title: 'Ducatus', name: 'DUC', provider: DucatusLib },
        { title: 'DucatusX', name: 'DUCX', provider: DucatusLib},
        { title: 'Dogecoin', name: 'DOGE', provider: BitcoreLibDoge},
        { title: 'Litecoin', name: 'LTC', provider: BitcoreLibLtc},
        { title: 'Etherium', name: 'ETH', provider: BitcoreLib},
        { title: 'Ripple', name: 'XRP', provider: BitcoreLib}
    ];

    public static menuList = [
        { 
            title: 'Get mnemonic phrase.(BIP-39)' , 
            func: this.getPhrase
        },
        {
            title: 'Get address from public key.',
            func: this.getAddressFromPub
        },
        { 
            title: 'Generate keys.' , 
            func: this.generateKeys
        },
        {
            title: 'Get multisig address(P2SH)',
            func: this.createMultisigAddress
        },
        {
            title: 'Get keys by HD index.',
            func: this.getKeysByPath
        },
        {
            title: 'Get addresses.',
            func: this.getAddresses
        }
    ];

    public static start() {
        const firstQuestion: string = Messages.renderList({
            title: 'Keys:',
            list: KeysController.menuList
        });
        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > KeysController.menuList.length
        ) {
            this.start();
            return 0;
        }

        KeysController.menuList[index - 1].func();
    }
    
    public static getPhrase() {
        const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
        const phrase = mnemonic.phrase;

        Messages.answer(phrase);
    }

    public static getAddressFromPub() {
        const pubKeyStr = Messages.getString('Input public key: ');

        const chain = Messages.renderList({
            title: 'Choice chain:',
            list: KeysController.chains
        });
        const chainIndex = Number(chain);
        const chainItem = KeysController.chains[Number(chainIndex) - 1];

        let network = Messages.renderList({
            title: 'Choice network:',
            list: KeysController.networks
        });
        const networkIndex = Number(network);
        network = KeysController.networks[Number(networkIndex) - 1].title;

        const pubKey = chainItem.provider.PublicKey(pubKeyStr);
        const address = pubKey.toAddress().toString()

        Messages.answer('Address: ' + address);
    }

    public static generateKeys() {
        const phrase = Messages.getString('Input phrase(optional): ');
        const chain = Messages.renderList({
            title: 'Choice chain:',
            list: KeysController.chains
        });
        const chainIndex = Number(chain);
        const chainItem = KeysController.chains[Number(chainIndex) - 1];
        const chainName = KeysController.chains[Number(chainIndex) - 1].name;

        let network = Messages.renderList({
            title: 'Choice network:',
            list: KeysController.networks
        });
        const networkIndex = Number(network);
        network = KeysController.networks[Number(networkIndex) - 1].name;
        

        const mnemonic = new Mnemonic();
        const seed = mnemonic.toSeed(phrase);
        
        const HDPrivateMasterKey = chainItem.provider.HDPrivateKey.fromSeed(seed, network);
        const path = Deriver.pathFor(chainName, network);
        const HDChainPrivateKey = HDPrivateMasterKey.derive(path);
        const address = HDChainPrivateKey.publicKey.toAddress(network);

        Messages.answer('Seed: ' + seed);
        Messages.answer('Phrase: ' + phrase);

        Messages.accent('Master X keys.');
        Messages.answer('X private key: ' + HDPrivateMasterKey.xprivkey);
        Messages.answer('X public key: ' + HDPrivateMasterKey.xpubkey);


        Messages.accent('Path keys.');
        Messages.answer('Path: ' + path);
        Messages.answer('X public key: ' + HDChainPrivateKey.xpubkey);
        Messages.answer('X private key: ' + HDChainPrivateKey.xprivkey);
        Messages.answer('Private key: ' + HDChainPrivateKey.privateKey.toString());
        Messages.answer('Private key(WIF): ' + HDChainPrivateKey.privateKey.toWIF());
        Messages.answer('Public key: ' + HDChainPrivateKey.publicKey.toString());
        Messages.answer('Address: ' + address);
    }

    public static createMultisigAddress() {
        const countKeys = Messages.getString('Input count keys: ');
        const countSigKeys = Messages.getString('Count of keys required for signing: ');
        const pubKeys = [];

        const chain = Messages.renderList({
            title: 'Choice chain',
            list: KeysController.chains
        });
        const chainIndex = Number(chain);
        const chainItem = KeysController.chains[Number(chainIndex) - 1];

        let network = Messages.renderList({
            title: 'Choice network:',
            list: KeysController.networks
        });
        const networkIndex = Number(network);
        network = KeysController.networks[Number(networkIndex) - 1].title;


        for (let i = 0; i < Number(countKeys); i++) {
            const key = Messages.getString('Input public key: ');
            pubKeys.push(key);
        }

        const address = chainItem.provider.Address(pubKeys, Number(countSigKeys), network);

        Messages.answer('Address: ' + address);
    }

    public static getKeysByPath() {
        const customPath = Messages.getString('Input path: ');
        const phrase = Messages.getString('Input phrase: ');

        const chain = Messages.renderList({
            title: 'Choice chain:',
            list: KeysController.chains
        });
        const chainIndex = Number(chain);
        const chainItem = KeysController.chains[Number(chainIndex) - 1];

        let network = Messages.renderList({
            title: 'Choice network:',
            list: KeysController.networks
        });
        const networkIndex = Number(network);
        network = KeysController.networks[Number(networkIndex) - 1].title;


        const mnemonic = new Mnemonic();
        const seed = mnemonic.toSeed(phrase);
        const HDPrivateMasterKey = chainItem.provider.HDPrivateKey.fromSeed(seed, network);
        const HDCustomPrivateKey = HDPrivateMasterKey.derive(customPath);
        const customAddress = HDCustomPrivateKey.publicKey.toAddress(network);

        Messages.accent('Keys from HD path.');
        Messages.answer('Path: ' + customPath);
        Messages.answer('HD private key: ' + HDCustomPrivateKey.xprivkey);
        Messages.answer('HD public key: ' + HDCustomPrivateKey.xpubkey);
        Messages.answer('Private key: ' + HDCustomPrivateKey.privateKey.toString());
        Messages.answer('private key(WIF): ' + HDCustomPrivateKey.privateKey.toWIF());
        Messages.answer('Public key: ' + HDCustomPrivateKey.publicKey.toString());
        Messages.answer('Address: ' + customAddress);
    }

    public static getAddresses() {
        const count = Messages.getString('Number of required addresses: ');
        const phrase = Messages.getString('Input phrase: ');

        const chain = Messages.renderList({
            title: 'Choice chain:',
            list: KeysController.chains
        });
        const chainIndex = Number(chain);
        const chainItem = KeysController.chains[Number(chainIndex) - 1];
        const chainName = KeysController.chains[Number(chainIndex) - 1].title;

        let network = Messages.renderList({
            title: 'Choice network:',
            list: KeysController.networks
        });
        const networkIndex = Number(network);
        network = KeysController.networks[Number(networkIndex) - 1].title;

        const mnemonic = new Mnemonic();
        const seed = mnemonic.toSeed(phrase);
        const HDPrivateMasterKey = chainItem.provider.HDPrivateKey.fromSeed(seed, network);

        Messages.accent('HD master keys.');
        Messages.answer('Seed: ' + seed);
        Messages.answer('Phrase: ' + phrase);
        Messages.answer('HD private key: ' + HDPrivateMasterKey.xprivkey);
        Messages.answer('HD public key: ' + HDPrivateMasterKey.xpubkey);


        Messages.accent('Account.');
        let path: string = Deriver.pathFor(chainName, network) + "/0'";
        const HDChainPrivateKey = HDPrivateMasterKey.derive(path);
        const chainAddress = HDChainPrivateKey.publicKey.toAddress(network);

        Messages.accent('Path: ' + path);
        Messages.answer('HD public key: ' + HDChainPrivateKey.xpubkey);
        Messages.answer('HD private key: ' + HDChainPrivateKey.xprivkey);
        Messages.answer('Private key: ' + HDChainPrivateKey.privateKey.toString());
        Messages.answer('Private key(WIF): ' + HDChainPrivateKey.privateKey.toWIF());
        Messages.answer('Public key: ' + HDChainPrivateKey.publicKey.toString());
        Messages.answer('Address: ' + chainAddress);


        Messages.accent('Change.');
        path = path + "/0'";
        const HDChainPrivateKeyChange = HDPrivateMasterKey.derive(path);
        const changeAddress = HDChainPrivateKeyChange.publicKey.toAddress(network);

        Messages.accent('Path: ' + path);
        Messages.answer('HD public key: ' + HDChainPrivateKeyChange.xpubkey);
        Messages.answer('HD private key: ' + HDChainPrivateKeyChange.xprivkey);
        Messages.answer('Private key: ' + HDChainPrivateKeyChange.privateKey.toString());
        Messages.answer('Private key(WIF): ' + HDChainPrivateKeyChange.privateKey.toWIF());
        Messages.answer('Public key: ' + HDChainPrivateKeyChange.publicKey.toString());
        Messages.answer('Address: ' + changeAddress);

        Messages.accent('Address.');

        for ( let i = 0; i < Number(count); i++ ) {
            const HDKeysByIndex = HDPrivateMasterKey.derive(path + `/${i}'`);
            const address = HDKeysByIndex.publicKey.toAddress(network);

            Messages.accent('Path: ' + path + `/${i}'`);
            Messages.answer('HD public key: ' + HDKeysByIndex.xpubkey);
            Messages.answer('HD private key: ' + HDKeysByIndex.xprivkey);
            Messages.answer('Private key: ' + HDKeysByIndex.privateKey.toString());
            Messages.answer('Private key(WIF): ' + HDKeysByIndex.privateKey.toWIF());
            Messages.answer('Public key: ' + HDKeysByIndex.publicKey.toString());
            Messages.answer('Address: ' + address);
        }
    }

}