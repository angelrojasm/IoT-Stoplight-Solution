const aws = require('aws-sdk');
const config = require('../config/config');
aws.config.setPromisesDependency();
aws.config.update({
	region: config.region,
	accessKeyId: config.accessKeyID,
	secretAccessKey: config.secretKey,
});

