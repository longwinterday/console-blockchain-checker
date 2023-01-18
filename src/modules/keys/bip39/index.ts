import Messages from "../../../libs/messages";
const Mnemonic = require("bitcore-mnemonic");

export default abstract class Bip39 {
  public static init() {
    this.getPhrase();
  }

  public static getPhrase() {
    const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    const phrase = mnemonic.phrase;

    Messages.answer(phrase);
  }
}
