/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
export default {
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
