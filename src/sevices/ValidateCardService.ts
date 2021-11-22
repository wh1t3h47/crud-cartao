import cardDTO from '../interfaces/CardDTO';

/**
 * @class
 * @name ValidateCardService
 * @implements {cardDTO}
 */
class ValidateCardService implements cardDTO {
    public readonly number;

    public readonly month;

    public readonly year;

    public readonly cvv;

    /**
     * @constructor
     * @description valida matematicamente os dados do cartao
     * @throws {Error} caso o cartao seja invalido
     */
    constructor({
      number,
      month,
      year,
      cvv,
    }: cardDTO) {
      this.number = number.replace(/[^0-9]/, '');
      this.month = month;
      this.year = year;
      this.cvv = cvv;

      const validDate = this.checkDate();
      if (!validDate) {
        /** @todo acentuar */
        throw new Error('Data do cartao invalido.');
      } // else
      const validNumber = this.checkLuhn();
      if (!validNumber) {
        /** @todo acentuar */
        throw new Error('Numero de cartao invalido.');
      }
    }

    /**
     * @private {Function} checkLuhn
     * @description Verifica o numero BIN do cartao (TESTADO) (PASS)
     * @return {Boolean} true caso valide
     */
    private checkLuhn() {
      if (this.number.length < 12) {
        return false;
      } // else
      let s = 0;
      let doubleDigit = false;

      for (let i = this.number.length - 1; i >= 0; i--) {
        let digit = parseInt(this.number[i], 10);
        if (doubleDigit) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        s += digit;
        doubleDigit = !doubleDigit;
      }
      return s % 10 === 0;
    }

    /**
     * @private {Function} checkDate
     * @description Verifica se a data nao eh absurda
     * @return {Boolean} false caso seja invalido
     */
    private checkDate() {
      if (this.month < 1
            || this.month > 12
            || this.year < 2021
            || this.year > 2150
            || this.cvv < 0
      ) {
        return false;
      } // else
      return true;
    }
}

export default ValidateCardService;
