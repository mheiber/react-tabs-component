
jest.dontMock('../Tabs');
var Tabs=require('../Tabs');

var React=require('react/addons');
var TestUtils=React.addons.TestUtils;
var Simulate=React.addons.TestUtils.Simulate;


describe('Tabs',function(){

	var tabs=TestUtils.renderIntoDocument(

		<Tabs
			defaultTabIndex={1}
			tabNames={['Tab A','Tab B','Tab C']}
		>
			<section>Tab A Content</section>
			<section>Tab B Content</section>
			<section>Tab C Content</section>
		</Tabs>

	);


	it('Displays only the first tab if no defaultTabIndex is provided',function(){

		var tabs=TestUtils.renderIntoDocument(

			<Tabs
				tabNames={['Tab A','Tab B','Tab C']}
			>
				<section>Tab A Content</section>
				<section>Tab B Content</section>
				<section>Tab C Content</section>
			</Tabs>

		);
		var section=TestUtils.findRenderedDOMComponentWithTag(tabs,'section');
		expect(section.getDOMNode().textContent).toEqual('Tab A Content');


	});

	it('Displays only the default tab if defaultTabIndex is provided',function(){
		var tabs=TestUtils.renderIntoDocument(

			<Tabs
				defaultTabIndex={1}
				tabNames={['Tab A','Tab B','Tab C']}
			>
				<section>Tab A Content</section>
				<section>Tab B Content</section>
				<section>Tab C Content</section>
			</Tabs>

		);
		var section=TestUtils.findRenderedDOMComponentWithTag(tabs,'section');
		expect(section.getDOMNode().textContent).toEqual('Tab B Content');


	});
	it('Displays clicked',function(){
		Simulate.click(TestUtils.findRenderedDOMComponentWithTag(tabs,'div'))


	});

});