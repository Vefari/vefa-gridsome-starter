export const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item))

export const mergeDeep = (...objects) => {
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

export const expandComplexKey = ({key, value}) => {
    const sourceTree = key.split('.')
    return sourceTree.reduceRight(
        (propObject, prop, index, propsArr) => ({
            [prop]: (propsArr.length == index + 1) ? value : propObject
        }),
        {}
    )
}

export const JSONcopy = original => JSON.parse( JSON.stringify(original) )


// @func    parseTemplateData
// @desc    used to parse json data embedded within a server delivered template
export const parseTemplateData = ({ id, required = false }) => {
    try {
        let element = document.getElementById(id)

        // @info    we don't have this in the template
        // @        if required, lets throw an error
        // @        else fail silently as we might just have it as an optional load
        if (!element && required) throw `[PMX] Template data of #${ id } is not in template and is marked as required.`
        if (!element) return

        return JSON.parse(element.innerHTML)
    }
    catch (error) {
        SentryHandler.report(error)
        return false
    }
}
