# Observable

Great to create tag-based API
For use outside tags, see [](#riot-observable)

## Trigger

Trigger custom events similar `update`

### Simple trigger

```js
this.trigger('selected', items)
```

### Trigger with data

```js
this.trigger('selected', items)
```

## Listening to triggers

From inside the tag or parent/child tag
You can use them for [lifecycle events](#tag-lifecycle-events) too.

### Always listen

```js
this.on('selected', (items) => {
    // Do something with the selected items
})
```

### Listen once

```js
this.one('selected', (items) => {
    // Do something with the selected items
})
```

### Stop listening

```js
this.off('selected')
```
