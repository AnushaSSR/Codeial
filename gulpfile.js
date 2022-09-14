//renamingthe files names on refresh and sending them to browser gulp is used
const gulp = require('gulp');
// //small libararies by gulp to convert the sass file to css

//follow below syntax for importing gulp
const sass = require('gulp-sass')(require('node-sass'));// const sass = require('gulp-sass')(require('node-sass'));

//compress into one line
const cssnano = require('gulp-cssnano');

//to rename the file with # along side
const rev = require('gulp-rev');

//uglify to minfiose the js
const uglify = require('gulp-uglify-es').default;

// // import imagemin  from 'gulp-imagemin';
// const imagemin = import('gulp-imagemin');

// const del = require('del');

//final code for css: create a task for minifying the css

gulp.task('css', (done) => {
    console.log('Minifying CSS');
    gulp.src('../assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('../assets.css'));

    console.log('Minified CSS');
    
    gulp.src('../assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('../public/assets/css'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        })).pipe(
            gulp.dest('../public/assets/css')
        );
    done();
})

//final code for js : create a task for minifying the js
gulp.task('js', (done) => {
    console.log("minifying js....");
    gulp.src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets/js'));
    done()
});



//final code for images : create a task for minifying the images
gulp.task('images', (done) => {
    console.log("compressing images....");
    gulp.src('./assets/js/**/*.+(jpg|png|svg|gif|jpeg)')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});

// gulp.task('clean:assets', fucntion(done){
//     del.sync('./public/assets');
//     done();

// });


gulp.task('build', gulp.series('css','js'), function(done){
    console.log("Building assets");
    done();
})



// gulp.task('css', function () {
//     console.log('Minifying css ....');
//     gulp.src('./assets/sass/**/*.scss')
//         //pipe is a fnc which calls all the sub middlewares there with gulp
//         .pipe(sass())
//         .pipe(cssnano())
//         .pipe(gulp.dest('./assets.css'));
//     //minification done till here

//     return gulp.src('/assets/**/*.css')
//         .pipe(rev())
//         .pipe(gulp.dest('./public/assets'))
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true
//         }))
//         .pipe(gulp.dest('./public/assets'));
// }) 