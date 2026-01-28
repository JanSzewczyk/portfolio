"use client";

import * as React from "react";

import { type IconType } from "react-icons";
import { set, unset, type StringInputProps } from "sanity";

import { Autocomplete, Box, Card, Flex, Text } from "@sanity/ui";
import * as SimpleIcons from "react-icons/si";
import * as TablerIcons from "react-icons/tb";
import * as VSCodeIcons from "react-icons/vsc";

const ICONS = { ...SimpleIcons, ...TablerIcons, ...VSCodeIcons } as const;
const ICON_NAMES = Object.keys(ICONS);

type IconName = keyof typeof ICONS;

export function IconSearchInput(props: StringInputProps) {
  const { onChange, value = "" } = props;
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChange = React.useCallback(
    (newValue: string) => {
      onChange(newValue ? set(newValue) : unset());
    },
    [onChange]
  );

  const handleQueryChange = React.useCallback((query: string | null) => {
    setSearchQuery(query ?? "");
  }, []);

  const filteredOptions = ICON_NAMES.filter((name) => name.toLowerCase().includes(searchQuery.toLowerCase())).slice(
    0,
    100
  ); // Limit to 100 results for performance

  const options = filteredOptions.map((name) => ({
    value: name
  }));

  const IconComponent = value ? (ICONS[value as IconName] as IconType) : null;

  const renderOption = React.useCallback((option: { value: string }) => {
    const Icon = ICONS[option.value as IconName] as IconType;
    return (
      <Card as="button" padding={2}>
        <Flex align="center" gap={3}>
          <Box>
            <Icon size={24} />
          </Box>
          <Text size={1}>{option.value}</Text>
        </Flex>
      </Card>
    );
  }, []);

  const renderValue = React.useCallback(
    (_value: string, option?: { value: string }) => {
      return option?.value || value || "";
    },
    [value]
  );

  return (
    <Flex align="center" gap={2}>
      <Autocomplete
        id="icon-search"
        placeholder="Search icons..."
        options={options}
        value={value}
        onQueryChange={handleQueryChange}
        onChange={handleChange}
        renderOption={renderOption}
        renderValue={renderValue}
        openButton
      />
      {IconComponent ? <IconComponent size={32} /> : null}
    </Flex>
  );
}
