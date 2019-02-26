const { watch, src, dest, parallel } = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const minifycss = require('gulp-minify-css')
const browserSync = require('browser-sync').create()

const paths = {
  pages: {
    src: 'src/pug/*.pug',
    watch: 'src/pug/**/*.pug',
    dest: 'public'
  },
  styles: {
    src: 'src/scss/*.scss',
    watch: 'src/scss/**/*.scss',
    dest: 'public/css'
  },
  scripts: {
    src: 'src/js/*.js',
    watch: 'src/js/**/*.js',
    dest: 'public/js'
  },
}

function pages() {
  return src(paths.pages.src)
    .pipe(pug())
    .pipe(dest(paths.pages.dest))
}

function styles() {
  return src(paths.styles.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  })
}

watch(paths.pages.watch, pages).on('change', browserSync.reload)
watch(paths.styles.watch, styles)
watch(paths.scripts.watch, scripts).on('change', browserSync.reload)

exports.styles = styles
exports.pages = pages
exports.scripts = scripts
exports.browser = browser
exports.default = parallel(pages, styles, scripts, browser)
