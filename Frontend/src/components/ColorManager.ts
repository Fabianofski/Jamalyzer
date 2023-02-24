import { changeHue, hslToRGB, rgbToHSL } from "./ColorConverter";

let colorScheme = "light";

export function setPreferredColorScheme() {
  if (localStorage.getItem("theme")) {
    colorScheme = localStorage.getItem("theme") || colorScheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    colorScheme = "dark";
  }

  document.documentElement.setAttribute("data-theme", colorScheme);
}

export function toggleTheme() {
  colorScheme = colorScheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", colorScheme);
  document.documentElement.setAttribute("data-theme", colorScheme);
  if (document.URL.includes("/jam/")) SetJamTheme(jamDefaultPrimaryColor, jamDefaultSecondaryColor);
}

export function getTheme() {
  return colorScheme;
}

const defaultPrimaryColor = "#f55a5b";
const defaultSecondaryColor = "#151048";

export function ResetToDefaultColors(): void {
  document.documentElement.style.setProperty("--primary-color", defaultPrimaryColor);
  document.documentElement.style.setProperty("--secondary-color", defaultSecondaryColor);
}

let jamDefaultPrimaryColor = "#f55a5b";
let jamDefaultSecondaryColor = "#151048";
let jamPrimaryColor = "#f55a5b";
let jamSecondaryColor = "#151048";

export function SetJamTheme(primary: string, secondary: string): void {
  jamDefaultPrimaryColor = primary;
  jamDefaultSecondaryColor = secondary;
  if (primary === "#ffffff") primary = secondary;
  if (secondary === "#ffffff") secondary = changeHue(primary, 10);
  const primaryHsl = rgbToHSL(primary);
  const secondaryHsl = rgbToHSL(secondary);
  primaryHsl.s = Math.max(0.6, primaryHsl.s);
  secondaryHsl.s = Math.max(0.8, secondaryHsl.s);
  if (colorScheme === "light") {
    secondaryHsl.l = Math.max(0.2, Math.min(secondaryHsl.l, 0.4));
    primaryHsl.l = Math.min(0.4, primaryHsl.l);
  } else {
    secondaryHsl.l = Math.max(0.2, secondaryHsl.l);
    primaryHsl.l = Math.max(0.4, Math.min(primaryHsl.l, 0.6));
  }

  jamPrimaryColor = hslToRGB(primaryHsl);
  jamSecondaryColor = hslToRGB(secondaryHsl);
  document.documentElement.style.setProperty("--primary-color", jamPrimaryColor);
  document.documentElement.style.setProperty("--secondary-color", jamSecondaryColor);
}

export function GetJamPrimary(): string {
  return jamPrimaryColor;
}

export function GetJamPrimaryVariations(amount: number): string[] | undefined {
  const hslColor = rgbToHSL(jamPrimaryColor);
  hslColor.l = Math.max(0.4, hslColor.l);
  return GetColorVariations(hslToRGB(hslColor), amount, 60);
}

export function GetJamSecondary(): string {
  return jamSecondaryColor;
}

function GetColorVariations(color: string, amount: number, degree: number): string[] | undefined {
  const colors = [];
  let oldColor = color;
  for (let i = 0; i < amount; i++) {
    colors.push(oldColor);
    oldColor = changeHue(oldColor, degree);
  }
  return colors;
}
