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

	function createDocFrag(array) {
		// build each node and stick in docFrag
		var docFrag = document.createDocumentFragment();
		array.forEach(function(nodeData, i) {
			docFrag.appendChild(dom(nodeData));
		});

		return docFrag;
	}

	function createEl(elData) {
		var el = document.createElement(elData.el || 'div');

		Object.keys(elData).forEach(function(key) {
			if (['el', 'text', 'kids'].indexOf(key) === -1) {
				// set JS properties
				if (key[0] === '_') {
					el[key.slice(1)] = elData[key];
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

				// add html attributes
				else el.setAttribute(key, elData[key]);
			}
		});

		// set text
		if (elData.text) el.textContent = elData.text;

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

		// object -> element
		createEl(nodeData);
	};
});