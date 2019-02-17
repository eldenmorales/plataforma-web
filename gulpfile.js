const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const autoprefixer = require('gulp-autoprefixer')

let styleSRC = './dev/scss/style.scss'
let styleDIST = './public/css/'
let pugSRC = 'dev/pug/*.pug'
let pugDIST = 'public/'

gulp.task('pug', () => {
	gulp.src(pugSRC)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(pugDIST))
})

gulp.task('sass', () => {
    gulp.src(styleSRC)
        .pipe(sass({
        	outputStyle: 'expended',
        }))
        .pipe(autoprefixer({
        	browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(styleDIST))
})

gulp.task('default', () => {
	gulp.watch('./dev/scss/**/*.scss', ['sass'])
	gulp.watch('./dev/pug/**/*.pug', ['pug'])
})