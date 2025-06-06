const menuBtn = document.getElementById('menu-icon')
const closeMenu = document.getElementById('menu-close')


menuBtn.addEventListener('click', () => {
    document.getElementById('nav').style.display = 'flex'
    document.getElementById('menu-icon').style.display = 'none'
    document.getElementById('header').style.background = 'white'
    document.getElementById('author').style.display = 'inline'
})

closeMenu.addEventListener('click', () => {
    document.getElementById('nav').style.display = 'none'
    document.getElementById('menu-icon').style.display = 'block'
    document.getElementById('header').style.background = 'transparent'
    document.getElementById('author').style.display = 'none'
})