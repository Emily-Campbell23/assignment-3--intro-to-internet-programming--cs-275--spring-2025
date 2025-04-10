const { src, dest, series, watch } = require(`gulp`);
const eslint = require(`gulp-eslint`);
const stylelint = require(`gulp-stylelint`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const cleanCSS = require(`gulp-clean-css`);
const htmlmin = require(`gulp-htmlmin`);
const browserSync = require(`browser-sync`).create();
const { deleteAsync } = require(`del`);

// Lint CSS
let lintCSS = () =>
  src(`styles/**/*.css`)
    .pipe(stylelint({
      failAfterError: false,
      reporters: [{ formatter: `string`, console: true }]
    }));

// Lint JS
let lintJS = () =>
  src(`scripts/*.js`)
    .pipe(eslint())
    .pipe(eslint.format());

// Transpile JS for dev
let transpileJSForDev = () =>
  src(`scripts/*.js`)
    .pipe(babel({ presets: [`@babel/preset-env`] }))
    .pipe(dest(`scripts`));

// Serve & watch
let serve = () => {
  browserSync.init({
    notify: true,
    reloadDelay: 50,
    server: {
      baseDir: [`.`]
    }
  });

  watch(`styles/*.css`, lintCSS).on(`change`, browserSync.reload);
  watch(`scripts/*.js`, series(lintJS, transpileJSForDev)).on(`change`, browserSync.reload);
  watch(`index.html`).on(`change`, browserSync.reload);
};

// Clean `prod/`
let clean = async () => {
  await deleteAsync([`prod`]);
};

// Compress assets for production
let compressHTML = () =>
  src(`index.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(`prod`));

let compressCSS = () =>
  src(`styles/*.css`)
    .pipe(cleanCSS())
    .pipe(dest(`prod/styles`));

let compressJS = () =>
  src(`scripts/*.js`)
    .pipe(babel({ presets: [`@babel/preset-env`] }))
    .pipe(uglify())
    .pipe(dest(`prod/scripts`));

// Public tasks
exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.serve = series(lintCSS, lintJS, transpileJSForDev, serve);
exports.default = exports.serve;
exports.build = series(clean, compressCSS, compressJS, compressHTML);

