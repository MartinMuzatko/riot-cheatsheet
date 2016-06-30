# Tag

## Lifecycle events

### before-mount

```js
this.on('before-mount', () => {
    // Before the tag is mounted
})
```

### mount


```js
this.on('mount', () => {
    // After all expressions are evaluated on mount
})
```

### update

```js
this.on('update', () => {
    // Allows recalculation of data before updating
})
```

### updated

```js
this.on('updated', () => {
    // After updates
})
```

### before-unmount

```js
this.on('before-unmount', () => {
    // Before the tag is removed
})
```

### before-unmount

```js
this.on('unmount', () => {
    // After the tag is removed
})
```

### all events

```js
this.on('*', (eventType) => {
    console.log(eventType)
})
```

## Tag Methods & Properties

### on, one, off, trigger

A riot tag already implements a `riot.observable`
See [observable](#observable)

### Update

Shortcut for [trigger](#trigger) `this.trigger('update')`

```js
this.update()
```

### isMounted

Attribute to tell whether or not the tag is mounted

```js
this.isMounted
```

### root

Points to it's own tag element

```js
this.root // reference to riot tag
```

### opts

Options passed via HTML or on mount, See [options](#options)

### mixin

See [Mixins](#mixins)


### tags

See [Child tags](#child-tags)

### parent

Access the parent tag, if there is one

```js
this.parent // <Tag>
```
