const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');



//directory to save the logs
const logDirectory = path.join(__dirname, '../production_logs');

//check whether the production_logs already exists or need to be created
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsecret',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'checkmailer514@gmail.com',
            pass: 'bxyiivldvltzpaoj'
        }
    },
    google_client_id: "1049303480476-mb1jg0nsqoii2n12vf5qjfss74j0n5u6.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream,
            // flags: 'a',
            // skip: skipLog
        }
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.CODEIAL_SMTP_AUTH_USER,
            pass: process.env.CODEIAL_SMTP_AUTH_PASS
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }



}

//to chcek wwhether the enviroenment id set to development or production
// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports= production;
module.exports= development;