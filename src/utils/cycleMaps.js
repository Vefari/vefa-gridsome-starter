// @desc    a semi-persistent Map store outside of a Vue Component
const cycleIndex = new Map()


const setCycleKey = (key) => {
    let cycleArray = Array.isArray(key[0])
        ? key[0]
        : Array.from(key)
    return { cycleArray, cycleKey: cycleArray.join(' ') }
}


export const cycleAttribute = () => {
    const { cycleArray, cycleKey } = setCycleKey(arguments)
    // let args = Array.isArray(arguments[0])
    //     ? arguments[0]
    //     : Array.from(arguments)
    // const mapVal = args.join(' ')

    //  if new cycleAttribute, insert it into the index
    if ( !cycleIndex.has(cycleKey) ) cycleIndex.set( cycleKey, 0 )

    //  new call for cycle element
    //  get the associated decalaration & advance index
    let cycleCurrent = cycleIndex.get(cycleKey)
    let cycleValue = cycleArray[cycleCurrent]
    cycleIndex.set( cycleKey, cycleCurrent + 1 )

    //  if we've reached the end of the cycle, then reset the count to 0
    if ( cycleIndex.get(mapVal) === cycleArray.length ) cycleIndex.set( cycleKey, 0 )

    return cycleValue
}


//  reset the cycleInex count for a specific key
//  useful if you have sibling groups of the cycle
export const resetCycle = () => {
    const {cycleKey} = setCycleKey(arguments)
    cycleIndex.delete(cycleKey)
}
