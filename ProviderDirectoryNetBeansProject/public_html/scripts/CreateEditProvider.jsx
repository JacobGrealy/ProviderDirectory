var CreateEditProvider = React.createClass({
    getDefaultProps: function () {
        return {
            currentFunction: "Create"
        };
    },
    
    render: function(){
        return(
            <div id ="CreateEditProviderDiv">
                <div id ="CreateEditProviderTitleDiv">Create Provider</div>
                <div id ="CreateEditProviderContentDiv">
                    <ProviderEntryField required="true" fieldName="Last Name" />
                    <ProviderEntryField required="true" fieldName="First Name" />
                    <ProviderEntryField required="true" fieldName="Email Address" />
                    <ProviderEntryField fieldName="Speciality" />
                    <ProviderEntryField fieldName="Practice Name" />
                    <input type="button" id="CreateEditButton" value={this.props.currentFunction} onClick={this.onCreateEditButtonClick}/>
                    <input type="button" id="CancelButton" value="Cancel" onClick={this.onCancelButtonClick}/>
                    <div id="requiredExplanation">* Denotes A Required Field</div>
                </div>
            </div>
        )
    }
});