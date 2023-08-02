export const environment = location.pathname.split('/')[1] || 'test'

const ENV_CONFIG_MAP: any = {
	development: location.origin + '/api',
	test: 'https://www.api.com/test',
	production: `https://www.api.com/${environment}`,
}

const nodeEnv = process.env.NODE_ENV || 'development'

export const baseURL: string = ENV_CONFIG_MAP[nodeEnv]

export const wsBaseURL = baseURL.replace('http:', 'ws:').replace('https:', 'wss:')
