# avalonjs

* 取消双工绑定的三种方法：
  * 将该属性的名字以$开头，如$aa，标示它为非监控属性。
  * 将该属性的名字放在$skipArray数组里，如$skipArray: ["a"]，也能标示它为非监控属性。
  * 单向绑定，在ms-*前加::，或在{{ }}内部的属性名字前加::，如{{::a}}

* avalon的扫描顺序
  * ms-skip --> ms-important --> ms-controller --> ms-if --> ms-repeat --> ms-if-loop --> ...-->ms-each --> ms-with --> ms-duplex
  * ms-repeat绑定。出于某些原因，我们不想显示数组中的某些元素，就需要让ms-if拖延到它们之后才起作用，这时就要用到ms-if-loop
  
* 插值表达式 
  * ms-visible, ms-class,的值不要用{{}}
  {{}}用来且示这是一个文本绑定，位于文本节点 innerText 中，是 ms-text="" 的另一种形式
  而ms-*属性在属性名里已经用ms前缀表示它是一个XXX绑定，那么属性值里面就不需要{{}} 
  * 插值表达式{{}}在绑定属性的使用，只限那些能返回字符串的绑定属性，如ms-attr、ms-css、ms-include、ms-class、 ms-href、 ms-title、ms-src等。一旦出现插值表达式，说明这个整个东西分成可变的部分与不可变的部分，{{}}内为可变的，反之亦然。 如果没有{{}}说明整个东西都要求值，又如ms-include="'id'"，要用两种引号强制让它的内部不是一个变量。
  
* avalon渲染完成后 ms-controller 渲染为 avalonctrl 因此为了避免未经处理的原始模板内容在页面载入时在页面中一闪而过，可设置 

  ```
  .ms-controller,.ms-important,[ms-controller],[ms-important]{      
      visibility: hidden; 
  }
  //防止出现未渲染的数据
  ```
  avalon2.x
  ```
  .ms-controller {
      visibility: hidden;
  }
  ```
  
* 如果要更新对象，直接赋给它一个对象，注意不能将一个VM赋给它，可以到VM的$model赋给它（要不会在IE6-8中报错）
  $model对象，就是它当前的原始数据。是一个纯净的 js 对象
  
## vm
* 一个vm只能在页面上使用一次。即页面上不能重复出现相同的值的ms-controller
* avalon 中定义的 vm 都可以在 avalon.vmodels 中查看到
* 获取 vm 里的监控属性 js: vm.xx  html: @xx
* 非监控属性 
  $id, vm的名字
  $watch, 用于添加监听函数
  $fire, 用于触发监听函数
  $events, 用于储存监听函数
  $model, 返回一个纯净的JS对象
  $element, 2.0新增, 当我们用ms-controller, ms-important指定一个VM的作用域,对应元素节点会放到这个属性上.
  $computed, 2.2.1新增,用来集中定义计算属性

## API
  * avalon.scan(el, vmodels)
    * avalon内部默认在DomReady时，从body进行了一次扫描，如果在js中动态创建了一些元素，在页面中插入了新内容并包含avalon指令，则需要手动扫描
如果vm定义在回调中，如require回调，也需要手动扫描
el默认是DOM 元素节点，vmodels默认是数组, 里面是一个个 vm
avalon 初始化时默认scan一次
    * ajax 异步请求后需要重新 scan
    * 如果将vm定义放在jQuery.ready或avalon.ready中必须手动调用这个方法.
    
  * avalon.ready(function() {}) 
    * 将回调延迟到DOM树后执行，页面标签变为DOM树后执行function

## 指令
  * 指令有三种形式: 插值表达式、绑定属性、自定义属性
  * 写法 ms-xx = "" 或者 :xx = ""
  * 指令中不能出现大写，因为属性名在 HTML 规范中，会全部转换为小写
  * 与1.4,1.5相比, 2.0移除了ms-repeat, ms-each, ms-with, ms-include, ms-include-src,ms-data, ms-scan, ms-if-loop指令.
  * avalon1.*中ms-if-loop指令已经被废掉,请使用limitBy, selectBy, filterBy过滤器代替相应功能
  
  * 作用域绑定 ms-controller ms-important
    * avalon允许以 ms-controller 套 ms-controller 的方法实现作用域的数据共享，可向上查找。
    * ms-important = "a" 当某个属性在ms-important的VM找不到时,就不会向上寻找。避免类继承的缺点
    * ms-important 只能用于 ms-controller 的元素里面
    * ms-skip 绕过script style等不想用avalon处理的部分，忽略扫描绑定，不扫描绑定的属性和其子孙节点
    
  * 数据填充 ms-text ms-html {{}} 文本绑定 VS html 绑定
    * ms-html 将vm下符合html结构的字符串，放在元素下解析为节点
或直接使用插值表达式 {{ }}, ms-html 里可以有标签等 html 结构

  * 模版绑定 ms-include
    * ms-include 是ms-html的补充，如果ms-html字符串很大，放在vm上不合算，因此可以放在页面上能放大片内容的标签如script noscript textarea，并设id="expr"，通过ms-include="'expr'"调用
（注意ms-include的值要用引号括起来，表示是一个字符串，搜索页面id值等于它的节点，取其innerHTML放到ms-include元素内部。否则id值会被当作变量，框架在vm中检测是否有这个属性，有就取其值。）
或独立为一个html文件，通过ms-include-src="expr"调用，通常为URL参数，可用插值表达式如ms-include-src="aaa/{{bb}}.html"

  * 循环绑定ms-repeat
    * 用法ms-repeat-xx="array" xx可随意命名，对应vm中的普通数组或监控数组。
ms-each ms-repeat的区别：ms-each循环其子元素，ms-repeat循环自身。
    * ms-each, ms-repeat会生成一个新的代理VM对象放进当前的vmodels的前面，这个代理对象拥有el， $index, $first, $last, $remove, $outer等属性。另一个会产生VM对象的绑定是ms-widget。
          el: 不一定叫这个名字，比如说ms-each-item，它就变成item了。默认为el。指向当前元素。
          $first: 判定是否为监控数组的第一个元素
          $last: 判定是否为监控数组的最后一个元素
          $index: 得到当前元素的索引值
          $outer: 得到外围循环的那个元素。
          $remove：这是一个方法，用于移除此元素
  * ms-if ms-visiable的区别
    * ms-if 将本身节点从dom树中移除，ms-visiable保留节点仅隐藏此节点
    
## avalon filter 
* 用在插值表达式中 {{}}  {{ expression | filter }}
e.g.  {{ new Date | date("yyyy MM dd:HH:mm:ss")}}
