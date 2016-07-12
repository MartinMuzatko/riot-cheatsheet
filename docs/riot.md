# Riot

## mount

Mounting a tag will make it appear on your webpage/app
There are various ways to mount your tags

### All

This will mount all tags and their children tags

**Notice:** This will not mount dynamically loaded tags such as with a router

```js
riot.mount('*')
```

### Specific with options

When mounting a tag, you can pass options, accessible as `opts`

```html
<todo-list></todo-list>
<script>
    var items = [
        'fork',
        'star',
        'contribute'
    ]
    riot.mount('todo-list', items)
</script>
```

### Data attribute

**Notice:** This feature is supported in **Riot 2.3.17** or later
With a `data` attribute, you can mount a tag into an element

```html
<ul data-is="todo-list"></ul>
<script>
    // You can mount all or with data too here
    riot.mount('todo-list')
</script>
```


## observable

Turns a non-riot object/class into an observable, being capable of triggering and listening to events
This will add `trigger`, `on`, `one` and `off` to the provided object
See [Observable](#observable) for all methods

```js
class AuthService {
    constructor() {
        riot.observable(this)
    }
}
```
