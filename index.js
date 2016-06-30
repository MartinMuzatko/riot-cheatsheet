import riot from 'riot'
import 'zenscroll'
import Waypoint from './node_modules/waypoints/lib/noframework.waypoints.js'
import './less/main.less'
import './js/tags/app.html'
import './js/tags/markdown.html'
import './js/tags/highlight.html'

document.body.innerHTML = '<app></app>'
riot.mount('*')
