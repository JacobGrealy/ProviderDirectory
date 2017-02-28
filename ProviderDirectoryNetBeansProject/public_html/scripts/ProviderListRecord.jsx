var ProviderListRecord =  React.createClass({
    getDefaultProps: function () {
        return {
            index: undefined,
            last_name: "",
            first_name:"",
            email_address:"",
            specialty:"",
            practice_name:""
        };
    },
    render: function(){
        var classString = "whiteBackground";
        if(this.props.index % 2 === 0)
        {
            classString = "blueBackground";
        }
        return(
            <div className={classString+" providerListRecord"}>
            <input className="recordCheckbox" type="checkbox"></input>
            <table className="recordText">
                <tr>
                    <td className="lastAndFirstName">{this.props.last_name}, {this.props.first_name}</td>
                    <td className="specialty">{this.props.specialty}</td>
                </tr>
                <tr>    
                    <td className="email">{this.props.email_address}</td>
                    <td className="practiceName">{this.props.practice_name}</td>
                </tr>
            </table>
            </div>
        )
    }
});