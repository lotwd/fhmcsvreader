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
      resolve:"gatsby-plugin-offline",
      options:{
        precachePages:[`/`,`/league/`, `/team/`, `/player/`]
      }
    }
  ],
};
