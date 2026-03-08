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
        ]
      },
      {
        name: 'Sweden',
        scenes: [
          { label: "Herräng Dance Camp", url: "https://www.herrang.com/", description: "Herräng" }
        ]
      },
      {
        name: 'Turkey',
        scenes: [
           { label: "Swing Planet", url: "https://www.swingplanet.com.tr/", description: "Istanbul" },
           { label: "Hepcats Istanbul", url: "https://www.hepcats.com.tr/", description: "Istanbul" }
        ]
      }
    ]
  },
  {
    title: 'Asia',
    countries: [
    ]
  }
];