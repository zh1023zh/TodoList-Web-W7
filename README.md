# 第7周 Todo List · 真实多提交 Git 示例仓库

这是**示例开发过程**，不代表学生本人完成过这些操作。`git log` 中作者 `Course Demo` 仅用于教学。请自己阅读、修改、测试并提交真实记录。

## 历史

| 阶段 | 提交目标 |
|--|--|
| V1 | 第6周直接操作DOM的基础版 |
| V2_01 | 新建 todos 单一数据源、addTodo、render |
| V2_02 | removeTodo(filter) + toggleTodo(map) |
| V2_03 | 三种筛选视图 |
| V2_04 | localStorage、save、load |
| V2_05 | clearCompleted 独立练习，函数体留空 |
| V2_06 | 完整参考代码，不作为独立编程证据 |

## 运行历史阶段

解压后直接在 `Todo_W7_各阶段源码/` 中打开不同阶段的 `index.html`，或者在本仓库：

```bash
git log --oneline --reverse
git show --stat HEAD~2
git diff HEAD~2 HEAD~1
git switch --detach HEAD~2  # 查看“练习待完成”版本
git switch main           # 回到参考最终版
```

若要在自己的 GitHub 展示**自己的真实开发过程**，最好从第一个版本开始，逐阶段自行编码、测试、提交；不要把这个教学仓库的模拟历史说成是自己的真实编写历史。

推荐实操：创建个人新仓库，在每个阶段完成后 `git add .` + `git commit -m "..."`；先在 `feature/todo-v2` 分支开发，验证后合并 main。

运行：双击 index.html。不同阶段功能不同是刻意设计。
