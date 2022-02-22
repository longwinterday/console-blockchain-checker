import Messages from './messages';
import PeerController from './controllers/peer';
import KeysController from './controllers/keys';
import Web3Controller from './controllers/web3';
import DucxController from './controllers/ducx';

export default class ProgramInterface {

    public static menuList = [
        { 
            title: 'Keys.' , 
            func:  KeysController.start
        },
        { 
            title: 'Check peer.' , 
            func: PeerController.check
        },
        {
            title: 'Web3',
            func: Web3Controller.start
        },
        {
            title: 'Ducx',
            func: DucxController.start
        }
    ]

    public async start() {
        const firstQuestion: string = Messages.renderList({
            title: 'What to do?:',
            list: ProgramInterface.menuList
        });
        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > 2
        ) {
            this.start();
            return 0;
        }

        ProgramInterface.menuList[index - 1].func();

        Messages.setDefaultColor();
    }

}