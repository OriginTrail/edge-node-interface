export const appConfig = {
  "$logo-title": "DKG Explorer",
  "$logo-graphic-only": "/images/edge-node-logo.svg",
  $logo: "/images/header-logo.svg",
  "$background-image": "/images/edge-node-background.png",
  "$background-color": "#19193480",
  "$primary-color": "#6A5B7E80",
  "$primary-color-light": "#8B85F440",
  "$primary-color-dark": "#191934",
  "$secondary-color": "#8B85F4",
  "$secondary-color-light": "#8B85F4",
  "$secondary-color-dark": "#8B85F4",
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
