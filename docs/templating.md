# Templating

## Anatomy

Everything is a component, Riot refers to them as tags
Tags have to be [mounted](#mount)

```html
<example>
    <b>Markup</b>
    <script>
        // Script
    </script>
</example>
```

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
## Foreach - loop data

### Array

```html
<nav>
    <a href="#{doc}" each={doc in docs}>
        {doc}
    </a>
</nav>
<script>
    this.docs = [
        'templating',
        'tag',
        'mixin',
        'observable',
        'router'
    ]
</script>
```

You can access both index and value by providing a second argument

```html
<nav>
    <a href="#{doc}" each={doc, index in docs}>
        {index + 1} - {doc}
    </a>
</nav>
```

### Object

Used for more complex structures, where each item has a distinct key

Objects use different order of `key, value` in the each statement

```html
<card size={card.size} name={title}
      each={title, card in cards}>
</card>
<script>
    this.cards = {
        analytics : {
            size: 1,
            toolbar: ['reset']
        },
        posts: {
            size: 2,
            toolbar: ['add', 'list']
        }
    }
</script>
```

### Virtual

The virtual tag is used for loops that should generate no wrapper markup

```html
<dl>
    <virtual each={item in items}>
        <dt>{item.key}</dt>
        <dd>{item.value}</dd>
    </virtual>
</dl>
```

## Conditionals

### Shorthand ternary

```html
<div class={active: item.active}></div>
```

### Ternary

```html
<div class={item.active ? 'active' : ''}></div>
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

Yielding is like [options](#options), just that it accepts HTML and other riot tags

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

### Multiple Yieldpoints

**Notice:** This feature is supported in **Riot 2.3.12** or later

#### Usage

```html
<card>
    <yield to="toolbar">
        <a>Add post</a>
        <a>Recently published</a>
    </yield>
    <yield to="header">
        <i class="fa fa-text"></i> Posts
    </yield>
</card>
```

#### Definition

```html
<card>
    <h2>
        <yield from="header" />
    </h2>
    <div class="toolbar">
        <yield from="toolbar" />
    </div>
</card>
```
