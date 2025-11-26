export const metersToFeet = (meters: number): string => {
  return (meters * 3.28084).toFixed(2);
}

export const feetToMeters = (feet: number): string => {
  return (feet / 3.28084).toFixed(2);
}

export const celsiusToFahrenheit = (celsius: number): string => {
  return ((celsius * 9 / 5) + 32).toFixed(2);
}

export const fahrenheitToCelsius = (fahrenheit: number): string => {
  return ((fahrenheit - 32) * 5 / 9).toFixed(2);
}
