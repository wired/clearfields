/*
 * Clear Fields for Firefox
 * written a long time ago
 * by Alex Alexander
 * <alex.alexander@gmail.com>
 * <wired@gentoo.org>
 */

var currentBuild = 11;

function ClearFields_Address()
{
	var urlbar = document.getElementById('urlbar');
	if (urlbar) {
		urlbar.value = "";
		urlbar.focus();
	}
	return
}

function ClearFields_Search()
{
	var searchbar = document.getElementById('searchbar');
	if (searchbar) {
		if (searchbar.mTextbox) searchbar.mTextbox.value = "";
                searchbar.value = "";
		var evt = document.createEvent("Events");
		evt.initEvent("oninput", true, true);
		searchbar.dispatchEvent(evt);
		searchbar.focus();
	}
	searchbar = document.getElementById('MMSearchTBTextbox');
	if (searchbar)
	{
		searchbar.value = "";
		searchbar.focus();
	}
	return
}

function ClearFields_Find()
{
	var urlbar = false;
	if ( document.getElementById('find-field') )
		urlbar = document.getElementById('find-field');
	else if ( document.getElementById('findbar-textbox') )
		urlbar = document.getElementById('findbar-textbox');
	else if ( document.getElementById('FindToolbar') )
		urlbar = document.getElementById('FindToolbar').getElement("findbar-textbox");
	else {
		// firefox 25+
		// this is stupid, but it is the only thing I've managed to get working so far
		// so it is better than nothing :)

		// start with the notificationbox, dive in until we reach the text box
		var c = gBrowser.getNotificationBox();
		c = document.getAnonymousNodes(c)[1].firstChild.firstChild;
		c = document.getAnonymousNodes(c)[0].firstChild.firstChild;
		c = document.getAnonymousNodes(c)[0];
		c = document.getAnonymousNodes(c)[0];

		if ( c != undefined && urlbar != null )
			urlbar = c;
	}

	if (urlbar) {
		urlbar.value = "";
		urlbar.focus();
	}
	return
}

function ClearFields_Bookmark_Search()
{
	var bmbox = document.getElementById('search-box');;
	
	if (bmbox) {
		bmbox.value = "";
		document.getElementById('bookmarks-view').searchBookmarks("");
		bmbox.focus();
	}
	return
}

function ClearFields_History_Search()
{
	var hibox = document.getElementById('search-box');;
	
	if (hibox) {
		hibox.value = "";
		searchHistory("");;
		hibox.focus();
	}
	return
}

function ClearFields_YahooToolbar()
{
	var searchbox = document.getElementById('yahooToolbarEditBox');;
	
	if (searchbox) {
		searchbox.value = "";
		searchbox.focus();
	}
	return;
}

function ClearFields_GoogleToolbar()
{
	var urlbar = document.getElementById('gtbGoogleSearchBox');
	if (urlbar) {
                urlbar.value = "";
		var evt = document.createEvent("Events");
		evt.initEvent("oninput", true, true);
                GTB_GTO_onGoogleSearchInput(evt);
		urlbar.focus();
        }
        return
}

function ClearFields_All(what)
{
	var the_inputs = window._content.document.getElementsByTagName("input");
	//alert(the_inputs.length);
	for(var n = 0; n < the_inputs.length; n++)
	{
		if ( ( what == 0 || what == 1 ) && the_inputs[n].type == "text" )
		{
			the_inputs[n].value = "";
		}
		if ( ( what == 0 || what == 3 ) && the_inputs[n].type == "checkbox" )
		{
			the_inputs[n].checked = "";
		}
		if ( ( what == 0 || what == 2 ) && the_inputs[n].type == "password" )
		{
			the_inputs[n].value = "";
		}
	}
}

