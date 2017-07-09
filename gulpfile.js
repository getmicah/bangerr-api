const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('nodemon');
const exec = require('child_process').exec;

const config = require('./dist/config.js').default;
const tsProject = ts.createProject('tsconfig.json');

function runCommand(command) {
	return function (cb) {
		exec(command, function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
		});
	}
}

gulp.task('mongodb', runCommand(`mongod --dbpath ${config.database.path} --port ${config.database.port}`));

gulp.task('scripts', () => {
	return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
  	nodemon({
		script: 'dist/index.js',
		ext: 'js',
	})
	.on('restart', () => {
		console.log('restarted!');
	})
})

gulp.task('watch', ['scripts'], () => {
	gulp.watch('src/**/*.ts', ['scripts']);
	gulp.watch('dist/**/*.ts', ['server']);
});

gulp.task('default', ['mongodb', 'scripts', 'server', 'watch']);
