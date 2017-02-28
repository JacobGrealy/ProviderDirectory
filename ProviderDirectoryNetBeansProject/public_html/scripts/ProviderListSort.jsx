var ProviderListSort =  React.createClass({
    getInitialState: function (){
        return{
            sortOrder: 1
        }
    },
    
    handleChange: function(event) {
        this.props.changeSort(event.target.value);
    },
    
    onSwitchSortOrderButtonClick: function(event) {
        this.state.sortOrder *= -1;
        this.props.changeSortOrder(this.state.sortOrder);
    },
    
    render: function(){
        return(
                <div id ="ProviderListSort"> 
                <select onChange={this.handleChange}>
                    <option selected disabled hidden>Sort By</option>
                    {
                        this.props.sort_options.map(function (sortOption){
                            return (<option>{sortOption}</option>);
                        })
                    }
                </select>
                <button type="button" onClick={this.onSwitchSortOrderButtonClick}>↑↓</button>
                </div>
        )
    }
});