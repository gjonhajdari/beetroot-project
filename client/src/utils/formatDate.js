export const normalizeDate = val => val < 10 ? '0' + val : val

export default date => `  
     ${normalizeDate(date.getDate())}.${normalizeDate(date.getMonth())}.${date.getUTCFullYear()}    
`