import type { ReactNode } from 'react';
import type { GeoPoint } from '../types';
import { LocaleContext, useLocaleDetection } from './useLocale';

interface Props {
  geoPoint: GeoPoint;
  children: ReactNode;
}

export function LocaleProvider({ geoPoint, children }: Props) {
  const value = useLocaleDetection(geoPoint);
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
