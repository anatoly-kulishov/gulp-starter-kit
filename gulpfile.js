const gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), // Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    connect = require('gulp-connect-php'),// Подключаем npm i gulp-connect-php
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    useref = require('gulp-useref'),  // Подключаем пакет для разбора блоков в файлах HTML
    gulpIf = require('gulp-if'),     //  Подключаем пакет условных операторов
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    cleancss = require('gulp-clean-css'),  // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cwebp = require('gulp-cwebp'), // Подключаем библиотеку для работы с webp форматом
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

// Tasks for Server
// -----------------

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('connect-sync', function () {
    connect.server({}, function () {
        browserSync({
            proxy: 'localhost/projects/',
            port: 8000,
            notify: false,
            baseDir: 'app'
        });
    });
});

// Tasks for Development
// ---------------------

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss') // Берем источник
        .pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-scss
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) // Создаем префиксы
        .pipe(concat('styles.min.css'))
        .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('useref', function () {
    return gulp.src('app/**/*.{php,html}')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Tasks for images
// ----------------

gulp.task('img', function () {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('webp', function () {
    return gulp.src(['app/img/**/*.{png,jpg,jpeg}', '!app/img/exclusion/**/*.{png,jpg,jpeg}'])
        .pipe(cwebp())
        .pipe(gulp.dest('app/img/webp/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Tasks for build
// ---------------

gulp.task('prebuild', async function () {

    const buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/styles.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    const buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'));

    const buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'));

});

// Functions
// ---------

gulp.task('code', function () {
    return gulp.src('app/*.{php,html}')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('clean', async function () {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('clear', function () {
    return cache.clearAll();
});


// Final Tasks
// -----------

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // Наблюдение за scss файлами
    gulp.watch('app/*.{php,html}', gulp.parallel('code')); // Наблюдение за {php,html,twig,pug} файлами в корне проекта
    gulp.watch('app/js/*.js', gulp.parallel('scripts')); // Наблюдение за js файлами в корне проекта
    gulp.watch('app/img/**/*.{png,jpg,jpeg}', gulp.parallel('webp')); // Наблюдение за изображениями файлами в корне проекта
});

gulp.task('php', gulp.parallel('sass', 'webp', 'connect-sync', 'watch'));
gulp.task('test', gulp.parallel('webp'));
gulp.task('default', gulp.parallel('sass', 'webp', 'browser-sync', 'watch'));
gulp.task('build', gulp.series('clean', 'useref', gulp.parallel('prebuild', 'webp', 'img', 'sass')));


