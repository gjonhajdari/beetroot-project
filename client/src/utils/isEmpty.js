export default val =>
    val === undefined ||
    val === null ||
    (typeof val === 'object' && Object.keys(val).length === 0) ||
    (typeof val === 'string' && val.trim().length === 0)