文書を読みやすくするためにCSSとJSで色々検証した

　ちゃんと実装するとものすご〜く大変そうだとわかった。

<!-- more -->

# ブツ

* [Css.Typography.20220912103328][]

[Css.Typography.20220912103328]:https://github.com/ytyaru/Css.Typography.20220912103328

# 目的

　文書を読みやすくする。

## 問題

　文書が読みづらい。PCとスマホはもう別物。

* ディスプレイサイズやアス比によってバラバラ
* フォントサイズが小さすぎる
	* 余白が多すぎる
	* 一行あたりの字数が多すぎる
* フォントサイズが大きすぎる
	* 一画面あたりの行数が少なすぎて速読できない

## 方針

* フォントサイズは最小16pxにすべき
* 日本語で横書きのとき一行あたり35〜38字くらいが読みやすい
* ディスプレイのサイズやアス比に応じて適正化すべき

## 方法

　ディスプレイサイズに応じて次の処理をする。

* フォントサイズ調整（16px〜）
* 画面を分割する

# 技術情報

* 基礎
	* [CSS の値と単位][]
* デフォルト
* CSS
	* [font-size][]
		* `font-size:16px;`
	* [MediaQuery][]
		* [@media][]
			* `@media screen and (max-width: 959px) {...}`
	* [var()][]
	* [calc()][]
		* [][]
	* [段組み][段組みレイアウトの使用]
	* [ページ化メディア][]
* JS
	* 表示領域サイズ取得
		* [document.body.clientWidth][]
		* [document.documentElement.clientHeight][]
	* CSS変数の操作
		* [style][]／[getComputedStyle()][]
		* [getPropertyValue()][]／[setProperty()][]
	* イベント
		* [表示領域リサイズ][resize]
		* [キーボード][keydown]
	* 処理
		* [scrollBy()][]
		* [scrollIntoView()][]

[CSS の値と単位]:https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Values_and_units
[MediaQuery]:https://developer.mozilla.org/ja/docs/Web/CSS/Media_Queries/Using_media_queries
[font-size]:https://developer.mozilla.org/ja/docs/Web/CSS/font-size
[@media]:https://developer.mozilla.org/ja/docs/Web/CSS/@media
[var()]:https://developer.mozilla.org/ja/docs/Web/CSS/var
[calc()]:https://developer.mozilla.org/ja/docs/Web/CSS/calc
[CSSのcalc()は単位のない値を計算できない]:https://kimulaco.com/post/css-calc-cannot-calculate-zero/

[段組みレイアウトの使用]:https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Columns/Using_multi-column_layouts
[ページ化メディア]:https://developer.mozilla.org/ja/docs/Web/CSS/Paged_Media

[style]:https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/style
[getComputedStyle()]:https://developer.mozilla.org/ja/docs/Web/API/Window/getComputedStyle
[getPropertyValue()]:https://developer.mozilla.org/ja/docs/Web/API/CSSStyleDeclaration/getPropertyValue
[setProperty()]:https://developer.mozilla.org/ja/docs/Web/API/CSSStyleDeclaration/setProperty

[ウインドウサイズを取得する 【JavaScript 動的サンプル】]:https://web-designer.cman.jp/javascript_ref/window/size/
[document.body.clientWidth]:https://developer.mozilla.org/ja/docs/Web/API/Element/clientWidth
[document.documentElement.clientHeight]:https://developer.mozilla.org/ja/docs/Web/API/Element/clientHeight

[resize]:https://developer.mozilla.org/ja/docs/Web/API/Window/resize_event
[keydown]:https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event

[scrollBy()]:https://developer.mozilla.org/ja/docs/Web/API/Window/scrollBy
[scrollIntoView()]:https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView

# [calc()][]

```css
:root {
    --line-of-chars:35;
    --line-height:1.5em; /*1.5〜1.75em*/
    --letter-spacing:0.05em; /*0.05〜0.1em*/
    --font-size:calc(100vw / var(--line-of-chars));
}
@media screen and (max-width: 959px) {
    --line-of-chars:30;
}
@media screen and (max-width: 719px) {
    --line-of-chars:25;
}
@media screen and (max-width: 480px) {
    --line-of-chars:20;
}
body {
    font-size: var(--font-size);
    line-height: var(--line-height);
    letter-spacing: var(--letter-spacing);
}
```

　概算はできるが、正確な計算はできない。

* `font-size`を正確に計算できない
	* 表示領域サイズが取得できない
		* `100vw`はディスプレイサイズなのでウインドウ枠なども含まれてしまう
	* 字間`letter-spacing`を考慮した計算式を書けない（単位が一致しない）
	* 結果的に期待した一行あたりの表示字数とズレてしまう
