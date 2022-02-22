import Messages from '../messages';
import Peer from '../../modules/peer';
const Btc = require('bitcore-p2p');
const Cash = require('bitcore-p2p-cash');
const Doge = require('bitcore-p2p-doge');
const Ducatus = require('@ducatus/bitcore-p2p');

export default abstract class PeerController {

    public static modules: { title: string, peer?: any, web3?: boolean }[] = [
        { title: 'Bitcoin', peer: Btc.Peer }, 
        { title: 'Bitcoin Cash', peer: Cash.Peer }, 
        { title: 'Dogecoin', peer: Doge.Peer }, 
        { title: 'Litecoin', peer: Btc.Peer }, 
        { title: 'Ducatus', peer: Ducatus.Peer },
        { title: 'Etherium(WebSocket)', web3: true },
        { title: 'DucatusX(WebSocket)', web3: true }
    ];

    public static async check() {
        const firstQuestion: string = Messages.choiceChain(PeerController.modules);
        const indexModule = Number(firstQuestion) - 1;

        if ( 
            indexModule < 0
            && indexModule > PeerController.modules.length - 1
        ) {
            this.check();
            return 0;
        }
        const host = Messages.getString('Input host: ');
        const port = Messages.getString('Input port: ');
        const network = !PeerController.modules[indexModule].web3 && Messages.getNetwork();

        await Peer.check({
            host,
            port,
            network,
            Peer: PeerController.modules[indexModule].peer,
            web3: PeerController.modules[indexModule].web3
        });
      
    }
    
}