# Router

The router takes care of the history `pushState`

Depending on route, you can mount different tags, update data and so on.

## Minimal setup

### Setup

The function works with any amount of parameters

**Recommendation:** Put your routing setup within `this.on('mount', () => {})` in your main tag, that controls everything (e.g. `app.html`)

```js
riot.route((collection, action, id) => {
    //.. react upon path
})
```

### Go to Route

This will call the route method defined above
Where `customer` is `collection`, `edit` is `action` and `289` is `id`

```js
riot.route('customer/edit/289')
```

### Start listening

This starts the router, and examines the hash that is already in place
**Notice:** This feature is supported in **Riot 2.3** or later

```js
riot.route.start(true)
```

In earlier versions of riot, this was done with

```js
riot.route.start()
riot.route.exec()
```

You can also separately set them up, if you like to

## Advanced setup

In the advanced setup, you can set up a function per route call and you are more flexible with wildcard support

**Notice:** These features are only supported on **Riot 2.3** or later

### Route without wildcard

```js
riot.route('/index', () => {})
```

### Route with wildcard

Regex for wildcards:
* - `([^/?#]+?)`
.. - `.*`

This route will catch everything that is a subroute of `blog`

```js
riot.route('/blog/*', (entry) => {})
```

You can setup more distinct variables, other than splitting `/`

```js
riot.route('/blog/*-*/*', (month, year, entry) => {
    // route might look like /blog/06-2012/give-me-lasagna
})
```

Everything after a keyword

```js
riot.route('/old..', () => {
    // Sorry, this page has been removed
})
```
