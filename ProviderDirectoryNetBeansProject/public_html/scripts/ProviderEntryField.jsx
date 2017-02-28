var ProviderEntryField = React.createClass({
    checkForEnter: function(event) {
        if(event.keyCode == 13)
        {

        }
    },
    
    render: function(){
        var requiredSymbol = "";
        if(this.props.required === "true")
            requiredSymbol = "*";
        return(
                <div className="providerEntryField" >
                  <div className="fieldName">{this.props.fieldName}</div>
                  <div className="requiredSymbol">{requiredSymbol}</div>
                  <input type="text" className="fieldText" onKeyDown={this.checkForEnter}/>
                </div>
        )
    }
});