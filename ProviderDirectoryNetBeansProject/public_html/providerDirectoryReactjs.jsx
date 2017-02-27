//JSON string of initial providers
var existingDataJSONString = '[{"last_name":"Harris","first_name":"Mike","email_address":"mharris@updox.com","specialty":"Pediatrics","practice_name":"Harris Pediatrics"},{"last_name":"Wijoyo","first_name":"Bimo","email_address":"bwijoyo@updox.com","specialty":"Podiatry","practice_name":"Wijoyo Podiatry"},{"last_name":"Rose","first_name":"Nate","email_address":"nrose@updox.com","specialty":"Surgery","practice_name":"Rose Cutters"},{"last_name":"Carlson","first_name":"Mike","email_address":"mcarlson@updox.com","specialty":"Orthopedics","practice_name":"Carlson Orthopedics"},{"last_name":"Witting","first_name":"Mike","email_address":"mwitting@updox.com","specialty":"Pediatrics","practice_name":"Witting’s Well Kids Pediatrics"},{"last_name":"Juday","first_name":"Tobin","email_address":"tjuday@updox.com","specialty":"General Medicine","practice_name":"Juday Family Practice"}]';
var versionNumber = "3.0";

var CreateEditProvider = React.createClass({
    render: function(){
        return(
            <div id ="CreateEditProviderDiv">CreateEditProviderDivText</div>  
        )
    }
});

var ProviderListRecord =  React.createClass({
    getInitialState: function () {
        return {
            last_name: "",
            first_name:"",
            email_address:"",
            specialty:"",
            practice_name:""
        }
    },
    render: function(){
        return(
            <div id ="ProviderListRecordDiv">{this.state.last_name},{this.state.first_name}</div>
        )
    }
});



var ProviderListSearchAndSort =  React.createClass({
    render: function(){
        return(
            <div id ="ProviderListRecordDiv">ProviderListRecord</div>
        )
    }
});

var ProviderList = React.createClass({
    //Load the JSON string into an array of objects
    getInitialState: function (){
        return{
            providersArray: JSON.parse(existingDataJSONString)
        }
    },
    
    removeProvider: function (i){
        var providersArrayCopy = this.state.providersArray;
        providersArrayCopy.splice(i,1);
        this.setState({providersArray: providersArrayCopy})
    },
    
    updateProvider: function (providerJSONString,i){
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
        for (var i = 0, len = providerArray.length; i < len; i++) 
        {
            var include = false;
            if(searchTermsArray.length == 0)
            {
                include = true;
            }
            else
            {
                for (var j = 0, len2 = searchTermsArray.length; j < len2; j++)
                {
                    if(providerArray[i].last_name.includes(searchTermsArray[j])||providerArray[i].first_name.includes(searchTermsArray[j]) || providerArray[i].email_address.includes(searchTermsArray[j]) || providerArray[i].specialty.includes(searchTermsArray[j]) || providerArray[i].practice_name.includes(searchTermsArray[j]))
                    {
                        include = true;
                        break;
                    }
                }
            }
            if(include == true)
            {
                sortedAndFilteredArray.push(providerArray[i]);
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
    
    render: function(){
        return(
            <div id ="ProviderListDiv">
                <div id = "ProviderListTitleDiv">Provider List</div>
                <div id ="ProviderListContentDiv">
                    <div id ="ProviderRecordListDiv">
                        {this.filterAndSort(this.state.providersArray,["Mike","Bimo"],"last_name",1).map(function (provider,i) {
                            return(<div>{provider.first_name + " " + provider.last_name}</div>);
                        })}
                    </div> 
                </div>  
            </div>
        )
    }
});

var ProviderDirectoryApp = React.createClass({
    render: function(){
        return(
                <div>
                    <CreateEditProvider />
                    <ProviderList />
                </div>
        )
    }
});

ReactDOM.render(<p>v{versionNumber}</p>,document.getElementById('TitleVersionDiv')); //Put the version number into the titleVersionDiv, the version number can now be set via code.
ReactDOM.render(<ProviderDirectoryApp />,document.getElementById('ProviderDirectoryAppContainer')); 
