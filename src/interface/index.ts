import Messages from './messages';
import PeerController from './controllers/peer';
import MnemonicController from './controllers/mnemonic';

export default class ProgramInterface {

    public async start() {
        const firstQuestion: string = Messages.whatToDo();
        const index = Number(firstQuestion);

        if ( 
            index < 1
            && index > 2
        ) {
            this.start();
            return 0;
        }

        if (index === 1) {
            MnemonicController.start();
        } else {
            PeerController.check();
        }
    }

}