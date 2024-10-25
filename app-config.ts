export const appConfig = {
  "$logo-title": "DKG Edge Node",
  "$logo-graphic-only": "/images/edge-node-logo.svg",
  $logo: "/images/header-logo.svg",
  "$background-image": "/images/edge-node-background.png",
  "$background-color": "#1A162180",
  "$primary-color": "#6A5B7E80",
  "$primary-color-light": "#6A5B7E",
  "$primary-color-dark": "#26202F",
  "$secondary-color": "#A376DB",
  "$secondary-color-light": "#A376DB",
  "$secondary-color-dark": "#A376DB",
  "$tertiary-color": "#8993C7",
  "$tertiary-color-light": "#8993C7",
  "$tertiary-color-dark": "#8993C7",
  "$primary-font": "Manrope",
  "$logo-font": "Overused Grotesk Semi Bold",
  "$headlines-font": "Space Grotesk",
  "$text-color-default": "#FFFFFF",
  "$text-color-light": "#DCDCDC",
  "$text-color-dark": "#B3B3B3",
};

export const prepareConfig = async () => {
  let styleConfig = "";
  Object.entries(appConfig).forEach((row) => {
    const key = row[0];
    const value = row[1];
    let pair;
    if (value.startsWith("#") || value.startsWith("rgba")) {
      pair = `${key}: ${value};\n`;
    } else {
      pair = `${key}: '${value}';\n`;
    }
    styleConfig = styleConfig + pair;
  });
  return styleConfig;
};
