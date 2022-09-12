window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    setBodyHeight()
    setLineOfChars()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});
window.addEventListener('resize', (event) => {
    setBodyHeight()
    setLineOfChars()
});
function setBodyHeight() {
    const bodyHeight = window.innerHeight - document.body.scrollHeight
    console.log(bodyHeight, window.innerHeight, document.body.clientHeight, document.documentElement.clientHeight, document.body.scrollHeight)
    document.querySelector(':root').style.setProperty('--body-height', `${document.documentElement.clientHeight}px`)
    document.querySelector('#client-height').innerText = document.documentElement.clientHeight
}
function setLineOfChars() {
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
    document.querySelector(':root').style.setProperty('--column-count', columnCount)
    document.querySelector(':root').style.setProperty('--line-of-chars', lineOfChars)

    //const lineOfChars = parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars'))
    const fontSize = FontSize.calc(lineOfChars)
    document.querySelector(':root').style.setProperty('--font-size', `${fontSize}px`)
    document.querySelector('#font-size').innerText = fontSize
    document.querySelector('#--line-of-chars').innerText = lineOfChars
    document.querySelector('#inner-width').innerText = window.innerWidth
    document.querySelector('#column-count').innerText = getComputedStyle(document.querySelector('body')).getPropertyValue('column-count')
}
