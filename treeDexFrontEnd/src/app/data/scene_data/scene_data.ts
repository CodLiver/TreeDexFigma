// data/scene_data/scene_data.ts

export interface SceneLink {
  label: string;
  url: string;
  description?: string;
}

export interface Country {
  name: string;
  scenes: SceneLink[];
}

export interface Continent {
  title: string;
  countries: Country[];
}

export const scenes: Continent[] = [
  {
    title: 'Europe',
    countries: [
      {
        name: 'United Kingdom',
        scenes: [
          { label: "Swing Patrol", url: "https://www.swingpatrol.co.uk/", description: "London" },
          { label: "Swing Out London", url: "https://www.swingoutlondon.co.uk", description: "London" },
          { label: "The Swing Era", url: "https://theswingera.co.uk", description: "Birmingham" },
          { label: "Swing Dance Bristol", url: "https://swingdancebristol.com", description: "Bristol" },
          { label: "Edinburgh Swing Dance Society", url: "https://www.edinburghswing.org.uk", description: "Edinburgh" }
        ]
      },
      {
        name: 'Sweden',
        scenes: [
          { label: "Herräng Dance Camp", url: "https://www.herrang.com/", description: "Herräng" },
          { label: "Chicago Swing Dance Studio", url: "https://chicago.se", description: "Stockholm" },
          { label: "Cats' Corner", url: "https://catscorner.se", description: "Malmö" }
        ]
      },
      {
        name: 'Turkey',
        scenes: [
          { label: "Swing Planet", url: "https://www.swingplanet.com.tr/", description: "Istanbul" },
          { label: "Hepcats Istanbul", url: "https://www.hepcats.com.tr/", description: "Istanbul" },
          { label: "Swing Istanbul", url: "https://swingistanbul.com/", description: "Istanbul" },
          { label: "Swing Dance Ankara", url: "https://www.instagram.com/swingdanceankara", description: "Ankara" },
          { label: "METU Swing", url: "https://www.instagram.com/metuswing", description: "Ankara" },
          { label: "Swing Out Izmir", url: "https://www.instagram.com/swingoutizmir", description: "Izmir" }
        ]
      },
      {
        name: 'France',
        scenes: [
          { label: "Shake That Swing", url: "https://shakethatswing.com", description: "Paris" },
          { label: "Swing in Paris", url: "https://swinginparis.fr", description: "Paris" },
          { label: "Aix in Swing", url: "https://aixinswing.fr", description: "Aix-en-Provence" }
        ]
      },
      {
        name: 'Germany',
        scenes: [
          { label: "Swing in Berlin", url: "https://swinginberlin.de", description: "Berlin" },
          { label: "Swing Step", url: "https://swingstep.com", description: "Frankfurt / Heidelberg" },
          { label: "Vintage Club Munich", url: "https://vintage-club.de", description: "Munich" }
        ]
      },
      {
        name: 'Spain',
        scenes: [
          { label: "BCNswing", url: "https://bcnswing.org", description: "Barcelona" },
          { label: "MADforSwing", url: "https://madforswing.es", description: "Madrid" }
        ]
      },
      {
        name: 'Italy',
        scenes: [
          { label: "Milano Swing", url: "https://milanoswing.it", description: "Milan" },
          { label: "Turincats", url: "https://turincats.com", description: "Turin" }
        ]
      }
    ]
  },
  {
    title: 'North America',
    countries: [
      {
        name: 'United States',
        scenes: [
          { label: "Lindy in the Park", url: "https://lindyinthepark.com", description: "San Francisco, CA" },
          { label: "Atomic Ballroom", url: "https://atomicballroom.com", description: "Irvine, CA" },
          { label: "You Should Be Dancing!", url: "https://youshouldbedancing.nyc", description: "New York, NY" },
          { label: "Glen Echo Park Spanish Ballroom", url: "https://glenechopark.org", description: "Glen Echo, MD" },
          { label: "International Lindy Hop Championships (ILHC)", url: "https://ilhc.com", description: "Global / USA" }
        ]
      }
    ]
  },
  {
    title: 'Asia',
    countries: []
  },
  {
    title: 'Africa',
    countries: []
  },
  {
    title: 'South America',
    countries: []
  },
  {
    title: 'Oceania',
    countries: []
  }
];