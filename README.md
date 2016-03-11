input-numeric.js
===
テキスト入力欄に対して、半角数字のみの入力制限を設けるJavaScriptライブラリ

## Description
現場で使える国産のJavaScriptライブラリです。  
jQueryを必要としないので様々なプロジェクトで使用できます。

…というのを目指しています。

## Example
<a href="http://hiro0218.github.io/works/demo/input-numeric.js/">Demo</a>

## How to use
### ライブラリを読み込む
```html
<script src="input-numeric.js"></script>
```

### 設定する
```html
<input type="text" class="input-numeric">
```

```javascript
    InputNumeric.set();
```

#### オプションを指定する場合
```javascript
InputNumeric.set({
	inputName: 'input-numeric'
});
```

### オプション
#### inputName
Type: `String`
default: `'input-numeric'`

ターゲットとなるinput要素を指定してください。
何も指定されない場合は`'input-numeric'`クラスに適応されます。

#### comma
type: `Boolean`  
default: `false`

カンマ(,)を許可する場合は`true`を指定してください。  
整数の3桁ごとにカンマが挿入されます。

#### negative
type: `Boolean`  
default: `false`

マイナス値(-)を許可する場合は`true`を指定してください。  
先頭の"-"以外は無視されます。

#### decimal
type: `Boolean`  
default: `false`

少数点を許可する場合は`true`を指定してください。  
冒頭の"."以外は無視されます。

## Support
* Google Chrome
* Mozilla Firefox
* Internet Explorer 11


## Licence
* [MIT](https://github.com/hiro0218/input-numeric.js/blob/master/README.md)


## Author
* [hiro](http://b.0218.jp/)
