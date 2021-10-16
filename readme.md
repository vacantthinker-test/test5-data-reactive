# vue2 响应式原理 手写代码

---

### 1 数据拦截处理 使用Object.defineProperty() ✔

 - observe
   - 检测 value 有没有 __ob__ 属性, 有直接返回 没有 new 一个 √
 - Observer
   - 1 在value对象上定义一个__ob__属性, 并且设置不可枚举 √
   - 2 根据value的类型, 分别进行不同的处理 √
     - 1 数组
       - 重写数组原型中的7个方法
         - array.js ✔
           - 获取Array原型
           - Object.create 新建一个原型
           - 重写7个方法
       - 数组子项可能是一个对象, 需要observe
     - 2 对象
       - forin遍历, key-value defineReactive 处理
 - defineReactive ✔
   - 参数只有2个, val = obj[key]
   - val可能是一个对象, 需要observe
   - Object.defineProperty(obj, key, {})
     - 重写getter
     - 重写setter

### 2 创建一个Watcher 监听一个属性 触发一个方法 ✔

 - Dep
   - 两个位置创建new Dep()
     - 1 每个Observer都有一个Dep实例
     - 2 每个obj的key都有一个Dep实例
   - 在obj.a访问属性 触发getter 
     - 收集依赖
   - 在obj.a = x 更新属性值 触发setter 
     - 通知依赖 执行更新watcher.update()
 - Watcher
   - target 监听的目标对象
   - expression 监听的目标对象的属性 可能是连续. a.b.c
   - callback 监听的属性值 更新时, 触发这个callback 方法
 
### 3 想添加新的属性, 如何处理? 使用 set() ✔

finish.

---

end
















