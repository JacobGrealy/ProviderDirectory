var ProviderListSearch =  React.createClass({    
    getInitialState: function (){
        return{
            searchText: ""
        }
    },
    
    onTextChange: function(event) {
        this.state.searchText = event.target.value;
    },
    
    checkForEnter: function(event) {
        if(event.keyCode == 13)
        {
            this.onSearchButtonClick(event);
        }
    },
    
    onSearchButtonClick: function(event) {
        this.props.changeFilter(this.state.searchText);
    }, 
    
    render: function(){
        return(
            <div id ="ProviderListSearchDiv">
                <input type="text" id="searchTextBox"  onChange={this.onTextChange} onKeyDown={this.checkForEnter}/><input type="button" id="searchButton" value="Search" onClick={this.onSearchButtonClick}/>                
            </div>
        )
    }
});