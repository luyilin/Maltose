# Maltose

[![NPM version](https://img.shields.io/npm/v/maltoses.svg?style=flat)](https://npmjs.com/package/maltoses) [![NPM downloads](https://img.shields.io/npm/dm/maltoses.svg?style=flat)](https://npmjs.com/package/maltoses) [![CircleCI](https://circleci.com/gh/luyilin/Maltose/tree/master.svg?style=shield)](https://circleci.com/gh/luyilin/Maltose/tree/master)

A cute emoticon and emoji keyboard for textarea and input.

Inspired by the lovely [OwO](https://github.com/DIYgod/OwO) maded by DIYgod.

>More features: 

Generate random emoticon or emoji or image 💃

Support markdown syntax to display the cute images. 

## Introduction

[Demo](https://luyilin.github.io/Maltose/demo/)

Preview

![Screenshot](https://wx3.sinaimg.cn/mw690/a2117cdbly1fo0qp2jtugj20jo0angmz.jpg)


## Install

```
$ yarn add maltoses --save
```

## Usage

### Work with the single JavaScript file and the css file.
 
#### HTML

```html
<link rel="stylesheet" href="maltose.min.css">
<!-- ... -->
<div class="maltose"></div>
<!-- ... -->
<script src="maltose.min.js"></script>
```

#### JS

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

The main tag which contains emoji and emoticon.

The default tag is the first element which classname contains `maltose`.

### target  

Type: `string`<br>
Default: `document.getElementsByTagName('textarea')[0]`

The input or textarea tag which display the emoji or emoticon when you click it.

The default tag is the first textarea tag in DOM.

### width  

Type: `string`<br>
Default: `100%`

The width of the panel.

The default width is `100%`.

### maxHeight  

Type: `string`<br>
Default: `200px`

The max-height of the panel.

The default max-height is `200px`.

### api  

Type: `string`<br>
Default: `https://luyilin.github.io/Maltose/demo/maltose.json`

Request the json file to get emoji and emoticon.

## Run  maltose  locally

```
 $ yarn install

  $ gulp 
```
