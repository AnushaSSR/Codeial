const queue = require('../config/kue');

const comments_mailer = require('../mailers/comments_mailer');

queue.process('emails', function(job, done) {
    console.log("emails worler is processing a job", job.data);

    comments_mailer.newComment(job.data);

    done();
})