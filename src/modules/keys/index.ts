import Messages from '../../libs/messages';
import IMenu from '../../interfaces/menu';
import Bip39 from './bip39';
import Address from './address';
import GenerateKeys from './generate-keys';

export default abstract class Keys { 

    public static menuList: IMenu[] = [
        { 
            name: 'Get mnemonic phrase(BIP-39)', 
            annotation: '12 words in English', 
            module: Bip39
        },
        {
            name: 'Get address from public key.',
            annotation: 'wallet address', 
            module: Address
        },
        { 
            name: 'Generate keys.' , 
            annotation: 'From mnemonic', 
            module: GenerateKeys
        }
    ];

    public static init() {
        const menuListNumber: string = Messages.renderMenuList({
            title: 'HD Keys(input menu number): ',
            list: Keys.menuList
        });
        const menuListIndex = Number(menuListNumber) - 1;

        if ( 
            menuListIndex < 0 
            && menuListIndex > Keys.menuList.length - 1
        ) {
            this.init();
            return 0;
        }

        const module = Keys.menuList[menuListIndex].module;
        
        module.init();
    }
}