* [CSSのcalc()は単位のない値を計算できない][]
	* [CSS の値と単位][]
		* 表示領域サイズが取得できない
			* 単位が一致せず、字間を考慮したフォントサイズ計算式が書けない
* 窓をリサイズしたとき値を変更できない

　上記の問題を解決するにはJSを使って計算し、その値をCSSにセットするしかない。CSS側では各プロパティに[var()][]で変数値を受け取れるようにする。`16px`や`0.05em`など単位付きの値が期待される。

# JS

## フォントサイズ計算式

### 段組みなし

```javascript
const fontSize = Math.max(this.minPx(), (this.lineOfPx() / (lineOfChars * (1 + this.letterSpacingEm()))))
```

### 段組みあり

```javascript
const fontSize = Math.max(this.minPx(), ((this.lineOfPx() / this.columnCount()) / ((lineOfChars * (1 + this.letterSpacingEm())) + this.columnGap())))
```
```javascript
static minPx() { return 16; }
static lineOfPx() { return document.body.clientWidth; }
static letterSpacingEm() { return parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--letter-spacing')) }
static columnCount() { return parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue('column-count')); }
static columnGap() { return parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap')); }
```

式|意味
--|----
`minPx()`|一字あたりの最小サイズ（ピクセル単位。`16`）
`lineOfChars`|一行あたりの表示字数(`20`〜`50`)
`lineOfPx()`|表示領域の幅(ピクセル単位。`1920`等)
`letterSpacingEm()`|字間（`0.05em`）
`columnCount()`|カラム数（`1`,`2`）
`columnGap()`|カラム間マージン（`1em`）

### 一行あたりの字数×段組み

```javascript
let columnCount = 1
let lineOfChars = 35
if (window.innerWidth < 1280) {
    if (window.innerWidth < 480) { lineOfChars = 20 }
    else if (window.innerWidth < 720) { lineOfChars = 25 }
    else if (window.innerWidth < 960) { lineOfChars = 30 }
    else { lineOfChars = 35 }
} else {
    columnCount = 2
    if (window.innerWidth < 1440) { lineOfChars = 25 }
    else if (window.innerWidth < 1920) { lineOfChars = 30 }
    else if (window.innerWidth < 2560) { lineOfChars = 35 }
    else { lineOfChars = 40 }
}
```

* フォントサイズ最小値16px
* 横書きなら35〜38字くらいが読みやすいらしい

　次のように5字／行刻みの計算もできる。

px未満|`column-count`|`--line-of-chars`
------|--------------|-----------------
`480`|`1`|`20`
`720`|`1`|`25`
`960`|`1`|`30`
`1280`|`1`|`35`
`1440`|`2`|`25`
`1920`|`2`|`30`
`2400`|`2`|`35`
-|`2`|`40`

```javascript
columnCount = (width < 1280) ? 1 : 2
lineOfChars = (width < 1280) ? ((20 + (5*Math.floor((width-480)/240)))) : ((25 + (5*Math.floor((width-1280)/480))))
lineOfChars = Math.min(40, ((20+(5*(columnCount-1))) + (5*Math.floor((width-480)/(240*columnCount)))))
```

## 表示領域サイズ

　タスクバー、タイトルバー、メニューバー、タブバー、スクロールバーなどをすべて取り払った表示領域サイズを取得する。スクロールが必要な分も取り払われている。つまり画面サイズ以下になる。

JS|意味
--|----
[document.body.clientWidth][]|表示領域の幅
[document.documentElement.clientHeight][]|表示領域の高さ

## CSS変数の操作

```css
:root {
    --line-of-chars:35;
}
```

　上記CSS変数をJSで代入・取得する方法は以下である。冗長かつわかりにくく罠がある。

### 代入

```javascript
document.querySelector(':root').style.setProperty('--line-of-chars', '35')
```

　文書全体から[querySelector()][]で指定したセレクタの要素を探し、最初にみつかった要素をひとつ返す。

　[:root][]は`<html>`要素のことであり、CSS変数を定義する箇所。CSSの[疑似クラス][]のひとつであり特定の状態をさす。

　`<html>`要素の[style][]を取得する。[setProperty][]で指定したプロパティに指定した値をセットする。

[:root]:https://developer.mozilla.org/ja/docs/Web/CSS/:root
[疑似クラス]:https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-classes
[querySelector()]:https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector

### 取得

```javascript
const v = parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars'))
```

　[getComputedStyle()][]で計算済みのスタイルを取得する。[style][]で取得しようとしても現在値は取得できない。

　[getPropertyValue()][]で指定したプロパティの値を取得する。[setProperty()][]のほうは関数名に`Value`がないので統一性がない。また、返される値の型は文字列なので整数に変換すべく[parseInt][]している。整数ならまだいいが、少数値だと[parseFloat][]することになり誤差が生じてしまう。

[parseInt]:https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/parseInt
[parseFloat]:https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

