var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(cb){
    gulp
        .src('less/sigil_and_shadow.less')
        .pipe(less())
        .pipe(gulp.dest("./"));
    cb();
});

gulp.task('sigil_and_shadow', function(cb){
    gulp.watch('less/*.less', gulp.series('less'));
});