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
            console.log(peer.version, peer.subversion, peer.bestHeight);
        });
        peer.on('connect', function() {
            console.log("connect");
        });
        peer.on('error', function() {
            console.log("error");
        });
        peer.on('disconnect', function() {
            console.log('connection closed');
        });
        
        peer.connect();
    }
}