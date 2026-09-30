import { CountryCode, CountryInfo } from '../types';

export const COUNTRIES: Record<CountryCode, CountryInfo> = {
  NG: {
    code: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    exchangeRateToUSD: 1550,
    flag: '🇳🇬',
    defaultMarkets: ['Mile 12 Market, Lagos', 'Bodija Market, Ibadan', 'Utako Market, Abuja', 'Oyingbo Market, Lagos'],
    minimumDailyFloor: 2400, // Mathematical floor for meeting 130g protein & 2,100 kcal in Nigeria
    deliveryPartners: [
      {
        name: 'Chowdeck',
        logo: '🛵',
        urlPrefix: 'https://chowdeck.com/search?q=',
        deepLinkApp: 'chowdeck://search?q='
      },
      {
        name: 'Glovo',
        logo: '💛',
        urlPrefix: 'https://glovoapp.com/ng/en/lagos/search/?query=',
        deepLinkApp: 'glovo://search?query='
      },
      {
        name: 'Bolt Food',
        logo: '⚡',
        urlPrefix: 'https://food.bolt.eu/en/ng-lagos/',
        deepLinkApp: 'boltfood://'
      }
    ]
  },
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    exchangeRateToUSD: 1,
    flag: '🇺🇸',
    defaultMarkets: ['Union Square Greenmarket, NYC', 'Pike Place Market, Seattle', 'Trader Joe’s', 'ALDI'],
    minimumDailyFloor: 12.50, // Minimum viable floor for fresh whole foods & lean protein
    deliveryPartners: [
      {
        name: 'Uber Eats',
        logo: '🟢',
        urlPrefix: 'https://www.ubereats.com/search?q=',
        deepLinkApp: 'ubereats://search?q='
      },
      {
        name: 'DoorDash',
        logo: '🔴',
        urlPrefix: 'https://www.doordash.com/search/store/',
        deepLinkApp: 'doordash://search?q='
      },
      {
        name: 'Grubhub',
        logo: '🟠',
        urlPrefix: 'https://www.grubhub.com/search?queryText=',
        deepLinkApp: 'grubhub://search?queryText='
      }
    ]
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    exchangeRateToUSD: 0.77,
    flag: '🇬🇧',
    defaultMarkets: ['Borough Market, London', 'Brixton Market, London', 'Bullring Open Market, Birmingham', 'Lidl / Tesco'],
    minimumDailyFloor: 9.00,
    deliveryPartners: [
      {
        name: 'Deliveroo',
        logo: '🩵',
        urlPrefix: 'https://deliveroo.co.uk/restaurants/london/centre?geohash=gcpvn0b&q=',
        deepLinkApp: 'deliveroo://search?q='
      },
      {
        name: 'Just Eat',
        logo: '🟧',
        urlPrefix: 'https://www.just-eat.co.uk/search?q=',
        deepLinkApp: 'justeat://'
      },
      {
        name: 'Uber Eats UK',
        logo: '🟢',
        urlPrefix: 'https://www.ubereats.com/gb/search?q=',
        deepLinkApp: 'ubereats://'
      }
    ]
  },
  GH: {
    code: 'GH',
    name: 'Ghana',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    exchangeRateToUSD: 15.2,
    flag: '🇬🇭',
    defaultMarkets: ['Makola Market, Accra', 'Kejetia Market, Kumasi', 'Kaneshie Market, Accra'],
    minimumDailyFloor: 38,
    deliveryPartners: [
      {
        name: 'Bolt Food GH',
        logo: '⚡',
        urlPrefix: 'https://food.bolt.eu/en/gh-accra/',
        deepLinkApp: 'boltfood://'
      },
      {
        name: 'Glovo Ghana',
        logo: '💛',
        urlPrefix: 'https://glovoapp.com/gh/en/accra/',
        deepLinkApp: 'glovo://'
      }
    ]
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    currency: 'KES',
    currencySymbol: 'KSh',
    exchangeRateToUSD: 129,
    flag: '🇰🇪',
    defaultMarkets: ['Marikiti (Wakulima) Market, Nairobi', 'Gikomba Market, Nairobi', 'City Market, Nairobi'],
    minimumDailyFloor: 320,
    deliveryPartners: [
      {
        name: 'Glovo Kenya',
        logo: '💛',
        urlPrefix: 'https://glovoapp.com/ke/en/nairobi/',
        deepLinkApp: 'glovo://'
      },
      {
        name: 'Bolt Food KE',
        logo: '⚡',
        urlPrefix: 'https://food.bolt.eu/en/ke-nairobi/',
        deepLinkApp: 'boltfood://'
      }
    ]
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    exchangeRateToUSD: 1.38,
    flag: '🇨🇦',
    defaultMarkets: ['St. Lawrence Market, Toronto', 'Jean-Talon Market, Montreal', 'No Frills / Loblaws'],
    minimumDailyFloor: 15.00,
    deliveryPartners: [
      {
        name: 'SkipTheDishes',
        logo: '🔴',
        urlPrefix: 'https://www.skipthedishes.com/',
        deepLinkApp: 'skipthedishes://'
      },
      {
        name: 'Uber Eats CA',
        logo: '🟢',
        urlPrefix: 'https://www.ubereats.com/ca',
        deepLinkApp: 'ubereats://'
      }
    ]
  }
};
