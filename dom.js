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
	return function dom(nodeData) {
		// string -> text node
		if (typeof nodeData === 'string')
			return document.createTextNode(nodeData);

		// DOM node -> DOM node
		if (nodeData instanceof Node) return nodeData;

		// array -> document fragment
		if (Array.isArray(nodeData)) {
			// build each node and stick in docFrag
			var docFrag = document.createDocumentFragment();
			nodeData.forEach(function(nodeData) {
				docFrag.appendChild(dom(nodeData));
			});

			return docFrag;
		}

		// object -> element
		var el = document.createElement(nodeData.el || 'div');

		for (var attr in nodeData) {
			if (['el', 'kid', 'kids'].indexOf(attr) === -1) {
				// set JS properties
				if (attr[0] === '_') el[attr.slice(1)] = nodeData[attr];

				// add event listeners
				else if (attr.slice(0, 3) === 'on_') {
					var eventName = attr.slice(3);
					var handlers = nodeData[attr];

					// accept a function
					if (typeof handlers === 'function') handlers = [handlers];

					// or an array of functions
					for (var i = 0; i < handlers.length; i++) el.addEventListener(eventName, handlers[i], false);
				}

				// add html attributes
				else el.setAttribute(attr, nodeData[attr]);
			}
		}

		// add child nodes
		if (nodeData.text) el.textContent = nodeData.text;
		else if (nodeData.kids) el.appendChild(dom(nodeData.kids));

		return el;
	};
});
