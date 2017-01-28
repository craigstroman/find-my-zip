import gulp from 'gulp';
import webpack from 'webpack-stream';
import errorHandler from '../error';
import webpackConfig from '../../webpack.config.js';

gulp.task('webpack', ['lint-js'], () => {
    return gulp.src('src/js/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('src/js'));
});