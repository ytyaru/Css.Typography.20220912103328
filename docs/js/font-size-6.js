class FontSize {
    static minPx() { return 16; }
    static lineOfPx() { return document.body.clientWidth; }
    static columnCount() { return parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue('column-count')); }
    //static lineOfPx() { return parseFloat(getComputedStyle(document.querySelector('main:not([hidden])')).getPropertyValue('inline-size')); }
    static columnGap() { return parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--column-gap')); }
    static letterSpacingEm() { return parseFloat(getComputedStyle(document.querySelector(':root')).getPropertyValue('--letter-spacing')) }
    static calc(lineOfChars) { // lineOfChars:一行あたりの表示文字数　return フォントサイズpx
        // 0.1em=余白を適当に
        const fontSize = Math.max(this.minPx(), ((this.lineOfPx() / this.columnCount()) / ((lineOfChars * (1 + this.letterSpacingEm())) + this.columnGap())))

        console.log(fontSize, this.lineOfPx(), lineOfChars);
        return fontSize 
    }
    static calcHalf(lineOfChars) { Math.max((this.calc(lineOfChars) / 2), this.minPx()) }
    static calcMax(lineOfChars) {
        const fontSize = this.calc(lineOfChars)
        const minFontSize = (this.minPx() * (1 + this.letterSpacingEm()))
        const max = Math.min(50, Math.floor((this.lineOfPx() / minFontSize) - (minFontSize * 0.1)))
        console.log('max:', max)
        return max
    }
}
