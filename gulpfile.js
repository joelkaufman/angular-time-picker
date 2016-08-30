var gulp = require('gulp');
var scss = require('gulp-scss');

gulp.task('scss', function() {

	gulp.src('src/time-picker.scss')
	.pipe(scss())
	.pipe(gulp.dest('./dist'));
});




gulp.task('default', function(){
		gulp.watch('src/time-picker.scss', ['scss'])
	})
	