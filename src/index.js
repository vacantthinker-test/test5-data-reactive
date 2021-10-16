// 实现目标：更新rice 价格, total 会自动更新.

import observe from "./observe";
import Watcher from "./Watcher";
import {set} from "./defineReactive";

const data = {
    dinner: { // 晚饭
        rice: 5, // 米饭
        veggie: 20 // 蔬菜
    },
    total: 0, // 总计
    drinkType: [
        {name: '可乐'},
        {name: '雪碧'},
    ]
}
observe(data); // 现在测试一下
window.data = data; // 挂载至window 方便测试
// data.drinkType.push({name:'橙汁'})

// -----------------------------------------------------------------------
const methods = { // 方法集合
    incrementRice: () => {
        data.dinner.rice++;
    },
    decrementRice: () => {
        data.dinner.rice--;
    },
    incrementVeggie: () => {
        data.dinner.veggie++;
    },
    decrementVeggie: () => {
        data.dinner.veggie--;
    },
    incrementMeat: () => {
        if (data.dinner.meat) {
            data.dinner.meat++;
        }
    },
    decrementMeat: () => {
        if (data.dinner.meat) {
            data.dinner.meat--;
        }
    },
}

function updateTotal() { // 更新 total
    data.total = data.dinner.rice + data.dinner.veggie
    if (data.dinner.meat) {
        data.total += data.dinner.meat; // 如果meat存在, 总计 需要 加上 肉类价格
    }
    
    console.log(data.total)
}

function render() { // 渲染函数
    document.getElementById('app').innerHTML = `
<table>
  <tr>
    <td>米饭</td>
    <td>${data.dinner.rice}</td>
    <td>
      <button @click="incrementRice">+</button>
      <button @click="decrementRice">-</button>
    </td>
  </tr>
  <tr>
    <td>蔬菜</td>
    <td>${data.dinner.veggie}</td>
    <td>
      <button @click="incrementVeggie">+</button>
      <button @click="decrementVeggie">-</button>
    </td>
  </tr>
  <tr>
    <td>肉类</td>
    <td>${data.dinner.meat}</td>
    <td>
      <button @click="incrementMeat">+</button>
      <button @click="decrementMeat">-</button>
    </td>
  </tr>
  <tr>
    <td>总计</td>
    <td>${data.total}</td>
    <td>
    </td>
  </tr>
</table>
`
}

function initEvent() {
    document.getElementById('app').addEventListener('click', function (e) {
        let clickElement = e.target.attributes['@click']; // e是事件对象, 获取事件对象目标属性 '@click' 的 值
        // 根据这个值, 去方法集合中 找 对应的方法. 然后执行它.
        if (clickElement) {
            let value = clickElement.value;
            console.log(`value: ${value}`)
            let method = methods[value]; // 如果对应的方法存在, 执行它
            if (method) {
                method()
            }
        }
    })
}

initEvent(); // 初始化事件
updateTotal(); // 初始化total
render(); // 初始化渲染

// -----------------------------------------------------------------------

new Watcher(data, 'dinner.rice', function (...args) {
    updateTotal();
    render();
})
new Watcher(data, 'dinner.veggie', function (...args) {
    updateTotal();
    render();
})// 现在只有米饭 蔬菜, 没肉是不行的. 加上

new Watcher(data, 'dinner.meat', function (...args) {
    console.log('meatmeat ----------------')
    updateTotal();
    render();
})
set(data.dinner, 'meat', 10); // 使用set() 方法 添加新的属性
// 现在 watcher 有 3个, 有meat的监听和触发的方法.


// 5 + 20 25
// 10 + 20 30















