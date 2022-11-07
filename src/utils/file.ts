/**
 * 将base64数据转换为Bolb
 */
export const base64toBlob = (dataURL: string, filename: string = 'file') => {
	const arr = dataURL.split(',')
	const mime = arr[0]!.match(/:(.*?);/)![1]
	const suffix = mime.split('/')[1]
	const bstr = window.atob(arr[1])
	let n = bstr.length
	const u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], `${filename}.${suffix}`, {
		type: mime,
	})
}

/**
 * 将Blob数据转换为base64
 */
export const blobToBase64 = (blob: Blob) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (e) => {
			resolve(e.target?.result as string)
		}
		reader.onerror = reject
		reader.readAsDataURL(blob)
	})
}

/**
 *  下载文件。数据源是Blob对象
 */
export const downloadBlobFile = (binaryString: string, fileName: string) => {
	const blob = new Blob([binaryString], { type: 'application/octet-stream' })
	const link = document.createElement('a')
	link.href = window.URL.createObjectURL(blob)
	link.download = fileName
	link.click()
	//延时释放
	setTimeout(function () {
		window.URL.revokeObjectURL(link.href)
	}, 100)
}

/**
 *  下载文件。数据源是base64
 */
export const downloadBase64File = (
	data: string,
	fileName: string,
	headerType?: 'txt' | 'png' | 'jpg' | 'xlsx' | 'lic'
) => {
	const headerMap = {
		txt: 'data:text/plain',
		png: 'data:image/png',
		jpg: 'data:image/jpeg',
		xlsx: 'data:application/vnd.ms-excel',
	}
	const link = document.createElement('a')
	const header = headerMap[headerType || ''] || ''
	link.href = header + ';base64,' + data
	link.download = fileName
	link.click()
}

/**
 *  通过文件地址下载文件
 */
export const downloadURLFile = (url: string, fileName: string) => {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', url.replace(/\\/g, '/'), true)
	xhr.responseType = 'blob'
	xhr.onload = () => {
		if (xhr.status === 200) {
			downloadBlobFile(xhr.response, fileName)
		}
	}
	xhr.send()
}

/**
 *  计算文件大小
 */
export const getFileSize = (value: string | number) => {
	const sizeMap = {
		PiB: 1024 * 1024 * 1024 * 1024 * 1024,
		TiB: 1024 * 1024 * 1024 * 1024,
		GiB: 1024 * 1024 * 1024,
		MiB: 1024 * 1024,
		KiB: 1024,
		Byte: 1,
	}
	for (let i in sizeMap) {
		if (Number(value) >= sizeMap[i]) {
			return (Number(value) / sizeMap[i]).toFixed(2) + ` ${i}`
		}
	}
	return '0 Byte'
}

/**
 *  获取不带后缀的文件名
 */
export const getFileName = (fileName: string) => {
	return fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')
}

/**
 *  获取文件的后缀
 */
export const getFileSuffix = (fileName: string) => {
	let suffix = ''
	const pointIndex = fileName.lastIndexOf('.')
	if (pointIndex > -1) {
		suffix = fileName.slice(pointIndex + 1)
	}
	return suffix
}
