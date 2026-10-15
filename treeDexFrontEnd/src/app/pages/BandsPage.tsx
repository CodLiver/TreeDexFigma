import { useMemo } from 'react';
import { AlphabeticalDirectory } from '../util/AlphabeticalDirectory';
import { bands } from '../data/scene_data/bands_data';

export function BandsPage() {
  const formattedData = useMemo(() => {
    const grouped: Record<string, typeof bands> = {};

    bands.forEach((band) => {
      const letter = band.letter?.toUpperCase() || band.name.charAt(0).toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(band);
    });

    return Object.keys(grouped)
      .sort()
      .map((letter) => ({
        title: letter,
        links: grouped[letter].map((b: any) => ({
          label: b.name,
          url: b.url,
          desc: b.desc || 'Swing & Jazz Big Band',
          social: b.instagram,
          social_url: b.instagram_url,
        })),
      }));
  }, []);

  return (
    <AlphabeticalDirectory
      title="Swing Bands & Orchestras"
      subtitle="Live big bands, hot jazz ensembles, and swing combos performing globally."
      data={formattedData}
    />
  );
}