/**
* --------------------------------------------------------------------------
* input-numeric.js (v0.1.0)
* Copyright (c) 2015 hiro (http://b.0218.jp/)
* This software is released under the MIT License.
* https://github.com/hiro0218/input-numeric.js/LICENSE
* --------------------------------------------------------------------------
*/

"use strict";

var InputNumeric = (function(global) {
    // private
    var defaultClass = "input-numeric",
    isImeDisabled = false,
    KEY_CODE = {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46,
        NUM_0: 48,
        NUM_9: 57,
        CHAR_C: 67,
        CHAR_V: 86,
        CHAR_X: 88,
        NUMPAD_0: 96,
        NUMPAD_9: 105,
        SUBTRACT: 109,
        DECIMAL_POINT: 110,
        MINUS: 173,
        COMMA: 188,
        DASH: 189,
        PERIOD: 190
    };

    function _init(inputName) {
        // 指定がない場合はデフォルトのクラス名を取得する
        var input = document.getElementsByClassName(inputName || defaultClass);

        [].forEach.call(input, function (element) {
            // キーが押された時のイベント
            _addListener(element, 'keydown', function (e) {
                if ( !_onKeyDown(e) ) {
                    _onKeyPress(e);
                }
            });

            // 要素にフォーカスがある時のイベント
            _addListener(element, 'focus', function (e) {
                _setInputLimit(e);  // セット
                _setValue(e);
            });

            // 要素からフォーカスが外れた時のイベント
            _addListener(element, 'blur', function (e) {
                _resetInputLimit(e); // リセット
                _setValue(e);
            });

        });
    }

    function _onKeyDown (e) {
        e = e || window.event;
        var key = e.which || e.keyCode || 0;
        var ctrlDown = e.ctrlKey || e.metaKey; // Mac support

        if( (ctrlDown && key == KEY_CODE.CHAR_C) || // c
        (ctrlDown && key == KEY_CODE.CHAR_V) || // v
        (ctrlDown && key == KEY_CODE.CHAR_X) || // x
        (key >= KEY_CODE.END && key <= KEY_CODE.DOWN))// home, end, left, right
        {
            return true;
        } else {
            return false;
        }
    }

    function _onKeyPress (e) {
        e = e || window.event;
        var key = e.which || e.keyCode || 0;
        var charStr = String.fromCharCode(key);

        if ( (key == KEY_CODE.RETURN || key == KEY_CODE.BACKSPACE || key == KEY_CODE.DELETE)) {
            _setValue(e);
        }

        // 数値ではなく、許可されていないキー
        if ( !isNumeric(charStr) && !isAllowKey(key) ) {
            // 数値ではない時、入力を許可しない
            if( !charStr.match(/\d/gi) ) {
            //if ( !/\d/.test(charStr) ) {
                e.preventDefault();
            }
        }
    }

    /**
    * 値をセットする
    */
    function _setValue(e) {
        var input = _getEventElement(e);
        var val = input.value;
        var arr = val.split('');
        var set = new Array();

        arr.forEach(function(value) {
            // 数値・改行のみ許可
            if( value.match(/[0-9]/gi) || value.match(/[\n\r]/g) ) {
                set.push(value);
            }
        });

        input.value = (set.length > 0) ? set.join('') : '';
    }

    /**
    * 対象の要素に ime-mode: disabled をセットする
    */
    function _setInputLimit(e){
        var input = _getEventElement(e);

        // CSS で設定されている値を取得する
        var style = input.currentStyle || document.defaultView.getComputedStyle(input, "");
        var imeMode = style.getPropertyValue('ime-mode');

        // 直書きが優先
        isImeDisabled = input.style.imeMode || imeMode; // 待避
        input.style.imeMode = "disabled";
    }

    /**
    * 対象の要素にセットされた ime-mode を元に戻す
    */
    function _resetInputLimit(e){
        var input = _getEventElement(e);
        input.style.imeMode = isImeDisabled; // 避難解除
    }

    //押されたキーが許可されているか判定する
    function isAllowKey(key){ // up or down
        return ( (key >= KEY_CODE.NUM_0 && key <= KEY_CODE.NUM_9) || (key >= KEY_CODE.NUMPAD_0 && key <= KEY_CODE.NUMPAD_9) || //0-9 only
            key == KEY_CODE.TAB ||
            key == KEY_CODE.RETURN ||
            key == KEY_CODE.BACKSPACE || key == KEY_CODE.DELETE ||
            key == KEY_CODE.SUBTRACT || key == KEY_CODE.MINUS || // -
            key == KEY_CODE.DECIMAL_POINT || key == KEY_CODE.COMMA || // ,
            key == KEY_CODE.PERIOD || key == KEY_CODE.DECIMAL_POINT );
    }

    /**
    * 数値か判定する
    * @param  {[type]}  number [description]
    * @return {Boolean}        [description]
    */
    function isNumeric (number) {
        return (number.match(/[^0-9|^.+-]/g)) ? false : true;
    }

    /**
    * 英数字か判定する
    * @param  {[type]}  number [description]
    * @return {Boolean}        [description]
    */
    function isAlphabetNumeric (number) {
        return (number.match(/[^A-Z|^a-z|^0-9]/g)) ? false : true;
    }

    //
    // Util
    // ==================================================

    /**
    * イベントから要素取得する
    * @param  event
    * @return target   [要素]
    */
    function _getEventElement(e) {
        return e.target || e.srcElement || e.originalTarget;
    }

    /**
    * イベントを登録する（クロスブラウザ対応）
    * @param  {[type]} function( [description]
    * @return {[type]}           [description]
    */
    var _addListener = (function() {
        if ( window.addEventListener ) {
            return function(el, type, fn) {
                el.addEventListener(type, fn, false);
            };
        } else if ( window.attachEvent ) {
            return function(el, type, fn) {
                var f = function() {
                    fn.call(el, window.event);
                };
                el.attachEvent('on'+type, f);
            };
        } else {
            return function(el, type, fn) {
                element['on' + type] = fn;
            };
        }
    })();


    // for public
    return {
        set: _init
    }

})((this || 0).self || global);
