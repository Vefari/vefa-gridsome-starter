import compareAsc from 'date-fns/compare_asc'
import compareDesc from 'date-fns/compare_desc'

export const orderByAlpha = (entryA, entryB, attribute, orderAscending = true) => {
    return (orderAscending)
        ? (entryA[attribute].toLowerCase()).localeCompare(entryB[attribute].toLowerCase())
        : (entryB[attribute].toLowerCase()).localeCompare(entryA[attribute].toLowerCase())
}
