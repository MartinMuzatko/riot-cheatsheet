# Templating

## Expressions

### Pure Javscript

Can contain any javascript except curly brackets

```html
Random number: {Math.random() * 10}
&copy; <time datetime={new Date().getFullYear()}></time>
How long is a day in seconds? {60*60*24}
```

### Accessing tag properties

```html
My name is {author.name}
and I'm {author.age} {unit}s old
<script>
this.author = {
    name: 'Martin',
    age: 25
}
this.unit = 'year'
</script>
```

## Conditionals

### Shorthand ternary

```html
<div class={active: item.active}></div>
```

### Ternary

```html
<div class={item.active ?: 'active' : ''}></div>
```

### Blocklevel

Does not write HTML if condition is false

```html
<div if={shop.items.length}></div>
```

### Hide

Writes HTML, just sets `display` style to `none` if condition is true

```html
<nav hide={mobile}></nav>
```

### Show

Opposite of Hide `display`

```html
<nav show={mobile}></nav>
```

## Access elements and tags

### HTML Elements

You can also use `id` if you are not comfortable with `name`

```html
<input name="todo">
<script>
    this.todo.value = 'write todolist'
</script>
```

### Child tags

Access via `name` or `id`

```html
<todo-item name="first"></todo-item>
<script>
    this.tags.first
</script>  
```

If there are more instances, you get an array of tags

```html
<todo-item></todo-item>
<todo-item></todo-item>
<todo-item name="last"></todo-item>
<script>
    this.tags['todo-item'] // Array<Tag> - 2
    this.tags.last // <Tag> - 1
</script>  
```

## Options

Options can be passed via html params or on mount

Options only accept `boolean`, `number`, `string` or simple `array`, when passing directly

Options are

### Passing values per HTML

```html
<todo-item name="Finish Cheatsheet" done={false}>
</todo-item>
<script>
    // Script of todo-item
    this.opts.name // 'Finish Cheatsheet'
    this.opts.done // false
</script>  
```

### Passing vars per HTML

```html
<todo-item item={item}></todo-item>
<script>
    this.item = {
        name: 'Study riot',
        done: true
    }
</script>
```

### Passing values on Mount

On mount, we are more flexible, since we are in js

```js
var items = [
    {name: 'Share', done: true},
    {name: 'Star', done: true},
    {name: 'Work', done: false},
]
riot.mount('todo-list', items)
```

## Yield

Yielding is like [options](#options), just that it accepts HTML and other riot tags.

Definition
```html
<popup-body>
    <yield>
</popup-body>
```

Usage
```html
<popup-body>
    Hi! I'm supporting
    <abbr title="Hypertext Markup Language">HTML</abbr>
</popup-body>
```

### Multi Yieldpoints
