
import Messages from '../../libs/messages';
import IMenu from '../../interfaces/menu';
import Account from './account';
import Balance from './balance';
import Send from './send';
import Token from './token';

export default abstract class Ducx {

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
            name: 'Send ducx',
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
            title: 'Ducx: ',
            list: Ducx.menuList
        });
        const menuListIndex = Number(menuListNumber) - 1;

        if ( 
            menuListIndex < 0 
            && menuListIndex > Ducx.menuList.length - 1
        ) {
            this.init();
            return 0;
        }

        const module = Ducx.menuList[menuListIndex].module;
        
        module.init();
    }
}