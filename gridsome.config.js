require('yamlify/register')
const path = require("path")

const aliases = require("./aliases.yaml")
const sortCSSmq = require('sort-css-media-queries')

module.exports = {
    // port: 8000,
    // icon: {
    //     favicon: "src/res/favicon.png",
    //     touchicon: "src/res/touchicon.png"
    // },
    configureWebpack: {
        module: {
            rules: [
                {
                    resourceQuery: /blockType=vefa/,
                    loader: require.resolve('./src/utils/VefaBlockLoader.js')
                }
            ]
        }
    },

    chainWebpack: config => {
        const data = {
            basedir: (() => [__dirname, 'src'].join("/"))(),
        }

        // config.mode('development')

        Object.entries(aliases).forEach(
            ([key, path]) => config.resolve.alias.set(key, path)
        )

        /* eslint-disable */
        config.module.rules.delete('svg')
        config.module
            .rule('svg')
            .test(/\.svg$/)
            .use('vue')
                .loader('vue-loader')
                .end()
            .use('svg-to-vue-component')
                .loader('svg-to-vue-component/loader')
                .end()

        config.module
            .rule("js")
            .use("babel-loader")
                .loader("babel-loader")
                .tap(
                    options => {
                        options.babelrc = true
                        return options
                    }
                )
                .end()

        config.module
            .rule("pug")
            .test(/\.pug$/)
            .use("pug-plain")
                .loader("pug-plain-loader")
                .tap(() => data)
                .end()
        /* eslint-enable */
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('css-mqpacker')({ sort: sortCSSmq }),
                ]
            },
            stylus: {
                import: [
                    path.resolve(__dirname, "./themes/v1/config.styl"),
                    path.resolve(__dirname, "./themes/vefa/lib.styl")
                ]
            }
        }
    },

    plugins: [
        {
            use: "gridsome-source-static-meta",
            options: {
                path: "./data/site.yaml"
            }
        },
        // {
        //     use: '@gridsome/plugin-critical',
        //     options: {
        //         paths: ['/'],
        //         width: 1300,
        //         height: 900
        //     }
        // },
        // {
        //     use: '@gridsome/plugin-sitemap',
        //     options: {
        //         cacheTime: 600000, // default
        //         exclude: [
        //             "/dashboard",
        //             "/dashboard/**",
        //             "/admin",
        //             "/admin/**",
        //         ],
        //     }
        // },
        {
            use: "@gridsome/source-filesystem",
            options: {
                path: "content/pages/**/*.md",
                route: ":slug",
                typeName: "ContentPages",
            }
        },
        {
            use: "@gridsome/source-filesystem",
            options: {
                path: "content/snippets/**/*.md",
                typeName: "Snippet",
            }
        },
    ],
    transformers: {
        //Add markdown support to all file-system sources
        remark: {
            externalLinksTarget: "_blank",
            externalLinksRel: ["nofollow", "noopener", "noreferrer"],
            plugins: [
                "remark-attr"
            ]
        }
    },
}
