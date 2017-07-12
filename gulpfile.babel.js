import config from './config';
import gulp from 'gulp';
import gutil from "gulp-util";
import requiredir from 'require-dir';

gutil.log(gutil.colors.bold(`ℹ  ${config.name} v${config.version}`));

if (config.production) {
  gutil.log(gutil.colors.bold.green('🚚  Production Mode'));
} else {
  gutil.log(gutil.colors.bold.green('🔧  Development Mode'));
}

requiredir('./tasks');

// GENERAL TASKS
// ------------------
gulp.task(
  'assets',
  gulp.parallel('copy', 'styles', 'scripts', 'images', 'svgs', 'favicons')
);

gulp.task('build', gulp.series('clean', 'assets', 'html', 'usemin'));
gulp.task('dev', gulp.series('build', gulp.parallel('server', 'watch')));

gulp.task('default', gulp.series('dev'));

// DEPLOY TASKS
// ------------------
gulp.task('deploy', gulp.series('archive'));
