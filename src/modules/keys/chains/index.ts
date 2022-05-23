import { 
    BitcoreLib,
    BitcoreLibCash,
    BitcoreLibDoge,
    BitcoreLibLtc,
    DucatusLib
} from '../../../libs/cwc';
import IMenu from '../../../interfaces/menu';

const chains: IMenu[] = [
    { annotation: 'Bitcoin', name: 'BTC', module: BitcoreLib },
    { annotation: 'Bitcoin Cash', name: 'BCH', module: BitcoreLibCash },
    { annotation: 'Ducatus', name: 'DUC', module: DucatusLib },
    { annotation: 'DucatusX', name: 'DUCX', module: DucatusLib},
    { annotation: 'Doge coin', name: 'DOGE', module: BitcoreLibDoge},
    { annotation: 'Lite coin', name: 'LTC', module: BitcoreLibLtc},
    { annotation: 'Ethereum', name: 'ETH', module: BitcoreLib},
    { annotation: 'Ripple', name: 'XRP', module: BitcoreLib}
];

export default chains;