import dayjs from 'dayjs'

export default function formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(date).format(format)
}