# [段組み][段組みレイアウトの使用]

　[段組み][段組みレイアウトの使用]は一行の字数を調整する方法として最適だと思われる。

　たとえば画面サイズが2K(1920x1080)など一定以上あり、アス比が16:9など横と縦で大きく差があるときに有効。

## 段組みなし

　もし段組みしなければ一行あたりの字数が長くなりすぎたり、文字が小さいのに余白が大きい状態になってしまう。

　フォントサイズを大きくすることで調整すれば、ムダに字が大きくなりすぎて一画面あたりに表示できる文量が少なくなってしまう。

## 段組みあり

　そこで[段組み][段組みレイアウトの使用]することで解決する。たとえば横書き（書字方向:横）の場合、縦中央で２分割する。このとき文書全体の前半が左、後半が右に表示される。スクロールは縦方向になる。

### 横書きを段組みしたときの縦スクロール問題

　ここで新たな問題が生じる。画面の左と右がつながっていないのだ。続きの文章を読むためには画面の左または右の半分に注目し、その下をスクロールせねばならない。最下端まで到達したら最上端までスクロールし、また最下端まで読み進める必要がある。このせいでスクロール回数が一気に増えてしまい、非常に読みづらくなってしまう。

```
+-------------+--+
|0%    |51%   |▲|
|      |      |■|
|      |      |  |
|      |      |  |
|15%   |66%   |▼|
+-------------+--+
      ↓
 16%   |67%
```

* 一体だれが全体の半分から読み始めようと思う？
* 一体だれが現在位置+50%のテキストを並列表示して読みたがる？

　そんな部分のテキストを右側に提示する合理性がまるでない。

　ふつう一画面に表示されているテキストは左から右へ読み進められるようにつながっていることを期待するだろう。横書きの本を開いたような状態を期待している、といえば伝わるだろうか。

```
+-------------+
|0%    |16%   | → 31%
|      |      |
|      |      |
|      |      |
|15%   |30%   |
+-------------+
|◀|■     |▶|
+----------+--+
```

### `height`を表示領域の高さで固定することで解決

　スクロールする要素の`height`をディスプレイサイズに固定することで解決できる。表示領域の高さは[document.documentElement.clientHeight][]で取得する。

```css
:root {
    --body-height:1080px;
}
body {
    height: var(--body-height);
    overflow-y:hidden;
}
```
```javascript
document.querySelector(':root').style.setProperty('--body-height', `${document.documentElement.clientHeight}px`)
```

　`height`を表示領域の高さで固定するため、縦スクロールバーは不要である。よって表示しないよう指定する。[overflow-y][]に`hidden`をセットすることで。これをしないと横スクロールバーのせいで縦スクロールバーが表示される状況になってしまう。

[overflow-y]:https://developer.mozilla.org/ja/docs/Web/CSS/overflow-y

### 横スクロールできない問題

　縦スクロールのときはキーボードのスペースキーを押下すれば一ページ分遷移できていた。<kbd>Shift</kdb>を押しながらスペースキーを押すと反対側に遷移する。

　これが縦スクロールだと機能しない。そこでJSで実装した。

```javascript
class Scroll {
    static #columnGap() { return parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue('column-gap')); }
    static #columnRuleWidth() { return parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-rule-width')); }
    static setup() {
        window.addEventListener("keydown", event => { // キーボード
            if (event.repeat) { return; } // 押しっぱなしによる連続入力の禁止
            console.log(event.key)
            if (event.key === ' ') {
                console.log('Push Space Key!!')
                const direct = ((event.shiftKey) ? -1 : 1)
                const backDiff = ((-1 === direct) ? this.#columnRuleWidth()/2 : 0)
                console.log(backDiff)
                window.scrollBy({
                    left: ((document.body.clientWidth + (this.#columnGap())) * direct) + backDiff,
                    //behavior: "smooth"
                });
                event.preventDefault();
            }
```

#### 位置ズレが起きる

　残念ながら、微妙に位置がズレる。

　とくに最終ページから<kbd>Shift</kdb>+<kbd>Space</kdb>で先頭に戻るとき顕著。

　おそらく1px未満のレベルでズレる。その原因は[scrollBy()][]で指定した座標に遷移させているから。座標計算するとき1px未満の誤差が生じるのだと思われる。それがページ数分だけくりかえされるため、ページ数が増えるごとに誤差が無視できないレベルになってしまう。

#### `behavior: "smooth"`

　`behavior: "smooth"`を指定したときアニメーションするようになる

* ただしアニメ中に何度もスペースキーを押すと遷移すべき位置がズレてしまう
* アニメ完了するまで待機するなどといった処理はできない
* よってアニメさせないようにすべき

# [ページ化メディア][]

