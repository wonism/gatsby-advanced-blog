module.exports = {
  siteMetadata: {
    title: 'Gatsby Advanced Blog',
    author: 'wonism',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/resources`,
        name: 'resources',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 640,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'hljs-',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-80620216-1',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Advanced Blog',
        short_name: 'Gatsby Blog',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#3B9CFF',
        display: 'minimal-ui',
        /*
        icons: [{
          // Everything in /static will be copied to an equivalent
          // directory in /public during development and build, so
          // assuming your favicons are in /static/favicons,
          // you can reference them here
          src: `/favicons/android-chrome-192x192.png`,
          sizes: `192x192`,
          type: `image/png`,
        }, {
          src: `/favicons/android-chrome-512x512.png`,
          sizes: `512x512`,
          type: `image/png`,
        }],
        */
      },
    },
  ],
};
