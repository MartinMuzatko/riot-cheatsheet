3.0.0
# Templating

## Anatomy

Everything is a component, Riot refers to them as tags
Tags have to be [mounted](#riot-mount)

```html
<example>
    <b>Markup</b>
    <script>
        // Script
    </script>
</example>
```

## Expressions

### Pure JavaScript

Expressions `{}` can contain any javascript except curly brackets (object literals)

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
        age: 26
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

### Context

Loops have their own context. Instead of `item.key`, you could obtain the property just with `key`. Because of this, methods and properties of the tag instance itself, have to be accessed with for example `parent.removeItem`

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

To access your elements, use the `ref` attribute. References can then be accessed with `this.refs`

```html
<input ref="todo">
<script>
    this.refs.todo.value = 'write todolist'
</script>
```

### Child tags

These are also accessed via the `refs`

```html
<todo-item ref="first"></todo-item>
<script>
    this.tags.first
</script>  
```

If there are more instances, you get an array of tags

```html
<todo-item></todo-item>
<todo-item></todo-item>
<todo-item ref="last"></todo-item>
<script>
    this.tags['todo-item'] // Array<Tag> - 2
    this.tags.last // <Tag> - 1
</script>  
```

## Options

Options can be passed via html params or on mount

Options only accept `boolean`, `number`, `string` or simple `array`, when passing values directly

### Passing values directly per HTML

```html
<todo-item name="Finish Cheatsheet" done={false}>
</todo-item>
<script>
    // Script of todo-item
    this.opts.name // 'Finish Cheatsheet'
    this.opts.done // false
</script>  
```

### Passing variables per HTML

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
See [mount](#riot-mount)

```js
var items = [
    {name: 'Share', done: true},
    {name: 'Star', done: true},
    {name: 'Work', done: false},
]
riot.mount('todo-list', items)
```

## Yield

Yielding is like [options](#templating-options), just that it accepts HTML and other riot tags

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
