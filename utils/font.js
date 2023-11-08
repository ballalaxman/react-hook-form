import { Space_Grotesk, Lexend_Deca } from "next/font/google";

export const lexendDeca = Lexend_Deca({
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--lexend_deca",
  preload: false,
});

export const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--space_grotesk",
  preload: false,
});
