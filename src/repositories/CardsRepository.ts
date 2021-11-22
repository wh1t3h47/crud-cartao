/* eslint-disable class-methods-use-this */
import Cards from '../interfaces/CardDTO';
import Card from '../schemas/Card.ts';
import ValidateCardService from '../sevices/ValidateCardService';

class CardsRepository {
  public async create({
    number,
    month,
    year,
    cvv,
  }: Cards): Promise<Cards> {
    const exists = Card.findOne({ number });
    if (exists) {
      /** @todo acentuar */
      throw new Error('Este cartao já está cadastrado e eh v`alido.');
    }
    const card = new ValidateCardService({
      number, month, year, cvv,
    });
    await new Card(card).save();
    return card;
  }

  public async delete(number: string): Promise<void> {
    await Card.findOneAndUpdate({ number }, {
      $set: {
        isDeleted: true,
      },
    });
  }

  public async all():Promise<Cards> {
    const cards = await Card.find({});
    return cards;
  }
}

export default CardsRepository;
