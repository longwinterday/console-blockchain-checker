import rs from 'readline-sync';

export default abstract class Messages {      

    public static setDefaultColor(): void {
        console.log('\x1b[32m');    
    }

    public static choiceChain(modules: { name: string, peer: any }[]) {
        this.setDefaultColor();
        console.log('Choice blockchain');

        modules.forEach((module, index) => {
            const string = `${index + 1}. ${module.name}`;
            console.log(string);
        });
        
        return rs.question("Specify but provide a number: ");
    }

    public static getHost() {
        return rs.question("Input host: ");
    }

    public static getPort() {
        return rs.question("Input port: ");
    }

    public static getNetwork() {
        return rs.question("Input network: ");
    }
}