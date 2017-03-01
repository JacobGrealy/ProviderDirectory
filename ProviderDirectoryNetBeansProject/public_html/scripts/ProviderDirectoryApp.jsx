//JSON string of initial providers
var existingDataJSONString = '[{"last_name":"Harris","first_name":"Mike","email_address":"mharris@updox.com","specialty":"Pediatrics","practice_name":"Harris Pediatrics"},{"last_name":"Wijoyo","first_name":"Bimo","email_address":"bwijoyo@updox.com","specialty":"Podiatry","practice_name":"Wijoyo Podiatry"},{"last_name":"Rose","first_name":"Nate","email_address":"nrose@updox.com","specialty":"Surgery","practice_name":"Rose Cutters"},{"last_name":"Carlson","first_name":"Mike","email_address":"mcarlson@updox.com","specialty":"Orthopedics","practice_name":"Carlson Orthopedics"},{"last_name":"Witting","first_name":"Mike","email_address":"mwitting@updox.com","specialty":"Pediatrics","practice_name":"Witting’s Well Kids Pediatrics"},{"last_name":"Juday","first_name":"Tobin","email_address":"tjuday@updox.com","specialty":"General Medicine","practice_name":"Juday Family Practice"}]';

var ProviderDirectoryApp = React.createClass({
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
            mode: "none",
            providerToEdit: {"last_name":"","first_name":"","email_address":"","specialty":"","practice_name":"","index":0}
        }
    },
    
    openCreateEditProvider: function (passedMode, i){
        if(this.state.mode === "none")
        {
            this.setState({mode: passedMode});
        }
        if(passedMode === "edit")
        {
            this.setState({providerToEdit: this.state.providersArray[i]});
        }
        if(passedMode === "create")
        {
            this.setState({providerToEdit: {"last_name":"","first_name":"","email_address":"","specialty":"","practice_name":"","index":0}});
        }
    },
    
    removeProviders: function (checkedArray){
        var newProviderArray = [];
        for (var i = 0, len = this.state.providersArray.length; i < len; i++) 
        {
            if(!checkedArray.includes(i)){
                newProviderArray.push(this.state.providersArray[i])
                //reassign index
                var newIndex = newProviderArray.length-1;
                newProviderArray[newIndex].index = newIndex;
            }
        }    
        this.setState({providersArray: newProviderArray});
    },
    
    updateProvider: function (modifiedProvider){
        var providersArrayCopy = this.state.providersArray;
        providersArrayCopy[modifiedProvider.index] = modifiedProvider;
        this.setState({providersArray: providersArrayCopy})
        this.setState({mode: "none"});
    },
    
    createProvider: function (createdProvider){
        var providersArrayCopy = this.state.providersArray;
        var nextIndex = providersArrayCopy.length;
        providersArrayCopy.push(createdProvider);
        providersArrayCopy[nextIndex].index = nextIndex;
        this.setState({providersArray: providersArrayCopy});
        this.setState({mode: "none"});
    },
    
    cancelCreateEditProvider: function (){
        this.setState({mode: "none"});
    },
    
    renderCreateEdit: function(){
        var createEditProviderCB= this.updateProvider;
        if(this.state.mode === "create")
            createEditProviderCB= this.createProvider;
        if(this.state.mode==="create" || this.state.mode==="edit")
        {
            return <CreateEditProvider defaultValueProvider={this.state.providerToEdit} mode={this.state.mode} cancelCreateEditProviderCB={this.cancelCreateEditProvider}  createEditProviderCB={createEditProviderCB}/>;
        }
        else
        {
            return null;   
        }
    },
    
    render: function(){
        return(
                <div>
                    {this.renderCreateEdit()}
                    <ProviderList providersArray={this.state.providersArray} mode={this.state.mode} openCreateEditProviderCB={this.openCreateEditProvider} removeProvidersCB={this.removeProviders}/>
                </div>
        )
    }
});