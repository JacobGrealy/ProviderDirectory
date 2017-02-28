//JSON string of initial providers
var existingDataJSONString = '[{"last_name":"Harris","first_name":"Mike","email_address":"mharris@updox.com","specialty":"Pediatrics","practice_name":"Harris Pediatrics"},{"last_name":"Wijoyo","first_name":"Bimo","email_address":"bwijoyo@updox.com","specialty":"Podiatry","practice_name":"Wijoyo Podiatry"},{"last_name":"Rose","first_name":"Nate","email_address":"nrose@updox.com","specialty":"Surgery","practice_name":"Rose Cutters"},{"last_name":"Carlson","first_name":"Mike","email_address":"mcarlson@updox.com","specialty":"Orthopedics","practice_name":"Carlson Orthopedics"},{"last_name":"Witting","first_name":"Mike","email_address":"mwitting@updox.com","specialty":"Pediatrics","practice_name":"Witting’s Well Kids Pediatrics"},{"last_name":"Juday","first_name":"Tobin","email_address":"tjuday@updox.com","specialty":"General Medicine","practice_name":"Juday Family Practice"}]';

var ProviderList = React.createClass({
    getInitialState: function (){
        //Load the JSON string into an array of objects
        var providerArraywithIndexes = JSON.parse(existingDataJSONString);
        //add an index value onto all the provider objects
        for (var i = 0, len = providerArraywithIndexes.length; i < len; i++) 
        {
            providerArraywithIndexes[i].index = i;
        }        
        return{
            providersArray: providerArraywithIndexes,
            filterArray: [],
            checkedArray: []
        }
    },
    
    removeProviders: function (){
        var newProviderArray = [];
        for (var i = 0, len = this.state.providersArray.length; i < len; i++) 
        {
            if(!checkedArray.contains(i)){
                newProviderArray.push}
        }
        this.setState({providersArray: newProviderArray});
    },
    
    updateProvider: function (providerJSONString,i){
        var providersArrayCopy = this.state.providersArray;
        providersArrayCopy[i] = JSON.parse(providerJSONString);
        this.setState({providersArray: providersArrayCopy})
    },
    
    createProvider: function (providerJSONString,i){
        var providersArrayCopy = this.state.providersArray;
        providersArrayCopy[i] = JSON.parse(providerJSONString);
        this.setState({providersArray: providersArrayCopy})
    },
    
    compareProviders: function (sortAttribute, sortOrder)
    {
        return function(a, b){
            return((a[sortAttribute].localeCompare(b[sortAttribute]))*sortOrder);
        }
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
        var newSortOption =""
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
        }
        this.setState({filterArray: newfilterArray});
    },
    
    render: function(){
        return(
            <div id ="ProviderListDiv">
                <div id ="ProviderListTitleDiv">Provider List</div>
                <div id ="ProviderListContentDiv">
                <ProviderListSearch changeFilter={this.changeFilter}/>
                <ProviderListSort changeSort={this.changeSort} changeSortOrder={this.changeSortOrder} sort_options={["Last Name", "First Name", "Specialty", "Email Address", "Practice Name"]}/>
                    <hr></hr>
                    <div id ="SelectRemoveEditDiv">[ ] [Create] [Remove] [Edit]</div>
                    <hr></hr>
                    <div id ="ProviderListRecordListDiv">
                        {this.filterAndSort(this.state.providersArray,this.state.filterArray,this.state.sortOption,this.state.sortOrder).map(function (provider,i) {
                            return <ProviderListRecord index = {i} last_name ={provider.last_name} first_name ={provider.first_name} email_address={provider.email_address} specialty={provider.specialty} practice_name ={provider.practice_name}/>
                        })}
                    </div>
                </div>  
            </div>
        )
    }
});