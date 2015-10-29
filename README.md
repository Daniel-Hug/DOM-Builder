DOM Builder
===========

Generate views from JS easy peasy with `dom()`

### Create an element
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


### Add child elements
Set the `kids` property to an array of [node values](#node-values)

```js
var label = dom({
	el: 'label',
	kids: [checkbox, 'Satisfied?']
});
document.body.appendChild(label);
```

### node values

Node values can be any of the following:
 - **object:** creates an element
 - **string:** creates a text node
 - **DOM node without parent:** uses the node


### properties
These are the properties available for object literal [node values](#node-values). All are optional. If `el` is unspecified, the element type defaults to 'div'.

 - `el` (string): element type
 - `kids` (array of [node values](#node-values)): child nodes to append
 - `text` (string): sets the text of the element
 - `_className`, `_innerHTML`, etc. (string, boolean, etc.): JS properties to set on element
 - `on_input`, `on_click`, etc. (function or array of functions): event listener(s) to add
