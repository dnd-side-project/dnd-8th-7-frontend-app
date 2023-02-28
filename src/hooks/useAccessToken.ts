import {useEffect, useState} from 'react';

import useShortNavigation from 'hooks/useShortNavigation';
import {authStorage} from 'stores';

export default function useAccessToken() {
  const [isLoading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string>();
  const {logout} = useShortNavigation();

  useEffect(() => {
    authStorage
      .get()
      .then(tokens => {
        setAccessToken(tokens.accessToken);
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  return {accessToken, isLoading, logout};
}
