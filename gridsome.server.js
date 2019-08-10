// module.exports = function (api) {
//     // // api.loadSource(({ addContentType }) => {
//     // //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api
//     // // })

//     // @desc    Use the Pages API here: https://gridsome.org/docs/pages-api
//     api.createPages(async ({ graphql, createPage }) => {
//         const { data: { allContentPages } } = await graphql(`
//             {
//                 allContentPages {
//                     edges {
//                         node {
//                             id
//                             content
//                             dataType
//                             homepage
//                             lede
//                             template
//                             title
//                             slug
//                             form
//                             formSubmit
//                             formSuccess
//                             navigation {
//                                 id
//                                 navLabel
//                             }
//                             localNavigation {
//                                 id
//                                 navLabel
//                             }
//                             actionIcon
//                         }
//                     }
//                 }
//             }
//         `)

//         allContentPages.edges.forEach(({ node }) => {
//             let name = `${ node.id }`
//             let path = node.homepage ? "/" : `/${ node.slug }`

//             name = name == "error404" ? "404" : name
//             path = node.slug == "error404" ? "/404" : path

//             // let component = `./src/views/SiteView.vue`
//             // node.template && (component = `./src/views/${ node.template }View.vue`)
//             // node.dataType && node.template && (component = `./src/views/${ node.dataType }${ node.template }View.vue`)

//             createPage({
//                 name,
//                 path,
//                 component: node.template
//                     ? `./src/views/${ node.template }View.vue`
//                     : `./src/views/SiteView.vue`,
//                 context: {
//                     ...node,
//                 }
//             })
//         })

//         return
//     })
// }
