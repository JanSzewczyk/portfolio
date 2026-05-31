"use client";

import { Marquee } from "@szum-tech/design-system/components/marquee";

import { TechLogo, type Technology } from "./tech-logo";

type TechMarqueeItem = {
  tech: Technology;
  dataSanity?: string;
};

type TechMarqueeProps = {
  items: Array<TechMarqueeItem>;
};

export function TechMarquee({ items }: TechMarqueeProps) {
  return (
    <Marquee pauseOnHover repeat={2} className="[--duration:50s]">
      {items.map(({ tech, dataSanity }) => (
        <TechLogo key={tech._id} tech={tech} dataSanity={dataSanity} />
      ))}
    </Marquee>
  );
}
