require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.fhmcsvreader.com",
    title: "Unofficial FHM CSV Reader | Franchise Hockey Manager CSV Reader",
    description:"Upload exported Franchise Hockey Manager CSV files and get access to expanded stats and charts."
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "demoCSVFiles",
        path: "./src/demoCSVFiles",
      },
      __key: "demoCSVFiles",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images",
      },
      __key: "images",
    },
    {
      resolve:"gatsby-transformer-csv",
      options:{
        noheader:true
      }
    },
    {
      resolve:"gatsby-plugin-manifest",
      options:{
         name:"FHM CSV Reader",
         start_url:"/",
         theme_color:"white",
         display:"standalone",
        icon:"src/images/icon.png",
      }
    },
    `recharts`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-66Z7ZE2WY6", // Google Analytics / GA
         // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
         // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/404/"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-5401497840429484`
      },
    },
    {
      resolve:"gatsby-plugin-offline",
      options:{
        precachePages:[`/`,`/league/`, `/team/`, `/player/`]
      }
    }
  ],
};
