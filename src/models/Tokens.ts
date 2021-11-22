class Tokens {
    public token;

    public user;

    public ip;

    public active;

    constructor(token: string, user: string, ip: string, active: boolean) {
      this.token = token;
      this.user = user;
      this.ip = ip;
      this.active = active;
    }
}

export default Tokens;
