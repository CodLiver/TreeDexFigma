interface DancerPortraitProps {
  imageUrl: string;
  alt: string;
  caption?: string;
}

export function DancerPortrait({ imageUrl, alt, caption }: DancerPortraitProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-[#2c221e]/5 border border-[#d4c5a0]/40 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-[#e8dfca]/30">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2c221e]/90 via-[#2c221e]/40 to-transparent p-3 pt-6">
          <p className="text-xs font-medium text-[#fdfbf7] truncate">{caption}</p>
        </div>
      )}
    </div>
  );
}