import Messages from '../messages';

export default abstract class Peer {

    public static check(option: any) {
        const { 
            host,
            port,
            network,
            Peer
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

        const peer = new Peer(peerOption);
        
        peer.on('ready', function() {
            Messages.answer(`Ready: ${peer.version}, ${peer.subversion}, ${peer.bestHeight}`);
        });
        peer.on('connect', function() {
            Messages.answer('Connect');
        });
        peer.on('error', function() {
            Messages.error('error');
        });
        peer.on('disconnect', function() {
            Messages.error('connection closed');
        });
        
        peer.connect();
    }
}