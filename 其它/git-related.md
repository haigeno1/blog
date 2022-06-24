// https://www.cnblogs.com/xiaohuochai/p/12128087.html


<!-- https://mp.weixin.qq.com/s/2ozeZ82vb__vy8fsZvN8xg -->
git的原理:
  git 本质是一种类kv数据库的文件系统，通过sha1算法生成的hash作为key，对应到我们的git的几类对象，然后再去树状的寻址，最底层存储的是我们的文件内容。总结一下我们以上说的内容，我们可以得到git的一个设计思路，git记录的是一个a → b过程的链表，通过链表，我们可以逐步回溯到a，在此之下呢，采用了一种多叉树形结构对我们的hash值进行分层记录，最底层，通过我们的hash值进行索引，对应到一个个压缩后的二进制objects。这就是整个git的结构设计。还有一些 git对于查找效率的优化手段，压缩手段。
  git中的对象，我们一共有4种type，分别是 commit / tree / blob / tag。
  那我如果真的需要存储很多频繁变动的二进制文件，比如多媒体资源/ psd啥的， 那我需要怎么搞？好的，家人们，上链接。Git LFS（Large file storage）[4]一句话介绍，把我们的大文件变成文件指针存储在对象中，再去lfs拉取对应文件。


gitgraph中，基础提交为a，a的基础上有别的提交+b提交，a可以有新的提交最后又合并了b结果又有了提交c。在对比差异时，b对比a，b为实际的commitid，a需要溯源展示为b^，合并产生的c对比之前，c的提交虽然来源于b但还是展示为了c因为优先级最高直接展示当前commitid，c之前的展示为c^可以理解为提交a实际的提交还是a的溯源提交。可见不是只有合并的分支才会有^
	


Gitlens filehistory一条线上最早一个提交是^，往早看的情况即使同一条线挨着的提交也可能直接断开不连续，往晚看的情况同一条线上挨着的提交大概率是连在一起的。
gielens的githistory 有3种。第一种是timiline，是最稳的一种，完全按照时间顺序包含merge的提交。第二种是右上角的，不会包含^，可能会跳，向早看与向晚看顺序也不太一样。有merge的情况abc，向早看c->a->b->跳跃，向晚看即返回的时候没有跳直接到b再到a。第三种是file history 点击哪个则对比框右侧的一般就是哪个提交，点击merge的提交的时候右侧也不一定是当前提交可能是个bug，提交还是以hover上去展示的为准，有展示merge提交，对比框左侧也会有^，不含merge的情况下也会与第二种有不一样的文件在diff。
gitrebase有自动识别commit的能力，把合并了各种分支的分支a rebase到master上，合并的各种提交就不见了只剩下每次真正的提交了。rebase还有自动识别本质上是不是同一个commit的能力，例如分支b合并了两个分支，分支c又做了同样的操作，虽然提交的hash不同但是本质上是一样的，分支b可以直接rebase到分支c上，c也可以直接rebase到分支b上。但是合并后master并解决过冲突的分支 rebase 到master的时候，git不能自动识别出处理过的冲突，还得手动处理解决冲突。

.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。解决方法就是先把本地缓存删除（改变成未track状态），然后再提交:
git rm -r --cached .
git rm 工作区 暂存区都会删掉 但是未提交

git checkout -- . 用于从暂存区index恢复工作区,如果执行失败,需要 git reset -- . 从head恢复暂存区再恢复至工作区,再执行git checkout -- .就可以用了


查看两个星期内的改动
git whatchanged --since='2 weeks ago'

git reflog 或者 git fsck --full
https://github.com/haigeno1/picgo/blob/main/git-branchless-revise.png
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

// https://bibibug.com/question/Git_pull_rebase_preserve_merges
git rebase --preserve-merges master

https://gb.yekai.net/concepts/subtree-vs-submodule
subtree 和 submodule 的目的都是用于 git 子仓库管理，二者的主要区别在于，subtree 属于拷贝子仓库，而 submodule 属于引用子仓库。

分支a做了点修改，分支a也做了点修改，a合并b产生冲突选择完全接受b产生合并提交，然后b有了新的提交，合并提交再次合并b的新提交，结论是可以直接合并成功不会有冲突。
git的合并策略应该不是内容一样。分支a通过两次提交达到某种内容，分支b通过一次提交达到和分支a内容完全一样，此时分支b又有了新的提交，分支a合并分支b则会产生冲突，结论是git的合并策略应该不是内容一样就算没冲突也与具体有哪些提交有关系（即使是cherrypick出来的提交内容完全一样但也算不同的提交），特例是如果内容一模一样时那么可以直接合并成功没有冲突产生一个空的合并提交。