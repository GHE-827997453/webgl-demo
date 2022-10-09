const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const tsProject = ts.createProject('tsconfig.json');

//编译ts代码
gulp.task('tsc', ()=>{
    return gulp.src('./src/*.ts')
                .pipe(tsProject())
                .js.pipe(gulp.dest('./dist'))
})
//压缩js文件
gulp.task('uglify', () => {
    return gulp.src('./dist/*.js')
                .pipe(uglify())
                .pipe(gulp.dest('./dist'))
})

//默认任务
gulp.task('default', gulp.series('tsc', 'uglify'));
