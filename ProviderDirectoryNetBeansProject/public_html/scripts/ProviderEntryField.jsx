var ProviderEntryField = React.createClass({
    getDefaultProps: function () {
        return {
            defaultValueProp: ""
        };
    },
    
    //We can use this to trigger create or edit when you press enter in a field.
    checkForEnter: function(event) {
        if(event.keyCode === 13)
        {
            this.props.createEditProviderCB();
        }
    },
    
    //Everytime the field updates
    changeValue: function(event)
    {
        this.props.updateProviderFromFieldCB(this.props.fieldName,event.target.value);
    },
    
    render: function(){
        var requiredSymbol = "";
        if(this.props.required === "true")
            requiredSymbol = "*";
        return(
                <div className="providerEntryField" >
                  <div className="fieldName">{this.props.fieldName}</div>
                  <div className="requiredSymbol">{requiredSymbol}</div>
                  <input type="text" className="fieldText" defaultValue={this.props.defaultValueProp} onChange={this.changeValue} onKeyDown={this.checkForEnter}/>
                </div>
        )
    }
});