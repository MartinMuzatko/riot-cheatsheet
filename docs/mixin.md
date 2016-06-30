# Mixins

## Mixin anatomy

A mixin can be a `function`, `object` or `class`
Mixins have, after initializing them, access to your tag

```js
var authService = {
    init: () => {
        // Called upon initializing the mixin
    },
    login: (user, pass) => {//...}
}
```

## Initializing

### Inline Usage

For global objects or dynamic mixins within the tag

```js
this.mixin(authService)
```

### Shared Mixin

Share your mixin across tags

```js
// In global scope
riot.mixin('auth-service', authService)
// In your tag
this.mixin('auth-service')
```

### Global Mixin

Add mixin to every mounted tag

```js
// In global scope BEFORE mounting
riot.mixin(authService)
```
