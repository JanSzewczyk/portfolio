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
    <div className="group flex items-center gap-2 rounded px-3 py-2 transition-colors hover:bg-accent">
      <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      <span className="text-body-sm text-muted-foreground transition-colors group-hover:text-foreground">{label}</span>
    </div>
  );
}
