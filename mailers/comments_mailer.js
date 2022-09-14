const nodemailer = require('../config/nodemailer');

//create function to send the mail
//a file is a module , any thing need to return ed can be returned as exports.name
console.log('outside new comment mailer');

exports.newComment = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
    console.log("sending mail");
    nodemailer.transporter.sendMail({
        from: "checkmailer514@gmail.com",
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
//info carries info abt the req sent
    },(err, info) =>{
        if(err){
            console.log("Error in sending mail", err);
            return;
        }
        // console.log('Message sent', info);
        return;
    });

}