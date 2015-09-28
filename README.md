input-numeric.js
===
テキスト入力欄に対して、半角数字のみの入力制限を設けるJavaScriptライブラリ

## Description
現場で使える国産のJavaScriptライブラリです。<br>
jQueryを必要としないので様々なプロジェクトで使用できます。

…というのを目指しています。

## Example
<a href="http://hiro0218.github.io/works/input-numeric.js/">Demo</a>

## How to use
### ライブラリを読み込む
```html
<script src="input-numeric.js"></script>
```

### 設定する
```html
<input type="text" class="input-numeric">

<script>
InputNumeric.set({
	inputName: 'input-numeric'
});
</script>
```

### オプション
inputName:'input-numeric'
comma:false
negative:false



## Support
* Google Chrome
* Mozilla Firefox
* Internet Explorer 11


## Licence
* [MIT](https://github.com/hiro0218/input-numeric.js/LICENSE)


## Author
* [hiro](http://b.0218.jp/)
