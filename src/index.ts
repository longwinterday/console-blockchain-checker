import Messages from './libs/messages';
import Keys from './modules/keys';
import Peer from './modules/peer';
import Ducx from './modules/ducx';
import Web3 from './modules/ethereum';
import IMenu from './interfaces/menu';

export default class ProgramInterface {

    public static menuList: IMenu[] = [
        { 
            name: 'HD Keys',
            annotation: 'mnemonic and hierarchical deterministic', 
            module: Keys
        },
        { 
            name: 'Check peer', 
            annotation: 'check full node', 
            module: Peer
        },
        {
            name: 'Ethereum',
            annotation: 'You need infra api key', 
            module: Web3
        },
        {
            name: 'Ducx',
            annotation: 'Simple operations', 
            module: Ducx
        }
    ];

    public async init() {
        const menuListNumber: string = Messages.renderMenuList({
            title: 'Blockchain checker(input menu number): ',
            list: ProgramInterface.menuList
        });
        const menuListIndex = Number(menuListNumber) - 1;

        if ( 
            menuListIndex < 0 
            && menuListIndex > ProgramInterface.menuList.length - 1
        ) {
            this.init();
            return 0;
        }

        const module = ProgramInterface.menuList[menuListIndex].module;
        
        module.init();
    }

}

const programInterface = new ProgramInterface();
programInterface.init();