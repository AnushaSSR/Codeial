// export a function to make it publically availabele
module.exports.home = function(req,res){
    return res.end('<h1>Express is up for Codeial</h1>');
}