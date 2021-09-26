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

    public static renderList({ title, list }: any) {
        this.setTitleColor();
        console.log(title);

        this.setListColor();
        list.forEach((unit: any, index: number) => {
            const string = `${index + 1}. ${unit.text}`;
            console.log(string);
        });

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
    
}