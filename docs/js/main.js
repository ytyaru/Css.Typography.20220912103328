window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    /*
    const fontSize = getComputedStyle(document.querySelector('body')).getPropertyValue('font-size')
    document.querySelector('#font-size').innerText = fontSize
    document.querySelector('#--line-of-chars').innerText = getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars')
    console.log('innerWH:', window.innerWidth, window.innerHeight);
    console.log('font-size:', fontSize);
    console.log('--font-size:', getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size'));
    */
    if (window.innerWidth < 1280) {
        document.querySelector(':root').style.setProperty('--column-count', `1`)
        if (window.innerWidth < 480) { document.querySelector(':root').style.setProperty('--line-of-chars', `20`) }
        else if (window.innerWidth < 720) { document.querySelector(':root').style.setProperty('--line-of-chars', `25`) }
        else if (window.innerWidth < 960) { document.querySelector(':root').style.setProperty('--line-of-chars', `30`) }
        else { document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
    } else {
        document.querySelector(':root').style.setProperty('--column-count', `2`)
        if (window.innerWidth < 1440) { document.querySelector(':root').style.setProperty('--line-of-chars', `25`) }
        if (window.innerWidth < 1920) { document.querySelector(':root').style.setProperty('--line-of-chars', `30`) }
        if (window.innerWidth < 2560) { document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
        else { document.querySelector(':root').style.setProperty('--line-of-chars', `40`) }
    }
    const lineOfChars = getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars')
    const fontSize = FontSize.calc(lineOfChars)
    document.querySelector(':root').style.setProperty('--font-size', `${fontSize}px`)
    document.querySelector('#font-size').innerText = fontSize
    document.querySelector('#--line-of-chars').innerText = lineOfChars
    document.querySelector('#innerWidth').innerText = window.innerWidth
    document.querySelector('#column-count').innerText = getComputedStyle(document.querySelector('body')).getPropertyValue('column-count')
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});
window.addEventListener('resize', (event) => {
    /*
    const fontSize = getComputedStyle(document.querySelector('body')).getPropertyValue('font-size')
    document.querySelector('#font-size').innerText = fontSize
    document.querySelector('#--line-of-chars').innerText = getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars')
    console.log('innerWH:', window.innerWidth, window.innerHeight);
    console.log('font-size:', fontSize);
    console.log('--font-size:', getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size'));
    */
    console.log(window.innerWidth)
    /*
    if (window.innerWidth < 480) { document.querySelector(':root').style.setProperty('--line-of-chars', `20`) }
    else if (window.innerWidth < 720) { document.querySelector(':root').style.setProperty('--line-of-chars', `25`) }
    else if (window.innerWidth < 960) { document.querySelector(':root').style.setProperty('--line-of-chars', `30`) }
    //else { document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
    else if (window.innerWidth < 1280) {document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
    else {
        document.querySelector(':root').style.setProperty('--column-count', `2`)
    }
    */
    if (window.innerWidth < 1280) {
        document.querySelector(':root').style.setProperty('--column-count', `1`)
        if (window.innerWidth < 480) { document.querySelector(':root').style.setProperty('--line-of-chars', `20`) }
        else if (window.innerWidth < 720) { document.querySelector(':root').style.setProperty('--line-of-chars', `25`) }
        else if (window.innerWidth < 960) { document.querySelector(':root').style.setProperty('--line-of-chars', `30`) }
        else { document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
    } else {
        document.querySelector(':root').style.setProperty('--column-count', `2`)
        if (window.innerWidth < 1440) { document.querySelector(':root').style.setProperty('--line-of-chars', `25`) }
        if (window.innerWidth < 1920) { document.querySelector(':root').style.setProperty('--line-of-chars', `30`) }
        if (window.innerWidth < 2560) { document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
        else { document.querySelector(':root').style.setProperty('--line-of-chars', `40`) }
    }
    const lineOfChars = getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars')
    const fontSize = FontSize.calc(lineOfChars)
    document.querySelector(':root').style.setProperty('--font-size', `${fontSize}px`)
    document.querySelector('#font-size').innerText = fontSize
    document.querySelector('#--line-of-chars').innerText = lineOfChars
    document.querySelector('#innerWidth').innerText = window.innerWidth
    document.querySelector('#column-count').innerText = getComputedStyle(document.querySelector('body')).getPropertyValue('column-count')
    /*
    const lineOfPx = parseFloat(getComputedStyle(document.querySelector('body')).getPropertyValue('inline-size'))
    document.querySelector(':root').style.setProperty('--font-size', )
    */
});

