require("dotenv").config();
module.exports = {
	development: {
		storage: "./db.development.sqlite",
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		port: process.env.DB_PORT,
		dialect: "postgres",
		use_env_variable: "DATABASE_URL",
	},
	test: {
		dialect: "postgres",
		storage: ":memory:",
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOSTNAME,
		dialect: "postgres",
		use_env_variable: "PROD_DATABASE_URL",
	},
};
