# snoopy
Observable objects in JS

## example

```js
// setup observable data
var counter = new Snoopy({count: 0});

// counter.even subscribes to counter.count
counter.snoop('count', function(val) {
	counter.set('even', val % 2 === 0);
});

// log: "3 is odd." or "0 is even."
counter.snoop('even', function(even) {
	console.log(this.counter + ' is ' + (even ? 'even' : 'odd') + '.');
});
```

## constructor and method usage

### `Snoopy()`

Snoopy is a constructor but the `new` keyword is optional. Call it passing an optional object with some initial properties and values:

```js
var counter = new Snoopy({count: 0});
```

### `Snoopy.prototype.set(property, value)`

```js
var person = Snoopy();
person.set('name', 'Hank');
```

### `Snoopy.prototype.get(property)`

There are two ways to get the value of a property on a Snoopy instance:

1. `person.get('name');`
2. `person.name`

### `Snoopy.prototype.snoop(property, mapFn)`

**arguments**  

Here are the possible ways to call `.snoop()`:

```js
person.snoop('name')(function snooper(name) {
	console.log('name is now ' + name);
})
```

```js
person.snoop('name', function snooper(name) {
	console.log('name is now ' + name);
})
```

```js
person.snoop('firstName lastName', function map(firstName, lastName) {
	return firstName + ' ' + lastName;
})(function snooper(name) {
	console.log('name is now ' + name);
})
```

**return value**  
When `.snoop()` is called, it returns a "snoopable" function. The snoopable function accepts a callback, calls it right away passing the values of the properties being snooped, and calls it again whenever one of the values change.

## use with [DOM Builder](https://github.com/Daniel-Hug/DOM-Builder)

This Observable module was made with DOM Builder in mind and the two form a very powerful duo.