import rs from 'readline-sync';

export default abstract class Messages {      

    public static networks = [
        'mainnet',
        'testnet'
    ]

    public static chains = [
        'BTC',
        'BCH',
        'DUC',
        'DUCX',
        'DOGE',
        'LTC',
        'ETH',
        'XRP'
    ]

    public static setDefaultColor(): void {
        console.log('\x1b[0m');    
    }

    public static setTitleColor(): void {
        console.log('\x1b[34m');    
    }

    public static setListColor(): void {
        console.log('\x1b[35m');    
    }

    public static setQuestionColor(): void {
        console.log('\x1b[33m');    
    }

    public static setAnswerColor(): void {
        console.log('\x1b[32m');    
    }

    public static setErrorColor(): void {
        console.log('\x1b[31m');    
    }

    public static whatToDo() {
        this.setTitleColor();
        console.log('What to do?');

        this.setListColor();
        console.log('1. Keys.');
        console.log('2. Check peer.');

        this.setQuestionColor();
        return rs.question('Specify but provide a number: ');
    } 

    public static keysConttroller() {
        this.setTitleColor();
        console.log('Keys');

        this.setListColor();
        console.log('1. Generate keys(master and chain).');
        console.log('2. Get mnemonic phrase.');
        console.log('3. Get chain pub key from master private key(BIP44).');
        console.log('4. Get fucking key.');

        this.setQuestionColor();
        return rs.question('Specify but provide a number: ');
    } 

    public static getPhrase() {
        this.setQuestionColor();
        return rs.question('Input phrase: ');
    } 

    public static getChain(): string {
        this.setTitleColor();
        console.log('Choice chain');

        this.setListColor();
        this.chains.forEach((chain, index) => {
            const string = `${index + 1}. ${chain}`;
            console.log(string);
        });

        this.setQuestionColor();
        const indexChain = rs.question('Input number chain: ');
        const index = Number(indexChain);

        return this.chains[Number(index) - 1];
    } 

    public static choiceChain(modules: { name: string, peer?: any, web3?: boolean }[]) {
        this.setTitleColor();
        console.log('Choice blockchain');

        this.setListColor();
        modules.forEach((module, index) => {
            const string = `${index + 1}. ${module.name}`;
            console.log(string);
        });

        this.setQuestionColor();
        return rs.question('Specify but provide a number: ');
    }

    public static getHost() {
        this.setQuestionColor();
        return rs.question('Input host: ');
    }

    public static getPort() {
        this.setQuestionColor();
        return rs.question('Input port: ');
    }

    public static getNetwork(): string {
        this.setTitleColor();
        console.log('Choice network');

        this.setListColor();
        this.networks.forEach((network, index) => {
            const string = `${index + 1}. ${network}`;
            console.log(string);
        });

        this.setQuestionColor();
        const indexNetwork = rs.question('Input number network: ');
        const index = Number(indexNetwork);

        return this.networks[Number(index) - 1];
    }

    public static answer(text: string) {
        this.setAnswerColor();
        console.log(text);
    }

    public static error(text: string) {
        this.setErrorColor();
        console.log(text);
    }

    public static getMasterPrivateKey() {
        this.setQuestionColor();
        return rs.question('Input master private key: ');
    }

    public static getBIPPath() {
        this.setQuestionColor();
        return rs.question('Input BIP44 path: ');
    }
}