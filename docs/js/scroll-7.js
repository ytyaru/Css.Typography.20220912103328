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
                    //left: ((document.body.clientWidth + (this.#columnGap() / 2)) * direct),
                    //left: ((document.body.clientWidth + (this.#columnGap())) * direct),
                    left: ((document.body.clientWidth + (this.#columnGap())) * direct) + backDiff,
                    //left: ((document.body.clientWidth + this.#columnGap() + (this.#columnRuleWidth()/2)) * direct),
                    //behavior: "smooth"
                });
                event.preventDefault();
            }
            /*
            if (document.querySelector('#setting').open) { return; }
            const IS_VERTICAL = ('vertical-rl' === document.querySelector('#writing-mode').value);
            console.debug(`keydown event.key:${event.key}, Shift:${event.shiftKey}`)
                 if (event.key === 'ArrowUp') { event.preventDefault();  }   // menu(index,setting,tools)表示予定
            else if (event.key === 'ArrowDown') { // setting表示切替
                const dialog = document.querySelector('#setting');
                (dialog.open) ? dialog.close() : dialog.showModal();
                document.body.style.cursor = 'auto';
                event.preventDefault();
            }
            else if (event.key === 'ArrowLeft') {(IS_VERTICAL) ? nextPage() : prevPage(); event.preventDefault();  }
            else if (event.key === 'ArrowRight') {(IS_VERTICAL) ? prevPage() : nextPage(); event.preventDefault();  }
            else if (event.key === 'PageUp') {prevPage();event.preventDefault();}
            else if (event.key === 'PageDown') {nextPage();event.preventDefault();}
            else if (event.key === 'Home') {firstPage();event.preventDefault();}
            else if (event.key === 'End') {lastPage();event.preventDefault();}
            else if (!event.shiftKey && event.key === ' ') {nextPage();event.preventDefault();}
            else if (event.shiftKey && event.key === ' ') {prevPage();event.preventDefault();}
            else if (!event.shiftKey && event.key === 'Enter') {nextPage();event.preventDefault();}
            else if (event.shiftKey && event.key === 'Enter') {prevPage();event.preventDefault();}
            else if (event.key === 'Backspace') {prevPage();event.preventDefault();}
            else if (event.key === 'Escape') {;event.preventDefault();} // 本を閉じる予定（本棚に戻る）
            else {}
            */
        }, {passive: false});
    }
}
