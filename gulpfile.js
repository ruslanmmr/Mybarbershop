var gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    packageJson = require('./package.json'),
    autoprefixer = require("gulp-autoprefixer"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    pug = require("gulp-pug"),
    sass = require("gulp-sass"),
    mincss = require("gulp-clean-css"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    imageminJpegRecompress = require("imagemin-jpeg-recompress"),
    favicons = require("gulp-favicons"),
    iconfont = require("gulp-iconfont"),
    iconfontcss = require("gulp-iconfont-css"),
	  svgSprite = require("gulp-svg-sprites"),
    replace = require("gulp-replace"),
    newer = require("gulp-newer"),
    plumber = require("gulp-plumber"),
    debug = require("gulp-debug"),
    watch = require("gulp-watch"),
    clean = require("gulp-clean"),
    rsync = require('gulp-rsync');

gulp.task("pug", function () {
  return gulp.src(["./src/views/**/*.pug", "!./src/views/blocks/*.pug"])
    .pipe(pug({
      pretty: true
    }))
    .pipe(replace("../dest/", "../"))
    .pipe(gulp.dest("./dest/"))
    .pipe(debug({
      "title": "html"
    }))
    .on("end", browsersync.reload);
});

gulp.task("scripts", function () {
    return gulp.src(["./src/js/**/*.js", "!./src/vendor/**/*.js"])
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ["@babel/preset-env"]}))
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("./maps/"))
        .pipe(gulp.dest("./dest/js/"))
        .pipe(debug({"title": "scripts"}))
        .on("end", browsersync.reload);
});

gulp.task("styles", function() {
    return gulp.src(["./src/styles/**/*.scss"])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({browsers: ["last 12 versions", "> 1%"]}))
        .pipe(mincss({compatibility: "ie8", level: {1: {specialComments: 0}}}))
        .pipe(rename({suffix: ".min"}))
        .pipe(replace("../../dest/", "../"))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write("./maps/"))
        .pipe(gulp.dest("./dest/styles/"))
        .pipe(debug({"title": "styles"}))
        .on("end", browsersync.reload);
});

gulp.task("images", function () {
  return gulp.src(["./src/img/**/*.{jpg,jpeg,png,gif,svg}", "!./src/img/favicons/*.{jpg,jpeg,png,gif}"])
    .pipe(newer("./dest/img/"))
    .pipe(gulp.dest("./dest/img/"))
    .pipe(debug({
      "title": "images"
    }))
    .on("end", browsersync.reload);
});

gulp.task("favicons", function () {
  return gulp.src("./src/img/favicons/*.{jpg,jpeg,png,gif}")
    .pipe(favicons({
      icons: {
        appleIcon: true,
        favicons: true,
        online: false,
        appleStartup: false,
        android: false,
        firefox: false,
        yandex: false,
        windows: false,
        coast: false
      }
    }))
    .pipe(gulp.dest("./dest/img/favicons/"))
    .pipe(debug({
      "title": "favicons"
    }));
});

gulp.task("destPHP", function () {
  return gulp.src("./src/php/**/*")
    .pipe(gulp.dest("./dest/"))
    .on("end", browsersync.reload);
});

gulp.task("destVideos", function () {
  return gulp.src("./src/videos/**/*")
    .pipe(gulp.dest("./dest/videos/"))
    .on("end", browsersync.reload);
});

gulp.task("destFonts", function () {
  return gulp.src("./src/fonts/**/*")
    .pipe(gulp.dest("./dest/fonts/"))
    .on("end", browsersync.reload);
});

gulp.task("clean", function () {
  return gulp.src("./dest/*", {
      read: false
    })
    .pipe(clean())
    .pipe(debug({
      "title": "clean"
    }));
});

gulp.task("serve", function () {
  return new Promise((res, rej) => {
    browsersync.init({
      server: "./dest/",
      tunnel: false,
      port: 9000
    });
    res();
  });
});

gulp.task("libs", function () {
    return gulp.src("./src/libs/**/*.js")
        //.pipe(babel({presets: ["@babel/preset-env"]}))
        .pipe(concat("libs.js"))
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("./dest/js/"))
        .pipe(debug({"title": "scripts"}))
        .on("end", browsersync.reload);
});

gulp.task("watch", function () {
  return new Promise((res, rej) => {
    watch("./src/views/**/*.pug", gulp.series("pug"));
    watch("./src/styles/**/*.scss", gulp.series("styles"));
    watch("./src/js/**/*.js", gulp.series("scripts"));
    watch("./src/libs/**/*.js", gulp.series("libs"));
    watch(["./src/img/**/*.{jpg,jpeg,png,gif,svg}", "!./src/img/favicons/*.{jpg,jpeg,png,gif}"], gulp.series("images"));
    watch("./src/img/favicons/*.{jpg,jpeg,png,gif}", gulp.series("favicons"));
    watch("./src/fonts/**/*", gulp.series("destFonts"));
    watch("./src/php/**/*", gulp.series("destPHP"));
    watch("./src/videos/**/*", gulp.series("destVideos"));
    res();
  });
});


// BUILD
gulp.task("default", gulp.series("clean",
  gulp.parallel("pug", "styles", "libs", "scripts", "destFonts", "destVideos", "destPHP", "images", "favicons"),
  gulp.parallel("watch", "serve")
));

//gulp deploy
gulp.task("deploy", function () {
    return gulp.src('./dest/**')
      .pipe(rsync({
        root: './dest/',
        hostname: 'vh210.timeweb.ru',
        destination: '/home/c/cq98725/bitrix/public_html/dest',
        username: 'cq98725',
        archive: true,
        silent: false,
        compress: true
    }));
});


//данные vh210 YiOiwshbjOS2
