"use client";

import { Button } from "@szum-tech/design-system/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@szum-tech/design-system/components/dropdown-menu";
import { ChevronDown, Download } from "lucide-react";
import { stegaClean } from "next-sanity";

/** Maps ISO language codes to flag emoji. Falls back to 🌐. */
const LANGUAGE_FLAGS: Record<string, string> = {
  en: "🇬🇧",
  pl: "🇵🇱",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  it: "🇮🇹",
  pt: "🇵🇹",
  nl: "🇳🇱",
  ru: "🇷🇺",
  uk: "🇺🇦",
  cs: "🇨🇿",
  sk: "🇸🇰"
};

function getLanguageFlag(languageCode: string): string {
  return LANGUAGE_FLAGS[languageCode.toLowerCase()] ?? "🌐";
}

type CvDownloadItem = {
  _key: string;
  label: string | null;
  languageCode: string | null;
  file: {
    asset: {
      url: string | null;
      originalFilename: string | null;
    } | null;
  } | null;
};

/**
 * Builds a Sanity CDN download URL.
 * The `dl` query parameter forces the browser to download rather than display the
 * file (Sanity CDN feature — works cross-origin without needing the `download`
 * attribute). The asset's `originalFilename` becomes the downloaded file's name;
 * when absent, `?dl` alone keeps the asset's default name.
 */
function buildDownloadUrl(cvItem: CvDownloadItem): string {
  const url = cvItem.file?.asset?.url ?? "";
  return `${url}?dl`;
}

type CVDropdownProps = {
  downloads: Array<CvDownloadItem>;
  dataSanity?: string;
};

export function CVDropdown({ downloads, dataSanity }: CVDropdownProps) {
  const validDownloads = downloads.filter((d) => d.file?.asset?.url && d.label);

  if (!validDownloads.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-sanity={dataSanity} variant="default" size="sm" startIcon={<Download />} endIcon={<ChevronDown />}>
          Download CV
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {validDownloads.map((item) => {
          return (
            <DropdownMenuItem key={item._key} asChild>
              <a href={buildDownloadUrl(item)} target="_blank" rel="noopener noreferrer">
                <span className="text-base leading-none">{getLanguageFlag(stegaClean(item.languageCode ?? ""))}</span>
                <span>{item.label}</span>
                <Download className="ml-auto opacity-40" />
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
