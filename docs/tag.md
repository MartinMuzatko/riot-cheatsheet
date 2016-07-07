# Tag

## Lifecycle events

### before-mount

Before the tag is mounted

```js
this.on('before-mount', () => {
})
```

### mount


After all expressions are evaluated on mount

```js
this.on('mount', () => {
})
```

### update

Allows recalculation of data before updating

```js
this.on('update', () => {
})
```

### updated

After updates

```js
this.on('updated', () => {
})
```

### before-unmount

Before the tag is removed

```js
this.on('before-unmount', () => {
})
```

### unmount

After the tag is removed

```js
this.on('unmount', () => {
})
```

### all events

Listen to all events
You can fetch the event name if desired

```js
this.on('*', (eventName) => {
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
