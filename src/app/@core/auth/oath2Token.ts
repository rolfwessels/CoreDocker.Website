import { NbAuthSimpleToken } from '@nebular/auth';

export class OAuth2Token extends NbAuthSimpleToken {

  private accessToken: AccessTokenWithExpireDate;
  constructor(readonly payload: string) {
    super(payload);
    try {
      if (payload)
        this.accessToken = OAuth2Token.decodeAccessToken(payload);
    } catch (e) {
      console.log(e);
      payload = null;
      this.accessToken = <AccessTokenWithExpireDate>{};
    }
  }

  isValid(): boolean {
    return super.isValid() &&
      this.accessToken != null &&
      this.accessToken.access_token != null &&
      this.accessToken.expire_date >= new Date();
  }

  static decodeAccessToken(tokenString: string): AccessTokenWithExpireDate {
    const split = tokenString.split(';');
    if (split.length !== 4) throw new Error(`Could not parse '${tokenString}' into AccessToken`);

    const token = <AccessTokenWithExpireDate> {
      access_token: split[0],
      expires_in: parseInt(split[1], 10),
      token_type: split[2],
      expire_date: new Date(parseInt(split[3], 10)),
    };
    return token;
  }

  static encodeAccessToken(token: AccessToken, date: Date = new Date()): string {
    const newDate = new Date(date.getTime() + (token.expires_in * 1000));
    return token.access_token + ';' + token.expires_in + ';' + token.token_type + ';' + newDate.getTime();
  }
}

export interface AccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface AccessTokenWithExpireDate extends AccessToken {
  expire_date: Date;
}
