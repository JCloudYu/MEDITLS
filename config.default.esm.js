/**
 *	Author: JCloudYu
 *	Create: 2019/05/27
**/
export default {
	runtime_dir: ".runtime",
	server: {
		host: '0.0.0.0', port: 4321,
		routes: [ "/index.html", "/css", "/res", "/node_modules" ],
		script_root: "./root/script",
		view_root: "./root/view"
	},
	mail_relay: {
		// Source: http://nodemailer.com/smtp/
		// See Transport
		smtp_info: {
			host: "kt63.hinetserver.com",
			port: 465,
			secure: true,
			auth: {
				account: 'mediisci@mediisci.com',
				password: 'JMAdD0x7ICFG'
			},
			sender_info: "Customer Service <mediisci@mediisci.com>"
		},		
		num_threads: 1, // 5,
		max_retry_count: 1, //10,
		max_batch_count: 1, // 20, // max task number a thread should carry at a time
		loop_interval: 5000, // milli-seconds
	},
	database: {
		host: 'localhost',
		port: 27017,
		db_name: 'mediicsi',
		collection: ['consultation']
	}
};
