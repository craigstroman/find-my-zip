import gulp from 'gulp';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

gulp.task('minify-js', () => {
    return gulp.src('./src/js/bundle.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./dist/js/'));
});
