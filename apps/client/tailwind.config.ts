/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--main-font)"],
      },
    },
  },
  presets: [
    require("@nizar-repo/tailwindcss-config/tailwind/tailwind.config.js"),
  ],
};
