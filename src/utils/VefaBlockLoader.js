//  if application of class values doesn't work in static build
//  (applies itself on vuejs takeover/update), then:
// 1:   break $vefa[element].class out => :class="$vefa[element].class"
//      and v-bind="{ ...$vefa[element], class: false }"
//  or
// 2:   apply a named slot around teh element in question
//      slot(name="<element>") ...
//  it looks as though class gets applied correctly when wrapped in a component

const yaml = require("js-yaml")

const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item))

const mergeDeep = (...objects) => {
    return objects.reduce(
        (prev, obj) => {
            Object.keys(obj).forEach(key => {
                const pVal = prev[key]
                const oVal = obj[key]

                if (Array.isArray(pVal) && Array.isArray(oVal)) {
                    prev[key] = pVal.concat(...oVal)
                }
                else if (isObject(pVal) && isObject(oVal)) {
                    prev[key] = mergeDeep(pVal, oVal)
                }
                else {
                    prev[key] = oVal
                }
            })

            return prev
        },
        {}
    )
}

const appendDeep = (...objects) => {
    return objects.reduce(
        (prev, obj) => {
            Object.keys(obj).forEach(key => {
                const pVal = prev[key]
                const oVal = obj[key]

                if (Array.isArray(pVal) && Array.isArray(oVal)) {
                    prev[key] = pVal.concat(...oVal)
                }
                else if (isObject(pVal) && isObject(oVal)) {
                    prev[key] = appendDeep(pVal, oVal)
                }
                else {
                    try {
                        let retainVal = pVal ? pVal.split(" ") : []
                        let appendVal = oVal.split(" ")
                        prev[key] = retainVal.concat(...appendVal).join(" ")
                    }
                    catch (error) {
                        prev[key] = oVal
                    }
                }
            })

            return prev
        },
        {}
    )
}

const removeDeep = (...objects) => {
    return objects.reduce(
        (prev, obj) => {
            Object.keys(obj).forEach(key => {
                const pVal = prev[key]
                const oVal = obj[key]

                if (Array.isArray(pVal) && Array.isArray(oVal)) {
                    prev[key] = pVal.concat(...oVal)
                }
                else if (isObject(pVal) && isObject(oVal)) {
                    prev[key] = removeDeep(pVal, oVal)
                }
                else {
                    try {
                        let retainProps = pVal ? pVal.split(" ") : []

                        if (retainProps.length) {
                            let removeProps = oVal.split(" ")

                            prev[key] = retainProps
                                .filter(
                                    item => removeProps.indexOf(item) === -1
                                )
                                .join(" ")
                        }
                        else {
                            prev[key] = oVal
                        }

                    }
                    catch (error) {
                        prev[key] = oVal
                    }
                }
            })

            return prev
        },
        {}
    )
}

module.exports = function (source, map) {
    // console.log(source)
    source = yaml.safeLoad(source)

    const res = `
        import Vue from 'vue'

        const { props, computed, methods } = Vue.config.optionMergeStrategies

        const isObject = ${ isObject }
        const appendDeep = ${ appendDeep }
        const mergeDeep = ${ mergeDeep }
        const removeDeep = ${ removeDeep }

        const data = ${ JSON.stringify(source) }

        const vefaBus = new Vue({})

        export default ({ options }) => {
            if (options.__vefa) {
                options.__vefa.data = data
                return
            }

            options.__vefa = Vue.observable({ data })

            options.props = props(
                {
                    appendVefaStyle: {
                        type: [String, Object],
                        default: null
                    },
                    applyVefaStyle: {
                        type: [String, Object],
                        default: null
                    },
                    mergeVefaStyle: {
                        type: [String, Object],
                        default: null
                    },
                    removeVefaStyle: {
                        type: [String, Object],
                        default: null
                    }
                },
                options.props
            )

            options.methods = methods(
                {
                    $appendLocalVefa ($vefa, appendStyles) {
                        return appendStyles
                            ? appendDeep($vefa, appendStyles)
                            : $vefa
                    },
                    $applyLocalVefa ($vefa, applyStyles) {
                        return applyStyles || $vefa
                    },
                    $mergeLocalVefa ($vefa, mergeStyles) {
                        return mergeStyles
                            ? mergeDeep($vefa, mergeStyles)
                            : $vefa
                    },
                    $removeLocalVefa ($vefa, removeStyles) {
                        return removeStyles
                            ? removeDeep($vefa, removeStyles)
                            : $vefa
                    },
                },
                options.methods
            )
            options.computed = computed(
                {
                    $vefa: ({ appendVefaStyle, applyVefaStyle, mergeVefaStyle, removeVefaStyle }) => {
                        const __vefa = options.__vefa && options.__vefa.data
                        let vefaConstruct = __vefa

                        if (isObject(applyVefaStyle)) {
                            vefaConstruct = applyVefaStyle
                        }
                        else if (__vefa && __vefa[applyVefaStyle]) {
                            vefaConstruct = __vefa[applyVefaStyle]
                        }

                        if (isObject(appendVefaStyle)) {
                            vefaConstruct = appendDeep(vefaConstruct, appendVefaStyle)
                        }
                        else if (__vefa && __vefa[appendVefaStyle]) {
                            vefaConstruct = appendDeep(vefaConstruct, __vefa[appendVefaStyle])
                        }

                        if (mergeVefaStyle) {
                            if (isObject(mergeVefaStyle)) {
                                vefaConstruct = mergeDeep(vefaConstruct, mergeVefaStyle)
                            }
                            else if (__vefa && __vefa[mergeVefaStyle]) {
                                vefaConstruct =  mergeDeep(vefaConstruct, __vefa[mergeVefaStyle])
                            }
                        }

                        if (isObject(removeVefaStyle)) {
                            vefaConstruct = removeDeep(vefaConstruct, removeVefaStyle)
                        }
                        else if (__vefa && __vefa[removeVefaStyle]) {
                            vefaConstruct = removeDeep(vefaConstruct, __vefa[removeVefaStyle])
                        }

                        if (__vefa && !Object.keys(vefaConstruct).length) {
                            vefaConstruct = __vefa
                        }

                        return vefaConstruct
                    }
                },
                options.computed
            )
        }
    `

    this.callback(
        null,
        res,
        map
    )
}


// options.directives = directives(
//     {
//         vefa (el, { arg: action, value: declarations, modifiers: attributes }) {
//             if (!declarations) return false
//             const attributeList = Object.keys(attributes)
//             const declarationList = Object.keys(declarations)
//             const actions = {
//                 apply (key) {
//                     const hasDeclaration = el.hasAttribute(key)
//                     const staticDeclaration = el.getAttribute(key)
//                     hasDeclaration || el.setAttribute(key, declarations[key])
//                     hasDeclaration && el.setAttribute(key, [staticDeclaration, declarations[key]].join(" "))
//                 },
//                 replace (key) {
//                     el.setAttribute(key, declarations[key])
//                 },
//                 remove (key) {
//                     const staticDeclaration = el.getAttribute(key)
//                     if (!staticDeclaration) return

//                     const rmDeclarations = staticDeclaration.split(" ")

//                     const refDeclarations = declarations[key].split(" ")

//                     const savedDeclarations = rmDeclarations.filter(
//                         el => !refDeclarations.includes(el)
//                     )
//                     el.setAttribute(key, savedDeclarations.join(" "))
//                 }
//             }

//             action = action || "apply"
//             // if we want certain attributes to be updated
//             attributeList.length && attributeList.forEach(actions[action])
//             // if we want wholesale
//             !attributeList.length && declarationList.forEach(actions[action])
//         },
//     },
//     options.directives
// )
