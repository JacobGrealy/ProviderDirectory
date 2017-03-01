Provider Directory
Author: Jacob Grealy

https://github.com/JacobGrealy/ProviderDirectory

You can use the following link to view it live:
https://cdn.rawgit.com/JacobGrealy/ProviderDirectory/1a0ea256/ProviderDirectoryNetBeansProject/public_html/index.html

This does not run in internet explorer, I think it has to do with some of the new js syntax I used.. it doesn't throw any errors but it doesn't generate any of the jsx stuff.
However when loaded from the link above my experience is that the site works well in Chrome, Firefox, and even Microsoft Edge!
Because of cross-site scripting security, Chrome and Edge will not load the javascript locally.. but Firefox will! (This just reinforces my recent decision to switch to Chrome as my main browser). 

Some Cool Features (In my humble opinion):
- Context sensitive buttons:
	- Create button only shows no providers are selected and a create or edit panel is not open.
	- Edit button only shows when exactly 1 provider is selected and a create or edit panel is not open.
	- Remove only shows if 1 or more providers are selected and the create or edit panel is not open. (That would be bad if they removed records durring an edit, the indexes wouldn't line up anymore!)

- Create/Edit Panels can be open and closed, and will stack on top of the provider list panel if the windows becomes too narrow for them to display side by side.

- Edit panel opens with information prefilled in so that you can quickly apply 1 small edit(or you can change all the attributes, the power is yours!).

- Restrictive search, it will only show matches that match every search term in atleast 1 attribute. It therefore becomes more and more narrow the more search terms that are added.


The one html file is in /ProviderDirectorNetBeansProject/public_html/
index.html

The css style sheets are in /ProviderDirectorNetBeansProject/public_html/css, I split them into 3 different ones, 1 for the general page, 1 for the create provider stuff, and 1 more for the search/sort provider stuff.
CreateEditProviderStyleSheet.css
ProviderListStyleSheet.css
mainStyleSheet.css

The javascript is in /ProviderDirectorNetBeansProject/public_html/scripts, I tried to break them up into manageable classes as that's what I'm more familiar with for application development.
CreateEditProvider.jsx
ProviderDirectoryApp.jsx
ProviderEntryField.jsx
ProviderList.jsx
ProviderListRecord.jsx
ProviderListSearch.jsx
ProviderListSort.jsx
providerDirectoryReactMain.jsx


I used 3 external libraries (well they are all technically for react), 2 of them specifically react and one of them, babel, which converts the .jsx files into js files - it lets you write basic html and then it converts it into js notation, pretty neat!
They can be found in /ProviderDirectorNetBeansProject/public_html/scripts/libraries
babel.min.js
react-dom.min.js
react.min.js