function ClearFields_addToToolbars() {
	var i = 0;
	var tbnames = new Array();
	tbnames[0] = "toolbar-menubar";
	tbnames[1] = "nav-bar";
	tbnames[2] = "PersonalToolbar";
	if (document.getElementById("gtbToolbar"))
		tbnames[3] = "gtbToolbar";

	var tb = new Array();
	tb[0] = document.getElementById("toolbar-menubar");
	tb[1] = document.getElementById("nav-bar");
	tb[2] = document.getElementById("PersonalToolbar");
	if (document.getElementById("gtbToolbar"))
		tb[3] = document.getElementById("gtbToolbar");
	
	var btn = new Array();
	// 0 = field, 1 = search, 2 = google search, 4 = yahoo search, 3 = clear page fields
	if ( document.getElementById("ClearFields-Address-bt") ) btn[0] = 1; else btn[0] = 0;
	if ( document.getElementById("ClearFields-Search-bt") ) btn[1] = 1; else btn[1] = 0;
	if ( document.getElementById("ClearFields-GoogleToolbar-bt") ) btn[2] = 1; else btn[2] = 0;
	if ( document.getElementById("ClearFields-All-bt") ) btn[3] = 1; else btn[3] = 0;
	if ( document.getElementById("ClearFields-YahooToolbar-bt") ) btn[4] = 1; else btn[4] = 0;
	
	for ( i = 0; i <= tb.length - 1; i++ )
	{
		var newSet = "";
		var child = tb[i].firstChild;
		while(child) {
			if ( child.id == "search-container" && btn[1] == 0 )
			{
				newSet += "ClearFields-Search-bt,";
				btn[1] = 1;
			}
			if ( child.id == "ClearFields-Address-bt" && btn[3] == 0 ) {
				newSet += "ClearFields-All-bt,";
				btn[3] = 1;
			}
			if ( child.id == "urlbar-container" && btn[0] == 0 ) {
				if ( btn[3] == 0 ) 
				{
					newSet += "ClearFields-All-bt,";
					btn[3] = 1;
				}
				newSet += "ClearFields-Address-bt,";
				btn[0] = 1;
			}
			if ( child.id == "gtbSearchBox" && btn[2] == 0 )
			{
				newSet += "ClearFields-GoogleToolbar-bt,";
				btn[2] = 1;
			}
			newSet += child.id+",";
			child = child.nextSibling;
		}
		newSet = newSet.substring(0, newSet.length-1);
		tb[i].currentSet = newSet;
		tb[i].setAttribute("currentset", newSet);
		document.persist(tbnames[i],"currentset");
	}

	BrowserToolboxCustomizeDone(true);

	return 0;
}

function ClearFields_removeFromToolbars() {
	var i = 0;
	var tbnames = new Array();
	tbnames[0] = "toolbar-menubar";
	tbnames[1] = "nav-bar";
	tbnames[2] = "PersonalToolbar";
	if (document.getElementById("gtbToolbar"))
		tbnames[3] = "gtbToolbar";

	var tb = new Array();
	tb[0] = document.getElementById("toolbar-menubar");
	tb[1] = document.getElementById("nav-bar");
	tb[2] = document.getElementById("PersonalToolbar");
	if (document.getElementById("gtbToolbar"))
		tb[3] = document.getElementById("gtbToolbar");
	
	for ( i = 0; i <= tb.length - 1; i++ )
	{
		var newSet = "";
		var child = tb[i].firstChild;
		while(child) {
			if ( child.id == "ClearFields-Address-bt" || child.id == "ClearFields-Search-bt" || child.id == "ClearFields-All-bt" || child.id == "ClearFields-GoogleToolbar-bt" ) {
					
			}
			else
			{
				newSet += child.id+",";
			}
			child = child.nextSibling;
		}
		newSet = newSet.substring(0, newSet.length-1);
		tb[i].currentSet = newSet;
		tb[i].setAttribute("currentset", newSet);
		document.persist(tbnames[i],"currentset");
	}

	BrowserToolboxCustomizeDone(true);

	return 0;
}

function ClearFields_FixToolbars() {
	ClearFields_removeFromToolbars();
	ClearFields_addToToolbars();

	return 0;
}

function ClearFields_loadFirstTimeTab() {
	var tBrowser = top.document.getElementById("content");
	var url = "chrome://clearfields/content/installed.html"
	var tab = tBrowser.addTab(url);
}

