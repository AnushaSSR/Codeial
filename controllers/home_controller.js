// export a function to make it publically availabele
module.exports.home = function(req,res){
    return res.render('home', {
        title: "Home"
    });
}