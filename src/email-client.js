import nodemailer from 'nodemailer';
import Q from 'q';

export default (emailObj) => {
	var deferred = Q.defer();
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'cabotdeveloper@gmail.com',
			pass: 'cabot1234'
		}
	});

	var mailOptions = {
		from: emailObj.fromMail,
		to: emailObj.toMail,
		subject: emailObj.subject,
		text: emailObj.text
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
			deferred.resolve('Email Sent');
		}
	});
	return deferred.promise;
}