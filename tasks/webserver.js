import gulp from 'gulp';
import util from 'gulp-util';
import webserver from 'gulp-webserver';

gulp.task('webserver', () => {
   let src = (util.env.production) ? './dist/' : './src/';
   let liveReload = (util.env.production) ? false : true;
    gulp.src(src)
         .pipe(webserver({
           livereload: liveReload,
           fallback: src + 'index.html'
         }));
});
