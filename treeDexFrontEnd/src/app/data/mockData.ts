// Mock data for all pages

export const swingWebsites = [
  { key: 'Swing festival calendar', value: 'SwingPlanit', url: 'https://swingplanit.com' },
  { key: 'Dance Videos', value: 'iDance', url: 'https://idance.net' },
  { key: 'Find events in Scandinavia', value: 'SwingInScandinavia', url: 'https://swinginscandinavia.com' },
  { key: 'EU artist contact network', value: 'Swinging Europe', url: 'https://swingingeurope.com' },
  { key: 'Event ticket buy sell', value: 'Dancecloud', url: 'https://dancecloud.com' },
  { key: 'Find events in Scenes', value: 'Swingremedy', url: 'https://swingremedy.com' },
];

export const socialMediaAccounts = [
  { key: 'Cool Swing dance videos', value: '@coolswingvids', url: 'https://instagram.com/coolswingvids' },
  { key: 'Yeet', value: '@yeetdance', url: 'https://instagram.com/yeetdance' },
];

export const paidServices = [
  { key: 'Find events in scenes', value: 'Swing Today', url: 'https://swingtoday.com' },
  { key: 'Shoe brands', value: 'Dansco.io', url: 'https://dansco.io' },
  { key: 'Shoe brands', value: 'Madeleine Dynamite', url: 'https://madeleinedynamite.com' },
  { key: 'Shoe brand', value: 'Chloe Hong', url: 'https://chloehong.com' },
  { key: 'Shoe brand', value: 'Trashy Shoes', url: 'https://trashyshoes.com' },
  { key: 'Shoe brand', value: 'Saint Savoy', url: 'https://saintsavoy.com' },
  { key: 'Shoe brand', value: 'Eouvella', url: 'https://eouvella.com' },
];

export const donateOrganizations = [
  { 
    id: '01',
    name: 'Black Lindy Hoppers Fund',
    instagram: '@blacklindyhoppersfund',
    url: 'https://blacklindyhoppersfund.org'
  },
  { 
    id: '02',
    name: 'Frankie Manning Foundation',
    instagram: '@frankiemanningfoundation',
    url: 'https://frankiemanningfoundation.org'
  },
  { 
    id: '03',
    name: 'Norma Miller Tribute',
    instagram: '@normamillerswing',
    url: 'https://normamiller.org'
  },
  { 
    id: '04',
    name: 'Swing Dance Preservation',
    instagram: '@swingpreservation',
    url: 'https://swingpreservation.org'
  },
];

export const partners = [
  { 
    id: '01',
    name: 'SwingDance Academy',
    instagram: '@swingdanceacademy',
    url: 'https://swingdanceacademy.com'
  },
  { 
    id: '02',
    name: 'Lindy Hop World',
    instagram: '@lindyhopworld',
    url: 'https://lindyhopworld.com'
  },
  { 
    id: '03',
    name: 'Jazz Age Records',
    instagram: '@jazzagerecords',
    url: 'https://jazzagerecords.com'
  },
];

export interface Scene {
  continent: string;
  countries: {
    name: string;
    url: string;
  }[];
}

