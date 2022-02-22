import Messages from '../../controllers/messages';
import Web3 from 'web3';

export default abstract class Peer {

    public static check(option: any) {
        const { 
            host,
            port,
            network,
            web3,
            Peer,
        } = option;
        const peerOption: any = {};

        if ( host ) {
            peerOption.host = host;
        }

        if ( port ) {
            peerOption.port = port;
        }

        if ( network ) {
            peerOption.network = network;
        }

        if ( web3 ) {
            const web3: Web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${host}:${port}`));
            
            web3.eth.net.isListening()
                .then(() => {
                    Messages.answer('Connect');
                })
                .catch(() => {
                    Messages.error('Error');
                });
        } else {
            const peer = new Peer(peerOption);
        
            peer.on('ready', function() {
                Messages.answer(`Ready: ${peer.version}, ${peer.subversion}, ${peer.bestHeight}`);
            });
            peer.on('connect', function() {
                Messages.answer('Connect');
            });
            peer.on('error', function() {
                Messages.error('Error');
            });
            peer.on('disconnect', function() {
                Messages.error('connection closed');
            });
            
            peer.connect();
        }

        
    }
}