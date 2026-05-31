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
    <Marquee className="[--duration:50s]" pauseOnHover repeat={2}>
      {items.map(({ tech, dataSanity }) => (
        <TechLogo dataSanity={dataSanity} key={tech._id} tech={tech} />
      ))}
    </Marquee>
  );
}
