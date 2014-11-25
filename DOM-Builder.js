// http://jsbin.com/DOMBuilder/2/edit
(function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else {
		// Browser globals
		root.DOM = factory();
	}
})(this, function() {
	'use strict';
	var DOM = {
		buildNode: function buildNode(nodeData) {
			// create text node
			if (typeof nodeData === 'string')
				return document.createTextNode(nodeData);

			// nodeData is already a DOM node
			if (nodeData.appendChild) return nodeData;

			// create element
			var el = document.createElement(nodeData.el || 'div');

			for (var attr in nodeData) {
				if (['el', 'kid', 'kids'].indexOf(attr) === -1) {
					// set JS properties
					if (attr[0] === '_') el[attr.slice(1)] = nodeData[attr];

					// add event listeners
					else if (attr.slice(0, 3) === 'on_') {
						var eventName = attr.slice(3);
						var handlers = nodeData[attr];
						if (typeof handlers === 'function') handlers = [handlers];
						for (var i = 0; i < handlers.length; i++) el.addEventListener(eventName, handlers[i], false);
					}

					// add html attributes
					else el.setAttribute(attr, nodeData[attr]);
				}
			}

			// add child nodes
			if (nodeData.kid) el.appendChild(buildNode(nodeData.kid));
			else if (nodeData.kids) el.appendChild(DOM.buildDocFrag(nodeData.kids));

			return el;
		},

		buildDocFrag: function buildDocFrag(arr) {
			var docFrag = document.createDocumentFragment();

			// build each node and stick in docFrag
			arr.forEach(function appendEach(nodeData) {
				docFrag.appendChild(DOM.buildNode(nodeData));
			});

			return docFrag;
		}
	};
	return DOM;
});