import gulp from "gulp";
import { src, dest, series } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass"; // Import Sass compiler

// Initialize gulp-sass with dart-sass
const sass = gulpSass(dartSass);

// Example Gulp task
function copyFiles() {

  return src("src/assets/themes/sass/cubaniq/*.scss").pipe(sass()).pipe(dest('src/assets/themes/css/cubaniq'));
}

export default series(copyFiles);