export const scenes: Scene[] = [
  {
    continent: 'Europe',
    countries: [
      { name: 'Sweden', url: 'https://swinginscandinavia.com/sweden' },
      { name: 'Germany', url: 'https://swingingeurope.com/germany' },
      { name: 'France', url: 'https://swingingeurope.com/france' },
      { name: 'United Kingdom', url: 'https://swingingeurope.com/uk' },
      { name: 'Spain', url: 'https://swingingeurope.com/spain' },
      { name: 'Italy', url: 'https://swingingeurope.com/italy' },
      { name: 'Netherlands', url: 'https://swingingeurope.com/netherlands' },
      { name: 'Belgium', url: 'https://swingingeurope.com/belgium' },
    ]
  },
  {
    continent: 'North America',
    countries: [
      { name: 'United States', url: 'https://swingplanit.com/usa' },
      { name: 'Canada', url: 'https://swingplanit.com/canada' },
      { name: 'Mexico', url: 'https://swingplanit.com/mexico' },
    ]
  },
  {
    continent: 'Asia',
    countries: [
      { name: 'South Korea', url: 'https://swingasia.com/korea' },
      { name: 'Japan', url: 'https://swingasia.com/japan' },
      { name: 'Singapore', url: 'https://swingasia.com/singapore' },
      { name: 'Taiwan', url: 'https://swingasia.com/taiwan' },
    ]
  },
  {
    continent: 'South America',
    countries: [
      { name: 'Brazil', url: 'https://swinglatam.com/brazil' },
      { name: 'Argentina', url: 'https://swinglatam.com/argentina' },
      { name: 'Chile', url: 'https://swinglatam.com/chile' },
    ]
  },
  {
    continent: 'Oceania',
    countries: [
      { name: 'Australia', url: 'https://swingoceania.com/australia' },
      { name: 'New Zealand', url: 'https://swingoceania.com/newzealand' },
    ]
  },
  {
    continent: 'Africa',
    countries: [
      { name: 'South Africa', url: 'https://swingafrica.com/southafrica' },
      { name: 'Kenya', url: 'https://swingafrica.com/kenya' },
    ]
  },
];

export interface Band {
  name: string;
  url: string;
  letter: string;
}

export const bands: Band[] = [
  // A
  { name: 'Artie Shaw Orchestra', url: 'https://artieshawmusic.com', letter: 'A' },
  { name: 'Andy Kirk & His Clouds of Joy', url: 'https://andykirk.com', letter: 'A' },
  // B
  { name: 'Benny Goodman Orchestra', url: 'https://bennygoodman.com', letter: 'B' },
  { name: 'Bob Wills and His Texas Playboys', url: 'https://bobwills.com', letter: 'B' },
  // C
  { name: 'Count Basie Orchestra', url: 'https://countbasie.com', letter: 'C' },
  { name: 'Cab Calloway', url: 'https://cabcalloway.com', letter: 'C' },
  { name: 'Chick Webb Orchestra', url: 'https://chickwebb.com', letter: 'C' },
  // D
  { name: 'Duke Ellington Orchestra', url: 'https://dukeellington.com', letter: 'D' },
  { name: 'Dizzy Gillespie', url: 'https://dizzygillespie.com', letter: 'D' },
  // E
  { name: 'Ella Fitzgerald', url: 'https://ellafitzgerald.com', letter: 'E' },
  { name: 'Erskine Hawkins', url: 'https://erskinehawkins.com', letter: 'E' },
  // F
  { name: 'Fletcher Henderson Orchestra', url: 'https://fletcherhenderson.com', letter: 'F' },
  // G
  { name: 'Glenn Miller Orchestra', url: 'https://glennmiller.com', letter: 'G' },
  { name: 'Gordon Webster', url: 'https://gordonwebster.com', letter: 'G' },
  // H
  { name: 'Harry James Orchestra', url: 'https://harryjames.com', letter: 'H' },
  // J
  { name: 'Jimmie Lunceford Orchestra', url: 'https://jimmielunceford.com', letter: 'J' },
  { name: 'Jonathan Stout Orchestra', url: 'https://jonathanstout.com', letter: 'J' },
  // L
  { name: 'Lionel Hampton Orchestra', url: 'https://lionelhampton.com', letter: 'L' },
  // M
  { name: 'Mint Julep Jazz Band', url: 'https://mintjulepjazz.com', letter: 'M' },
  // S
  { name: 'Stan Kenton Orchestra', url: 'https://stankenton.com', letter: 'S' },
  { name: 'Sidney Bechet', url: 'https://sidneybechet.com', letter: 'S' },
  // T
  { name: 'Tommy Dorsey Orchestra', url: 'https://tommydorsey.com', letter: 'T' },
  { name: 'The Hot Sardines', url: 'https://hotsardines.com', letter: 'T' },
];
