const axios = require('axios')

const instance = axios.create({
	baseURL : 'http://localhost:8080/api/v1',
	timeout : 20 * 1000,
	headers : { 'X-Custom-Header' : 'foobar' }
});

instance.interceptors.request.use(
	config => {
		// Do something before request is sent

		const token = window.localStorage.getItem('token')

		config.headers['Authorization'] = token
		
		return config;
	}
);

instance.interceptors.response.use(
	response => {
		// Do something with response data

		if (response.data.code === 401) {
			console.log('用户未登陆')

			// if (!isLoginVisible && setIsLoginVisible) {
			// 	setIsLoginVisible(true)
			// }	
		}
		
		return response;
	},
	error => {
		// Do something with response error
		return Promise.reject(error);
	}
);

module.exports = instance