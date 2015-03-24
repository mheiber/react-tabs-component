
jest.dontMock('../Tabs');
var Tabs=require('../Tabs');

var React=require('react/addons');
var TestUtils=React.addons.TestUtils;
var Simulate=React.addons.TestUtils.Simulate;


var getTabs=function(){
	return TestUtils.renderIntoDocument(
		<Tabs
			defaultTabNum={1}
			tabNames={['Tab A','Tab B','Tab C']}
			classPrefix='tabs-'
		>
			<section>Tab A Content</section>
			<section>Tab B Content</section>
			<section>Tab C Content</section>
		</Tabs>
	);
};


describe('Tabs',function(){

	it('Displays only the first tab\'s content if no defaultTabNum is provided',function(){

		var main=TestUtils.renderIntoDocument(

			<Tabs
				tabNames={['Tab A','Tab B','Tab C']}
			>
				<section>Tab A Content</section>
				<section>Tab B Content</section>
				<section>Tab C Content</section>
			</Tabs>

		);
		var section=TestUtils.findRenderedDOMComponentWithTag(main,'section');
		expect(section.getDOMNode().textContent).toEqual('Tab A Content');


	});

	it('Displays only the default tab\'s content if defaultTabNum is provided',function(){

		var main=getTabs();
		var section=TestUtils.findRenderedDOMComponentWithTag(main,'section');
		expect(section.getDOMNode().textContent).toEqual('Tab B Content');


	});

	it('Creates and displays a tab for each tabName passed in',function(){
		var main=getTabs();
		var tabs=TestUtils.scryRenderedDOMComponentsWithTag(main,'span');
		expect(tabs.length).toEqual(3);

	});

	it("All tabs have className this.props.classPrefix+'tab'",function(){

		var main=getTabs(); //passes prop classPrefix={'tabs-'}
		var tabs=TestUtils.scryRenderedDOMComponentsWithTag(main,'span');
		
		tabs.forEach(function(tab){
			var tabNode=tab.getDOMNode();
			expect(tabNode.className).toContain('tabs-tab');

		});
		
	});
	
	it("Active tab has className this.props.classPrefix+'active-tab'",function(){

		var main=getTabs(); //passes prop classPrefix={'tabs-'}

		var tabs=TestUtils.scryRenderedDOMComponentsWithTag(main,'span');
		
		var tabB=TestUtils.scryRenderedDOMComponentsWithTag(main,'span')[1];

		tabBNode=tabB.getDOMNode();
		expect(tabBNode.className).toContain('tabs-active-tab');
	});

	it("Tab container has className this.props.classPrefix+'tab-container'",function(){

		var main=getTabs(); //passes prop classPrefix={'tabs-'}

		var tabContainer=TestUtils.findRenderedDOMComponentWithTag(main,'nav');
		var tabContainerNode=tabContainer.getDOMNode();
		expect(tabContainerNode.className).toContain('tabs-tab-container');

	});

	it('Clicking a tab switches to the content for that tab',function(){
		var main=getTabs();
		var tabC=TestUtils.scryRenderedDOMComponentsWithTag(main,'span')[2];
		Simulate.click(tabC);
		var section=TestUtils.findRenderedDOMComponentWithTag(main,'section');
		expect(section.getDOMNode().textContent).toEqual('Tab C Content');		
	});

	it('Fires willChange and didChange callbacks when changing tabs',function(){

		var willChange=jest.genMockFunction();
		var didChange=jest.genMockFunction();

		var main=TestUtils.renderIntoDocument(
			<Tabs
				defaultTabNum={1}
				tabNames={['Tab A','Tab B','Tab C']}
				willChange={willChange}
				didChange={didChange}
			>
				<section>Tab A Content</section>
				<section>Tab B Content</section>
				<section>Tab C Content</section>
			</Tabs>
		);
		var tabC=TestUtils.scryRenderedDOMComponentsWithTag(main,'span')[2];
		Simulate.click(tabC);
		//var section=TestUtils.findRenderedDOMComponentWithTag(main,'section');
		//expect(section.getDOMNode().textContent).toEqual('Tab C Content');	
		expect(willChange).toBeCalledWith(2,1);
		expect(didChange).toBeCalledWith(2,1);
	});

	it('Fires willChange and didChange callbacks even when clicking the active tab',function(){
		var willChange=jest.genMockFunction();
		var didChange=jest.genMockFunction();

		var main=TestUtils.renderIntoDocument(
			<Tabs
				defaultTabNum={1}
				tabNames={['Tab A','Tab B','Tab C']}
				willChange={willChange}
				didChange={didChange}
			>
				<section>Tab A Content</section>
				<section>Tab B Content</section>
				<section>Tab C Content</section>
			</Tabs>
		);
		var tabB=TestUtils.scryRenderedDOMComponentsWithTag(main,'span')[1];
		Simulate.click(tabB);
		//var section=TestUtils.findRenderedDOMComponentWithTag(main,'section');
		//expect(section.getDOMNode().textContent).toEqual('Tab C Content');	
		expect(willChange).toBeCalledWith(1,1);
		expect(didChange).toBeCalledWith(1,1);
	});

	it('Returning false from within willChange prevents tabs from changing',function(){
		var willChange=function(){
			return false;
		};
		var didChange=jest.genMockFunction();

		var main=TestUtils.renderIntoDocument(
			<Tabs
				defaultTabNum={1}
				tabNames={['Tab A','Tab B','Tab C']}
				willChange={willChange}
				didChange={didChange}
			>
				<section>Tab A Content</section>
				<section>Tab B Content</section>
				<section>Tab C Content</section>
			</Tabs>
		);
		var tabB=TestUtils.scryRenderedDOMComponentsWithTag(main,'span')[1];
		Simulate.click(tabB);
		//var section=TestUtils.findRenderedDOMComponentWithTag(main,'section');
		//expect(section.getDOMNode().textContent).toEqual('Tab C Content');	
		expect(didChange).not.toBeCalled();
	});


	it('Exposes `setActiveTabNum(num,callback)` and `getActiveTabNum()` public methods',function(){

		var main=getTabs();
		main.setActiveTabNum(2,function(){
			expect(main.getActiveTabNum()).toEqual(2);
		});

	});



});