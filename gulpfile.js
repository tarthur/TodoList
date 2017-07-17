const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify')
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('es6', () => {
	browserify('app/js/main.js')
		.transform('babelify', {
			presets: ['es2015']
		})
		.bundle()	
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulp.dest('app/js'));
});

gulp.task('default', ['es6'],() => {
	gulp.watch('app/js/*.js',['es6'])
});
