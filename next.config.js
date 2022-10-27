/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com", "links.papareact.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/about",
  //       destination: "/",
  //     },
  //   ];
  // },

  reactStrictMode: true,
};
