import { useMemo } from "react";
import BackgroundImage1 from "../../public/269DC9E1-B446-421A-861B-6A6ECEA63E0E.png";
import BackgroundImage2 from "../../public/A7532A20-1A6C-42F6-881C-90E3CAB68D34.png";
import BackgroundImage3 from "../../public/C3DE6D78-E808-4029-AF07-BD2E0478B6C4.png";
import BackgroundImage4 from "../../public/740B8F27-5876-4BD8-BE0F-75BFF295B875.png";
import BackgroundImage5 from "../../public/B522BD92-C5D0-4789-A32E-9CE32CA83179.png";
import BackgroundImage6 from "../../public/F648448D-0E93-4EDB-8E12-FB617D895867.png";
import BackgroundImage7 from "../../public/0FBD376F-7EB1-4A27-9F1C-5C9A6C82F829.png";

const backgroundImages = [
  BackgroundImage1,
  BackgroundImage2,
  BackgroundImage3,
  BackgroundImage4,
  BackgroundImage5,
  BackgroundImage6,
  BackgroundImage7,
];

export function useRandomBackground() {
  const image = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  }, []);

  return image;
}
