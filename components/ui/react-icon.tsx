"use client";

import { type IconType } from "react-icons";

import * as SimpleIcons from "react-icons/si";

export type IconName = keyof typeof SimpleIcons extends `Si${infer Name}` ? Name : never;

export type DynamicIconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

export function ReactIcon({ name, className, size }: DynamicIconProps) {
  const iconName = `Si${name}` as keyof typeof SimpleIcons;

  // eslint-disable-next-line import/namespace
  const Icon = SimpleIcons[iconName] as IconType | undefined;

  if (!Icon) {
    console.warn(`Icon "Si${name}" not found in react-icons/si`);
    return null;
  }

  return <Icon className={className} size={size} />;
}