function ClearFields_firstTime() {
	const cf_PrefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	const cf_Branch = cf_PrefService.getBranch("clearfields.");
	
	var cf_init = -1;
	var cf_showinfield = 1;
	var cf_showsidebutton = 1;

	if(cf_Branch.prefHasUserValue("init")) {
		cf_init = cf_Branch.getIntPref("init");
	} else {
		cf_init = 0;
	}

	if(cf_Branch.prefHasUserValue("showsidebutton")) {
		cf_showinfield = cf_Branch.getIntPref("showinfield");
		cf_showsidebutton = cf_Branch.getIntPref("showsidebutton");
	} else {
		cf_Branch.setIntPref("showinfield", 1);
		cf_Branch.setIntPref("showsidebutton", 1);
	}

	if ( cf_init < currentBuild ) {
		cf_Branch.setIntPref("init", currentBuild);
		setTimeout("ClearFields_loadFirstTimeTab()",500);
	}
	// for testing
	// cf_Branch.setIntPref("init", 0);
	
	if ( cf_showinfield == 0 ) {
		setTimeout("ClearFields_in_field_toggle('none')",1000);
	}

	if ( cf_showsidebutton == 1 ) {
		// Bookmarks hack - injects button on startup
		if ( document.getElementById('bookmarksPanel') ) {
			var d = document.getElementById('bookmarksPanel');
			var child = d.firstChild;
			while(child) {
				if ( child.align )
				{
					var c = document.createElement("toolbarbutton");
					c.setAttribute("id","ClearFields-Bookmark-Search-bt");
					c.setAttribute("oncommand","ClearFields_Bookmark_Search();");
					child.insertBefore(c,child.firstChild.nextSibling);
					child = 0;
				}
				else
					child = child.nextSibling;
			}
		}

		// History hack - injects button on startup
		if ( document.getElementById('history-panel') ) {
			var d = document.getElementById('history-panel');
			var child = d.firstChild;
			while(child) {
				if ( child.align )
				{
					var c = document.createElement("toolbarbutton");
					c.setAttribute("id","ClearFields-History-Search-bt");
					c.setAttribute("oncommand","ClearFields_History_Search();");
					child.insertBefore(c,child.firstChild.nextSibling);
					child = 0;
				}
				else
					child = child.nextSibling;
			}
		}

		// window.setTimeout(ClearFields_patch_FindToolbar,1000);
	}

	if ( document.getElementById('yahoo-toolbar') ) {
		window.setTimeout(ClearFields_patch_YT,1000);
	}
}

function ClearFields_ToggleInField(){
	if ( ClearFields_Toggle("showinfield",0) == 1 )
		ClearFields_in_field_toggle("block");
	else
		ClearFields_in_field_toggle("none");
}

function ClearFields_Toggle(what,restart) {
	const cf_PrefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	const cf_Branch = cf_PrefService.getBranch("clearfields.");

	var whattotoggle = 0;
	if(cf_Branch.prefHasUserValue(what)) {
		whattotoggle = cf_Branch.getIntPref(what);
	}
	whattotoggle = whattotoggle == 1 ? 0 : 1;
	cf_Branch.setIntPref(what, whattotoggle);

	if ( restart == 1 )
		alert("Please restart Firefox for changes to take effect.");
	else
		return whattotoggle;
}

function ClearFields_in_field_toggle(mode) {
	document.getElementById("ClearFields-in-address").style.display = mode;
	document.getElementById("ClearFields-in-search").style.display = mode;
}

// this doesn't work in FF4
function ClearFields_patch_FindToolbar() {
	if ( document.getElementById('FindToolbar') ) {
		var container = document.getElementById('FindToolbar').getElement("findbar-container");
		var nodes = document.getElementById('FindToolbar').getElement("findbar-container").childNodes;
		if ( nodes ) {
			var cc = nodes.length;
			var i = 1;
			while(i <= cc) {
				var an = nodes[i].getAttribute('anonid');
				
 				if ( an == 'findbar-textbox' )
 				{
 					var c = document.createElement("toolbarbutton");
 					c.setAttribute("id","ClearFields-Find-bt");
 					c.setAttribute("oncommand","ClearFields_Find();");
 					container.insertBefore(c,nodes[i]);
 					i = cc+1;
 				}
				else
					i++;
			}
		}
	}
}

function ClearFields_patch_YT() {
	if ( document.getElementById("yahoo-toolbar-feed-loading") )
	{
		window.setTimeout(ClearFields_patch_YT,500);
	}
	else {
		var d = document.getElementById('yahoo-toolbar-reqbtns');
		var c = document.createElement("toolbarbutton");
		c.setAttribute("id","ClearFields-YahooToolbar-bt");
		c.setAttribute("oncommand","ClearFields_YahooToolbar();");
		if ( document.getElementById("yahoo-toolbar-srch_ebox") )
			d.insertBefore(c,document.getElementById('yahoo-toolbar-srch_ebox'));
		else
			d.insertBefore(c,document.getElementById('yahoo-toolbar-ebox_m'));
	}
}

window.addEventListener("load", ClearFields_firstTime, false);
