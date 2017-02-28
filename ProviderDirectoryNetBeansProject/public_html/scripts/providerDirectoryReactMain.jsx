var versionNumber = "3.0";

//Put the version number into the titleVersionDiv, the version number can now be set via code.
ReactDOM.render(<p>v{versionNumber}</p>,document.getElementById('TitleVersionDiv'));
//Draw the app
ReactDOM.render(<ProviderDirectoryApp />,document.getElementById('ProviderDirectoryAppContainer'));