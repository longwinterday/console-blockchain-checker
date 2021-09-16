import Messages from '../modules/messages';
import Peer from '../modules/peer';
const Btc = require('bitcore-p2p');
const Cash = require('bitcore-p2p-cash');
const Doge = require('bitcore-p2p-doge');
const Ducatus = require('@ducatus/bitcore-p2p');

export default class ProgramInterface {

    public modules: { name: string, peer?: any, web3?: boolean }[] = [
        { name: 'Bitcoin', peer: Btc.Peer }, 
        { name: 'Bitcoin Cash', peer: Cash.Peer }, 
        { name: 'Doge', peer: Doge.Peer }, 
        { name: 'LiteCoin', peer: Btc.Peer }, 
        { name: 'Ducatus', peer: Ducatus.Peer },
        { name: 'Etherium(ws)', web3: true },
        { name: 'DucatusX(ws)', web3: true }
    ];
 
    public async start() {
        const firstQuestion: string = Messages.choiceChain(this.modules);
        const indexModule = Number(firstQuestion) - 1;

        if ( 
            indexModule < 0
            && indexModule > this.modules.length - 1
        ) {
            this.start();
            return 0;
        }
        const host = Messages.getHost();
        const port = Messages.getPort();
        const network = !this.modules[indexModule].web3 && Messages.getNetwork();

        Peer.check({
            host,
            port,
            network,
            Peer: this.modules[indexModule].peer,
            web3: this.modules[indexModule].web3
        });
    }
}