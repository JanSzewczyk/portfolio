import { Bike, BookOpen, Camera, ChefHat, Gamepad2, Leaf, Mountain, Music, Paintbrush, Plane } from "lucide-react";
import type * as React from "react";
import { GiFishingLure, GiGardeningShears } from "react-icons/gi";

const HOBBY_ICONS: Record<string, React.ElementType> = {
  cooking: ChefHat,
  cycling: Bike,
  figurines: Paintbrush,
  fishing: GiFishingLure,
  gaming: Gamepad2,
  gardening: GiGardeningShears,
  hiking: Mountain,
  music: Music,
  photography: Camera,
  reading: BookOpen,
  travel: Plane
};

type HobbyItemProps = {
  iconType: string;
  label: string;
};

export function HobbyItem({ iconType, label }: HobbyItemProps) {
  const Icon = HOBBY_ICONS[iconType] ?? Leaf;

  return (
    <div className="group hover:bg-accent flex items-center gap-2 rounded px-3 py-2 transition-colors">
      <Icon
        aria-hidden
        className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-colors"
        focusable={false}
      />
      <span className="text-body-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </div>
  );
}
