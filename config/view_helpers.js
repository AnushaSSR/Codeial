const env = require('./environment');
const fs= require('fs');// as we need to access a file

const path = require('path');

module.exports = (app) => {
    app.locals.assetsPath = function(filePath){
        if(env.name == "development"){
            return filePath;
        }
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/rev-manifest.json')))[filePath];


    }
}