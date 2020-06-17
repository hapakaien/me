// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.loadSource(async actions => {
    // Gravatar
    const { data } = await axios.get('https://www.gravatar.com/' + process.env.GRAVATAR_HASH + '.json')
    const collection = actions.addCollection({
      typeName: 'Bio'
    })
    collection.addNode({
      name: data.entry[0].name.formatted,
      email: data.entry[0].emails[0].value,
      avatar: data.entry[0].thumbnailUrl,
      location: data.entry[0].currentLocation,
      about: data.entry[0].aboutMe,
    })

    // Github
    /**
    const githubData = axios({
      method: 'get',
      url: 'https://api.github.com/graphql',
      headers: {'Authorization': 'Bearer ' + process.env.GITHUB_TOKEN},
      data: {
        query: `
          query {
            organization(login: "datakrama") {
              name
              location
              email
              description
              avatarUrl
              isVerified
              twitterUsername
              websiteUrl
              repositories(orderBy: {field: PUSHED_AT, direction: DESC}, last: 8) {
                nodes {
                  nameWithOwner
                  name
                  description
                  homepageUrl
                  forkCount
                  repositoryTopics(last: 10) {
                    nodes {
                      topic {
                        name
                      }
                      url
                    }
                  }
                  releases(last: 1) {
                    nodes {
                      name
                      tagName
                      url
                      description
                    }
                  }
                }
              }
            }
          } 
        ` 
      }
    })
    const githubCollection = actions.addCollection({
      typeName: 'Repositories'
    })
    githubCollection.addNode(githubData.data);
    **/
  })

  api.loadSource(async store => {
    store.addMetadata('datakramaUrl', 'https://github.com/datakrama')
  })
}
