var React=require('react');

var getChildrenArray=function(context){
	var children=[];
	React.Children.forEach(context.props.children,function(child){
		children.push(child);
	});
	return children;
};

var noop=function(){};

var Tabs=React.createClass({
	propTypes:{
		defaultTabIndex:React.PropTypes.number,
		tabNames:React.PropTypes.array.isRequired,
		willChange:React.PropTypes.func,
		didChange:React.PropTypes.func
	},
	getDefaultProps:function(){
		return {
			defaultTabIndex:0,
			willChange:noop,
			didChange:noop
		}
	},
	getInitialState:function(){
		return {activeTabIndex:this.props.defaultTabIndex};
	},
	_change:function(e){
		var oldActiveTabIndex=this.state.activeTabIndex;
		var newActiveTabIndex=parseInt(e.target.getAttribute('data-tabindex'));

		this.props.willChange(newActiveTabIndex,oldActiveTabIndex);

		this.setState({activeTabIndex:newActiveTabIndex},function(){
			this.props.didChange(newActiveTabIndex,oldActiveTabIndex);
		}.bind(this));
	},
	render:function(){
		var children=getChildrenArray(this);
		var activeTabContent=children[this.state.activeTabIndex];
	
		var tabs=this.props.tabNames.map(function(tabName,tabIndex){
			return (
				<span 
					key={'tab-'+tabIndex}
					data-tabindex={tabIndex}
					onClick={this._change}
				>
					{tabName}
				</span>

					);
		}.bind(this));

		return (
			<div>
			<nav>{tabs}</nav>
			{activeTabContent}
			</div>

		);
	}

});


module.exports=Tabs;