const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify')
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');

const stylesheets_paths = ['node_modules/'];

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

gulp.task('scss', function(){
    gulp.src('app/sass/**/*.scss')    
        .pipe(sass({includePaths: stylesheets_paths, outputStyle: 'expanded'}))
        .pipe(gulp.dest('app/css'))
});

gulp.task('default', ['es6','scss'],() => {
	gulp.watch('app/js/*.js', ['es6'])
    gulp.watch('app/sass/**/*.scss', ['scss']);
});
