import {changeHue, hslToRGB, rgbToHSL} from "./ColorConverter";

const defaultPrimaryColor = "#f55a5b";
const defaultSecondaryColor = "#151048";

//const primaryTextColor = "#151048";

export function ResetToDefaultColors(){
  document.documentElement.style.setProperty('--primary-color', defaultPrimaryColor);
  document.documentElement.style.setProperty('--secondary-color', defaultSecondaryColor);
}

let jamPrimaryColor = "#f55a5b";
let jamSecondaryColor = "#151048";

export function SetJamTheme(primary, secondary){
  if (primary === "#ffffff") primary = secondary;
  if (secondary === "#ffffff") secondary = changeHue(primary, 10);
  let primaryHsl = rgbToHSL(primary);
  let secondaryHsl = rgbToHSL(secondary);
  primaryHsl.s = Math.max(.6, primaryHsl.s);
  secondaryHsl.s = Math.max(.8, secondaryHsl.s);
  primaryHsl.l = Math.min(.4, primaryHsl.l);
  secondaryHsl.l = Math.min(.2, secondaryHsl.l);
  
  jamPrimaryColor = hslToRGB(primaryHsl);
  jamSecondaryColor = hslToRGB(secondaryHsl);
  document.documentElement.style.setProperty('--primary-color', jamPrimaryColor);
  document.documentElement.style.setProperty('--secondary-color', jamSecondaryColor);
}

export function GetJamPrimary(){
  return jamPrimaryColor;
}

export function GetJamPrimaryVariations(amount){
  let hslColor = rgbToHSL(jamPrimaryColor);
  hslColor.l = Math.max(.4, hslColor.l);
  return GetColorVariations(hslToRGB(hslColor), amount, 60);
}

export function GetJamSecondary(){
  return jamSecondaryColor;
}

function GetColorVariations(color, amount, degree){
  if(!color) return;
  let colors = [];
  let oldColor = color;
  for (let i = 0; i < amount; i++) {
    colors.push(oldColor);
    oldColor = changeHue(oldColor, degree);
  }
  return colors;
}
