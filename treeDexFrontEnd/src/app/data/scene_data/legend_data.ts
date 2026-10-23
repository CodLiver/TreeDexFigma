// data/scene_data/legends_data.ts

export interface Legend {
  name: string;
  url: string;
  desc?: string;
  styles?: string;
  letter?: string;
}

export const swingLegends: Legend[] = [
  {
    name: 'Al Minns',
    url: 'https://en.wikipedia.org/wiki/Al_Minns',
    desc: "Whitey's Lindy Hoppers pioneer; key figure in the 1980s Lindy Hop resurgence.",
    styles: 'Lindy Hop, Jazz, Charleston',
    letter: 'A'
  },
  {
    name: 'George "Shorty George" Snowden',
    url: 'https://en.wikipedia.org/wiki/List_of_dancers',
    desc: 'Savoy Ballroom legend credited with coining the name "Lindy Hop" and popularizing the breakaway.',
    styles: 'Lindy Hop, Breakaway',
    letter: 'G'
  },
  {
    name: 'Frankie Manning',
    url: 'https://en.wikipedia.org/wiki/Frankie_Manning',
    desc: 'Co-creator of the first air step and chief choreographer for Whitey\'s Lindy Hoppers.',
    styles: 'Lindy Hop, Air Steps, Solo Jazz',
    letter: 'F'
  },
  {
    name: 'John W. "Bubbles" Sublett',
    url: 'https://en.wikipedia.org/wiki/John_W._Bubbles',
    desc: 'The Father of Rhythm Tap; half of the iconic vaudeville duo Buck and Bubbles.',
    styles: 'Rhythm Tap, Vaudeville',
    letter: 'J'
  },
  {
    name: 'Ford "Buck" Washington',
    url: 'https://en.wikipedia.org/wiki/Buck_Washington',
    desc: 'Acclaimed pianist, singer, and vaudevillian who performed in Buck and Bubbles.',
    styles: 'Stride Piano, Tap, Vaudeville',
    letter: 'F'
  },
  {
    name: 'Leon James',
    url: 'https://en.wikipedia.org/wiki/Leon_James_(dancer)',
    desc: "Harvest Moon Ball champion, Whitey's Lindy Hopper, and jazz dance historian.",
    styles: 'Lindy Hop, Authentic Jazz',
    letter: 'L'
  },
  {
    name: 'Norma Miller',
    url: 'https://en.wikipedia.org/wiki/Norma_Miller',
    desc: 'Known as the "Queen of Swing", dancer, author, comedian, and original Savoy Lindy Hopper.',
    styles: 'Lindy Hop, Solo Jazz, Choreography',
    letter: 'N'
  }
];