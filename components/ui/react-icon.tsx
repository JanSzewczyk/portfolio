"use client";

import { type IconType } from "react-icons";

import * as SimpleIcons from "react-icons/si";
import * as TablerIcons from "react-icons/tb";
import * as VSCodeIcons from "react-icons/vsc";

const ICONS = { ...SimpleIcons, ...TablerIcons, ...VSCodeIcons } as const;

export type IconName = keyof typeof ICONS;

export type DynamicIconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

export function ReactIcon({ name, className, size }: DynamicIconProps) {
  const Icon = ICONS[name] as IconType | undefined;
  if (!Icon) {
    console.warn(`Icon "${name}" not found in react-icons`);
    return null;
  }
  return <Icon className={className} size={size} />;
}
