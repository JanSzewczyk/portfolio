"use client";

import { Card, CardContent } from "@szum-tech/design-system/components/card";
import { MapPin } from "lucide-react";
import { Map, type MapProps, Marker } from "pigeon-maps";

type LocationCardProps = {
  city: string;
  coordinates: { lat?: number; lng?: number };
};

export function LocationCard({ city, coordinates }: LocationCardProps) {
  const lat = coordinates.lat ?? 52.2297;
  const lng = coordinates.lng ?? 21.0122;

  const mapOptions: Partial<MapProps> = {
    defaultCenter: [lat, lng],
    defaultZoom: 7,
    minZoom: 7,
    maxZoom: 7,
    attribution: false
  };

  return (
    <Card className="group relative overflow-hidden p-0">
      <CardContent className="p-0">
        {/* Map Container */}
        <div className="relative h-48 w-full">
          <Map {...mapOptions} boxClassname="grayscale-50">
            <Marker width={20} anchor={[lat, lng]}>
              <MapPin className="size-5 text-primary" />
            </Marker>
          </Map>

          {/* Location Content Overlay */}
          <div className="absolute -bottom-1 -left-1 flex items-center gap-3 rounded-tr bg-card p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
              <MapPin className="size-5" />
            </div>
            <div>
              <p className="text-body-xs text-muted-foreground uppercase">Based in</p>
              <p className="text-body-lg">{city}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
