var React=require('react');

var getChildrenArray=function(context){
	var children=[];
	React.Children.forEach(context.props.children,function(child){
		children.push(child);
	});
	return children;
};



var Tabs=React.createClass({
	propTypes:{
		defaultTabIndex:React.PropTypes.number
	},
	getDefaultProps:function(){
		return {
			defaultTabIndex:0
		}
	},
	getInitialState:function(){
		return {activeTabIndex:this.props.defaultTabIndex};
	},
	render:function(){
		var children=getChildrenArray(this);
		var activeTabContent=children[this.state.activeTabIndex];
	
		return <div>{activeTabContent}</div>


	}

});


module.exports=Tabs;