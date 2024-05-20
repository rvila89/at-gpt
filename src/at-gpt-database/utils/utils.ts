import {format, parseISO, isValid} from 'date-fns'

export const formatFecha = (fecha) => {
  const parsedDate = parseISO(fecha)
  if (!isValid(parsedDate)) {
    return 'actualidad'
  }
  return format(parsedDate, 'dd-MM-yyyy')
}
