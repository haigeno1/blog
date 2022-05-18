<!-- https://developer.51cto.com/article/702067.html -->
<!-- https://jishuin.proginn.com/p/763bfbd3bcff -->

npm v1-v2 嵌套式
    为了解决这个问题，npm提供了shrinkwrap命令。此命令将生成一个npm-shrinkwrap.json文件，为所有库和所有嵌套依赖的库记录确切的版本。
    然而，即使存在npm-shrinkwrap.json这个文件，npm也只会锁定库的版本，而不是库的内容。即便npm现在也能阻止用户多次重复发布库的同一版本，但是npm管理员仍然具有强制更新某些库的权力。

yarn & npm v3   扁平化依赖管理：
    但是扁平化带来了新的问题：
    1、依赖结构的不确定性
    2、扁平化算法本身复杂性很高，耗时较长
    3、项目中仍然可以非法访问没有声明过依赖的包
        这就是为什么会产生依赖结构的不确定问题，也是 lock 文件诞生的原因，无论是package-lock.json(npm 5.x才出现)还是yarn.lock，都是为了保证 install 之后都产生确定的node_modules结构

pnpm 
独创的一套依赖管理方式不仅解决了依赖提升的安全问题，还大大优化了时间和空间上的性能。
这种依赖管理的方式也很巧妙地规避了非法访问依赖的问题，