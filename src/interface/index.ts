import Messages from './messages';
import PeerController from './controllers/peer';
import KeysController from './controllers/keys';

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
            KeysController.start();
        } else {
            PeerController.check();
        }
    }

}