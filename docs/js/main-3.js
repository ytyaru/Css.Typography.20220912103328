window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    console.log(window.innerWidth)
    if (window.innerWidth < 480) { document.querySelector(':root').style.setProperty('--line-of-chars', `20`) }
    else if (window.innerWidth < 720) { document.querySelector(':root').style.setProperty('--line-of-chars', `25`) }
    else if (window.innerWidth < 960) { document.querySelector(':root').style.setProperty('--line-of-chars', `30`) }
    else { document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
    const lineOfChars = getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars')
    const fontSize = FontSize.calc(lineOfChars)
    document.querySelector(':root').style.setProperty('--font-size', `${fontSize}px`)
    document.querySelector('#font-size').innerText = fontSize
    document.querySelector('#--line-of-chars').innerText = lineOfChars
    document.querySelector('#innerWidth').innerText = window.innerWidth
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});
window.addEventListener('resize', (event) => {
    console.log(window.innerWidth)
    if (window.innerWidth < 480) { document.querySelector(':root').style.setProperty('--line-of-chars', `20`) }
    else if (window.innerWidth < 720) { document.querySelector(':root').style.setProperty('--line-of-chars', `25`) }
    else if (window.innerWidth < 960) { document.querySelector(':root').style.setProperty('--line-of-chars', `30`) }
    else { document.querySelector(':root').style.setProperty('--line-of-chars', `35`) }
    const lineOfChars = getComputedStyle(document.querySelector(':root')).getPropertyValue('--line-of-chars')
    const fontSize = FontSize.calc(lineOfChars)
    document.querySelector(':root').style.setProperty('--font-size', `${fontSize}px`)
    document.querySelector('#font-size').innerText = fontSize
    document.querySelector('#--line-of-chars').innerText = lineOfChars
    document.querySelector('#innerWidth').innerText = window.innerWidth
});