```css
.break { break-before:column; }
```
```html
<h2 class="break">この要素がページの先頭になる１</h2>
<p>上の見出しに続く本文。１</p>

<h2 class="break">この要素がページの先頭になる２</h2>
<p>上の見出しに続く本文。２</p>
```

　[break-before][]に`column`を指定することで、たとえまだ余裕があったとしても次のカラムに行く。

　これを利用して、表示領域サイズに応じてカラムの先頭となる要素をがんばって計算し、その要素の`class`属性値に`break`を付与すれば、カラムの先頭を指定できる。その位置に[scrollIntoView()][]すれば、座標の誤差ズレなくスクロールできるはず。

　ただ、そのために必要な計算がとても大変だと思われる。今回は実装していない。

　そもそも、今回の用途にふさわしいか疑問。

[break-before]:https://developer.mozilla.org/ja/docs/Web/CSS/break-before

# ２画面個別スクロール

　左右２画面に分割し、さらに個別にスクロールバーをもたせたい。

　たとえば画面の左をつぶやき入力・設定などの入力フォーム領域とし、右を投稿したつぶやき一覧にする。それぞれ個別に縦スクロールバーをもっている。こうした構成が正解な気がしてきた。

　もし`column-count`だと入力フォームとつぶやき一覧に分割できない。たとえば一覧をずっと下まで見たあと、入力フォームで投稿したくなったとき、最上端までスクロールせねばならない。また、入力フォームが長いと右にもフォームが表示されてつぶやき一覧がみれない。

　そうした事態をふせぐためには左右個別の要素にそれぞれのコンテンツをいれ、個別にスクロールバーをもたせる必要がある。

　ディスプレイサイズが小さければ分割しない場合もある。HTML構成が変わるのでそれらをJavaScriptのDOMで実装せねばならない。窓のリサイズでそれを動的に変える必要がある。

　ピクセル計算がない分`column-count`パターンのほうが実装は楽か？

　もし縦書き（書字方向が縦）に動的に変えることも要件だとしたら、さらに面倒なことになる。そのときは`column-count`パターンのほうが楽かもしれない。

# 段組み方法

　ディスプレイサイズに応じてフォントサイズや余白を適正化するにはアス比を変えればいい。段組みによってそれを実現する。その方法は２通りあるとわかった。

* 座標計算+`column-count`+`break-before:column`+[scrollIntoView()][]
* ２要素個別スクロール

方法|スクロールバー数
----|----------------
`column-count`|1
個別スクロール|2

## `column-count:2`を使うべきとき

　左右どちらも同じコンテンツでその続きを表示するなら、`column-count:2`のほうがよい。

　たとえば本のように同じひとつの話を伝えるための文字列が続いているときなど。もし続いている内容なのに個別スクロールで分断されていたら読みづらいことこの上ない。

## 個別スクロールを使うべきとき

　左右異なるコンテンツなら、個別スクロールのほうが使いやすい可能性が高い。

　たとえば画面の左が入力フォーム、右がその結果一覧など。これなら入力フォームの表示項目を多く表示できる。

　小さい画面なら表示領域を節約するためにボタンやメニューに包含させることがある。その場合、クリックやタップなど操作数が増えてしまう。もし最初から表示されていれば、そのUIを表示するための操作が不要になる。よって入力フォームを画面領域の半分専有させれば操作数を減らせる可能性が高い。

　もし入力が中心のアプリでありながらサブで一覧もみたいときはこの方法がよさそう。

# パフォーマンス問題

　規模が大きくなるとパフォーマンス問題にぶちあたる。たとえば窓をリサイズするごとにフォントサイズ計算が実行されて動作が非常に重くなる等。これを回避すべく以下のようにタイムアウトするよう実装するよう対応するとか。

```javascirpt
let timeoutId = 0
window.addEventListener("resize", function (e) { // 画面リサイズ時に字／行の最大値を計算・設定する
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{ resize() }, 500); // 500ms
})
```

　他にも[content-visibility][]を変更することで初回表示を高速化するなど様々なテクニックがある。むしろ、そうしたテクを使わねば遅くなってしまう現実がある。機能を作り込むことでパフォーマンスが悪化し、パフォーマンス悪化を回避するためのコードをさらに作り込むことになる。必然的にコード量が増えたり可読性がさがってしまう。根本的にJavaScriptやCSSが遅いので、どうしようもない。

　[パフォーマンスの基礎][]は読むとして。他にも考慮すべきことが山のようにある。

* [Webフロントエンドパフォーマンスチューニング70選][]

[content-visibility]:https://developer.mozilla.org/ja/docs/Web/CSS/content-visibility
[パフォーマンスの基礎]:https://developer.mozilla.org/ja/docs/Web/Performance/Fundamentals
[Webフロントエンドパフォーマンスチューニング70選]:https://qiita.com/nuko-suke/items/50ba4e35289e98d95753

