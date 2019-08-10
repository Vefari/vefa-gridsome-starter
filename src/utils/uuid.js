// generate a random UUID, giving sane defaults
const generate = ({ uuid = '', digits = 8, seed = new Date() }) => {
    for ( var i = 0; i < digits; i++ ) {
        uuid += ( i => {
            if ( i === 8 || i === 13 || i === 18 || i === 23 ) return "-"
            if ( i === 14 ) return "4" // UUID version flag
            if ( i === 19 ) return "8" // Can be "8", "9", "A" or "B"
            return Math.floor( Math.random( seed ) * 16 ).toString( 16 )
        })( i )
    }
    return uuid
}

// generate a standard longform uuid
// better for greater security and
// when you have a very large amount of elements that need UIDs
export const generateLongUUID = ({ seed } = {}) => {
    return generate({ digits: 36, seed })
}

// genreate a short uuid
// better for general purposes on a given page when the data is localized
export const generateUUID = ({ seed } = {}) => {
    return generate({ seed })
}

// if available in a url like: /edit/<id>,
// grab the id from the url.
// only works on numeric IDs for now,
// but we could conceivable test for a UUID like above
export const recallUrlID = () => {
    let id = location.pathname.split('/').filter( item => item.length > 0).pop()
    return (!isNaN(id)) ? id : false
}
