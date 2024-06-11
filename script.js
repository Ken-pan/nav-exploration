//mobile nav 相关功能
const overlay = document.createElement('div')
overlay.classList.add('overlay')
const menuwrapper = document.getElementById('menuwrapper')

function addMenuButtonListener() {
  const menuButton = document.getElementById('menuButton')
  const menu = document.getElementById('menu')

  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu)
  }

    overlay.addEventListener('click', toggleMenu)

  if (menu) {
    if (menu.classList.contains('menu-mobile')) {
      toggleMenu()
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 640 && menu.classList.contains('menu-mobile')) {
      toggleMenu()
    }
  })
}

// when load the page, add the listener to the menu button
window.addEventListener('load', addMenuButtonListener)

// function loadFile(filePath, elementId) {
//   return fetch(filePath) // 注意这里的 return 语句
//     .then(function (response) {
//       return response.text()
//     })
//     .then(function (html) {
//       document.getElementById(elementId).innerHTML = html
//     })
//     .catch(function (err) {
//       console.warn('Something went wrong.', err)
//     })
// }



function closeMenu() {
  const menu = document.getElementById('menu')
  const header = document.getElementById('header-inner')

  if (menu.classList.contains('menu-mobile')) {
    menu.classList.add('hidden')
    menu.classList.remove('menu-mobile')
    header.classList.remove('header-mobile')
    overlay.style.display = 'none'
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }
}



function toggleMenu() {
  const menuButton = document.getElementById('menuButton')
  const menu = document.getElementById('menu')
  const menuwrapper = document.getElementById('menuwrapper')
  const header = document.getElementById('header-inner')

  menu.classList.toggle('hidden')
  menu.classList.toggle('menu-mobile')
  header.classList.toggle('header-mobile')

  if (menu.classList.contains('menu-mobile')) {
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    overlay.style.display = 'block'

    // 添加点击事件监听器到每个菜单项
    document.querySelectorAll('.menu-item').forEach((item) => {
      // 修正了事件监听器的添加方式
      item.addEventListener('click', function (e) {
        e.preventDefault() // 正确地阻止默认行为

        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          const targetTop =
            targetElement.getBoundingClientRect().top + window.scrollY
          const headerHeight = header.offsetHeight

          // 平滑滚动到目标位置
          window.scrollTo({
            top: targetTop - headerHeight,
            behavior: 'smooth',
          })

          // 关闭移动菜单
          closeMenu()
        }
      })
    })
  } else {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    overlay.style.display = 'none'
  }
}

