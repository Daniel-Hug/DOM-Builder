var DOM = {
	buildNode: function buildNode(nodeData) {

		// text node
		if (typeof nodeData === 'string')
			return document.createTextNode(nodeData);

		// element
		var el = document.createElement(nodeData.el);
		
		// attributes
		for (var attrName in nodeData.attrs) {
			if ({}.hasOwnProperty.call(nodeData.attrs, attrName))
				el.setAttribute(attrName, nodeData.attrs[attrName]);
		}

		// child nodes
		if (nodeData.kids) el.appendChild(DOM.buildDocFrag(nodeData.kids));

		return el;
	},

	buildDocFrag: function buildDocFrag(arr) {
		var docFrag = document.createDocumentFragment();
		
		// build each node and stick in docFrag
		arr.forEach(function(nodeData) {
			docFrag.appendChild(DOM.buildNode(nodeData));
		});

		return docFrag;
	}
};