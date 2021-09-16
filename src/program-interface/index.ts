import Messages from './messages';
import Peer from '../modules/peer';

export default class ProgtramInterface {

    public modules: { name: string, peer: any }[] = [
        { name: 'Bitcoin', peer: require('bitcore-p2p').Peer }, 
        { name: 'Bitcoin Cash', peer: require('bitcore-p2p-cash').Peer }, 
        { name: 'Doge', peer: require('bitcore-p2p-doge').Peer }, 
        { name: 'LiteCoin', peer: require('bitcore-p2p').Peer }, 
        { name: 'Ducatus', peer: require('@ducatus/bitcore-p2p').Peer }
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
        const network = Messages.getNetwork();

        Peer.check({
            host,
            port,
            network,
            Peer: this.modules[indexModule].peer
        });
    }
}