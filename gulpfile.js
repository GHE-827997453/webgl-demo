const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const tsProject = ts.createProject('tsconfig.json');

//编译ts代码
gulp.task('tsc', ()=>{
    return tsProject.src()
            .pipe(tsProject())
            .js/* .pipe(concat('index.js')) */
            .pipe(gulp.dest('server'))
})
// //压缩js文件
gulp.task('uglify', () => {
    return gulp.src('./server/index.js')
                .pipe(uglify())
                .pipe(gulp.dest('./server'))
})

//默认任务
gulp.task('default', gulp.series('tsc', 'uglify'));
