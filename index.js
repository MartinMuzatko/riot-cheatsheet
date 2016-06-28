import riot from 'riot'
import html from './README.md'
import './less/main.less'
import './js/tags/app.html'
import './js/tags/cheatsheet.html'

document.body.innerHTML = `<app>${html}</app>`
riot.mount('*')
