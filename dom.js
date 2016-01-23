// https://github.com/Daniel-Hug/DOM-Builder
(function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// anonymous AMD module
		define(factory);
	} else {
		// Browser globals
		root.dom = factory();
	}
})(this, function() {
	'use strict';

	function bindSet(val, setter) {
		// if val is function it's snoopable so the setter should be passed to it.
		if (typeof val === 'function') {
			val(setter);
		} else {
			setter(val);
		}
	}
	
	function createDocFrag(array) {
		// build each node and stick in docFrag
		var docFrag = document.createDocumentFragment();
		array.forEach(function(nodeData, i) {
			docFrag.appendChild(dom(nodeData));
		});

		return docFrag;
	}


	// snoopable fn should:
	//  - accept a callback
	//  - call it right away passing a node value
	//  - call it again whenever the node value should change
	function createDataBoundNode(fn) {
		var node;
		fn(function(newVal) {
			//if (node instanceof HTMLElement && newVal.el === node.tagName) {
				// take props from newVal and stick on node
			//}
			var newNode = dom(newVal);
			if (node) node.parentNode.replaceChild(newNode, node);
			node = newNode;
		});
		return node;
	}
	
	function createEl(elData) {
		var el = elData.el instanceof HTMLElement ? elData.el :
			document.createElement(elData.el || 'div');

		Object.keys(elData).forEach(function(key) {
			if (['el', 'text', 'kids'].indexOf(key) === -1) {
				// set JS properties
				if (key[0] === '_') {
					var prop = key.slice(1);
					bindSet(elData[key], function(newVal) {
						el[prop] = newVal;
					});
				}

				// add event listener(s)
				else if (key.slice(0, 3) === 'on_') {
					var eventName = key.slice(3);
					var handlers = elData[key];

					// accept a function
					if (typeof handlers === 'function') handlers = [handlers];

					// or an array of functions
					for (var i = 0; i < handlers.length; i++) {
						el.addEventListener(eventName, handlers[i], false);
					}
				}

				// class toggle
				else if (key.slice(0, 6) === 'class_') {
					var className = key.slice(6);
					bindSet(elData[key], function(classEnabled) {
						el.classList[classEnabled ? 'add' : 'remove'](className);
					});
				}

				// add html attributes
				else {
					bindSet(elData[key], function(newVal) {
						if (newVal == null) {
							el.removeAttribute(key);
						} else {
							el.setAttribute(key, newVal);
						}
					});
				}
			}
		});

		// set text
		if (elData.text) {
			bindSet(elData.text, function(newVal) {
				el.textContent = newVal;
			});
		}

		// otherwise add child nodes
		else if (elData.kids) el.appendChild(createDocFrag(elData.kids));

		return el;
	}

	return function dom(nodeData) {
		var type = typeof nodeData;

		// string -> text node
		return type === 'string' || type === 'number' ?
			document.createTextNode(nodeData) :

		// DOM node -> DOM node
		nodeData instanceof Node ? nodeData :

		// array -> document fragment
		Array.isArray(nodeData) ? createDocFrag(nodeData) :

		// function -> data bound DOM node
		type === 'function' ? createDataBoundNode(nodeData) :

		// object -> element
		createEl(nodeData);
	};
});