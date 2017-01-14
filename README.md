# changes in this fork
the attributes in the dom are renamed:
 - tag - t
 - attrs - a
 - children - c
 - events - e


*The development of this library has stopped because of personal reasons. Please only use it for uncritical experiments. If you are interested to take ownership of it, you can send me an email to citojsweb@gmail.com.*

# cito.js

cito.js is a JavaScript framework for building fast, scalable and modularized web applications. The core consists of a virtual DOM library inspired by React/Mithril. On top of that, it will provide a component framework which will make it easy to build well-encapsulated components.

## Motivation

You might be wondering why I am trying to build another fancy web framework. Although there has been a lot of change in this area recently, the situation is still not satisfying: Some frameworks look very developer-friendly at first glance, but do not scale well. Others perform and scale rather well, but for example require mingling templates with JavaScript code.

It seems to me that all of the concepts needed to build the next great web framework are already out there, but have just not been combined correctly. The challenge is to choose and combine existing concepts without having to forgo any of their benefits - and that is what this project is all about!

## Priorities

**Performance:** At the time of writing, `cito.vdom` is already one of the fastest virtual DOM library according to the [vdom-benchmark](http://vdom-benchmark.github.io/vdom-benchmark/) - and this will not change!

**Scalability:** Performance without scalability is delusive. This is why there are several features in the pipeline, which will guarantee great performance even with tens of thousands of DOM nodes.

**Developer-friendliness:** While the [`cito.vdom` API](#citovdom-api) is kept simple, it still requires some extra work compared to traditional templates. This is unnecessary and this is where the (not yet revealed) component framework will step in.

**Encapsulation:** The component framework will encourage encapsulating all your components which makes your project easier to comprehend, better testable and more scalable.

**Compatibility:** IE8 is supported and as long as there is no large disadvantage, I will make sure that even in IE6 all tests pass.

## Documentation

Please note that everything in this documentation is subject to change until the first version is released.

### Example Application

Let's start with a simple example application which has a button and a list and whenever you click the button, it doubles the list items.

First, we initialize an array with one list item [node](#element-node):

```javascript
var items = [
    {t: 'li', c: 'text'}
];
```

Then we define a root function which returns a div container with a button and a list with the previously defined items.

```javascript
function root() {
    return {
        t: 'div', c: [
            {t: 'button', c: 'double'},
            {t: 'ul', c: items}
        ]
    };
}
```

In order to render this root function, we can either use the [`cito.vdom.append`](#citovdom-api) or [`cito.vdom.create`](#citovdom-api) function. We choose the `append` function which does not only create the DOM nodes, but also immediately appends them to a parent node:

```javascript
var rootNode = cito.vdom.append(document.body, root);
```

Next, we want the list to double when you click the button. For that, we have to add a `click` [event handler](#events) which modifies the `items` variable and updates the DOM:

```javascript
function doubleList() {
    items = items.concat(items);
    cito.vdom.update(rootNode, root);
}

function root() {
    return {
        t: 'div', c: [
            {t: 'button', c: 'double', e: {click: doubleList},
            {t: 'ul', c: items}
        ]
    };
}
```

Last but not least, we move the button into its own button function and add a tooltip. Here the complete source code:

```javascript
var items = [
    {t: 'li', c: 'text'}
];

function doubleList() {
    items = items.concat(items);
    cito.vdom.update(rootNode, root);
}

function button() {
    return {
        t: 'button',
        a: {title: 'double the list'},
        e: {click: doubleList},
        c: 'double'
    }
}

function root() {
    return {
        t: 'div', c: [
            button,
            {t: 'ul', c: items}
        ]
    };
}

var rootNode = cito.vdom.append(document.body, root);
```

#### cito.vdom API

The `cito.vdom` API provides all necessary functions to create, update and remove virtual DOM nodes to/from the real DOM.

**cito.vdom.create(node)** and **cito.vdom.append(domParent, node):**
Creates a DOM node for the given virtual node. The virtual node can be of the [node types](#nodes), a [callback function](#partial-updates) or a [promise](#promises).
In case of `append` the DOM node is appended at the end of the given DOM parent element. The created DOM node can be accessed through ```.dom``` on the returned normalized node.

**update(oldNode, node)**: Updates the DOM of the previously created `oldNode` to the state of the given `node`. The rules which are described above for create/append apply here for the new `node` as well.

**updateChildren(element, children)**: Updates the DOM child nodes of `element` to the state of of the given `node`. The `children` argument can either be a node or an array of nodes.

**remove(node)**: Removes a previously created node from the DOM.

#### Nodes

cito.js supports five different virtual node types which are eventually all translated to one, none or multiple regular DOM nodes.

##### Element Node

The element node is the most basic node type. Examples:

```javascript
// Empty element with attributes
{t: 'img', a: {src: 'http://...', alt: 'Image ...'}}

// Element with one child
{t: 'ul', c: [{t: 'li', ...}]}
// or without array
{t: 'ul', c: {t: 'li', ...}}

// Element with multiple children
{t: 'ul', c: [
    {t: 'li', ...},
    {t: 'li', ...}
]}

// Element with text content
{t: 'span', c: 'Text ...'}
```

###### Attributes

Element attributes can be set with the `attrs` property. The attribute name is always the same as in HTML. If you provide a boolean for the attribute value, the attribute will be added with an empty string if it is `true` and removed otherwise.

```javascript
// Element with an id and class
{t: 'input', a: {id: 'name-field', 'class': 'important-field'}}

// Input element which is required
{t: 'input', a: {required: true}}
```

###### Inline Style

To style an element, you can either use a CSS string or an object with CSS properties. The object will update only changed properties while the string will simply overwrite the style attribute. The style property name is in both cases the same name as you would use for inline styles.

```javascript
// Element with style string
{t: 'input', a: {style: 'border-bottom: 1px solid black; color: gray;'}}

// Element with style object
{t: 'input', a: {style: {'border-bottom': '1px solid black', color: 'gray'}}}
```

###### Input Elements

While most attributes update DOM element attributes, the attributes `value`, `checked`, `selected` and `selectedIndex` are compared with and update DOM element properties instead. This is because these properties can be influenced by the user directly through browser input fields. If they were only compared with the previous attribute values, the current attribute values would not be enforced.

Moreover, there are a few other noteworthy exceptions:

The content of `textarea` elements must be provided with the `value` attribute instead of the `children` property:

```javascript
{t: 'textarea', a: {value: 'Text ...'}}
```

To define the current option of a `select` element you can either set the `value` or `selectedIndex` attribute or set the `selected` attribute of an `option` directly:

```javascript
// Select option by setting the value
{t: 'select', a: {value: 'val1'}, c: [
    {t: 'option', a: {value: 'val1'}, ...}
]}

// Select option by setting the selectedIndex
{t: 'select', a: {selectedIndex: 0}, c: [
    {t: 'option', a: {value: 'val1'}, ...}
]}

// Select option by setting selected on the option
{t: 'select', a: c: [
    {t: 'option', a: {selected: true}, ...}
]}
```

##### Text Node

Usually, you will use text nodes like this:

```javascript
// Span element with text node
{t: 'span', c: 'Text ...'}
// Span element with text node and b element
{t: 'span', c: [
    'Text ...',
    {t: 'b', c: '...'}
]}
```

But there is also a more advanced form for [keyed nodes](#keyed-nodes):

```javascript
// Text node as object with optional key
{t: '#', key: '1', c: 'text'}
```

The `#` tag name comes from `#text` which is the DOM name of a text node.

##### Comment Node

```javascript
{t: '!', c: 'Comment ...'}
```

The `!` tag name comes from `<!--`.

##### HTML Node

HTML nodes allows you to insert pieces of HTML into the DOM. They should only be used if the other node types are not an option, for example if the HTML string comes from another system, since they are inherently vulnerable to XSS attacks:

```javascript
{t: '<', c: '<div>text</div><div>...'}
```

The `<` tag name comes from `<element>`.

##### Fragments

Fragments are a less common but very powerful feature in virtual DOM libraries. Similar to DOM document fragments, they do not add a node to the DOM themselves and can either be empty or contain one or a list of nodes. Some examples:

Empty: `{}` or `{c: []}`
One child:  `{c: {t: 'div', ...}}`
Multiple children:

```javascript
{c: [
    {t: 'div', ...},
    {t: 'div', ...}
]}
```

Although you could avoid fragments, they often make your program simpler and improve the performance. Let's have a look at the following example:

```javascript
{t: 'ul', c: list1.concat(list2)}
```

If this node is updated and the last item of the first list has been removed, it will have to re-render all the elements of the second list. Instead of using [keyed nodes](#keyed-nodes) to solve this problem, we can now simply use fragments:

```javascript
{t: 'ul', c: [
    {c: list1},
    {c: list2}
]}
```

Now, if the last element is removed from the first list, this will not affect the re-rendering of the second list at all because it will compare the two versions of the first and second list separately.

Fragments are used internally for unresolved [promises](#promises) and will play an integral part in the component framework too.

#### Events

Event handlers can be added to element nodes like this:

```javascript
// Element with one event listener
{t: 'button', e: {
    click: function (event) {
        ...
    }
}}

// Element with multiple event listener of the same type
{t: 'button', e: {
    click: [
        function (event) {},
        function (event) {}
    ]
}}

// Element with multiple event listener of different types
{t: 'button', e: {
    click: function (event) {},
    mousemove: function (event) {},
}}
```

If the event handler returns `false`, then the default will be prevented (but in contrast to jQuery it does not stop the propagation).

To remove an event handler, just update the node without the event handler which has to be removed.

##### Event Normalization

The following properties/functions are added to event objects in IE8 and below:

 * preventDefault
 * stopPropagation
 * defaultPrevented
 * target
 * currentTarget

#### Partial Updates

The idea behind virtual DOM libraries is that DOM operations are expensive and that it is much cheaper to generate a JSON representation of the DOM which is then used to update only the differences in the real DOM. However, sometimes the computation and diffing of the virtual DOM is expensive too - especially if you work with big data structures. In that case, you can use partial update callbacks:

```javascript
cito.vdom.append(document.body, {
    t: 'div',
    c: function (oldChildren) {
        if (!oldChildren) { // oldChildren is undefined when the node is created
            return createExpensiveChildren();
        }
        // If nothing is returned, it does not touch the current DOM
    }
});
```

The callback is always called when the DOM needs to be rendered, but `oldChildren` is only defined if the node was added to the DOM in a previous cycle. If nothing/`undefined` or `oldChildren` is returned, it will keep this subtree of the DOM as it is.

#### Keyed Nodes

Similar to other virtual DOM libraries, cito.js supports keyed nodes:

```javascript
var node = cito.vdom.append(document.body, {
    t: 'ul',
    c: [
        {t: 'li', key: 0, c: 'item 0'},
        {t: 'li', key: 1, c: 'item 1'}
    ]
});

cito.vdom.update(node, {
    t: 'ul',
    c: [
        {t: 'li', key: 1, c: 'item 1'},
        {t: 'li', key: 0, c: 'item 0'}
    ]
});
```

Keyed nodes ensure that only the elements which were really changed are updated even if elements were added/removed before or moved to another position. While common operations like appending and prepending nodes are optimized, it is also very fast at updating random changes like sorting or filtering.

If you only want to add/remove a node conditionally without having overhead you can use [fragments](#fragments) instead of keyed nodes.

#### Promises

*The promise support is disabled at the moment and will soon be moved to a utility.*

Since promises are becoming more and more popular in browsers, cito.js has built-in support for them:

```javascript
{t:'ul', c: listPromise.then(function (list) {
    return list.map(function (item) {
        return {t: 'li', c: item.text};
    };
})}
```

Promises can also be used for single nodes:

```javascript
{t:'ul', c: [
    {t: 'h1', c: 'Title'},
    textPromise.then(function (text) {
        return text;
    })
]}
```

#### Custom Elements, SVG and MathML

Custom Elements, SVG and MathML are supported out of the box and you don't have to do anything special to use them.

## How to Contribute

I am very interested in your thoughts! If you have any ideas you would like to share with me or if you are even considering working on this project, please do not hesitate to drop me an email at <citojsweb@gmail.com>.

## License

This project is licensed under the [Mozilla Public License version 2.0](https://www.mozilla.org/MPL/2.0/).
