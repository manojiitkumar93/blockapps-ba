
export const ROLES = {
  BUYER: 2,
  SUPPLIER: 3,
  3: 'SUPPLIER',
  2: 'BUYER',
}

export const STATES = {
  1: {
    state: 'OPEN',
    icon: 'visibility'
  },
  2: {
    state: 'PRODUCTION',
    icon: 'build'
  },
  3: {
    state: 'INTRANSIT',
    icon: 'flight_takeoff'
  },
  4: {
    state: 'RECEIVED',
    icon: 'mood'
  },
  5: {
    state: 'REJECTED',
    icon: 'sentiment_very_dissatisfied'
  },
  OPEN: 1,
  PRODUCTION: 2,
  INTRANSIT: 3,
  RECEIVED: 4,
  REJECTED: 5,
}

export const BID_STATES = {
  1: 'OPEN',
  2: 'ACCEPTED',
  3: 'REJECTED',
  OPEN: 1,
  ACCEPTED: 2,
  REJECTED: 3,
}

export const PROJECT_EVENTS = ['NULL', 'Accepted', 'Shipped', 'Received','Rejected']
