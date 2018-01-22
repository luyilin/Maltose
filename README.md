# Maltose

[![CircleCI](https://circleci.com/gh/luyilin/Maltose/tree/master.svg?style=shield)](https://circleci.com/gh/luyilin/Maltose/tree/master)
[![npm](https://img.shields.io/npm/dm/maltoses.svg)](https://www.npmjs.com/package/maltoses)

a cute emoticon keyboard which can generate random emoticon

## introduction

* [Demo](https://luyilin.github.io/Maltose/demo/)

* 非常喜欢 DIYgod 大神的 OwO 项目, 自定义的表情输入框很可爱, 代码简洁优美, 所以自己实现了一个, 添加了随机生成表情的功能 ٩(ˊᗜˋ*)و



## Install

```
$ yarn add maltoses --save
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
    api: 'https://luyilin.github.io/Maltose/demo/maltose.json'
})
```

### Work with module bundler

### JS

```js
var maltose = require('maltoses')
var maltose_demo = new maltose({
})
```

### CSS

```
@import url('../../node_modules/maltoses/dist/maltose.min.css');
```

## Options

### wrap  

Type: `string`<br>
Default: `document.getElementsByClassName('maltose')[0]`

The main tag which contains emoji panel.

### target  

Type: `string`<br>
Default: `document.getElementsByTagName('textarea')[0]`

The input or textarea tag which display the emoji or meme when you click them.

The default tag is the first textarea tag in DOM.

### width  

Type: `string`<br>
Default: `100%`

The default with of the panel.

### maxHeight  

Type: `string`<br>
Default: `200px`

The default height of the panel.

### api  

Type: `string`<br>
Default: `https://luyilin.github.io/Maltose/demo/maltose.json`

Request this json file to get emoji and meme.

## How to run  

```
 $ npm install
  $ gulp 
```
