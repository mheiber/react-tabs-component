var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('build', function () {
    return gulp.src('Tabs.js')
        .pipe(react({
            harmony: true
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('default', ['build']);