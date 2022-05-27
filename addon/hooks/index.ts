import React, { useMemo } from 'react';

const _EmberOwnerContext = React.createContext<any | null>(null);

export function useEmberService(serviceName: string) {
  const owner = React.useContext(_EmberOwnerContext);
  if (!owner) throw 'Ember owner not registered';

  return useMemo(() => owner.lookup(`service:${serviceName}`), [owner, serviceName]);
}

export function useEmberLookup(path: string) {
  const owner = React.useContext(_EmberOwnerContext);
  return useMemo(() => owner.lookup(path), [owner, path]);
}

export { _EmberOwnerContext };
