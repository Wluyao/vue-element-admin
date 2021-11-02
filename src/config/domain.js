/**
 * 不同模式下的域名配置
 */

const ENV_CONFIG_MAP = {
	development: 'http://api',
	test: 'http://api',
	production: 'https://api',
}

const domain = ENV_CONFIG_MAP[process.env.NODE_ENV]

export default domain
