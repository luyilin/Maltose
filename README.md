# Maltose

a cute emoticon keyboard which can generate random emoticon

## introduction

* [Demo](https://luyilin.github.io/Maltose/demo/)

* 非常喜欢 DIYgod 大神的 OwO 项目, 自定义的表情输入框很可爱, 代码简洁优美, 所以自己实现了一个, 添加了随机生成表情的功能 ٩(ˊᗜˋ*)و



## Install

```js
$ npm install maltoses --save
```

## Usage

### HTML

```html
<link rel="stylesheet" href="maltose.min.css">
<!-- ... -->
<div class="maltose"></div>
<!-- ... -->
<script src="maltose.min.js"></script>
```

### JS

```js
let maltose_demo = new maltose({
    wrap: document.querySelector('.maltose'),
    target: document.getElementsByTagName('textarea')[0],
    width: '100%',
    maxHeight: '200px',
    api: 'https://luyilin.github.io/Maltose/demo/maltose.json'
})
```

### Work with module bundler

```js
var maltose = require('maltoses');
var maltose_demo = new maltose({
    // ...
});
```

## How to run  

```
 $ npm install

  $ gulp 
```

