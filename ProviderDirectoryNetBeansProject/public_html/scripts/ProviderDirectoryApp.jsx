var ProviderDirectoryApp = React.createClass({
    getInitialState: function (){
        return{
            sortOrder: 1
        }
    },
    
    openCreateEditProvider: function (mode, i){     
        if(this.getState.currentMode = none)
        {
            this.setState({currentMode: mode});
        }
        else
        {
            var alertMessage = "Can't do that until other window is closed.";
            if(mode === "create")
            {
                if(currentMode === "create"){
                    alertMessage = "Create provider window is already open.";}
                if(currentMode === "edit"){
                    alertMessage = "Finish or cancel edit before trying to create new provider.";}
            }
            if(mode === "edit")
            {
                if(currentMode === "edit"){
                    alertMessage = "Finish or cancel current edit before trying to start new edit.";}
                if(currentMode === "create"){
                    alertMessage = "Finish or cancel create before trying to start new edit.";}
            }
            alert(alertMessage);
        }
    },
    
    render: function(){
        return(
                <div>
                    <CreateEditProvider /><ProviderList openCreateEditProviderCB={this.openCreateEditProvider} />
                </div>
        )
    }
});