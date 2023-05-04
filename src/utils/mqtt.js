const crypto = require('crypto')

const getMqttClientInfo = (username, mqttConfig) => {

	console.log(mqttConfig)

	const {
		mqttServerAddress,
		mqttGroupId,
		mqttPublicKey,
		mqttPrivateKey
	} = mqttConfig

	const clientId = `${mqttGroupId}@@@${'airlink'}${username}`

	const password = crypto.createHmac('sha1', mqttPrivateKey)
		.update(clientId)
		.digest('base64')

	return ({
		url    : `mqtt://${mqttServerAddress}`,
		config : {
			username        : `Signature|${mqttPublicKey}|${mqttServerAddress.substring(0, mqttServerAddress.indexOf('.'))}`,
			password        : password,
			clientId        : clientId,
			keepalive       : 3,
			reconnectPeriod : 3000
		}
	})
}

module.exports = {
	getMqttClientInfo
}