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
