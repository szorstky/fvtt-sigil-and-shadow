var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(cb){
    gulp
        .src('less/sigil_and_shadow.less')
        .pipe(less())
        .pipe(gulp.dest("./styles/"));
    cb();
});

gulp.task('default', function(cb){
    gulp.watch('less/*.less', gulp.series('less'));
});