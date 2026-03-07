interface DancerPortraitProps {
  imageUrl: string;
  alt: string;
}

export function DancerPortrait({ imageUrl, alt }: DancerPortraitProps) {
  return (
    <div className="relative">
      <div className="bg-white p-2 shadow-lg border-4 border-[#8b7355] rounded-sm">
        <div className="aspect-[3/4] overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover grayscale sepia"
          />
        </div>
      </div>
    </div>
  );
}