var ProviderList = React.createClass({
    getDefaultProps: function () {
        return {
            providerArray: [],
        };
    },
    
    getInitialState: function (){    
        return{
            filterArray: [],
            checkedArray: []
        };
    },
    
    compareProviders: function (sortAttribute, sortOrder)
    {
        return function(a, b){
            return((a[sortAttribute].localeCompare(b[sortAttribute]))*sortOrder);
        };
    },
    
    filterAndSort: function (providerArray, searchTermsArray, sortAttribute, sortOrder){
        var sortedAndFilteredArray = [];
        //if there was no search term then it's the entire provider array
        if(searchTermsArray.length === 0)
        {
            sortedAndFilteredArray = providerArray;
        }
        else
        {
            for (var i = 0, len = providerArray.length; i < len; i++) 
            {
                var include = true;
                for (var j = 0, len2 = searchTermsArray.length; j < len2; j++)
                {
                    //If one of the search terms doesn't match any attriubutes then we won't include this provider, our search works on AND not OR, so every term narrows the search rather than widens it.
                    if(!(providerArray[i].last_name.toUpperCase().includes(searchTermsArray[j].toUpperCase())||providerArray[i].first_name.toUpperCase().includes(searchTermsArray[j].toUpperCase()) || providerArray[i].email_address.toUpperCase().includes(searchTermsArray[j].toUpperCase()) || providerArray[i].specialty.toUpperCase().includes(searchTermsArray[j].toUpperCase()) || providerArray[i].practice_name.toUpperCase().includes(searchTermsArray[j].toUpperCase())))
                    {
                        include = false;
                        break;
                    }
                }
                if(include === true)
                {
                    sortedAndFilteredArray.push(providerArray[i]);
                }
            }
        }
        //If we were given a sort attribute let's sort the list with it.
        if(sortAttribute !== undefined && sortAttribute !== null)
        {
            if(sortOrder === undefined){
                sortOrder = 1;}
            sortedAndFilteredArray.sort(this.compareProviders(sortAttribute,sortOrder));
        }
        return sortedAndFilteredArray;      
    },
    
    changeSort: function (sortOptionPassed){
        var newSortOption ="";
        if(sortOptionPassed==="Last Name"){
            newSortOption = "last_name";}
        if(sortOptionPassed==="First Name"){
            newSortOption = "first_name";}
        if(sortOptionPassed==="Specialty"){
            newSortOption = "specialty";}
        if(sortOptionPassed==="Email Address"){
            newSortOption = "email_address";}
        if(sortOptionPassed==="Practice Name"){
            newSortOption = "practice_name";}        
        this.setState({sortOption: newSortOption});
    },
    
    changeSortOrder: function (sortOrderPassed){      
        this.setState({sortOrder: sortOrderPassed});
    },
    
    changeFilter: function (filterPassed){
        //filter array is each part of the search split on whitespace.
        var newfilterArray = [];
        if(filterPassed !== undefined && filterPassed !== null)
        {
            newfilterArray = filterPassed.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ); // we need the filter to get rid of white space
            //We need to clear the checked array because some checked items might not be visible anymore
            this.state.checkedArray = [];
        }
        this.setState({filterArray: newfilterArray});
    },
    
    reverseCheck: function (index){
        var nextCheckedArray = [];
        if(this.state.checkedArray.includes(index))
        {
            for (var i = 0, len = this.state.checkedArray.length; i < len; i++) 
            {
                if(this.state.checkedArray[i]!==index)
                {
                    nextCheckedArray.push(this.state.checkedArray[i]);
                }
            }
        }
        else
        {
            nextCheckedArray = this.state.checkedArray;
            nextCheckedArray.push(index);
        }
        this.setState({checkedArray: nextCheckedArray});
    },    
    
    createButtonOnClick: function (event){
        this.props.openCreateEditProviderCB("create");
    },
    
    editButtonOnClick: function (event){
        this.props.openCreateEditProviderCB("edit",this.state.checkedArray[0]);
    },
    
    RemoveButtonOnClick: function (event){
        this.props.removeProvidersCB(this.state.checkedArray);
        //clear the checked array
        this.setState({checkedArray: []});
    },    
   
    renderCreateButton: function(){
        if(this.props.mode === "none" && this.state.checkedArray.length === 0){
            return <input type="button" id="CreateButton" value="Create" onClick={this.createButtonOnClick}/>
        }
        else{
            return null;
        }            
    },
    
    renderEditButton: function(){
        if(this.props.mode === "none" && this.state.checkedArray.length === 1){
            return <input type="button" id="EditButton" value="Edit" onClick={this.editButtonOnClick}/>
        }
        else{
            return null;
        }            
    },
    
    renderRemoveButton: function(){
        if(this.props.mode === "none" && this.state.checkedArray.length > 0){
            return <input type="button" id="RemoveButton" value="Remove" onClick={this.RemoveButtonOnClick}/>
        }
        else{
            return null;
        }         
    },
    
    render: function(){
        return(
            <div id ="ProviderListDiv">
                <div id ="ProviderListTitleDiv">Provider List</div>
                <div id ="ProviderListContentDiv">
                <ProviderListSearch changeFilter={this.changeFilter}/>
                <ProviderListSort changeSort={this.changeSort} changeSortOrder={this.changeSortOrder} sort_options={["Last Name", "First Name", "Specialty", "Email Address", "Practice Name"]}/>
                    <hr></hr>
                    <div id ="SelectRemoveEditDiv">
                        {this.renderCreateButton()}
                        {this.renderEditButton()}
                        {this.renderRemoveButton()}
                    </div>
                    <hr></hr>
                    <div id ="ProviderListRecordListDiv">
                        {this.filterAndSort(this.props.providersArray,this.state.filterArray,this.state.sortOption,this.state.sortOrder).map(function (provider,i) {
                            return <ProviderListRecord checkedProp={this.state.checkedArray.includes(provider.index)} displayIndex={i} index={provider.index} last_name ={provider.last_name} first_name ={provider.first_name} email_address={provider.email_address} specialty={provider.specialty} practice_name ={provider.practice_name} reverseCheckCB={this.reverseCheck}/>
                        },this)}
                    </div>
                </div>  
            </div>
        )
    }
});