# xht_BFF
一个基于nodeJs的BFF架构项目搭建

第一阶段
1、完善 mvc

- 完善 models 
- 完善 tests 

2、完善项目工程化

- 错误日志记录 
- 模块化的改造 

3、函数式编程库的编写

- 节流函数 
- 柯里化 

webpack 打包前端，生成静态资源

target： node

gulp 打包我们的 node，生成 app.js koa-static -> 指向静态资源

第二阶段①
    1、npm scripts

    - pre 生命周期
    - 串行和并行
    - 使用 npm-run-all 去帮忙整理

    2、整理 npm script

    - 使用 scripty 库去帮忙整理
    - client:dev
    - client:prod
    - server:dev
    - server:prod
    - server:start
    - start
    - build

    集群编译，只能使用 sh 文件，将 server 命令在一台机器上编译，然后 scp 回来

    3、jscpd 检查代码重复

    也可以在 cli 中进行引入，对比多个文件中的重复率

    4、写 webpack

    - 新建 config 文件夹
    - yargs 方便取参数
    - webpack-merge 合并参数

    5、 写 swig 模板

    - 写一个 banner 组件，放在 layout 中，并在每个子页面引用
    - 用 glob.sync 去比遍历入口文件
    - 怎么打包 swig，使用 html-webpack-plugin template
    - 打进去的位置不对，先将他 injected 删掉，然后手动去插入

第二阶段②
    1、写 webpack 插件

    - 看一下插件是怎么写的
    - 基于 html-webpack-plugin
    - 使用 beforeEmit 钩子函数去替换 inject
    - 去修改占位符
    - 使用 beforeAssetTagGeneration 去拿取 js、css 等静态资源
    - 修改完成

    2、分析 server 下的 config 文件，并进行清洗  

    - 编写 gulp 配置文件
    - 安装 gulp-watch，定义入口文件
    - 安装 gulp-babel 配置 commonjs 的打包规范

    让项目跑起来

    - 在 dev 的webpack 增加 watch
    - 安装 npm-run-all 一键 watch
    - 实现 npm run server:start 启动服务
    - 修改项目中的 assets 打包路径
    - 别忘了修改 htmlplugin 和 copyplugin 中的路径
    - 安装 gulp-plumber，帮我们管理 gulp 退出，在 watch 的时候管理

    3、开始清理 config 文件 

    - 使用 gulp-rollup 进行清理
    - if false 这样的代码就被去掉了
    - 安装 rollup replace 替换环境变量
    - 只在 production 的环境才会去清理
    - 在 prod 环境需要把 config ignore 掉，以防 babel 去打包了

    4、介绍一下更加激进的方法 prepack

    - webpack5 其实用到了

    5、进行项目优化

    - client 开发，上线环境
    - webpack-bundle-analyzer 分析打包文件
    - webpack-build-notifier 发送消息
    - node-bash-title 设置命令行title
    - server 开发，上线环境
    - html-minifier 将 copyplugin 拆分，一个压缩一个不压
    - 配置 mini-css 进行压缩 optimize-css-assets-webpack-plugin
    - 配置打包出去的文件名字
    - contenthash