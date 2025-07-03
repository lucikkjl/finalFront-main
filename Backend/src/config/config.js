export default {
    development: {
        username: "root",
        password: "",
        database: "ecommerce",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        // dialectOptions: { 
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false
        //     }
        // }
    }
};