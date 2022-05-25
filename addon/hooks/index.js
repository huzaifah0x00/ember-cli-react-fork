import React, { useMemo } from 'react';

const _EmberOwnerContext = React.createContext(null);

export function useEmberService(serviceName) {
  const owner = React.useContext(_EmberOwnerContext);
  return useMemo(() => owner.lookup(`service:${serviceName}`), [owner, serviceName]);
}

export function useEmberLookup(path) {
  const owner = React.useContext(_EmberOwnerContext);
  return useMemo(() => owner.lookup(path), [owner, path]);
}

export { _EmberOwnerContext };
