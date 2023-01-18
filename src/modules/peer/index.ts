import Messages from "../../libs/messages";
import PeerLib from "../../libs/peer";
import IPeerModule from "../../interfaces/peer-module";
const Btc = require("bitcore-p2p");
const Cash = require("bitcore-p2p-cash");
const Doge = require("bitcore-p2p-doge");
const Ducatus = require("@ducatus/bitcore-p2p");

export default abstract class Peer {
  public static peerModules: IPeerModule[] = [
    { name: "Bitcoin", module: Btc.Peer },
    { name: "Bitcoin Cash", module: Cash.Peer },
    { name: "Doge coin", module: Doge.Peer },
    { name: "Lite coin", module: Btc.Peer },
    { name: "Ducatus", module: Ducatus.Peer },
    { name: "Ethereum(WebSocket)", web3: true },
    { name: "DucatusX(WebSocket)", web3: true },
  ];

  public static async init() {
    // const menuListNumber: string = Messages.choiceChain(Peer.modules);
    // const indexModule = Number(menuListNumber) - 1;
    // if (
    //     indexModule < 0
    //     && indexModule > PeerController.modules.length - 1
    // ) {
    //     this.check();
    //     return 0;
    // }
    // const host = Messages.getString('Input host: ');
    // const port = Messages.getString('Input port: ');
    // const network = !PeerController.modules[indexModule].web3 && Messages.getNetwork();
    // await PeerLib.check({
    //     host,
    //     port,
    //     network,
    //     Peer: PeerController.modules[indexModule].peer,
    //     web3: PeerController.modules[indexModule].web3
    // });
  }
}
