import {AuthToken} from 'types/auth.type';
import deviceStorage from './deviceStorage';

export const authStorage = {
  get: async () => {
    const tokens = await deviceStorage.getData<AuthToken>('authToken');
    if (!tokens || !tokens.accessToken) return Promise.reject();
    return tokens;
  },
  set: (tokens: AuthToken) => deviceStorage.storeData('authToken', tokens),
  reset: () => deviceStorage.removeData('authToken'),
};
