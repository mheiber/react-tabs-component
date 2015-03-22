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
		didChange:React.PropTypes.func,
		classPrefix:React.PropTypes.string
	},
	getDefaultProps:function(){
		return {
			defaultTabIndex:0,
			willChange:noop,
			didChange:noop,
			classPrefix:''
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
		var classPrefix=this.props.classPrefix;
		var tabClassName=classPrefix+'tab';
		var activeTabClassName=tabClassName+' '+classPrefix+'active-tab';

		var tabs=this.props.tabNames.map(function(tabName,tabIndex){
			var isActive= tabIndex===this.state.activeTabIndex;
			return (
				<span 
					key={'tab-'+tabIndex}
					className={isActive? activeTabClassName : tabClassName }
					data-tabindex={tabIndex}
					onClick={this._change}
				>
					{tabName}
				</span>

					);
		}.bind(this));

		return (
			<div>
			<nav className={classPrefix+'tab-container'}>{tabs}</nav>
			{activeTabContent}
			</div>

		);
	}

});


module.exports=Tabs;