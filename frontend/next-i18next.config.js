const path = require('path')
const localeDataEn = require('./locales/en-US.json')
const localeDataZhCN = require('./locales/zh-CN.json');

console.log(`${__dirname}/locales/en-US.json`)

module.exports = {
	i18n : {
		defaultLocale   : 'en',
		locales         : [ 'en', 'zh' ],
		localeStructure : [
			{
				code     : 'en',
				filepath : `${__dirname}/locales/en-US.json`
			},
			{
				code     : 'zh',
				filepath : `${__dirname}/locales/zh-CN.json`
			}
		]
	}
}