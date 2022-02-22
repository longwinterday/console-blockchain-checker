import Messages from '../messages';
import PeerController from '../peer';
import KeysController from '../keys';
import Web3Controller from '../web3';
import DucxController from '../ducx';

export default class ProgramInterface {

    public static menuList = [
        { 
            title: 'HD Keys' , 
            func:  KeysController.start
        },
        { 
            title: 'Check peer.' , 
            func: PeerController.check
        },
        {
            title: 'Ethereum',
            func: Web3Controller.start
        },
        {
            title: 'Ducx blockchain',
            func: DucxController.start
        }
    ]

    public async start() {
        const firstQuestion: string = Messages.renderList({
            title: 'Input number:',
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