DOM-Builder
===========

Dom Builder comes with two functions, `DOM.buildNode` which accepts a [node object](#user-content-node-objects) as its only argument, and `DOM.buildDocFrag` which accepts an array of node objects as its only argument.


## <a name="user-content-node-objects"></a>node objects
A **node object** can either be a DOM node; a string, in which case a `textNode` will be created; or an object like the following, which creates an element.

```js
var input = DOM.buildNode({
    el: 'input',
    type: 'text',
    placeholder: 'type something',
    _autofocus: true
});
var output = DOM.buildNode({ el: 'output' });

document.body.appendChild(DOM.buildDocFrag([
    {
        el: 'form',
        on_submit: function(event) {
            event.preventDefault();
            output.textContent = input.value ? ' Text: ' + input.value : '';
        },
        kids: [ input, { el: 'button', kid: 'Go' } ]
    },
    output
]));
```

### Node object properties

All are optional. If `el` is unspecified, the element type defaults to 'div'.

 - `el` (string): element type
 - `kids` (array of node objects): child nodes to append
 - `kid` (node object): single child node to append
 - `_className`, `_contenteditable`, etc. (string, boolean, etc.): JS properties to set on element
 - `on_input`, `on_click`, etc. (function or array of functions): event listener(s) to add