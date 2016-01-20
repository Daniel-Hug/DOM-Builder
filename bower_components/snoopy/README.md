# snoopy
Observable objects in JS

## usage

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

## use with [DOM Builder](https://github.com/Daniel-Hug/DOM-Builder)

This Observable module was made with DOM Builder in mind and the two form a very powerful duo.