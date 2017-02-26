var directoryArray = JSON.parse("ExistingData.json");
var directoryList = directoryArray.map((directoryArray) => 
<li>{directoryArray.first_name}</li>
);
ReactDOM.render(
    <div>
        <ul>{directoryList}</ul>
    </div>,
  document.getElementById('ProviderDirectoryContainer')
);