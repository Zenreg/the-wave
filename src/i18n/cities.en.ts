import type { CityNames } from './types';
import { deepFreeze } from '../lib/integrity';

const citiesEn: CityNames = {
  '-12': ['Baker Island'],
  '-11': ['Pago Pago'],
  '-10': ['Honolulu'],
  '-9': ['Anchorage'],
  '-8': ['Los Angeles', 'Vancouver'],
  '-7': ['Denver', 'Phoenix'],
  '-6': ['Mexico City', 'Chicago'],
  '-5': ['New York', 'Bogota', 'Lima'],
  '-4': ['Santiago', 'Caracas'],
  '-3': ['São Paulo', 'Buenos Aires'],
  '-2': ['Fernando de Noronha'],
  '-1': ['Azores', 'Cape Verde'],
  '0': ['London', 'Dakar', 'Lisbon'],
  '1': ['Paris', 'Berlin', 'Lagos'],
  '2': ['Cairo', 'Johannesburg', 'Helsinki'],
  '3': ['Moscow', 'Nairobi', 'Istanbul'],
  '4': ['Dubai', 'Tbilisi'],
  '5': ['Karachi', 'Tashkent'],
  '6': ['Dhaka', 'Almaty'],
  '7': ['Bangkok', 'Jakarta'],
  '8': ['Beijing', 'Singapore', 'Perth'],
  '9': ['Tokyo', 'Seoul'],
  '10': ['Sydney', 'Vladivostok'],
  '11': ['Noumea'],
  '12': ['Auckland', 'Fiji'],
  '13': ['Tonga'],
  '14': ['Kiribati'],
};

export default deepFreeze(citiesEn);
