const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('nodemon');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
	return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
  	nodemon({
		script: 'dist/index.js',
		ext: 'js',
	})
	.on('restart', function () {
		console.log('restarted!');
	})
})

gulp.task('watch', ['scripts'], () => {
	gulp.watch('src/**/*.ts', ['scripts']);
	gulp.watch('dist/**/*.ts', ['server']);
});

gulp.task('default', ['watch', 'scripts', 'server']);
