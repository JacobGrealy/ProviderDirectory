var CreateEditProvider = React.createClass({
    getDefaultProps: function () {
        return {
            mode: "Create",
            defaultValueProvider: {"last_name":"","first_name":"","email_address":"","specialty":"","practice_name":"","index":0}
        }
    },
    
    getInitialState: function (){
        return{
            provider: {"last_name":null,"first_name":null,"email_address":null,"specialty":null,"practice_name":null,"index":0}
        }
    },
    
    updateProviderFromField: function (fieldName, textValue){
        if(fieldName==="Last Name")
        {
            this.state.provider.last_name=textValue;
        }
        if(fieldName==="First Name")
        {
            this.state.provider.first_name=textValue;
        }
        if(fieldName==="Email Address")
        {
            this.state.provider.email_address=textValue;
        }
        if(fieldName==="Speciality")
        {
            this.state.provider.specialty=textValue;
        }
        if(fieldName==="Practice Name")
        {
            this.state.provider.practice_name=textValue;
        }
    },    
    
    cancelCreateEditProvider: function (){
        this.props.cancelCreateEditProviderCB();
    },
    
    createEditProvider: function (){
        var providerToSend = this.props.defaultValueProvider;
        if(this.state.provider.last_name!==null)
            providerToSend.last_name = this.state.provider.last_name;
        if(this.state.provider.first_name!==null)
            providerToSend.first_name = this.state.provider.first_name;
        if(this.state.provider.email_address!==null)
            providerToSend.email_address = this.state.provider.email_address;  
        if(this.state.provider.specialty!==null)
            providerToSend.specialty = this.state.provider.specialty;   
        if(this.state.provider.practice_name!==null)
            providerToSend.practice_name = this.state.provider.practice_name;
        
        if(providerToSend.last_name.length===0 || providerToSend.first_name.length===0 || providerToSend.email_address.length===0)
        {
            alert("Last Name, First Name, and Email Address are required.");
        }
        else
        {
            this.props.createEditProviderCB(providerToSend)
        }
    },    
    
    render: function(){
        var modeString = "Create"
        if(this.props.mode==="edit")
            modeString = "Edit"
        return(
            <div id ="CreateEditProviderDiv">
                <div id ="CreateEditProviderTitleDiv">{modeString} Provider</div>
                <div id ="CreateEditProviderContentDiv">
                    <ProviderEntryField required="true" fieldName="Last Name" defaultValueProp={this.props.defaultValueProvider.last_name} updateProviderFromFieldCB={this.updateProviderFromField} createEditProviderCB={this.createEditProvider}/>
                    <ProviderEntryField required="true" fieldName="First Name" defaultValueProp={this.props.defaultValueProvider.first_name} updateProviderFromFieldCB={this.updateProviderFromField} createEditProviderCB={this.createEditProvider}/>
                    <ProviderEntryField required="true" fieldName="Email Address" defaultValueProp={this.props.defaultValueProvider.email_address} updateProviderFromFieldCB={this.updateProviderFromField} createEditProviderCB={this.createEditProvider}/>
                    <ProviderEntryField fieldName="Speciality" defaultValueProp={this.props.defaultValueProvider.specialty} updateProviderFromFieldCB={this.updateProviderFromField} createEditProviderCB={this.createEditProvider}/>
                    <ProviderEntryField fieldName="Practice Name" defaultValueProp={this.props.defaultValueProvider.practice_name} updateProviderFromFieldCB={this.updateProviderFromField} createEditProviderCB={this.createEditProvider}/>
                    <input type="button" id="CreateEditButton" value={modeString} onClick={this.createEditProvider}/>
                    <input type="button" id="CancelButton" value="Cancel" onClick={this.cancelCreateEditProvider}/>
                    <div id="requiredExplanation">* Denotes A Required Field</div>
                </div>
            </div>
        )
    }
});