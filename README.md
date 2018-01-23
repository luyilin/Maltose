# Maltose

[![CircleCI](https://circleci.com/gh/luyilin/Maltose/tree/master.svg?style=shield)](https://circleci.com/gh/luyilin/Maltose/tree/master)
[![npm](https://img.shields.io/npm/dm/maltoses.svg)](https://www.npmjs.com/package/maltoses)

A cute emoticon and emoji keyboard for textarea and input.

Inspired by the lovely [OwO](https://github.com/DIYgod/OwO) maded by DIYgod.

>More features: 

Generate random emoticon 💃

Support markdown syntax to display the cute images. 

## introduction

[Demo](https://luyilin.github.io/Maltose/demo/)

Preview

![Screenshot](https://wx4.sinaimg.cn/mw690/a2117cdbgy1fnqkrudssaj20j209umyi.jpg)


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
const maltose_demo = new maltose()
```

### Work with module bundler

```js
import maltose from 'maltoses'
import 'maltoses/dist/maltose.min.css'

const maltose_demo = new maltose()
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

The default width of the panel.

### maxHeight  

Type: `string`<br>
Default: `200px`

The default height of the panel.

### api  

Type: `string`<br>
Default: `https://luyilin.github.io/Maltose/demo/maltose.json`

Request the json file to get emoji and meme.

## How to run  

```
 $ npm install
  $ gulp 
```
