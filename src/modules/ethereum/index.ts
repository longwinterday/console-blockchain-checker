
import Messages from '../../libs/messages';
import IMenu from '../../interfaces/menu';
import Account from './account';
import Balance from './balance';
import Send from './send';
import Token from './token';

export default abstract class Ethereum {

    public static menuList: IMenu[] = [
        { 
            name: 'Create account.' , 
            annotation: '', 
            module: Account
        },
        {
            name: 'Get balance',
            annotation: '', 
            module: Balance
        },
        {
            name: 'Send etherium',
            annotation: '', 
            module: Send
        },
        {
            name: 'Get token balance',
            annotation: '', 
            module: Token
        }
    ];

    public static init() {
        const menuListNumber: string = Messages.renderMenuList({
            title: 'Ethereum: ',
            list: Ethereum.menuList
        });
        const menuListIndex = Number(menuListNumber) - 1;

        if ( 
            menuListIndex < 0 
            && menuListIndex > Ethereum.menuList.length - 1
        ) {
            this.init();
            return 0;
        }

        const module = Ethereum.menuList[menuListIndex].module;
        
        module.init();
    }
}