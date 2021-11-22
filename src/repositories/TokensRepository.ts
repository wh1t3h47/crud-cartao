/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import Token from '../schemas/Token';
import Tokens from '../models/Tokens';

interface CreateTokenDTO {
  _id: string;
  user: string;
  dueDate: string;
  userIp: string;
}

class TokenRepository {
  private async saveOnDb({
    token, user, ip, active,
  }: Tokens): Promise<void> {
    await new Token({
      token,
      user,
      ip,
      active,
    }).save();
  }

  public async verifyIsActive(token: string): Promise<Record<string, unknown>> {
    const getToken = await Token.findOne({ token });

    if (!getToken) {
      throw new Error(
        'Este token não foi encontrado no banco de dados. Faça login novamente.',
      );
    }

    if (!getToken.active) {
      return { active: false };
    }

    return { active: true };
  }

  public async disableOtherTokens(user: string): Promise<void> {
    await Token.updateMany(
      { user },
      {
        $set: {
          active: false,
        },
      },
    );
  }

  public async deleteAllOnDb(): Promise<void> {
    await Token.deleteMany({});
  }

  public async createCustomToken({
    _id,
    user,
    dueDate,
    userIp,
  }: CreateTokenDTO): Promise<string> {
    const token = jwt.sign(
      {
        _id,
        user,
        dueDate,
        userIp,
      },
      <string>process.env.JWT_SECRET || '',
    );

    await this.saveOnDb({
      token,
      user: _id,
      ip: userIp,
      active: true,
    });

    return token;
  }

  public async create({
    _id,
    user,
    dueDate,
    userIp,
  }: CreateTokenDTO): Promise<string> {
    await this.disableOtherTokens(
      _id,
    );

    const token = jwt.sign(
      {
        _id,
        user,
        dueDate,
        userIp,
      },
      <string>process.env.JWT_SECRET || '',
      { expiresIn: '5h' },
    );

    await this.saveOnDb({
      token,
      user: _id,
      ip: userIp,
      active: true,
    });

    return token;
  }
}

export default TokenRepository;
