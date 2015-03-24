# react-tabs-component #

Tabs component for React with the simplest API

This JSX:

```js
var Tabs=require('react-tabs-component');
<Tabs
	defaultTabNum={1}
	tabNames={['Tab A','Tab B','Tab C']}
	classPrefix='tabs-'
>
	<section>Tab A Content</section>
	<section>Tab B Content</section>
	<section>Tab C Content</section>
</Tabs>
```

renders this HTML:

```html
<div>
	<nav class="tabs-tab-container">
		<span class="tabs-tab" data-tabnum="0">Tab A</span>
		<span class="tabs-tab tabs-active-tab" data-tabnum="1">Tab B</span>
		<span class="tabs-tab" data-tabnum="2">Tab C</span>
	</nav>
	<section>Tab B Content</section>
</div>
```

In the example above, only the content for Tab B displays, since Tab B is the active tab.

## Installation ##

Use the Common JS Module with [Node](https://nodejs.org/) and either [Browserify](http://browserify.org/) or [WebPack](http://webpack.github.io/). 

1. Install on the command line

`npm install react-tabs-component --save`

2. Require it at the top of a JavaScript file

`require('react-tabs-component')`

## Testing ##

`npm test`

## API ##

### Required Prop ###

- `tabNames`—array of strings or components that will display in each tab.

### Children ###

- Each child of the Tabs component will be treated as a content area corresponding to a member of the array passed to `TabNames`. For example, if the first tab is active, then the first child of the Tabs component will render.

### Style-related Props ###

- `classPrefix`—a string to add to the beginning of each CSS class used internally by the Tabs component. The default is the empty string (`''`), so if this prop isn't specified, then class names will be used as in the example below:

JSX:

```js
var Tabs=require('react-tabs-component');
<Tabs
	defaultTabNum={1}
	tabNames={['Tab A','Tab B','Tab C']}
>
	<section>Tab A Content</section>
	<section>Tab B Content</section>
	<section>Tab C Content</section>
</Tabs>
```

HTML:

```html
<div>
	<nav class="tab-container">
		<span class="tab" data-tabnum="0">Tab A</span>
		<span class="tab active-tab" data-tabnum="1">Tab B</span>
		<span class="tab" data-tabnum="2">Tab C</span>
	</nav>
	<section>Tab B Content</section>
</div>
```

### Callback Props ###

- `willChange`—fires before the tab changes. Return `false` from `willChange` to prevent the active tab from changing.
- `didChange`—fires after the tab changes.

In the example below, clicking `Tab C` will produce the following results:

1. 'will change tabs from 1 to 2' is logged to the console
2. The active tab changes from Tab B to to tab C. `Tab B Content` un-renders and `Tab C Content` is rendered.
3. 'changed tabs from 1 to 2' is logged to the console

JSX:

```js

var willChange=function(newTabNum,oldTabNum){
	console.log('will change tabs from '+newTabNum+' to '+oldTabNum);
};

var didChange=function(newTabNum,oldTabNum){
	console.log('changed tabs from '+newTabNum+' to '+oldTabNum);
};

<Tabs
	defaultTabNum={1}
	tabNames={['Tab A','Tab B','Tab C']}
	classPrefix='tabs-'
>
	<section>Tab A Content</section>
	<section>Tab B Content</section>
	<section>Tab C Content</section>
</Tabs>
```
