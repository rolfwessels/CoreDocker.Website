import { OAuth2Token, AccessToken } from './oath2Token';


describe('Class: OAuth2Token', () => {

  const sampleToken: AccessToken =  {
    access_token: 'tokenxxxxxxxxxxxxxx',
    expires_in: 43200,
    token_type: 'bearer',
  };
  const date: Date = new Date(2001, 1, 1, 1, 1, 0);

  it('should allow string to be encoded', () => {
    const encoded = OAuth2Token.encodeAccessToken(sampleToken, date);
     expect(encoded).toBe('tokenxxxxxxxxxxxxxx;43200;bearer;981025260000');
  });

  it('should allow encoded string to be decode', () => {

    const encoded = OAuth2Token.encodeAccessToken(sampleToken);
    const decoded = OAuth2Token.decodeAccessToken(encoded);
    expect(decoded.access_token).toBe(sampleToken.access_token);
    expect(decoded.expires_in).toBe(sampleToken.expires_in);
    expect(decoded.token_type).toBe(sampleToken.token_type);
  });

  it('should also encode the expiry date', () => {
    const encoded = OAuth2Token.encodeAccessToken(sampleToken, date);
    const decoded = OAuth2Token.decodeAccessToken(encoded);
    expect(decoded.expire_date.getTime()).toBe(new Date(2001, 1, 1, 1 + 12, 1, 0).getTime());
  });


  describe('when calling is valid', () => {
    it('should be false when no accessToken', () => {
      const authToken = new OAuth2Token('notAbleToParse');
      expect(authToken.isValid()).toBe(false);
    });

    it('should be false when no accessToken', () => {
      const authToken = new OAuth2Token(null);
      expect(authToken.isValid()).toBe(false);
    });

    it('should be false when expired', () => {
      const authToken = new OAuth2Token(OAuth2Token.encodeAccessToken(sampleToken, date));
      expect(authToken.isValid()).toBe(false);
    });

    it('should be true when has access token and not expired', () => {
      const authToken = new OAuth2Token(OAuth2Token.encodeAccessToken(sampleToken, new Date()));
      expect(authToken.isValid()).toBe(true);
    });


  });

});
