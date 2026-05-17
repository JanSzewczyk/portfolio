import { Card } from "@szum-tech/design-system";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";

export type Technology = {
  _id: string;
  name: string | null;
  icon: string | null;
  description: string | null;
};

export type TechLogoProps = {
  tech: Technology;
  dataSanity?: string;
};

export function TechLogo({ tech, dataSanity }: TechLogoProps) {
  return (
    <Card
      className="group relative flex h-24 w-28 flex-col items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
      data-sanity={dataSanity}
    >
      <div>
        {tech.icon ? (
          <ReactIcon
            name={tech.icon as IconName}
            className="relative z-10 size-8 text-primary opacity-40 transition-opacity duration-300 group-hover:opacity-70"
          />
        ) : null}
      </div>

      <span className="relative z-10 text-center text-body-xs text-foreground">{tech.name}</span>
    </Card>
  );
}
