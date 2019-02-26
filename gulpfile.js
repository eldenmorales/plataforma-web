const { watch, src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  styles: {
    src: 'dev/scss/*.scss',
    dest: 'public/css'
  },
  pages: {
    src: 'dev/pug/*.pug',
    dest: 'public'
  }
}

function pages() {
  return src(paths.pages.src)
    .pipe(pug())
    .pipe(dest(paths.pages.dest))
}

function styles() {
  return src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(paths.styles.dest))
}

watch(paths.pages.src, pages);
watch(paths.styles.src, styles);

exports.styles = styles;
exports.pages = pages;
exports.default = parallel(pages, styles)
