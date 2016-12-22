DOM Builder
===========

Generate views from JS easy peasy with `dom()`. See demos:

 - [counter](http://jsbin.com/riyiwo/edit?js,output)
 - [search form](http://jsbin.com/qisopo/edit?js,output)

### Create or modify an element
**pass:** [node value](#node-values)  
**returns:** DOM node

```js
var checkbox = dom({
	// specify element name
	el: 'input',
	
	// set attributes
	type: 'checkbox',
	
	// set JS properties
	_checked: true
	
	// listen to events:
	on_change: function() {
	    console.log(this.checked);
	}
});
```


### Create multiple elements
**pass:** array of [node values](#node-values)  
**returns:** [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment)

```js
var docFrag = dom([
	{ el: 'li', text: 'Milk' },
	{ el: 'li', text: 'Butter' },
	{ el: 'li', text: 'Juice' }
]);
document.querySelector('.shopping-list').appendChild(docFrag);
```


### Modify existing elements
All the properties we are using in our plain object node values to render new elements can also be used to modify existing elements. This includes adding kids, event listeners, or classes; setting HTML attributes or an element's text; and setting JS properties.
Let's modify the above example to stick our list items in an existing list using DOM Builder:

```js
var shoppingList = dom({
	el: document.querySelector('.shopping-list'),
	kids: [
		{ el: 'li', text: 'Milk' },
		{ el: 'li', text: 'Butter' },
		{ el: 'li', text: 'Juice' }
	]
});
```


### Add child elements
Set the `kids` property to an array of [node values](#node-values)

```js
var label = dom({
	el: 'label',
	kids: [checkbox, 'Satisfied?']
});
document.body.appendChild(label);
```


### Get live DOM updates with [Snoopy](https://github.com/Daniel-Hug/snoopy)

1. include [Snoopy](https://github.com/Daniel-Hug/snoopy) before DOM builder

	```html
	<script src="path/to/snoopy.js"></script>
	```

2. stick data in a Snoopy instance

	```js
	var counter = Snoopy({count: 0});
	```

3. live-bind data with Snoopy's `counter.snoop()`

	```js
	var button = dom({
		el: 'button',
		text: counter.snoop('count'),
		on_click: function() {
			counter.set('count', counter.count + 1);
		}
	});
	```


### node values

Node values can be any of the following:
 - **plain object:** renders an element
 - **string or number:** renders a text node
 - **DOM node without parent:** renders the existing node
 - **array of node values:** renders a document fragment
 - **"snoopable" function ([Snoopy](#get-live-dom-updates-with-snoopy) makes this easy):**
   1. should accept a callback
   2. call it right away passing a node value
   3. call it again whenever the node value should change


### element properties
These are the properties available for plain object [node values](#node-values) for rendering elements. All are optional. If `el` is unspecified, the element type defaults to 'div'.

 - `el`
   - If value is a string, an element will be created with that tag name.
   - If value is a DOM node, the other properties in the object will modify that.
 - `kids` (array of [node values](#node-values)): child nodes to append
 - `text` (string): sets the text of the element
 - `_className`, `_innerHTML`, etc. (non-function values or a [snoopable function](#node-values)): JS properties to set on element
 - `on_input`, `on_click`, etc. (function or array of functions): event listener(s) to add
 - `class_active`, `class_flagged`, etc. (boolean or [snoopable function](#node-values)): specify whether the element should have an 'active' class, 'flagged' class etc.
