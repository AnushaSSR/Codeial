//renamingthe files names on refresh and sending them to browser gulp is used
const gulp = require('gulp');
// //small libararies by gulp to convert the sass file to css
// // const sass = require('gulp-sass');
// const sass = require('gulp-sass')(require('node-sass'));
//compress into one line
const cssnano = require('gulp-cssnano');
//to rename the file with # along side
const rev = require('gulp-rev');
// const { manifest } = require('gulp-rev');

//follow below syntax for importing gulp
const sass = require('gulp-sass')(require('node-sass'));
//final code for css is this.
gulp.task('css', (done) => {
    console.log('Minifying CSS');
    gulp.src('../assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('../assets.css'));
    console.log('Minified CSS');
    gulp.src('../assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('../public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        })).pipe(
            gulp.dest('../public/assets')
        );
    done();
})

// //create a task for minifying the css

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