var React=require('react/addons');

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
		defaultTabNum:React.PropTypes.number,
		tabNames:React.PropTypes.array.isRequired,
		willChange:React.PropTypes.func,
		didChange:React.PropTypes.func,
		classPrefix:React.PropTypes.string
	},
	getDefaultProps:function(){
		return {
			defaultTabNum:0,
			willChange:noop,
			didChange:noop,
			classPrefix:''
		};
	},
	getInitialState:function(){
		return {activeTabNum:this.props.defaultTabNum};
	},
	setActiveTabNum:function(num,callback){
		this.setState({activeTabNum:num},callback);
	},
	getActiveTabNum:function(){
		return this.state.activeTabNum;
	},
	_change:function(e){
		var oldActiveTabNum=this.state.activeTabNum;
		var newActiveTabNum=parseInt(e.target.getAttribute('data-tabnum'));

		var allowChange=this.props.willChange(newActiveTabNum,oldActiveTabNum);
		if (typeof allowChange !== 'undefined' && !allowChange){
			return;
		}
		var callback=function(){
			this.props.didChange(newActiveTabNum,oldActiveTabNum);
		}.bind(this);

		this.setActiveTabNum(newActiveTabNum,callback);
	},
	render:function(){
		var children=getChildrenArray(this);
		var activeTabContent=children[this.state.activeTabNum];
		var classPrefix=this.props.classPrefix;
		var tabClassName=classPrefix+'tab';
		var activeTabClassName=tabClassName+' '+classPrefix+'active-tab';

		var tabs=this.props.tabNames.map(function(tabName,tabNum){
			var isActive= tabNum===this.state.activeTabNum;
			return (
				<span 
					key={'tab-'+tabNum}
					className={isActive? activeTabClassName : tabClassName }
					data-tabnum={tabNum}
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