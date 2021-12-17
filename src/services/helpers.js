import moment from 'moment'
export function reformatDate(data) {
    data = data.split('-')
    return `${data[2]}.${data[1]}.${data[0]}`
}
export function reformatTime(data) {
    data = data.split('+')
    return data[0]
}
export function getYearsFromBirthDate(birth) {
    if (!birth) return ""
    const date = moment()
    const birth_date = moment(birth).format()
    const dif = date.diff(birth_date, 'days')
    return Math.floor(dif / 365)
}
