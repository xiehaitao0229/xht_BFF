const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");
const replace = require("@rollup/plugin-replace");

const entry = "./src/server/**/*.js";
const cleanEntry = "./src/server/config/index.js";

function buildDev() {
  return watch(entry, { ignoreInitial: false })
    .pipe(
      babel({
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      })
    )
    .pipe(gulp.dest("dist/server"));
}

function buildProd() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false,
        ignore: [cleanEntry],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      })
    )
    .pipe(gulp.dest("dist/server"));
}

function cleanConfig() {
  return gulp
    .src(entry)
    .pipe(
      rollup({
        input: cleanEntry,
        output: {
          format: "cjs",
        },
        plugins: [
          replace({
            "process.env.NODE_ENV": "'production'",
          }),
        ],
      })
    )
    .pipe(gulp.dest("dist/server"));
}

let build = null;

if (process.env.NODE_ENV === "development") {
  build = gulp.series(buildDev);
}

if (process.env.NODE_ENV === "production") {
  build = gulp.series(buildProd, cleanConfig);
}

gulp.task("default", build);
