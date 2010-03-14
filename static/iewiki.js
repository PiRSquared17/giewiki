/* Based on TiddlyWiki created by Jeremy Ruston, (jeremy [at] osmosoft [dot] com)

Copyright (c) UnaMesa Association 2004-2009

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this
list of conditions and the following disclaimer in the documentation and/or other
materials provided with the distribution.

Neither the name of the UnaMesa Association nor the names of its contributors may be
used to endorse or promote products derived from this software without specific
prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.
*/

var version = { title: "TiddlyWiki", major: 2, minor: 4, revision: 1, date: new Date("Aug 4, 2008"), extensions: {} };

// But heavily modified for use in this context

//--
//-- Configuration repository
//--

// Miscellaneous options
var config = {
    animDuration: 400, // Duration of UI animations in milliseconds
    cascadeFast: 20, // Speed for cascade animations (higher == slower)
    cascadeSlow: 60, // Speed for EasterEgg cascade animations
    cascadeDepth: 5, // Depth of cascade animation
    locale: "en" // W3C language tag
};

var Type = {
    System: { Exception: "System.Exception" }
};

// Hashmap of alternative parsers for the wikifier
config.parsers = {};

// Annotations
config.annotations = {};

// Custom fields to be automatically added to new tiddlers
config.defaultCustomFields = { id: "0" };

// Messages
config.messages = {
    messageClose: {
        text: "close",
        tooltip: "close this message area"
    },
    dates: {},
    tiddlerPopup: {},
    listView : {
        tiddlerTooltip: "Click for the full text of this tiddler",
        previewUnavailable: "(preview not available)"
    },
    customConfigError: "Problems were encountered loading plugins. See PluginManager for details",
    pluginError: "Error: %0",
    pluginDisabled: "Not executed because disabled via 'systemConfigDisable' tag",
    pluginForced: "Executed because forced via 'systemConfigForce' tag",
    pluginVersionError: "Not executed because this plugin needs a newer version of TiddlyWiki",
    nothingSelected: "Nothing is selected. You must select one or more items first",
    subtitleUnknown: "(unknown)",
    undefinedTiddlerToolTip: "The tiddler '%0' doesn't yet exist",
    shadowedTiddlerToolTip: "The tiddler '%0' doesn't yet exist, but has a pre-defined shadow value",
    tiddlerLinkTooltip: "%0 - %1, %2",
    externalLinkTooltip: "External link to %0",
    noTags: "There are no tagged tiddlers",
    macroError: "Error in macro <<\%0>>",
    macroErrorDetails: "Error while executing macro <<\%0>>:\n%1",
    missingMacro: "No such macro",
    overwriteWarning: "A tiddler named '%0' already exists. Choose OK to overwrite it",
    confirmExit: "If you continue you will lose your unsaved edit(s).",
    saveInstructions: "SaveChanges",
    unsupportedTWFormat: "Unsupported TiddlyWiki format '%0'",
    tiddlerSaveError: "Error when saving tiddler '%0'",
    tiddlerLoadError: "Error when loading tiddler '%0'",
    wrongSaveFormat: "Cannot save with storage format '%0'. Using standard format for save.",
    invalidFieldName: "Invalid field name %0",
    fieldCannotBeChanged: "Field '%0' cannot be changed",
    loadingMissingTiddler: "Attempting to retrieve the tiddler '%0' from the '%1' server at:\n\n'%2' in the workspace '%3'",
    upgradeDone: "The upgrade to version %0 is now complete\n\nClick 'OK' to reload the newly upgraded TiddlyWiki",
    sizeTemplates:
        [
        { unit: 1024 * 1024 * 1024, template: "%0\u00a0GB" },
        { unit: 1024 * 1024, template: "%0\u00a0MB" },
        { unit: 1024, template: "%0\u00a0KB" },
        { unit: 1, template: "%0\u00a0B" }
        ]
};

// Options that can be set in the options panel and/or cookies
config.options = {
    chkRegExpSearch: false,
    chkCaseSensitiveSearch: false,
    chkIncrementalSearch: true,
    chkAnimate: true,
    chkGenerateAnRssFeed: false,
    chkSaveEmptyTemplate: false,
    chkOpenInNewWindow: true,
    chkToggleLinks: false,
    chkHttpReadOnly: true,
    chkForceMinorUpdate: false,
    chkConfirmDelete: true,
    chkInsertTabs: false,
    chkUsePreForStorage: true, // Whether to use <pre> format for storage
    chkDisplayInstrumentation: false,
    txtBackupFolder: "",
    txtEditorFocus: "text",
    txtMainTab: "tabTimeline",
    txtMoreTab: "moreTabAll",
    txtMaxEditRows: "30",
    txtTheme: "",
    txtEmptyTiddlyWiki: "http://localhost/static/empty.html", // Template for stand-alone export
    txtUserName: ""
};

config.optionsDesc = {
    // Options that can be set in the options panel and/or cookies
    txtUserName: "Username for signing your edits",
    chkRegExpSearch: "Enable regular expressions for searches",
    chkCaseSensitiveSearch: "Case-sensitive searching",
    chkIncrementalSearch: "Incremental key-by-key searching",
    chkAnimate: "Enable animations",
    chkGenerateAnRssFeed: "Generate an RSS feed when saving changes",
    chkSaveEmptyTemplate: "Generate an empty template when saving changes",
    chkOpenInNewWindow: "Open external links in a new window",
    chkToggleLinks: "Clicking on links to open tiddlers causes them to close",
    chkHttpReadOnly: "Hide editing features when viewed over HTTP",
    chkForceMinorUpdate: "Don't update modifier username and date when editing tiddlers",
    chkConfirmDelete: "Require confirmation before deleting tiddlers",
    chkInsertTabs: "Use the tab key to insert tab characters instead of moving between fields",
    txtBackupFolder: "Name of folder to use for backups",
    txtEmptyTiddlyWiki: "Source template (empty.html) for downloaded TiddlyWiki's",
    txtMaxEditRows: "Maximum number of rows in edit boxes"
};

// Default tiddler templates
var DEFAULT_VIEW_TEMPLATE = 1;
var DEFAULT_EDIT_TEMPLATE = 2;
config.tiddlerTemplates = {
    1: "ViewTemplate",
    2: "EditTemplate"
};

// More messages (rather a legacy layout that should not really be like this)
config.views = {
    wikified: {
        defaultText: "The tiddler '%0' doesn't yet exist. Double-click to create it, or to create a new page named %0, <script label=\"click here.\" title=\"Create page\">wikify(store.getTiddlerText(\"CreateNewPage\"), place);</script>",
        defaultModifier: "(missing)",
        shadowModifier: "(special tiddler)",
        dateFormat: "DD MMM YYYY",
        createdPrompt: "created",
        tag: {
            labelNoTags: "no tags",
            labelTags: "tags: ",
            openTag: "Open tag '%0'",
            tooltip: "Show tiddlers tagged with '%0'",
            openAllText: "Open all",
            openAllTooltip: "Open all of these tiddlers",
            popupNone: "No other tiddlers tagged with '%0'"
            }
        },
    editor: {
        tagPrompt: "Type tags separated with spaces, [[use double square brackets]] if necessary, or add existing",
        defaultText: "",
        tagChooser: {
            text: "tags",
            tooltip: "Choose existing tags to add to this tiddler",
            popupNone: "There are no tags defined",
            tagTooltip: "Add the tag '%0'"
            }
    }
};

// Macros; each has a 'handler' member that is inserted later
config.macros = {
    today: {},
    version: {},
    search: {
        sizeTextbox: 15,
        label: "search",
        prompt: "Search this TiddlyWiki",
        accessKey: "F",
        successMsg: "%0 tiddlers found matching %1",
        failureMsg: "No tiddlers found matching %0"
        },
    tiddler: {},
    tag: {},
    tags: {},
    tagging: {
        label: "tagging: ",
        labelNotTag: "not tagging",
        tooltip: "List of tiddlers tagged with '%0'"
    },
    timeline: {
        dateFormat: "DD MMM YYYY"
    },
    allTags: {
        tooltip: "Show tiddlers tagged with '%0'",
        noTags: "There are no tagged tiddlers"
    },
    list: {
        all: {},
        missing: {},
        orphans: {},
        shadowed: {},
        touched: {},
        filter: {}
    },
    closeAll: {
        label: "close all",
        prompt: "Close all displayed tiddlers (except any that are being edited)"
    },
    comments: {
        listLabel: "%0 comments",
        listPrompt: "List comments",
        notesLabel: "%0 notes",
        messagesLabel: "%0 messages",
        listPrompt: "List notes",
        addCommentLabel: "add comment",
        addCommentPrompt: "comment on above",
        addMessageLabel: "add message",
        addMessagePrompt: "message to author",
        addNoteLabel: "add note",
        addNotePrompt: "add personal note"
    },
    slider: {},
    option: {},
    options: {
        wizardTitle: "Tweak advanced options",
        step1Title: "These options are saved in cookies in your browser",
        step1Html: "<input type='hidden' name='markList'></input><br><input type='checkbox' checked='false' name='chkUnknown'>Show unknown options</input>",
        unknownDescription: "//(unknown)//",
        listViewTemplate: {
            columns: [
                { name: 'Option', field: 'option', title: "Option", type: 'String' },
                { name: 'Description', field: 'description', title: "Description", type: 'WikiText' },
                { name: 'Name', field: 'name', title: "Name", type: 'String' }
                ],
            rowClasses: [
                { className: 'lowlight', field: 'lowlight' }
                ]
        }
    },
    newTiddler: {
        label: "new tiddler",
        prompt: "Create a new tiddler",
        title: "New Tiddler",
        accessKey: "N"
    },
    newJournal: {
        label: "new journal",
        prompt: "Create a new tiddler from the current date and time",
        accessKey: "J"
    },
    tabs: {},
    gradient: {},
    message: {},
    view: { defaultView: "text" },
    edit: {},
    tagChooser: {},
    toolbar: {
        moreLabel: "more",
        morePrompt: "Reveal further commands"
    },
    refreshDisplay: {
        label: "refresh",
        prompt: "Redraw the entire TiddlyWiki display"
    },
    importTiddlers: {},
    upgrade: {
        source: "http://www.tiddlywiki.com/upgrade/",
        backupExtension: "pre.core.upgrade"
    },
    sync: {},
    annotations: {}
};

// Commands supported by the toolbar macro
config.commands = {
    closeTiddler: {
        text: "close",
        tooltip: "Close this tiddler"
    },
    closeOthers: {
        text: "close others",
        tooltip: "Close all other tiddlers"
    },
    editTiddler: {
        text: "edit",
        tooltip: "Edit this tiddler",
        readOnlyText: "view",
        readOnlyTooltip: "View the source of this tiddler"
    },
    saveTiddler: {
        hideReadOnly: true,
        text: "done",
        tooltip: "Save changes to this tiddler"
    },
    cancelTiddler: {
        text: "cancel",
        tooltip: "Undo changes to this tiddler",
        warning: "Are you sure you want to abandon your changes to '%0'?",
        readOnlyText: "done",
        readOnlyTooltip: "View this tiddler normally"
    },
    deleteTiddler: { 
        hideReadOnly: true,
        text: "delete",
        tooltip: "Delete this tiddler",
        warning: "Are you sure you want to delete '%0'?"
    },
    permalink: {
        text: "permalink",
        tooltip: "Permalink for this tiddler"
    },
    references: {
        type: "popup",
        text: "references",
        tooltip: "Show tiddlers that link to this one",
        popupNone: "No references"
    },
    jump: {
        type: "popup",
        text: "jump",
        tooltip: "Jump to another open tiddler"
    },
    preview: {
        text: "preview",
        tooltip: "Preview formattet text"
    },
    reload: {
        text: "reload",
        tooltip: "Reload this tiddler to execute any macros again"
    },
    tag: {
        text: "tag",
        tooltip: "Add tags"
    },
    help: {
        text: "help",
        tooltip: "Display formatting help"
    },
    syncing: { type: "popup" },
    fields: {
        type: "popup",
        text: "fields",
        tooltip: "Show the extended fields of this tiddler",
        emptyText: "There are no extended fields for this tiddler",
        listViewTemplate: {
            columns: [
                { name: 'Field', field: 'field', title: "Field", type: 'String' },
                { name: 'Value', field: 'value', title: "Value", type: 'String' }
                ],
            rowClasses: [
                ],
            buttons: [
                ]
        }
    }
};

// Browser detection... In a very few places, there's nothing else for it but to know what browser we're using.
config.userAgent = navigator.userAgent.toLowerCase();
config.browser = {
    isIE: config.userAgent.indexOf("msie") != -1 && config.userAgent.indexOf("opera") == -1,
    isGecko: config.userAgent.indexOf("gecko") != -1,
    ieVersion: /MSIE (\d.\d)/i.exec(config.userAgent), // config.browser.ieVersion[1], if it exists, will be the IE version string, eg "6.0"
    isSafari: config.userAgent.indexOf("applewebkit") != -1,
    isBadSafari: !((new RegExp("[\u0150\u0170]", "g")).test("\u0150")),
    firefoxDate: /gecko\/(\d{8})/i.exec(config.userAgent), // config.browser.firefoxDate[1], if it exists, will be Firefox release date as "YYYYMMDD"
    isOpera: config.userAgent.indexOf("opera") != -1,
    isLinux: config.userAgent.indexOf("linux") != -1,
    isUnix: config.userAgent.indexOf("x11") != -1,
    isMac: config.userAgent.indexOf("mac") != -1,
    isWindows: config.userAgent.indexOf("win") != -1
};

// Basic regular expressions
config.textPrimitives = {
    upperLetter: "[A-Z\u00c0-\u00de\u0150\u0170]",
    lowerLetter: "[a-z0-9_\\-\u00df-\u00ff\u0151\u0171]",
    anyLetter: "[A-Za-z0-9_\\-\u00c0-\u00de\u00df-\u00ff\u0150\u0170\u0151\u0171]",
    anyLetterStrict: "[A-Za-z0-9\u00c0-\u00de\u00df-\u00ff\u0150\u0170\u0151\u0171]"
};
if (config.browser.isBadSafari) {
    config.textPrimitives = {
        upperLetter: "[A-Z\u00c0-\u00de]",
        lowerLetter: "[a-z0-9_\\-\u00df-\u00ff]",
        anyLetter: "[A-Za-z0-9_\\-\u00c0-\u00de\u00df-\u00ff]",
        anyLetterStrict: "[A-Za-z0-9\u00c0-\u00de\u00df-\u00ff]"
    };
}

config.textPrimitives.sliceSeparator = "::";
config.textPrimitives.sectionSeparator = "##";
config.textPrimitives.urlPattern = "(?:file|http|https|mailto|ftp|irc|news|data):[^\\s'\"]+(?:/|\\b)";
config.textPrimitives.unWikiLink = "~";
config.textPrimitives.wikiLink = "(?:(?:" + config.textPrimitives.upperLetter + "+" +
    config.textPrimitives.lowerLetter + "+" +
    config.textPrimitives.upperLetter +
    config.textPrimitives.anyLetter + "*)|(?:" +
    config.textPrimitives.upperLetter + "{2,}" +
    config.textPrimitives.lowerLetter + "+))";

config.textPrimitives.cssLookahead = "(?:(" + config.textPrimitives.anyLetter + "+)\\(([^\\)\\|\\n]+)(?:\\):))|(?:(" + config.textPrimitives.anyLetter + "+):([^;\\|\\n]+);)";
config.textPrimitives.cssLookaheadRegExp = new RegExp(config.textPrimitives.cssLookahead, "mg");

config.textPrimitives.brackettedLink = "\\[\\[([^\\]]+)\\]\\]";
config.textPrimitives.titledBrackettedLink = "\\[\\[([^\\[\\]\\|]+)\\|([^\\[\\]\\|]+)\\]\\]";
config.textPrimitives.tiddlerForcedLinkRegExp = new RegExp("(?:" + config.textPrimitives.titledBrackettedLink + ")|(?:" +
    config.textPrimitives.brackettedLink + ")|(?:" +
    config.textPrimitives.urlPattern + ")", "mg");
config.textPrimitives.tiddlerAnyLinkRegExp = new RegExp("(" + config.textPrimitives.wikiLink + ")|(?:" +
    config.textPrimitives.titledBrackettedLink + ")|(?:" +
    config.textPrimitives.brackettedLink + ")|(?:" +
    config.textPrimitives.urlPattern + ")", "mg");

config.glyphs = {
    browsers: [
        function() { return config.browser.isIE; },
        function() { return true; }
    ],
    currBrowser: null,
    codes: {
        downTriangle: ["\u25BC", "\u25BE"],
        downArrow: ["\u2193", "\u2193"],
        bentArrowLeft: ["\u2190", "\u21A9"],
        bentArrowRight: ["\u2192", "\u21AA"]
    }
};

//--
//-- Shadow tiddlers
//--

config.shadowTiddlers = {
    HttpMethods: "createPage\nsaveTiddler\ndeleteTiddler\ntiddlerHistory\ntiddlerVersion\ngetLoginUrl\npageProperties\ndeletePage\ngetNewAddress\nsubmitComment\ngetComments\ngetNotes\ngetMessages\ngetTiddler\ngetTiddlers\nfileList\ngetRecentChanges\nsiteMap\ngetGroups\ncreateGroup\ngetGroupMembers\naddGroupMember\nremoveGroupMember",
    StyleSheet: "",
    TabTimeline: '<<timeline>>',
    TabAll: '<<list all>>',
    TabTags: '<<allTags excludeLists>>',
    TabMoreMissing: '<<list missing>>',
    TabMoreOrphans: '<<list orphans>>',
    TabMoreShadowed: '<<list shadowed>>',
    AdvancedOptions: '<<options>>',
    ToolbarCommands: '|~ViewToolbar|closeTiddler closeOthers +editTiddler reload > fields syncing permalink references jump|\n|~EditToolbar|+saveTiddler -cancelTiddler deleteTiddler|\n|~TextToolbar|preview tag help|',
    DefaultTiddlers: "[[GettingStarted]]",
    MainMenu: "[[GettingStarted]]<br>[[SiteMap]]<br>[[RecentChanges]]",
    SiteTitle: "SiteTitle",
    SiteSubtitle: "",
    SiteUrl: "http://giewiki.appspot.com/",
    SideBarOptions: '<<login>><<search>><<closeAll>><<menu edit EditingMenu "Editing menu" e !readOnly>><<slider chkSliderOptionsPanel OptionsPanel "options \u00bb" "Change TiddlyWiki advanced options">>',
    SideBarTabs: '<<tabs txtMainTab "Timeline" "Timeline" TabTimeline "All" "All tiddlers" TabAll "Tags" "All tags" TabTags "More" "More lists" TabMore>>',
    TabMore: '<<tabs txtMoreTab "Missing" "Missing tiddlers" TabMoreMissing "Orphans" "Orphaned tiddlers" TabMoreOrphans "Special" "Special tiddlers" TabMoreShadowed>>'
};

// Strings in "double quotes" should be translated; strings in 'single quotes' should be left alone

config.messages.dates.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
config.messages.dates.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
config.messages.dates.shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
config.messages.dates.shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// suffixes for dates, eg "1st","2nd","3rd"..."30th","31st"
config.messages.dates.daySuffixes = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
        "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
        "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
        "st"];
config.messages.dates.am = "am";
config.messages.dates.pm = "pm";

config.macros.list.all.prompt = "All tiddlers in alphabetical order";
config.macros.list.missing.prompt = "Tiddlers that have links to them but are not defined";
config.macros.list.orphans.prompt = "Tiddlers that are not linked to from any other tiddlers";
config.macros.list.shadowed.prompt = "Special purpose tiddlers with default contents";
config.macros.list.touched.prompt = "Tiddlers that have been modified locally";

//--
//-- Main
//--

var params = null; // Command line parameters
var store = null; // TiddlyWiki storage
var story = null; // Main story
var formatter = null; // Default formatters for the wikifier
var anim = typeof Animator == "function" ? new Animator() : null; // Animation engine
var readOnly = false; // Whether we're in readonly mode
var highlightHack = null; // Embarrassing hack department...
var hadConfirmExit = false; // Don't warn more than once
var safeMode = false; // Disable all plugins and cookies
var installedPlugins = []; // Information filled in when plugins are executed
var startingUp = false; // Whether we're in the process of starting up
var pluginInfo, tiddler; // Used to pass information to plugins in loadPlugins()

config.read = function(t) {
	fields = t.fields;
    this.owner = fields.owner;
    this.anonAccess = fields.anonaccess;
    this.authAccess = fields.authaccess;
    this.groupAccess = fields.groupaccess;
    this.groups = fields.groups;
    this.pages = this.readPages(t.ace);
    SetUserName(fields.username,fields.groupmember);
}

config.readPages = function(pgs) {
	var a = [];
	if (pgs) 
	  for (var i=0; i<pgs.length; i++) {
		try {
		switch (pgs[i].getAttribute("title")) {
		  case "pages":
			var pages = pgs[i].childNodes;
			for (var j=0; j<pages.length; j++) {
			  var hr = pages[j].href;
			  if (hr)
				a[hr.split('/').pop()] = pages[j];
			}
			break;
		  }
		}
		catch (ex)
		{
		}
	  }
	return a;
}

// Starting up
function main() {
    startingUp = true;
    window.onbeforeunload = function(e) { if (window.confirmExit) return confirmExit(); };
    params = getParameters();
    if (params)
        params = params.parseParams("open", null, false);
    store = new TiddlyWiki();
    invokeParamifier(params, "oninit");
    story = new Story("tiddlerDisplay", "tiddler");
    addEvent(document, "click", Popup.onDocumentClick);
    loadOptionsCookie();
    for (var s = 0; s < config.notifyTiddlers.length; s++)
        store.addNotification(config.notifyTiddlers[s].name, config.notifyTiddlers[s].notify);
    loadShadowTiddlers();

    store.loadFromDiv("storeArea", "store", true);
    
    invokeParamifier(params, "onload");
    readOnly = false;
    
    config.read(store.fetchTiddler("_MetaData"));
    http._init(store.getTiddlerText("HttpMethods").split('\n'));

    var pluginProblem = loadPlugins();
    formatter = new Formatter(config.formatters);
    invokeParamifier(params, "onconfig");
    story.switchTheme(config.options.txtTheme);
    store.notifyAll();
    restart();
    refreshDisplay();
    if (pluginProblem) {
        story.displayTiddler(null, "PluginManager");
        displayMessage(config.messages.customConfigError);
    }
    for (var m in config.macros) {
        if (config.macros[m].init)
            config.macros[m].init();
    }
    startingUp = false;
}

// Restarting
function restart() {
    invokeParamifier(params, "onstart");
    if (story.isEmpty()) {
        if (config.owner == null)
            story.displayTiddler(null, "PageProperties");
        else
            story.displayDefaultTiddlers();
    }
    window.scrollTo(0, 0);
}

function loadShadowTiddlers() {
	var ms = function(t) { 
		t.version = t.currentVer = 0; 
		t.hasShadow = true; 
		t.modifier = config.views.wikified.shadowModifier; 
		t.created = null; 
		t.modified = null; 
		return t; 
	} 
    store.loadFromDiv("shadowArea", "shadows", true, ms);
    for(t in config.shadowTiddlers) {
		store.addTiddler(ms(new Tiddler(t,0,config.shadowTiddlers[t])));
	}
}

function loadPlugins() {
    if (safeMode)
        return false;
    var tiddlers = store.getTaggedTiddlers("systemConfig");
    var toLoad = [];
    var nLoaded = 0;
    var map = {};
    var nPlugins = tiddlers.length;
    installedPlugins = [];
    for (var i = 0; i < nPlugins; i++) {
        var p = getPluginInfo(tiddlers[i]);
        installedPlugins[i] = p;
        var n = p.Name;
        if (n)
            map[n] = p;
        n = p.Source;
        if (n)
            map[n] = p;
    }
    var visit = function(p) {
        if (!p || p.done)
            return;
        p.done = 1;
        var reqs = p.Requires;
        if (reqs) {
            reqs = reqs.readBracketedList();
            for (var i = 0; i < reqs.length; i++)
                visit(map[reqs[i]]);
        }
        toLoad.push(p);
    };
    for (i = 0; i < nPlugins; i++)
        visit(installedPlugins[i]);
    for (i = 0; i < toLoad.length; i++) {
        p = toLoad[i];
        pluginInfo = p;
        tiddler = p.tiddler;
        if (isPluginExecutable(p)) {
            if (isPluginEnabled(p)) {
                p.executed = true;
                var startTime = new Date();
                try {
                    if (tiddler.text)
                        window.eval(tiddler.text);
                    nLoaded++;
                } catch (ex) {
                    p.log.push(config.messages.pluginError.format([exceptionText(ex)]));
                    p.error = true;
                }
                pluginInfo.startupTime = String((new Date()) - startTime) + "ms";
            } else {
                nPlugins--;
            }
        } else {
            p.warning = true;
        }
    }
    return nLoaded != nPlugins;
}

function getPluginInfo(tiddler) {
    var p = store.getTiddlerSlices(tiddler.title, ["Name", "Description", "Version", "Requires", "CoreVersion", "Date", "Source", "Author", "License", "Browsers"]);
    p.tiddler = tiddler;
    p.title = tiddler.title;
    p.log = [];
    return p;
}

// Check that a particular plugin is valid for execution
function isPluginExecutable(plugin) {
    if (plugin.tiddler.isTagged("systemConfigForce")) {
        plugin.log.push(config.messages.pluginForced);
        return true;
    }
    if (plugin["CoreVersion"]) {
        var coreVersion = plugin["CoreVersion"].split(".");
        var w = parseInt(coreVersion[0], 10) - version.major;
        if (w == 0 && coreVersion[1])
            w = parseInt(coreVersion[1], 10) - version.minor;
        if (w == 0 && coreVersion[2])
            w = parseInt(coreVersion[2], 10) - version.revision;
        if (w > 0) {
            plugin.log.push(config.messages.pluginVersionError);
            return false;
        }
    }
    return true;
}

function isPluginEnabled(plugin) {
    if (plugin.tiddler.isTagged("systemConfigDisable")) {
        plugin.log.push(config.messages.pluginDisabled);
        return false;
    }
    return true;
}

function invokeMacro(place, macro, params, wikifier, tiddler) {
    try {
        var m = config.macros[macro];
        if (m && m.handler)
            m.handler(place, macro, params.readMacroParams(), wikifier, params, tiddler);
        else
            createTiddlyError(place, config.messages.macroError.format([macro]), config.messages.macroErrorDetails.format([macro, config.messages.missingMacro]));
    } catch (ex) {
        createTiddlyError(place, config.messages.macroError.format([macro]), config.messages.macroErrorDetails.format([macro, ex.toString()]));
    }
}

//--
//-- Paramifiers
//--

function getParameters() {
    var p = null;
    if (window.location.hash) {
        p = decodeURIComponent(window.location.hash.substr(1));
    }
    return p;
}

function invokeParamifier(params, handler) {
    if (!params || params.length == undefined || params.length <= 1)
        return;
    for (var t = 1; t < params.length; t++) {
        var p = config.paramifiers[params[t].name];
        if (p && p[handler] instanceof Function)
            p[handler](params[t].value);
    }
}

config.paramifiers = {};

config.paramifiers.start = {
    oninit: function(v) {
        safeMode = v.toLowerCase() == "safe";
    }
};

config.paramifiers.open = {
    onstart: function(v) {
        if (!readOnly || store.tiddlerExists(v) || store.isShadowTiddler(v))
            story.displayTiddler("bottom", v, null, false, null);
    }
};

config.paramifiers.story = {
    onstart: function(v) {
        var list = store.getTiddlerText(v, "").parseParams("open", null, false);
        invokeParamifier(list, "onstart");
    }
};

config.paramifiers.search = {
    onstart: function(v) {
        story.search(v, false, false);
    }
};

config.paramifiers.searchRegExp = {
    onstart: function(v) {
        story.prototype.search(v, false, true);
    }
};

config.paramifiers.tag = {
    onstart: function(v) {
        story.displayTiddlers(null, store.filterTiddlers("[tag[" + v + "]]"), null, false, null);
    }
};

config.paramifiers.newTiddler = {
    onstart: function(v) {
        if (!readOnly) {
            story.displayTiddler(null, v, DEFAULT_EDIT_TEMPLATE);
            story.focusTiddler(v, "text");
        }
    }
};

config.paramifiers.newJournal = {
    onstart: function(v) {
        if (!readOnly) {
            var now = new Date();
            var title = now.formatString(v.trim());
            story.displayTiddler(null, title, DEFAULT_EDIT_TEMPLATE);
            story.focusTiddler(title, "text");
        }
    }
};

config.paramifiers.readOnly = {
    onconfig: function(v) {
        var p = v.toLowerCase();
        readOnly = p == "yes" ? true : (p == "no" ? false : readOnly);
    }
};

config.paramifiers.theme = {
    onconfig: function(v) {
        story.switchTheme(v);
    }
};

config.paramifiers.upgrade = {
    onstart: function(v) {
        upgradeFrom(v);
    }
};

config.paramifiers.recent = {
    onstart: function(v) {
        var titles = [];
        var tiddlers = store.getTiddlers("modified", "excludeLists").reverse();
        for (var i = 0; i < v && i < tiddlers.length; i++)
            titles.push(tiddlers[i].title);
        story.displayTiddlers(null, titles);
    }
};

config.paramifiers.filter = {
    onstart: function(v) {
        story.displayTiddlers(null, store.filterTiddlers(v), null, false);
    }
};

//--
//-- Formatter helpers
//--

function Formatter(formatters) {
    this.formatters = [];
    var pattern = [];
    for (var n = 0; n < formatters.length; n++) {
        pattern.push("(" + formatters[n].match + ")");
        this.formatters.push(formatters[n]);
    }
    this.formatterRegExp = new RegExp(pattern.join("|"), "mg");
}

config.formatterHelpers = {

    createElementAndWikify: function(w) {
        w.subWikifyTerm(createTiddlyElement(w.output, this.element), this.termRegExp);
    },

    inlineCssHelper: function(w) {
        var styles = [];
        config.textPrimitives.cssLookaheadRegExp.lastIndex = w.nextMatch;
        var lookaheadMatch = config.textPrimitives.cssLookaheadRegExp.exec(w.source);
        while (lookaheadMatch && lookaheadMatch.index == w.nextMatch) {
            var s, v;
            if (lookaheadMatch[1]) {
                s = lookaheadMatch[1].unDash();
                v = lookaheadMatch[2];
            } else {
                s = lookaheadMatch[3].unDash();
                v = lookaheadMatch[4];
            }
            if (s == "bgcolor")
                s = "backgroundColor";
            styles.push({ style: s, value: v });
            w.nextMatch = lookaheadMatch.index + lookaheadMatch[0].length;
            config.textPrimitives.cssLookaheadRegExp.lastIndex = w.nextMatch;
            lookaheadMatch = config.textPrimitives.cssLookaheadRegExp.exec(w.source);
        }
        return styles;
    },

    applyCssHelper: function(e, styles) {
        for (var t = 0; t < styles.length; t++) {
            try {
                e.style[styles[t].style] = styles[t].value;
            } catch (ex) {
            }
        }
    },

    enclosedTextHelper: function(w) {
        this.lookaheadRegExp.lastIndex = w.matchStart;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        if (lookaheadMatch && lookaheadMatch.index == w.matchStart) {
            var text = lookaheadMatch[1];
            if (config.browser.isIE)
                text = text.replace(/\n/g, "\r");
            createTiddlyElement(w.output, this.element, null, null, text);
            w.nextMatch = lookaheadMatch.index + lookaheadMatch[0].length;
        }
    },

    isExternalLink: function(link) {
        if (store.tiddlerExists(link) || store.isShadowTiddler(link)) {
            return false;
        }
        var urlRegExp = new RegExp(config.textPrimitives.urlPattern, "mg");
        if (urlRegExp.exec(link)) {
            return true;
        }
        if (link.indexOf(".") != -1 || link.indexOf("\\") != -1 || link.indexOf("/") != -1 || link.indexOf("#") != -1) {
            return true;
        }
        return false;
    }

};

//--
//-- Standard formatters
//--

config.formatters = [
{
    name: "table",
    match: "^\\|(?:[^\\n]*)\\|(?:[fhck]?)$",
    lookaheadRegExp: /^\|([^\n]*)\|([fhck]?)$/mg,
    rowTermRegExp: /(\|(?:[fhck]?)$\n?)/mg,
    cellRegExp: /(?:\|([^\n\|]*)\|)|(\|[fhck]?$\n?)/mg,
    cellTermRegExp: /((?:\x20*)\|)/mg,
    rowTypes: { "c": "caption", "h": "thead", "": "tbody", "f": "tfoot" },
    handler: function(w) {
        var table = createTiddlyElement(w.output, "table", null, "twtable");
        var prevColumns = [];
        var currRowType = null;
        var rowContainer;
        var rowCount = 0;
        w.nextMatch = w.matchStart;
        this.lookaheadRegExp.lastIndex = w.nextMatch;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        while (lookaheadMatch && lookaheadMatch.index == w.nextMatch) {
            var nextRowType = lookaheadMatch[2];
            if (nextRowType == "k") {
                table.className = lookaheadMatch[1];
                w.nextMatch += lookaheadMatch[0].length + 1;
            } else {
                if (nextRowType != currRowType) {
                    rowContainer = createTiddlyElement(table, this.rowTypes[nextRowType]);
                    currRowType = nextRowType;
                }
                if (currRowType == "c") {
                    // Caption
                    w.nextMatch++;
                    if (rowContainer != table.firstChild)
                        table.insertBefore(rowContainer, table.firstChild);
                    rowContainer.setAttribute("align", rowCount == 0 ? "top" : "bottom");
                    w.subWikifyTerm(rowContainer, this.rowTermRegExp);
                } else {
                    var theRow = createTiddlyElement(rowContainer, "tr", null, (rowCount & 1) ? "oddRow" : "evenRow");
                    theRow.onmouseover = function() { addClass(this, "hoverRow"); };
                    theRow.onmouseout = function() { removeClass(this, "hoverRow"); };
                    this.rowHandler(w, theRow, prevColumns);
                    rowCount++;
                }
            }
            this.lookaheadRegExp.lastIndex = w.nextMatch;
            lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        }
    },
    rowHandler: function(w, e, prevColumns) {
        var col = 0;
        var colSpanCount = 1;
        var prevCell = null;
        this.cellRegExp.lastIndex = w.nextMatch;
        var cellMatch = this.cellRegExp.exec(w.source);
        while (cellMatch && cellMatch.index == w.nextMatch) {
            if (cellMatch[1] == "~") {
                // Rowspan
                var last = prevColumns[col];
                if (last) {
                    last.rowSpanCount++;
                    last.element.setAttribute("rowspan", last.rowSpanCount);
                    last.element.setAttribute("rowSpan", last.rowSpanCount); // Needed for IE
                    last.element.valign = "center";
                }
                w.nextMatch = this.cellRegExp.lastIndex - 1;
            } else if (cellMatch[1] == ">") {
                // Colspan
                colSpanCount++;
                w.nextMatch = this.cellRegExp.lastIndex - 1;
            } else if (cellMatch[2]) {
                // End of row
                if (prevCell && colSpanCount > 1) {
                    prevCell.setAttribute("colspan", colSpanCount);
                    prevCell.setAttribute("colSpan", colSpanCount); // Needed for IE
                }
                w.nextMatch = this.cellRegExp.lastIndex;
                break;
            } else {
                // Cell
                w.nextMatch++;
                var styles = config.formatterHelpers.inlineCssHelper(w);
                var spaceLeft = false;
                var chr = w.source.substr(w.nextMatch, 1);
                while (chr == " ") {
                    spaceLeft = true;
                    w.nextMatch++;
                    chr = w.source.substr(w.nextMatch, 1);
                }
                var cell;
                if (chr == "!") {
                    cell = createTiddlyElement(e, "th");
                    w.nextMatch++;
                } else {
                    cell = createTiddlyElement(e, "td");
                }
                prevCell = cell;
                prevColumns[col] = { rowSpanCount: 1, element: cell };
                if (colSpanCount > 1) {
                    cell.setAttribute("colspan", colSpanCount);
                    cell.setAttribute("colSpan", colSpanCount); // Needed for IE
                    colSpanCount = 1;
                }
                config.formatterHelpers.applyCssHelper(cell, styles);
                w.subWikifyTerm(cell, this.cellTermRegExp);
                if (w.matchText.substr(w.matchText.length - 2, 1) == " ") // spaceRight
                    cell.align = spaceLeft ? "center" : "left";
                else if (spaceLeft)
                    cell.align = "right";
                w.nextMatch--;
            }
            col++;
            this.cellRegExp.lastIndex = w.nextMatch;
            cellMatch = this.cellRegExp.exec(w.source);
        }
    }
},

{
    name: "heading",
    match: "^!{1,6}",
    termRegExp: /(\n)/mg,
    handler: function(w) {
        w.subWikifyTerm(createTiddlyElement(w.output, "h" + w.matchLength), this.termRegExp);
    }
},

{
    name: "list",
    match: "^(?:[\\*#;:]+)",
    lookaheadRegExp: /^(?:(?:(\*)|(#)|(;)|(:))+)/mg,
    termRegExp: /(\n)/mg,
    handler: function(w) {
        var stack = [w.output];
        var currLevel = 0, currType = null;
        var listLevel, listType, itemType, baseType;
        w.nextMatch = w.matchStart;
        this.lookaheadRegExp.lastIndex = w.nextMatch;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        while (lookaheadMatch && lookaheadMatch.index == w.nextMatch) {
            if (lookaheadMatch[1]) {
                listType = "ul";
                itemType = "li";
            } else if (lookaheadMatch[2]) {
                listType = "ol";
                itemType = "li";
            } else if (lookaheadMatch[3]) {
                listType = "dl";
                itemType = "dt";
            } else if (lookaheadMatch[4]) {
                listType = "dl";
                itemType = "dd";
            }
            if (!baseType)
                baseType = listType;
            listLevel = lookaheadMatch[0].length;
            w.nextMatch += lookaheadMatch[0].length;
            var t;
            if (listLevel > currLevel) {
                for (t = currLevel; t < listLevel; t++) {
                    var target = (currLevel == 0) ? stack[stack.length - 1] : stack[stack.length - 1].lastChild;
                    stack.push(createTiddlyElement(target, listType));
                }
            } else if (listType != baseType && listLevel == 1) {
                w.nextMatch -= lookaheadMatch[0].length;
                return;
            } else if (listLevel < currLevel) {
                for (t = currLevel; t > listLevel; t--)
                    stack.pop();
            } else if (listLevel == currLevel && listType != currType) {
                stack.pop();
                stack.push(createTiddlyElement(stack[stack.length - 1].lastChild, listType));
            }
            currLevel = listLevel;
            currType = listType;
            var e = createTiddlyElement(stack[stack.length - 1], itemType);
            w.subWikifyTerm(e, this.termRegExp);
            this.lookaheadRegExp.lastIndex = w.nextMatch;
            lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        }
    }
},

{
    name: "quoteByBlock",
    match: "^<<<\\n",
    termRegExp: /(^<<<(\n|$))/mg,
    element: "blockquote",
    handler: config.formatterHelpers.createElementAndWikify
},

{
    name: "quoteByLine",
    match: "^>+",
    lookaheadRegExp: /^>+/mg,
    termRegExp: /(\n)/mg,
    element: "blockquote",
    handler: function(w) {
        var stack = [w.output];
        var currLevel = 0;
        var newLevel = w.matchLength;
        var t;
        do {
            if (newLevel > currLevel) {
                for (t = currLevel; t < newLevel; t++)
                    stack.push(createTiddlyElement(stack[stack.length - 1], this.element));
            } else if (newLevel < currLevel) {
                for (t = currLevel; t > newLevel; t--)
                    stack.pop();
            }
            currLevel = newLevel;
            w.subWikifyTerm(stack[stack.length - 1], this.termRegExp);
            createTiddlyElement(stack[stack.length - 1], "br");
            this.lookaheadRegExp.lastIndex = w.nextMatch;
            var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
            var matched = lookaheadMatch && lookaheadMatch.index == w.nextMatch;
            if (matched) {
                newLevel = lookaheadMatch[0].length;
                w.nextMatch += lookaheadMatch[0].length;
            }
        } while (matched);
    }
},

{
    name: "rule",
    match: "^----+$\\n?",
    handler: function(w) {
        createTiddlyElement(w.output, "hr");
    }
},

{
    name: "monospacedByLine",
    match: "^(?:/\\*\\{\\{\\{\\*/|\\{\\{\\{|//\\{\\{\\{|<!--\\{\\{\\{-->)\\n",
    element: "pre",
    handler: function(w) {
        switch (w.matchText) {
            case "/*{{{*/\n": // CSS
                this.lookaheadRegExp = /\/\*\{\{\{\*\/\n*((?:^[^\n]*\n)+?)(\n*^\/\*\}\}\}\*\/$\n?)/mg;
                break;
            case "{{{\n": // monospaced block
                this.lookaheadRegExp = /^\{\{\{\n((?:^[^\n]*\n)+?)(^\}\}\}$\n?)/mg;
                break;
            case "//{{{\n": // plugin
                this.lookaheadRegExp = /^\/\/\{\{\{\n\n*((?:^[^\n]*\n)+?)(\n*^\/\/\}\}\}$\n?)/mg;
                break;
            case "<!--{{{-->\n": //template
                this.lookaheadRegExp = /<!--\{\{\{-->\n*((?:^[^\n]*\n)+?)(\n*^<!--\}\}\}-->$\n?)/mg;
                break;
            default:
                break;
        }
        config.formatterHelpers.enclosedTextHelper.call(this, w);
    }
},

{
    name: "wikifyComment",
    match: "^(?:/\\*\\*\\*|<!---)\\n",
    handler: function(w) {
        var termRegExp = (w.matchText == "/***\n") ? (/(^\*\*\*\/\n)/mg) : (/(^--->\n)/mg);
        w.subWikifyTerm(w.output, termRegExp);
    }
},

{
    name: "macro",
    match: "<<",
    lookaheadRegExp: /<<([^>\s]+)(?:\s*)((?:[^>]|(?:>(?!>)))*)>>/mg,
    handler: function(w) {
        this.lookaheadRegExp.lastIndex = w.matchStart;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        if (lookaheadMatch && lookaheadMatch.index == w.matchStart && lookaheadMatch[1]) {
            w.nextMatch = this.lookaheadRegExp.lastIndex;
            invokeMacro(w.output, lookaheadMatch[1], lookaheadMatch[2], w, w.tiddler);
        }
    }
},

{
    name: "prettyLink",
    match: "\\[\\[",
    lookaheadRegExp: /\[\[(.*?)(?:\|(~)?(.*?))?\]\]/mg,
    handler: function(w) {
        this.lookaheadRegExp.lastIndex = w.matchStart;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        if (lookaheadMatch && lookaheadMatch.index == w.matchStart) {
            var e;
            var text = lookaheadMatch[1];
            if (lookaheadMatch[3]) {
                // Pretty bracketted link
                var link = lookaheadMatch[3];
                e = (!lookaheadMatch[2] && config.formatterHelpers.isExternalLink(link)) ?
                    createExternalLink(w.output, link) : createTiddlyLink(w.output, decodeURIComponent(link), false, null, w.isStatic, w.tiddler);
            } else {
                // Simple bracketted link
                e = createTiddlyLink(w.output, decodeURIComponent(text), false, null, w.isStatic, w.tiddler);
            }
            createTiddlyText(e, text);
            w.nextMatch = this.lookaheadRegExp.lastIndex;
        }
    }
},

{
    name: "wikiLink",
    match: config.textPrimitives.unWikiLink + "?" + config.textPrimitives.wikiLink,
    handler: function(w) {
        if (w.matchText.substr(0, 1) == config.textPrimitives.unWikiLink) {
            w.outputText(w.output, w.matchStart + 1, w.nextMatch);
            return;
        }
        if (w.matchStart > 0) {
            var preRegExp = new RegExp(config.textPrimitives.anyLetterStrict, "mg");
            preRegExp.lastIndex = w.matchStart - 1;
            var preMatch = preRegExp.exec(w.source);
            if (preMatch.index == w.matchStart - 1) {
                w.outputText(w.output, w.matchStart, w.nextMatch);
                return;
            }
        }
        if (w.autoLinkWikiWords || store.isShadowTiddler(w.matchText)) {
            var link = createTiddlyLink(w.output, w.matchText, false, null, w.isStatic, w.tiddler);
            w.outputText(link, w.matchStart, w.nextMatch);
        } else {
            w.outputText(w.output, w.matchStart, w.nextMatch);
        }
    }
},

{
    name: "urlLink",
    match: config.textPrimitives.urlPattern,
    handler: function(w) {
        w.outputText(createExternalLink(w.output, w.matchText), w.matchStart, w.nextMatch);
    }
},

{
    name: "image",
    match: "\\[[<>]?[Ii][Mm][Gg]\\[",
    lookaheadRegExp: /\[([<]?)(>?)[Ii][Mm][Gg]\[(?:([^\|\]]+)\|)?([^\[\]\|]+)\](?:\[([^\]]*)\])?\]/mg,
    handler: function(w) {
        this.lookaheadRegExp.lastIndex = w.matchStart;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        if (lookaheadMatch && lookaheadMatch.index == w.matchStart) {
            var e = w.output;
            if (lookaheadMatch[5]) {
                var link = lookaheadMatch[5];
                e = config.formatterHelpers.isExternalLink(link) ? createExternalLink(w.output, link) : createTiddlyLink(w.output, link, false, null, w.isStatic, w.tiddler);
                addClass(e, "imageLink");
            }
            var img = createTiddlyElement(e, "img");
            if (lookaheadMatch[1])
                img.align = "left";
            else if (lookaheadMatch[2])
                img.align = "right";
            if (lookaheadMatch[3]) {
                img.title = lookaheadMatch[3];
                img.setAttribute("alt", lookaheadMatch[3]);
            }
            img.src = lookaheadMatch[4];
            w.nextMatch = this.lookaheadRegExp.lastIndex;
        }
    }
},

{
    name: "html",
    match: "<[Hh][Tt][Mm][Ll]>",
    lookaheadRegExp: /<[Hh][Tt][Mm][Ll]>((?:.|\n)*?)<\/[Hh][Tt][Mm][Ll]>/mg,
    handler: function(w) {
        this.lookaheadRegExp.lastIndex = w.matchStart;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        if (lookaheadMatch && lookaheadMatch.index == w.matchStart) {
            createTiddlyElement(w.output, "span").innerHTML = lookaheadMatch[1];
            w.nextMatch = this.lookaheadRegExp.lastIndex;
        }
    }
},

{
    name: "commentByBlock",
    match: "/%",
    lookaheadRegExp: /\/%((?:.|\n)*?)%\//mg,
    handler: function(w) {
        this.lookaheadRegExp.lastIndex = w.matchStart;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        if (lookaheadMatch && lookaheadMatch.index == w.matchStart)
            w.nextMatch = this.lookaheadRegExp.lastIndex;
    }
},

{
    name: "characterFormat",
    match: "''|//|__|\\^\\^|~~|--(?!\\s|$)|\\{\\{\\{",
    handler: function(w) {
        switch (w.matchText) {
            case "''":
                w.subWikifyTerm(w.output.appendChild(document.createElement("strong")), /('')/mg);
                break;
            case "//":
                w.subWikifyTerm(createTiddlyElement(w.output, "em"), /(\/\/)/mg);
                break;
            case "__":
                w.subWikifyTerm(createTiddlyElement(w.output, "u"), /(__)/mg);
                break;
            case "^^":
                w.subWikifyTerm(createTiddlyElement(w.output, "sup"), /(\^\^)/mg);
                break;
            case "~~":
                w.subWikifyTerm(createTiddlyElement(w.output, "sub"), /(~~)/mg);
                break;
            case "--":
                w.subWikifyTerm(createTiddlyElement(w.output, "strike"), /(--)/mg);
                break;
            case "{{{":
                var lookaheadRegExp = /\{\{\{((?:.|\n)*?)\}\}\}/mg;
                lookaheadRegExp.lastIndex = w.matchStart;
                var lookaheadMatch = lookaheadRegExp.exec(w.source);
                if (lookaheadMatch && lookaheadMatch.index == w.matchStart) {
                    createTiddlyElement(w.output, "code", null, null, lookaheadMatch[1]);
                    w.nextMatch = lookaheadRegExp.lastIndex;
                }
                break;
        }
    }
},

{
    name: "customFormat",
    match: "@@|\\{\\{",
    handler: function(w) {
        switch (w.matchText) {
            case "@@":
                var e = createTiddlyElement(w.output, "span");
                var styles = config.formatterHelpers.inlineCssHelper(w);
                if (styles.length == 0)
                    e.className = "marked";
                else
                    config.formatterHelpers.applyCssHelper(e, styles);
                w.subWikifyTerm(e, /(@@)/mg);
                break;
            case "{{":
                var lookaheadRegExp = /\{\{[\s]*([\w]+[\s\w]*)[\s]*\{(\n?)/mg;
                lookaheadRegExp.lastIndex = w.matchStart;
                var lookaheadMatch = lookaheadRegExp.exec(w.source);
                if (lookaheadMatch) {
                    w.nextMatch = lookaheadRegExp.lastIndex;
                    e = createTiddlyElement(w.output, lookaheadMatch[2] == "\n" ? "div" : "span", null, lookaheadMatch[1]);
                    w.subWikifyTerm(e, /(\}\}\})/mg);
                }
                break;
        }
    }
},

{
    name: "mdash",
    match: "--",
    handler: function(w) {
        createTiddlyElement(w.output, "span").innerHTML = "&mdash;";
    }
},

{
    name: "lineBreak",
    match: "\\n|<br ?/?>",
    handler: function(w) {
        createTiddlyElement(w.output, "br");
    }
},

{
    name: "rawText",
    match: "\\\"{3}|<nowiki>",
    lookaheadRegExp: /(?:\"{3}|<nowiki>)((?:.|\n)*?)(?:\"{3}|<\/nowiki>)/mg,
    handler: function(w) {
        this.lookaheadRegExp.lastIndex = w.matchStart;
        var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
        if (lookaheadMatch && lookaheadMatch.index == w.matchStart) {
            createTiddlyElement(w.output, "span", null, null, lookaheadMatch[1]);
            w.nextMatch = this.lookaheadRegExp.lastIndex;
        }
    }
},

{
    name: "htmlEntitiesEncoding",
    match: "(?:(?:&#?[a-zA-Z0-9]{2,8};|.)(?:&#?(?:x0*(?:3[0-6][0-9a-fA-F]|1D[c-fC-F][0-9a-fA-F]|20[d-fD-F][0-9a-fA-F]|FE2[0-9a-fA-F])|0*(?:76[89]|7[7-9][0-9]|8[0-7][0-9]|761[6-9]|76[2-7][0-9]|84[0-3][0-9]|844[0-7]|6505[6-9]|6506[0-9]|6507[0-1]));)+|&#?[a-zA-Z0-9]{2,8};)",
    handler: function(w) {
        createTiddlyElement(w.output, "span").innerHTML = w.matchText;
    }
}

];

//--
//-- Wikifier
//--

function getParser(tiddler, format) {
    if (tiddler) {
        if (!format)
            format = tiddler.fields["wikiformat"];
        var i;
        if (format) {
            for (i in config.parsers) {
                if (format == config.parsers[i].format)
                    return config.parsers[i];
            }
        } else {
            for (i in config.parsers) {
                if (tiddler.isTagged(config.parsers[i].formatTag))
                    return config.parsers[i];
            }
        }
    }
    return formatter;
}

function wikify(source, output, highlightRegExp, tiddler) {
    if (source) {
        var wikifier = new Wikifier(source, getParser(tiddler), highlightRegExp, tiddler);
        var t0 = new Date();
        wikifier.subWikify(output);
        if (tiddler && config.options.chkDisplayInstrumentation)
            displayMessage("wikify:" + tiddler.title + " in " + (new Date() - t0) + " ms");
    }
}

function wikifyStatic(source, highlightRegExp, tiddler, format) {
    var e = createTiddlyElement(document.body, "pre");
    e.style.display = "none";
    var html = "";
    if (source && source != "") {
        if (!tiddler)
            tiddler = new Tiddler("temp");
        var wikifier = new Wikifier(source, getParser(tiddler, format), highlightRegExp, tiddler);
        wikifier.isStatic = true;
        wikifier.subWikify(e);
        html = e.innerHTML;
        removeNode(e);
    }
    return html;
}

function wikifyPlain(title, theStore, limit) {
    if (!theStore)
        theStore = store;
    if (theStore.tiddlerExists(title) || theStore.isShadowTiddler(title)) {
        return wikifyPlainText(theStore.getTiddlerText(title), limit, tiddler);
    } else {
        return "";
    }
}

function wikifyPlainText(text, limit, tiddler) {
    if (limit > 0)
        text = text.substr(0, limit);
    var wikifier = new Wikifier(text, formatter, null, tiddler);
    return wikifier.wikifyPlain();
}

function highlightify(source, output, highlightRegExp, tiddler) {
    if (source) {
        var wikifier = new Wikifier(source, formatter, highlightRegExp, tiddler);
        wikifier.outputText(output, 0, source.length);
    }
}

function Wikifier(source, formatter, highlightRegExp, tiddler) {
    this.source = source;
    this.output = null;
    this.formatter = formatter;
    this.nextMatch = 0;
    this.autoLinkWikiWords = tiddler && tiddler.autoLinkWikiWords() == false ? false : true;
    this.highlightRegExp = highlightRegExp;
    this.highlightMatch = null;
    this.isStatic = false;
    if (highlightRegExp) {
        highlightRegExp.lastIndex = 0;
        this.highlightMatch = highlightRegExp.exec(source);
    }
    this.tiddler = tiddler;
}

Wikifier.prototype.wikifyPlain = function() {
    var e = createTiddlyElement(document.body, "div");
    e.style.display = "none";
    this.subWikify(e);
    var text = getPlainText(e);
    removeNode(e);
    return text;
};

Wikifier.prototype.subWikify = function(output, terminator) {
    try {
        if (terminator)
            this.subWikifyTerm(output, new RegExp("(" + terminator + ")", "mg"));
        else
            this.subWikifyUnterm(output);
    } catch (ex) {
        showException(ex);
    }
};

Wikifier.prototype.subWikifyUnterm = function(output) {
    var oldOutput = this.output;
    this.output = output;
    this.formatter.formatterRegExp.lastIndex = this.nextMatch;
    var formatterMatch = this.formatter.formatterRegExp.exec(this.source);
    while (formatterMatch) {
        // Output any text before the match
        if (formatterMatch.index > this.nextMatch)
            this.outputText(this.output, this.nextMatch, formatterMatch.index);
        // Set the match parameters for the handler
        this.matchStart = formatterMatch.index;
        this.matchLength = formatterMatch[0].length;
        this.matchText = formatterMatch[0];
        this.nextMatch = this.formatter.formatterRegExp.lastIndex;
        for (var t = 1; t < formatterMatch.length; t++) {
            if (formatterMatch[t]) {
                this.formatter.formatters[t - 1].handler(this);
                this.formatter.formatterRegExp.lastIndex = this.nextMatch;
                break;
            }
        }
        formatterMatch = this.formatter.formatterRegExp.exec(this.source);
    }
    if (this.nextMatch < this.source.length) {
        this.outputText(this.output, this.nextMatch, this.source.length);
        this.nextMatch = this.source.length;
    }
    this.output = oldOutput;
};

Wikifier.prototype.subWikifyTerm = function(output, terminatorRegExp) {
    var oldOutput = this.output;
    this.output = output;
    terminatorRegExp.lastIndex = this.nextMatch;
    var terminatorMatch = terminatorRegExp.exec(this.source);
    this.formatter.formatterRegExp.lastIndex = this.nextMatch;
    var formatterMatch = this.formatter.formatterRegExp.exec(terminatorMatch ? this.source.substr(0, terminatorMatch.index) : this.source);
    while (terminatorMatch || formatterMatch) {
        if (terminatorMatch && (!formatterMatch || terminatorMatch.index <= formatterMatch.index)) {
            if (terminatorMatch.index > this.nextMatch)
                this.outputText(this.output, this.nextMatch, terminatorMatch.index);
            this.matchText = terminatorMatch[1];
            this.matchLength = terminatorMatch[1].length;
            this.matchStart = terminatorMatch.index;
            this.nextMatch = this.matchStart + this.matchLength;
            this.output = oldOutput;
            return;
        }
        if (formatterMatch.index > this.nextMatch)
            this.outputText(this.output, this.nextMatch, formatterMatch.index);
        this.matchStart = formatterMatch.index;
        this.matchLength = formatterMatch[0].length;
        this.matchText = formatterMatch[0];
        this.nextMatch = this.formatter.formatterRegExp.lastIndex;
        for (var t = 1; t < formatterMatch.length; t++) {
            if (formatterMatch[t]) {
                this.formatter.formatters[t - 1].handler(this);
                this.formatter.formatterRegExp.lastIndex = this.nextMatch;
                break;
            }
        }
        terminatorRegExp.lastIndex = this.nextMatch;
        terminatorMatch = terminatorRegExp.exec(this.source);
        formatterMatch = this.formatter.formatterRegExp.exec(terminatorMatch ? this.source.substr(0, terminatorMatch.index) : this.source);
    }
    if (this.nextMatch < this.source.length) {
        this.outputText(this.output, this.nextMatch, this.source.length);
        this.nextMatch = this.source.length;
    }
    this.output = oldOutput;
};

Wikifier.prototype.outputText = function(place, startPos, endPos) {
    while (this.highlightMatch && (this.highlightRegExp.lastIndex > startPos) && (this.highlightMatch.index < endPos) && (startPos < endPos)) {
        if (this.highlightMatch.index > startPos) {
            createTiddlyText(place, this.source.substring(startPos, this.highlightMatch.index));
            startPos = this.highlightMatch.index;
        }
        var highlightEnd = Math.min(this.highlightRegExp.lastIndex, endPos);
        var theHighlight = createTiddlyElement(place, "span", null, "highlight", this.source.substring(startPos, highlightEnd));
        startPos = highlightEnd;
        if (startPos >= this.highlightRegExp.lastIndex)
            this.highlightMatch = this.highlightRegExp.exec(this.source);
    }
    if (startPos < endPos) {
        createTiddlyText(place, this.source.substring(startPos, endPos));
    }
};

//--
//-- Macro definitions
//--

config.macros.today.handler = function(place, macroName, params) {
    var now = new Date();
    var text = params[0] ? now.formatString(params[0].trim()) : now.toLocaleString();
    createTiddlyElement(place, "span", null, null, text);
};

config.macros.version.handler = function(place) {
    createTiddlyElement(place, "span", null, null, formatVersion());
};

config.macros.list.handler = function(place, macroName, params) {
    var type = params[0] || "all";
    var list = document.createElement("ul");
    place.appendChild(list);
    if (this[type].prompt)
        createTiddlyElement(list, "li", null, "listTitle", this[type].prompt);
    var results;
    if (this[type].handler)
        results = this[type].handler(params);
    for (var t = 0; t < results.length; t++) {
        var li = document.createElement("li");
        list.appendChild(li);
        createTiddlyLink(li, typeof results[t] == "string" ? results[t] : results[t].title, true);
    }
};

config.macros.list.all.handler = function(params) {
    return store.reverseLookup("tags", "excludeLists", false, "title");
};

config.macros.list.missing.handler = function(params) {
    return store.getMissingLinks();
};

config.macros.list.orphans.handler = function(params) {
    return store.getOrphans();
};

config.macros.list.shadowed.handler = function(params) {
    return store.getShadowed();
};

config.macros.list.touched.handler = function(params) {
    return store.getTouched();
};

config.macros.list.filter.handler = function(params) {
    var filter = params[1];
    var results = [];
    if (filter) {
        var tiddlers = store.filterTiddlers(filter);
        for (var t = 0; t < tiddlers.length; t++)
            results.push(tiddlers[t].title);
    }
    return results;
};

config.macros.allTags.handler = function(place, macroName, params) {
    var tags = store.getTags(params[0]);
    var ul = createTiddlyElement(place, "ul");
    if (tags.length == 0)
        createTiddlyElement(ul, "li", null, "listTitle", this.noTags);
    for (var t = 0; t < tags.length; t++) {
        var title = tags[t][0];
        var info = getTiddlyLinkInfo(title);
        var li = createTiddlyElement(ul, "li");
        var btn = createTiddlyButton(li, title + " (" + tags[t][1] + ")", this.tooltip.format([title]), onClickTag, info.classes);
        btn.setAttribute("tag", title);
        btn.setAttribute("refresh", "link");
        btn.setAttribute("tiddlyLink", title);
    }
};

config.macros.timeline.handler = function(place, macroName, params) {
    var field = params[0] || "modified";
    var tiddlers = store.reverseLookup("tags", "excludeLists", false, field);
    var lastDay = "";
    var last = params[1] ? tiddlers.length - Math.min(tiddlers.length, parseInt(params[1])) : 0;
    var dateFormat = params[2] || this.dateFormat;
    for (var t = tiddlers.length - 1; t >= last; t--) {
        var tiddler = tiddlers[t];
        var theDay = tiddler[field].convertToLocalYYYYMMDDHHMM().substr(0, 8);
        if (theDay != lastDay) {
            var ul = document.createElement("ul");
            place.appendChild(ul);
            createTiddlyElement(ul, "li", null, "listTitle", tiddler[field].formatString(dateFormat));
            lastDay = theDay;
        }
        createTiddlyElement(ul, "li", null, "listLink").appendChild(createTiddlyLink(place, tiddler.title, true));
    }
};

config.macros.tiddler.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    params = paramString.parseParams("name", null, true, false, true);
    var names = params[0]["name"];
    var tiddlerName = names[0];
    var className = names[1] || null;
    var args = params[0]["with"];
    var wrapper = createTiddlyElement(place, "span", null, className);
    if (!args) {
        wrapper.setAttribute("refresh", "content");
        wrapper.setAttribute("tiddler", tiddlerName);
    }
    var text = store.getTiddlerText(tiddlerName);
    if (text) {
        var stack = config.macros.tiddler.tiddlerStack;
        if (stack.indexOf(tiddlerName) !== -1)
            return;
        stack.push(tiddlerName);
        try {
            var n = args ? Math.min(args.length, 9) : 0;
            for (var i = 0; i < n; i++) {
                var placeholderRE = new RegExp("\\$" + (i + 1), "mg");
                text = text.replace(placeholderRE, args[i]);
            }
            config.macros.tiddler.renderText(wrapper, text, tiddlerName, params);
        } finally {
            stack.pop();
        }
    }
};

config.macros.tiddler.renderText = function(place, text, tiddlerName, params) {
    wikify(text, place, null, store.getTiddler(tiddlerName));
};

config.macros.tiddler.tiddlerStack = [];

config.macros.tag.handler = function(place, macroName, params) {
    createTagButton(place, params[0], null, params[1], params[2]);
};

config.macros.tags.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    params = paramString.parseParams("anon", null, true, false, false);
    var ul = createTiddlyElement(place, "ul");
    var title = getParam(params, "anon", "");
    if (title && store.tiddlerExists(title))
        tiddler = store.getTiddler(title);
    var sep = getParam(params, "sep", " ");
    var lingo = config.views.wikified.tag;
    var prompt = tiddler.tags.length == 0 ? lingo.labelNoTags : lingo.labelTags;
    createTiddlyElement(ul, "li", null, "listTitle", prompt.format([tiddler.title]));
    for (var t = 0; t < tiddler.tags.length; t++) {
        createTagButton(createTiddlyElement(ul, "li"), tiddler.tags[t], tiddler.title);
        if (t < tiddler.tags.length - 1)
            createTiddlyText(ul, sep);
    }
};

config.macros.tagging.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    params = paramString.parseParams("anon", null, true, false, false);
    var ul = createTiddlyElement(place, "ul");
    var title = getParam(params, "anon", "");
    if (title == "" && tiddler instanceof Tiddler)
        title = tiddler.title;
    var sep = getParam(params, "sep", " ");
    ul.setAttribute("title", this.tooltip.format([title]));
    var tagged = store.getTaggedTiddlers(title);
    var prompt = tagged.length == 0 ? this.labelNotTag : this.label;
    createTiddlyElement(ul, "li", null, "listTitle", prompt.format([title, tagged.length]));
    for (var t = 0; t < tagged.length; t++) {
        createTiddlyLink(createTiddlyElement(ul, "li"), tagged[t].title, true);
        if (t < tagged.length - 1)
            createTiddlyText(ul, sep);
    }
};

config.macros.closeAll.handler = function(place) {
    createTiddlyButton(place, this.label, this.prompt, this.onClick);
};

config.macros.closeAll.onClick = function(e) {
    story.closeAllTiddlers();
    return false;
};

config.macros.comments.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    createTiddlyElement(place,"hr");
    var ced = createTiddlyElement(place,"div",null,"commentToolbar");
    if (tiddler.comments > 0)
	    createTiddlyButton(ced, this.listLabel.format([tiddler.comments]), this.listPrompt, this.onListClick);
	if (tiddler.Notes())
	    createTiddlyButton(ced, this.notesLabel.format([tiddler.Notes()]), this.notesPrompt, this.onNotesClick);
	if (tiddler.messages)
	    createTiddlyButton(ced, this.messagesLabel.format([tiddler.messages]), this.notesPrompt, this.onMessagesClick);

	if (config.access == "view") return;
	createTiddlyButton(ced, this.addCommentLabel, this.addCommentPrompt, this.onAddCommentClick);
	createTiddlyButton(ced, this.addMessageLabel, this.addMessagePrompt, this.onAddMessageClick);
	createTiddlyButton(ced, this.addNoteLabel, this.addNotePrompt, this.onAddNoteClick);
};

config.macros.comments.showReplies = function(ev) {
    var target = resolveTarget(ev || window.event);
    var tr = target.parentNode.parentNode;
    var rowClass = tr.className;
    var ndt = tr.firstChild.firstChild.firstChild.nodeValue;
    var tidlr = story.findContainingTiddler(target);
    var t = store.getTiddler(tidlr.getAttribute("tiddler"));
    config.macros.comments.listComments(tidlr, t.getComments(), true, function() { return rowClass }, function(c) { return c.ref == ndt }, tr );
}

config.macros.comments.CclassPicker = function(r) { return r & 1 ? "oddRowComment":"evenRowComment" };
config.macros.comments.MclassPicker = function(r) { return r & 1 ? "oddRowMessage":"evenRowMessage" };
config.macros.comments.NclassPicker = function(r) { return r & 1 ? "oddRowNote":"evenRowNote" };
config.macros.comments.onListClick = function(ev) {
    var e = ev || window.event;
    var target = resolveTarget(e);
    var tidlr = story.findContainingTiddler(target);
    var t = store.getTiddler(tidlr.getAttribute("tiddler"));
    config.macros.comments.listComments(tidlr,t.getComments(),false,config.macros.comments.CclassPicker,function(t) { return t.ref == "" });
};

config.macros.comments.onNotesClick = function(ev) {
    var target = resolveTarget(ev || window.event);
    var tidlr = story.findContainingTiddler(target);
    var t = store.getTiddler(tidlr.getAttribute("tiddler"));
    config.macros.comments.listComments(tidlr,t.notes,false,config.macros.comments.NclassPicker,function(t) { return true; });
}

config.macros.comments.onMessagesClick = function(ev) {
    var target = resolveTarget(ev || window.event);
    var tidlr = story.findContainingTiddler(target);
    var t = store.getTiddler(tidlr.getAttribute("tiddler"));
    config.macros.comments.listComments(tidlr,t.getMessages(),false,config.macros.comments.MclassPicker,function(t) { return true; });
}

function findOrCreateChildElement(parent, element, id, className, text, attribs, preserve) {
	for (var cni = 0; cni < parent.childNodes.length; cni++)
		if (parent.childNodes[cni].className == className) {
			if (preserve)
				return parent.childNodes[cni];
			else {
				parent.removeChild(parent.childNodes[cni]);
				break;
			}
		}
	if (element)
		return createTiddlyElement(parent, element, id, className, text, attribs);
}

function insertAfter(referenceNode, newNode)
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

config.macros.comments.addCommentTabelRow = function(tbe,className,after,when,who,replies,row)
{
	var tr = createTiddlyElement(null,"tr",null, className ? className(row) : (row & 1 ? "oddRow" : "evenRow"));// + className);
	if (after) {
		insertAfter(after,tr);
		var pie = parseInt(after.getAttribute("sub")) + 1;
	}
	else {
		tbe.appendChild(tr);
		var pie = 0;
	}
	tr.setAttribute("sub",pie);
	var tdd = createTiddlyElement(tr,"td",null,"dateColumn");
	var led = createTiddlyButton(tdd,when,"Click to reply",config.macros.comments.replyClick,"dateOfComment");
	var aue = createTiddlyElement(tr,"td",null,null,who);
	if (pie)
		aue.style.paddingLeft = pie + "em";
	if (replies > 0) {
		createTiddlyElement(aue,"br");
		createTiddlyButton(aue,
			replies > 1 ? replies + " replies" : "1 reply",
			"Show replies",config.macros.comments.showReplies,"btnReplies");
		}
	var tde = createTiddlyElement(tr,"td",null,null);
	if (pie)
		tde.style.paddingLeft = pie + "em";
	return tde;
}

config.macros.comments.listComments = function(where,list,preserve,className,filter,after) {
    var twe = findOrCreateChildElement(where, "div",null,"tableWrapper",null,null,preserve);
    if (!twe.firstChild)
        twe.innerHTML = "<table class='commentTable'><col style='width:5.3em'/><col style='width: 4.5em'/></table>"; // IE fix
    var tae = twe.firstChild;

    var tbe = findOrCreateChildElement(tae,"tbody",null,"commentTableBody",null,null,true);
    var rc = 0;
    for (var i = 0; i < list.length; i++) {
        var aco = list[i];
        if (filter(aco)) {
            var tde = config.macros.comments.addCommentTabelRow(tbe,className,after,aco.created.substr(0,19),aco.author,aco.refs,++rc);
            wikify(aco.text,tde);
        }
    }
    //createTiddlyElement(where,"hr");
}

config.macros.comments.onShowClick = function(e) {
    displayMessage("show comments");
    return false;
};

config.macros.comments.createInputBox = function(where, caption, onSave, onCancel) {
    var wrapper1 = createTiddlyElement(where,"fieldset");
    createTiddlyElement(wrapper1,"legend",null,null,caption);
    e = createTiddlyElement(wrapper1, "textarea",null,"commentArea",null,{rows: 5});
    createTiddlyElement(wrapper1,"HR");
    var wrtb = createTiddlyElement(wrapper1, "div",null,"toolbar");
    
    var smbtn = createTiddlyButton(wrtb,"submit","Save comment",onSave,"defaultCommand");
    addClass(smbtn,"button");
    var ccbtn = createTiddlyButton(wrtb,"cancel","Cancel comment",onCancel,"cancelCommand");
    addClass(ccbtn,"button");
    //where.appendChild(wrapper1);
    e.focus();
}

config.macros.comments.onAddCommentClick = function(ev) {
    var target = resolveTarget(ev || window.event);
    config.macros.comments.createInputBox(target.parentNode.parentNode.parentNode, "Your comment",config.macros.comments.onSaveCommentClick,config.macros.comments.onCancelCommentClick);
    return false;
};

config.macros.comments.onAddMessageClick = function(ev) {
    var target = resolveTarget(ev || window.event);
    config.macros.comments.createInputBox(target.parentNode.parentNode.parentNode, "Your message",config.macros.comments.onSaveMessageClick,config.macros.comments.onCancelCommentClick);
    return false;
};

config.macros.comments.onAddNoteClick = function(ev) {
    var target = resolveTarget(ev || window.event);
    config.macros.comments.createInputBox(target.parentNode.parentNode.parentNode, "Your note",config.macros.comments.onSaveNoteClick,config.macros.comments.onCancelCommentClick);
    return false;
};

config.macros.comments.onSaveCommentClick = function(ev) { return config.macros.comments.onSaveClick(ev,"C",config.macros.comments.CclassPicker); }
config.macros.comments.onSaveMessageClick = function(ev) { return config.macros.comments.onSaveClick(ev, "M",config.macros.comments.MclassPicker); }
config.macros.comments.onSaveNoteClick = function(ev) { return config.macros.comments.onSaveClick(ev, "N",config.macros.comments.NclassPicker); }

config.macros.comments.onSaveClick = function(ev,type,cp) {
    var target = resolveTarget(ev || window.event);
    var tnv = target.parentNode.parentNode.childNodes[1].value;
    var tidlr = story.findContainingTiddler(target);
    var tna = tidlr.getAttribute("tiddler");
    t = store.getTiddler(tna);
    var sr = t.addComment(tnv,type);
    if (sr && sr.Success) {
        config.macros.comments.onCancelCommentClick(ev);
	    config.macros.comments.listComments(tidlr, [sr], true, cp, function(c) { return true; });
	}
}

config.macros.comments.onCancelCommentClick = function(ev) {
    var e = ev || window.event;
    var t = resolveTarget(e);
    for (var p = t.parentNode; t.tagName != "FIELDSET"; p = p.parentNode)
        t = p;
    p.removeChild(t);
    return p;
}

config.macros.comments.onSaveReplyClick = function(ev) {
    var e = ev || window.event;
    var target = resolveTarget(e);
    var tidlr = story.findContainingTiddler(target);
    var tna = tidlr.getAttribute("tiddler");
    var tnv = target.parentNode.parentNode.childNodes[1].value;
    t = store.getTiddler(tna);
	var td = config.macros.comments.onCancelCommentClick(ev);
	var tr = td.parentNode;
    var sr = http.submitComment({ text:tnv, tiddler:t.id, version:t.currentVer, ref: td.id });
    if (sr.Success) {
		tr.removeChild(td);
		createTiddlyElement(tr,"td",null,"replyTD",tnv);
	}
}

config.macros.comments.onCancelReplyClick = function(ev) {
    var t = resolveTarget(ev || window.event);
    var trow = t.parentNode.parentNode.parentNode.parentNode;
    trow.parentNode.removeChild(trow);
}

config.macros.comments.replyClick = function(ev) {
    var t = resolveTarget(ev || window.event);
    var tre = t.parentNode.parentNode;
    var ref = tre.firstChild.innerText;
    var tdc = config.macros.comments.addCommentTabelRow(null,function() { return tre.className },tre,new Date().formatString("YYYY-0MM-0DD hh:mm:0ss"),config.options.txtUserName,0,0);
    tdc.id = ref;
	config.macros.comments.createInputBox(tdc, "Your reply",config.macros.comments.onSaveReplyClick,config.macros.comments.onCancelReplyClick);
}

config.macros.slider.onClickSlider = function(ev) {
    var e = ev || window.event;
    var n = this.nextSibling;
    var cookie = n.getAttribute("cookie");
    var isOpen = n.style.display != "none";
    if (config.options.chkAnimate && anim && typeof Slider == "function")
        anim.startAnimating(new Slider(n, !isOpen, null, "none"));
    else
        n.style.display = isOpen ? "none" : "block";
    config.options[cookie] = !isOpen;
    saveOptionCookie(cookie);
    return false;
};

config.macros.slider.createSlider = function(place, cookie, title, tooltip) {
    var c = cookie || "";
    var btn = createTiddlyButton(place, title, tooltip, this.onClickSlider);
    var panel = createTiddlyElement(null, "div", null, "sliderPanel");
    panel.setAttribute("cookie", c);
    panel.style.display = config.options[c] ? "block" : "none";
    place.appendChild(panel);
    return panel;
};

config.macros.slider.handler = function(place, macroName, params) {
    var panel = this.createSlider(place, params[0], params[2], params[3]);
    var text = store.getTiddlerText(params[1]);
    panel.setAttribute("refresh", "content");
    panel.setAttribute("tiddler", params[1]);
    if (text)
        wikify(text, panel, null, store.getTiddler(params[1]));
};

// <<gradient [[tiddler name]] vert|horiz rgb rgb rgb rgb... >>
config.macros.gradient.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    var panel = wikifier ? createTiddlyElement(place, "div", null, "gradient") : place;
    panel.style.position = "relative";
    panel.style.overflow = "hidden";
    panel.style.zIndex = "0";
    if (wikifier) {
        var styles = config.formatterHelpers.inlineCssHelper(wikifier);
        config.formatterHelpers.applyCssHelper(panel, styles);
    }
    params = paramString.parseParams("color");
    var locolors = [], hicolors = [];
    for (var t = 2; t < params.length; t++) {
        var c = new RGB(params[t].value);
        if (params[t].name == "snap") {
            hicolors[hicolors.length - 1] = c;
        } else {
            locolors.push(c);
            hicolors.push(c);
        }
    }
    drawGradient(panel, params[1].value != "vert", locolors, hicolors);
    if (wikifier)
        wikifier.subWikify(panel, ">>");
    if (document.all) {
        panel.style.height = "100%";
        panel.style.width = "100%";
    }
};

config.macros.message.handler = function(place, macroName, params) {
    if (params[0]) {
        var names = params[0].split(".");
        var lookupMessage = function(root, nameIndex) {
            if (names[nameIndex] in root) {
                if (nameIndex < names.length - 1)
                    return (lookupMessage(root[names[nameIndex]], nameIndex + 1));
                else
                    return root[names[nameIndex]];
            } else
                return null;
        };
        var m = lookupMessage(config, 0);
        if (m == null)
            m = lookupMessage(window, 0);
        createTiddlyText(place, m.toString().format(params.splice(1)));
    }
};


config.macros.view.views = {
    text: function(value, place, params, wikifier, paramString, tiddler) {
        highlightify(value, place, highlightHack, tiddler);
    },
    link: function(value, place, params, wikifier, paramString, tiddler) {
        createTiddlyLink(place, value, true);
    },
    wikified: function(value, place, params, wikifier, paramString, tiddler) {
        if (params[2])
            value = params[2].unescapeLineBreaks().format([value]);
        wikify(value, place, highlightHack, tiddler);
    },
    date: function(value, place, params, wikifier, paramString, tiddler) {
		if (value == null) return;
        value = Date.convertFromYYYYMMDDHHMM(value);
        createTiddlyText(place, value.formatString(params[2] ? params[2] : config.views.wikified.dateFormat));
    }
};

config.macros.view.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    if ((tiddler instanceof Tiddler) && params[0]) {
        var value = store.getValue(tiddler, params[0]);
        if (value) {
			if (params[3]) createTiddlyText(place,params[3]);
            var type = params[1] || config.macros.view.defaultView;
            var handler = config.macros.view.views[type];
            if (handler)
                handler(value, place, params, wikifier, paramString, tiddler);
        }
    }
};

config.macros.edit.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    var field = params[0];
    var rows = params[1] || 0;
    var defVal = params[2] || '';
    if ((tiddler instanceof Tiddler) && field) {
        story.setDirty(tiddler.title, true);
        var e, v;
        if (field != "text" && !rows) {
            e = createTiddlyElement(null, "input");
            if (tiddler.isReadOnly())
                e.setAttribute("readOnly", "readOnly");
            e.setAttribute("edit", field);
            e.setAttribute("type", "text");
            e.value = store.getValue(tiddler, field) || defVal;
            e.setAttribute("size", "40");
            e.setAttribute("autocomplete", "off");
            place.appendChild(e);
        } else {
            var wrapper1 = createTiddlyElement(null, "fieldset", null, "fieldsetFix");
            var wrapper2 = createTiddlyElement(wrapper1, "div");
            e = createTiddlyElement(wrapper2, "textarea");
            if (tiddler.isReadOnly())
                e.setAttribute("readOnly", "readOnly");
            e.value = v = store.getValue(tiddler, field) || defVal;
            rows = rows || 10;
            var lines = v.match(/\n/mg);
            var maxLines = Math.max(parseInt(config.options.txtMaxEditRows), 5);
            if (lines != null && lines.length > rows)
                rows = lines.length + 5;
            rows = Math.min(rows, maxLines);
            e.setAttribute("rows", rows);
            e.setAttribute("edit", field);
            place.appendChild(wrapper1);
        }
        return e;
    }
};

config.macros.tagChooser.onClick = function(ev) {
    var e = ev || window.event;
    var lingo = config.views.editor.tagChooser;
    var popup = Popup.create(this);
    var tags = store.getTags("excludeLists");
    if (tags.length == 0)
        createTiddlyText(createTiddlyElement(popup, "li"), lingo.popupNone);
    for (var t = 0; t < tags.length; t++) {
        var tag = createTiddlyButton(createTiddlyElement(popup, "li"), tags[t][0], lingo.tagTooltip.format([tags[t][0]]), config.macros.tagChooser.onTagClick);
        tag.setAttribute("tag", tags[t][0]);
        tag.setAttribute("tiddler", this.getAttribute("tiddler"));
    }
    Popup.show();
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    return false;
};

config.macros.tagChooser.onTagClick = function(ev) {
    var e = ev || window.event;
    if (e.metaKey || e.ctrlKey) stopEvent(e); //# keep popup open on CTRL-click
    var tag = this.getAttribute("tag");
    var title = this.getAttribute("tiddler");
    if (!readOnly)
        story.setTiddlerTag(title, tag, 0);
    return false;
};

config.macros.tagChooser.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    if (tiddler instanceof Tiddler) {
        var lingo = config.views.editor.tagChooser;
        var btn = createTiddlyButton(place, lingo.text, lingo.tooltip, this.onClick);
        btn.setAttribute("tiddler", tiddler.title);
    }
};

config.macros.refreshDisplay.handler = function(place) {
    createTiddlyButton(place, this.label, this.prompt, this.onClick);
};

config.macros.refreshDisplay.onClick = function(e) {
    refreshAll();
    return false;
};
config.macros.annotations.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    var title = tiddler ? tiddler.title : null;
    var a = title ? config.annotations[title] : null;
    if (!tiddler || !title || !a)
        return;
    var text = a.format([title]);
    wikify(text, createTiddlyElement(place, "div", null, "annotation"), null, tiddler);
};

//--
//-- NewTiddler and NewJournal macros
//--

config.macros.newTiddler.createNewTiddlerButton = function(place, title, params, label, prompt, accessKey, newFocus, isJournal) {
    var tags = [];
    for (var t = 1; t < params.length; t++) {
        if ((params[t].name == "anon" && t != 1) || (params[t].name == "tag"))
            tags.push(params[t].value);
    }
    label = getParam(params, "label", label);
    prompt = getParam(params, "prompt", prompt);
    accessKey = getParam(params, "accessKey", accessKey);
    newFocus = getParam(params, "focus", newFocus);
    var customFields = getParam(params, "fields", "");
    if (!customFields && !store.isShadowTiddler(title))
        customFields = String.encodeHashMap(config.defaultCustomFields);
    var btn = createTiddlyButton(place, label, prompt, this.onClickNewTiddler, null, null, accessKey);
    btn.setAttribute("newTitle", title);
    btn.setAttribute("isJournal", isJournal ? "true" : "false");
    if (tags.length > 0)
        btn.setAttribute("params", tags.join("|"));
    btn.setAttribute("newFocus", newFocus);
    btn.setAttribute("newTemplate", getParam(params, "template", DEFAULT_EDIT_TEMPLATE));
    if (customFields !== "")
        btn.setAttribute("customFields", customFields);
    var text = getParam(params, "text");
    if (text !== undefined)
        btn.setAttribute("newText", text);
    return btn;
};

config.macros.newTiddler.onClickNewTiddler = function() {
    var title = this.getAttribute("newTitle");
    if (this.getAttribute("isJournal") == "true") {
        title = new Date().formatString(title.trim());
    }
    var params = this.getAttribute("params");
    var tags = params ? params.split("|") : [];
    var focus = this.getAttribute("newFocus");
    var template = this.getAttribute("newTemplate");
    var customFields = this.getAttribute("customFields");
    if (!customFields && !store.isShadowTiddler(title))
        customFields = String.encodeHashMap(config.defaultCustomFields);
    story.displayTiddler(null, title, template, false, null, null);
    var tiddlerElem = story.getTiddler(title);
    if (customFields)
        story.addCustomFields(tiddlerElem, customFields);
    var text = this.getAttribute("newText");
    if (typeof text == "string")
        story.getTiddlerField(title, "text").value = text.format([title]);
    for (var t = 0; t < tags.length; t++)
        story.setTiddlerTag(title, tags[t], +1);
    story.focusTiddler(title, focus);
    return false;
};

config.macros.newTiddler.handler = function(place, macroName, params, wikifier, paramString) {
    if (!readOnly) {
        params = paramString.parseParams("anon", null, true, false, false);
        var title = params[1] && params[1].name == "anon" ? params[1].value : this.title;
        title = getParam(params, "title", title);
        this.createNewTiddlerButton(place, title, params, this.label, this.prompt, this.accessKey, "title", false);
    }
};

config.macros.newJournal.handler = function(place, macroName, params, wikifier, paramString) {
    if (!readOnly) {
        params = paramString.parseParams("anon", null, true, false, false);
        var title = params[1] && params[1].name == "anon" ? params[1].value : config.macros.timeline.dateFormat;
        title = getParam(params, "title", title);
        config.macros.newTiddler.createNewTiddlerButton(place, title, params, this.label, this.prompt, this.accessKey, "text", true);
    }
};

//--
//-- Search macro
//--

config.macros.search.handler = function(place, macroName, params) {
    var searchTimeout = null;
    var btn = createTiddlyButton(place, this.label, this.prompt, this.onClick, "searchButton");
    var txt = createTiddlyElement(place, "input", null, "txtOptionInput searchField");
    if (params[0])
        txt.value = params[0];
    txt.onkeyup = this.onKeyPress;
    txt.onfocus = this.onFocus;
    txt.setAttribute("size", this.sizeTextbox);
    txt.setAttribute("accessKey", this.accessKey);
    txt.setAttribute("autocomplete", "off");
    txt.setAttribute("lastSearchText", "");
    if (config.browser.isSafari) {
        txt.setAttribute("type", "search");
        txt.setAttribute("results", "5");
    } else {
        txt.setAttribute("type", "text");
    }
};

// Global because there's only ever one outstanding incremental search timer
config.macros.search.timeout = null;

config.macros.search.doSearch = function(txt) {
    if (txt.value.length > 0) {
        story.search(txt.value, config.options.chkCaseSensitiveSearch, config.options.chkRegExpSearch);
        txt.setAttribute("lastSearchText", txt.value);
    }
};

config.macros.search.onClick = function(e) {
    config.macros.search.doSearch(this.nextSibling);
    return false;
};

config.macros.search.onKeyPress = function(ev) {
    var e = ev || window.event;
    switch (e.keyCode) {
        case 13: // Ctrl-Enter
        case 10: // Ctrl-Enter on IE PC
            config.macros.search.doSearch(this);
            break;
        case 27: // Escape
            this.value = "";
            clearMessage();
            break;
    }
    if (config.options.chkIncrementalSearch) {
        if (this.value.length > 2) {
            if (this.value != this.getAttribute("lastSearchText")) {
                if (config.macros.search.timeout)
                    clearTimeout(config.macros.search.timeout);
                var txt = this;
                config.macros.search.timeout = setTimeout(function() { config.macros.search.doSearch(txt); }, 500);
            }
        } else {
            if (config.macros.search.timeout)
                clearTimeout(config.macros.search.timeout);
        }
    }
};

config.macros.search.onFocus = function(e) {
    this.select();
};

//--
//-- Tabs macro
//--

config.macros.tabs.handler = function(place, macroName, params) {
    var cookie = params[0];
    var numTabs = (params.length - 1) / 3;
    var wrapper = createTiddlyElement(null, "div", null, "tabsetWrapper " + cookie);
    var tabset = createTiddlyElement(wrapper, "div", null, "tabset");
    tabset.setAttribute("cookie", cookie);
    var validTab = false;
    for (var t = 0; t < numTabs; t++) {
        var label = params[t * 3 + 1];
        var prompt = params[t * 3 + 2];
        var content = params[t * 3 + 3];
        var tab = createTiddlyButton(tabset, label, prompt, this.onClickTab, "tab tabUnselected");
        tab.setAttribute("tab", label);
        tab.setAttribute("content", content);
        tab.title = prompt;
        if (config.options[cookie] == label)
            validTab = true;
    }
    if (!validTab)
        config.options[cookie] = params[1];
    place.appendChild(wrapper);
    this.switchTab(tabset, config.options[cookie]);
};

config.macros.tabs.onClickTab = function(e) {
    config.macros.tabs.switchTab(this.parentNode, this.getAttribute("tab"));
    return false;
};

config.macros.tabs.switchTab = function(tabset, tab) {
    var cookie = tabset.getAttribute("cookie");
    var theTab = null;
    var nodes = tabset.childNodes;
    for (var t = 0; t < nodes.length; t++) {
        if (nodes[t].getAttribute && nodes[t].getAttribute("tab") == tab) {
            theTab = nodes[t];
            theTab.className = "tab tabSelected";
        } else {
            nodes[t].className = "tab tabUnselected";
        }
    }
    if (theTab) {
        if (tabset.nextSibling && tabset.nextSibling.className == "tabContents")
            removeNode(tabset.nextSibling);
        var tabContent = createTiddlyElement(null, "div", null, "tabContents");
        tabset.parentNode.insertBefore(tabContent, tabset.nextSibling);
        var contentTitle = theTab.getAttribute("content");
        wikify(store.getTiddlerText(contentTitle), tabContent, null, store.getTiddler(contentTitle));
        if (cookie) {
            config.options[cookie] = tab;
            saveOptionCookie(cookie);
        }
    }
};

//--
//-- Tiddler toolbar
//--

// Create a toolbar command button
config.macros.toolbar.createCommand = function(place, commandName, tiddler, className) {
    if (typeof commandName != "string") {
        var c = null;
        for (var t in config.commands) {
            if (config.commands[t] == commandName)
                c = t;
        }
        commandName = c;
    }
    
    if ((tiddler instanceof Tiddler) && (typeof commandName == "string")) {
        var command = config.commands[commandName];
        if (command.isEnabled ? command.isEnabled(tiddler) : this.isCommandEnabled(command, tiddler)) {
            var text = command.getText ? command.getText(tiddler) : this.getCommandText(command, tiddler);
            var tooltip = command.getTooltip ? command.getTooltip(tiddler) : this.getCommandTooltip(command, tiddler);
            var cmd;
            switch (command.type) {
                case "popup":
                    cmd = this.onClickPopup;
                    break;
                case "command":
                default:
                    cmd = this.onClickCommand;
                    break;
            }
            var btn = createTiddlyButton(null, text, tooltip, cmd);
            btn.setAttribute("commandName", commandName);
            btn.setAttribute("tiddler", tiddler.title);
            if (className)
                addClass(btn, className);
            place.appendChild(btn);
        }
    }
};

config.macros.toolbar.isCommandEnabled = function(command, tiddler) {
    var title = tiddler.title;
    var ro = tiddler.isReadOnly();
    var shadow = store.isShadowTiddler(title) && !store.tiddlerExists(title);
    return (!ro || (ro && !command.hideReadOnly)) && !(shadow && command.hideShadow);
};

config.macros.toolbar.getCommandText = function(command, tiddler) {
    return tiddler.isReadOnly() && command.readOnlyText || command.text;
};

config.macros.toolbar.getCommandTooltip = function(command, tiddler) {
    return tiddler.isReadOnly() && command.readOnlyTooltip || command.tooltip;
};

config.macros.toolbar.onClickCommand = function(ev) {
    var e = ev || window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    var command = config.commands[this.getAttribute("commandName")];
    return command.handler(e, this, this.getAttribute("tiddler"));
};

config.macros.toolbar.onClickPopup = function(ev) {
    var e = ev || window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    var popup = Popup.create(this);
    var command = config.commands[this.getAttribute("commandName")];
    var title = this.getAttribute("tiddler");
    popup.setAttribute("tiddler", title);
    command.handlePopup(popup, title);
    Popup.show();
    return false;
};

// Invoke the first command encountered from a given place that is tagged with a specified class
config.macros.toolbar.invokeCommand = function(place, className, event) {
    var children = place.getElementsByTagName("a");
    for (var t = 0; t < children.length; t++) {
        var c = children[t];
        if (hasClass(c, className) && c.getAttribute && c.getAttribute("commandName")) {
            if (c.onclick instanceof Function)
                c.onclick.call(c, event);
            break;
        }
    }
};

config.macros.toolbar.onClickMore = function(ev) {
    var e = this.nextSibling;
    e.style.display = "inline";
    removeNode(this);
    return false;
};

config.macros.toolbar.handler = function(place, macroName, params, wikifier, paramString, tiddler) {
    for (var t = 0; t < params.length; t++) {
        var c = params[t];
        switch (c) {
            case '>':
                var btn = createTiddlyButton(place, this.moreLabel, this.morePrompt, config.macros.toolbar.onClickMore);
                addClass(btn, "moreCommand");
                var e = createTiddlyElement(place, "span", null, "moreCommand");
                e.style.display = "none";
                place = e;
                break;
            default:
                var className = "";
                switch (c.substr(0, 1)) {
                    case "+":
                        className = "defaultCommand";
                        c = c.substr(1);
                        break;
                    case "-":
                        className = "cancelCommand";
                        c = c.substr(1);
                        break;
                }
                if (c in config.commands)
                    this.createCommand(place, c, tiddler, className);
                break;
        }
    }
};

//--
//-- Menu and toolbar commands
//--

config.commands.closeTiddler.handler = function(event, src, title) {
    if (story.isDirty(title) && !readOnly) {
        if (!confirm(config.commands.cancelTiddler.warning.format([title])))
            return false;
    }
    story.setDirty(title, false);
    story.closeTiddler(title, true);
    return false;
};

config.commands.closeOthers.handler = function(event, src, title) {
    story.closeAllTiddlers(title);
    return false;
};

config.commands.editTiddler.handler = function(event, src, title) {
    clearMessage();
    var tiddlerElem = story.getTiddler(title);
    var fields = tiddlerElem.getAttribute("tiddlyFields");
    var st = store.getTiddler(title);
    if (st.from)
		if (confirm("This tiddler is included from " + st.from) == false)
			return;
    story.displayTiddler(null, title, DEFAULT_EDIT_TEMPLATE, false, null, fields);
    story.focusTiddler(title, config.options.txtEditorFocus || "text");
    return false;
};

config.commands.saveTiddler.handler = function(event, src, title) {
    var newTitle = story.saveTiddler(title, event.shiftKey);
    if (newTitle)
        story.displayTiddler(null, newTitle);
    return false;
};

config.commands.cancelTiddler.handler = function(event, src, title) {
    if (story.hasChanges(title) && !readOnly) {
        if (!confirm(this.warning.format([title])))
            return false;
    }
    story.setDirty(title, false);
    story.displayTiddler(null, title);
    return false;
};

config.commands.deleteTiddler.handler = function(event, src, title) {
    var deleteIt = true;
    if (config.options.chkConfirmDelete)
        deleteIt = confirm(this.warning.format([title]));
    if (deleteIt) {
        store.removeTiddler(title);
        story.closeTiddler(title, true);
    }
    return false;
};

config.commands.permalink.handler = function(event, src, title) {
    var t = encodeURIComponent(String.encodeTiddlyLink(title));
    if (window.location.hash != t)
        window.location.hash = t;
    return false;
};

config.commands.references.handlePopup = function(popup, title) {
    var references = store.getReferringTiddlers(title);
    var c = false;
    for (var r = 0; r < references.length; r++) {
        if (references[r].title != title && !references[r].isTagged("excludeLists")) {
            createTiddlyLink(createTiddlyElement(popup, "li"), references[r].title, true);
            c = true;
        }
    }
    if (!c)
        createTiddlyText(createTiddlyElement(popup, "li", null, "disabled"), this.popupNone);
};

config.commands.jump.handlePopup = function(popup, title) {
    story.forEachTiddler(function(title, element) {
        createTiddlyLink(createTiddlyElement(popup, "li"), title, true, null, false, null, true);
    });
};

config.commands.tag.handler = function(event, src, title) {
    return displayPart(src,"tag");
};

config.commands.preview.handler = function(event, src, title) {
    var pe = displayPart(src,"preview").childNodes[1];
    var te = displayPart(src).childNodes[1].firstChild.firstChild.firstChild;
	removeChildren(pe);
    wikify(te.value,pe);
};

config.commands.reload.handler = function(event, src, title) {
    story.refreshTiddler(title,null,true);
};

function displayPart(src,id)
{
	while (src.tagName != "FIELDSET")
		src = src.parentNode;
	if (id)
		while (src.id != id)
			src = src.nextSibling;
	src.style.display = "block";
	return src;
}

config.commands.fields.handlePopup = function(popup, title) {
    var tiddler = store.fetchTiddler(title);
    if (!tiddler)
        return;
    var fields = {};
    store.forEachField(tiddler, function(tiddler, fieldName, value) { fields[fieldName] = value; }, true);
    var items = [];
    for (var t in fields) {
        items.push({ field: t, value: fields[t] });
    }
    items.sort(function(a, b) { return a.field < b.field ? -1 : (a.field == b.field ? 0 : +1); });
    if (items.length > 0)
        ListView.create(popup, items, this.listViewTemplate);
    else
        createTiddlyElement(popup, "div", null, null, this.emptyText);
};

//--
//-- Tiddler() object
//--

function Tiddler(title, version, text) {
    this.title = title;
    this.text = text || "";
    this.modifier = null;
    this.created = new Date();
    this.modified = this.created;
    this.links = [];
    this.linksUpdated = false;
    this.tags = [];
    this.fields = {};
    this.templates = []; // added member
    this.currentVer = version;
    return this;
}

Tiddler.prototype.getLinks = function() {
    if (this.linksUpdated == false)
        this.changed();
    return this.links;
};

// Returns the fields that are inherited in string field:"value" field2:"value2" format
Tiddler.prototype.getInheritedFields = function() {
    var f = {};
    for (var i in this.fields) {
        if (i == "server.host" || i == "server.workspace" || i == "wikiformat" || i == "server.type") {
            f[i] = this.fields[i];
        }
    }
    return String.encodeHashMap(f);
};

Tiddler.prototype.getComments = function(forceRead) {
	if (forceRead || !this.commentList) {
		var cs = this.commentList = http.getComments({tiddlerId: this.id});
		for (var i = 0; i < cs.length; i++) {
			if (cs[i].ref != "")
				for (var j = 0; j < cs.length; j++)
					if (cs[i].ref == cs[j].created.substr(0,19)) {
						if(cs[j].refs)
							cs[j].refs++;
						else
							cs[j].refs = 1;
					}
		}
	}
	return this.commentList;
};

Tiddler.prototype.addComment = function(text,type) {
    var sr = http.submitComment({ text:text, type:type, tiddler:this.id, version:this.currentVer, receiver: this.modifier });
    if (sr && sr.Success) {
		if (this.commentList)
			this.commentList.push(sr);
		this.comments++;
	}
	return sr;
}

Tiddler.prototype.Notes = function() {
	if (!this.notes)
		return false;
	if (typeof(this.notes) != "array")
		this.notes = http.getNotes({ tiddlerId:this.id });
	return this.notes.length;
}

Tiddler.prototype.getMessages = function(forceRead) {
	if (forceRead || !this.messageList)
		this.messageList = http.getMessages({tiddlerId: this.id});
	return this.messageList;
}

// Increment the changeCount of a tiddler
Tiddler.prototype.incChangeCount = function() {
    var c = this.fields['changecount'];
    c = c ? parseInt(c, 10) : 0;
    this.fields['changecount'] = String(c + 1);
};

// Clear the changeCount of a tiddler
Tiddler.prototype.clearChangeCount = function() {
    if (this.fields['changecount']) {
        delete this.fields['changecount'];
    }
};

Tiddler.prototype.doNotSave = function() {
    return this.fields['doNotSave'];
};

// Returns true if the tiddler has been updated since the tiddler was created or downloaded
Tiddler.prototype.isTouched = function() {
    var changeCount = this.fields['changecount'];
    if (changeCount === undefined)
        changeCount = 0;
    return changeCount > 0;
};

// Return the tiddler as an RSS item
Tiddler.prototype.toRssItem = function(uri) {
    var s = [];
    s.push("<title" + ">" + this.title.htmlEncode() + "</title" + ">");
    s.push("<description>" + wikifyStatic(this.text, null, this).htmlEncode() + "</description>");
    for (var t = 0; t < this.tags.length; t++)
        s.push("<category>" + this.tags[t] + "</category>");
    s.push("<link>" + uri + "#" + encodeURIComponent(String.encodeTiddlyLink(this.title)) + "</link>");
    s.push("<pubDate>" + this.modified.toGMTString() + "</pubDate>");
    return s.join("\n");
};

// Format the text for storage in an RSS item
Tiddler.prototype.saveToRss = function(uri) {
    return "<item>\n" + this.toRssItem(uri) + "\n</item>";
};

// Stash a version
Tiddler.prototype.stashVersion = function() {
    var version = this.version;
    if (version === undefined)
        return;
    if (this.ovs == undefined)
        this.ovs = [];

    if (this.ovs[version] === undefined) {
        this.ovs[version] = {};
        merge(this.ovs[version], this);
        delete this.ovs[version].versions;
    }
}

// Change the text and other attributes of a tiddler
Tiddler.prototype.set = function(title, text, modifier, modified, tags, created, fields) {
    this.assign(title, text, modifier, modified, tags, created, fields);
    this.changed();
    return this;
};

// Change the text and other attributes of a tiddler without triggered a tiddler.changed() call
Tiddler.prototype.assign = function(title, text, modifier, modified, tags, created, fields, version, id) {
    this.stashVersion();
    if (title != undefined)
        this.title = title;
    if (text != undefined)
        this.text = text;
    if (modifier != undefined)
        this.modifier = modifier;
    if (modified != undefined || modified == null)
        this.modified = modified;
    if (created != undefined || created == null)
        this.created = created;
    if (fields != undefined)
        this.fields = fields;
    if (version != undefined)
        this.currentVer = version;
    this.version = this.currentVer;

    if (id != undefined)
        this.id = id;
    if (tags != undefined)
        this.tags = (typeof tags == "string") ? tags.readBracketedList() : tags;
    else if (this.tags == undefined)
        this.tags = [];
    return this;
};

// Get the tags for a tiddler as a string (space delimited, using [[brackets]] for tags containing spaces)
Tiddler.prototype.getTags = function() {
    return String.encodeTiddlyLinkList(this.tags);
};

// Test if a tiddler carries a tag
Tiddler.prototype.isTagged = function(tag) {
    return this.tags.indexOf(tag) != -1;
};

// Static method to convert "\n" to newlines, "\s" to "\"
Tiddler.unescapeLineBreaks = function(text) {
    return text ? text.unescapeLineBreaks() : "";
};

// Convert newlines to "\n", "\" to "\s"
Tiddler.prototype.escapeLineBreaks = function() {
    return this.text.escapeLineBreaks();
};

// Updates the secondary information (like links[] array) after a change to a tiddler
Tiddler.prototype.changed = function() {
    this.links = [];
    var t = this.autoLinkWikiWords() ? 0 : 1;
    var tiddlerLinkRegExp = t == 0 ? config.textPrimitives.tiddlerAnyLinkRegExp : config.textPrimitives.tiddlerForcedLinkRegExp;
    tiddlerLinkRegExp.lastIndex = 0;
    var formatMatch = tiddlerLinkRegExp.exec(this.text);
    while (formatMatch) {
        var lastIndex = tiddlerLinkRegExp.lastIndex;
        if (t == 0 && formatMatch[1] && formatMatch[1] != this.title) {
            // wikiWordLink
            if (formatMatch.index > 0) {
                var preRegExp = new RegExp(config.textPrimitives.unWikiLink + "|" + config.textPrimitives.anyLetter, "mg");
                preRegExp.lastIndex = formatMatch.index - 1;
                var preMatch = preRegExp.exec(this.text);
                if (preMatch.index != formatMatch.index - 1)
                    this.links.pushUnique(formatMatch[1]);
            } else {
                this.links.pushUnique(formatMatch[1]);
            }
        }
        else if (formatMatch[2 - t] && !config.formatterHelpers.isExternalLink(formatMatch[3 - t])) // titledBrackettedLink
            this.links.pushUnique(formatMatch[3 - t]);
        else if (formatMatch[4 - t] && formatMatch[4 - t] != this.title) // brackettedLink
            this.links.pushUnique(formatMatch[4 - t]);
        tiddlerLinkRegExp.lastIndex = lastIndex;
        formatMatch = tiddlerLinkRegExp.exec(this.text);
    }
    this.linksUpdated = true;
};

Tiddler.prototype.getSubtitle = function() {
    var modifier = this.modifier;
    if (!modifier)
        modifier = config.messages.subtitleUnknown;
    var modified = this.modified;
    if (modified)
        modified = modified.toLocaleString();
    else
        modified = config.messages.subtitleUnknown;
    return config.messages.tiddlerLinkTooltip.format([this.title, modifier, modified]);
};

Tiddler.prototype.isReadOnly = function() {
    return readOnly || this.readOnly || config.access == "add" && this.modifier != config.views.wikified.defaultModifier && this.modifier != config.options.txtUserName;
};

Tiddler.prototype.autoLinkWikiWords = function() {
    return !(this.isTagged("systemConfig") || this.isTagged("excludeMissing"));
};

Tiddler.prototype.getServerType = function() {
    var serverType = null;
    if (this.fields['server.type'])
        serverType = this.fields['server.type'];
    if (!serverType)
        serverType = this.fields['wikiformat'];
    if (serverType && !config.adaptors[serverType])
        serverType = null;
    return serverType;
};

Tiddler.prototype.getAdaptor = function() {
    var serverType = this.getServerType();
    return serverType ? new config.adaptors[serverType]() : null;
};

Tiddler.prototype.display = function(target,fields,toggling) {
    try {
        if (this.isTagged("javaScript") && !toggling) {
            try {
                var a = eval(this.text);
                if (a != "undefined") {
                    var t = this.text;
                    this.text = a;
                    if (story.getTiddler(this.title))
                        story.refreshTiddler(this.title,null,true);
                    else
                        story.displayTiddler(target, this, null, true, null, fields, toggling);
                    this.text = t;
                }
            } catch(x) {
                displayMessage(x.message)
            }
        }
        else
            story.displayTiddler(target, this, null, true, null, fields, toggling);
    } catch (x) {
        displayMessage(x);
    }
}

//--
//-- TiddlyWiki() object contains Tiddler()s
//--

function TiddlyWiki() {
    var tiddlers = {}; // Hashmap by name of tiddlers
    this.tiddlersUpdated = false;
    this.namedNotifications = []; // Array of {name:,notify:} of notification functions
    this.notificationLevel = 0;
    this.slices = {}; // map tiddlerName->(map sliceName->sliceValue). Lazy.
    this.clear = function() {
        tiddlers = {};
        this.setDirty(false);
    };
    this.fetchTiddler = function(title) {
        var t = tiddlers[title];
        return t instanceof Tiddler ? t : null;
    };
    this.deleteTiddler = function(title) {
        var t = tiddlers[title];
        delete tiddlers[title];
        delete this.slices[title];
    };
    this.addTiddler = function(tiddler) {
        delete this.slices[tiddler.title];
        tiddlers[tiddler.title] = tiddler;
    };
    this.forEachTiddler = function(callback) {
        for (var t in tiddlers) {
            var tiddler = tiddlers[t];
            if (tiddler instanceof Tiddler)
                callback.call(this, t, tiddler);
        }
    };
}

TiddlyWiki.prototype.setDirty = function(dirty) {
    this.dirty = dirty;
};

TiddlyWiki.prototype.isDirty = function() {
    return this.dirty;
};

TiddlyWiki.prototype.tiddlerExists = function(title) {
    var t = this.fetchTiddler(title);
    return t != undefined;
};

TiddlyWiki.prototype.isShadowTiddler = function(title) {
	var t = this.fetchTiddler(title);
    return t && t.hasShadow;
};

TiddlyWiki.prototype.createTiddler = function(title) {
    var tiddler = this.fetchTiddler(title);
    if (!tiddler) {
        tiddler = new Tiddler(title, 0);
        this.addTiddler(tiddler);
        this.setDirty(true);
    }
    return tiddler;
};

TiddlyWiki.prototype.getTiddler = function(title) {
    var t = this.fetchTiddler(title);
    if (t != undefined)
        return t;
    return null;
};

TiddlyWiki.prototype.getTiddlerText = function(title, defaultText) {
    if (!title)
        return defaultText;
    var pos = title.indexOf(config.textPrimitives.sectionSeparator);
    var section = null;
    if (pos != -1) {
        section = title.substr(pos + config.textPrimitives.sectionSeparator.length);
        title = title.substr(0, pos);
    }
    pos = title.indexOf(config.textPrimitives.sliceSeparator);
    if (pos != -1) {
        var slice = this.getTiddlerSlice(title.substr(0, pos), title.substr(pos + config.textPrimitives.sliceSeparator.length));
        if (slice)
            return slice;
    }
    var tiddler = this.fetchTiddler(title);
    if (tiddler) {
        if (!section)
            return tiddler.text;
        var re = new RegExp("(^!{1,6}" + section.escapeRegExp() + "[ \t]*\n)", "mg");
        re.lastIndex = 0;
        var match = re.exec(tiddler.text);
        if (match) {
            var t = tiddler.text.substr(match.index + match[1].length);
            var re2 = /^!/mg;
            re2.lastIndex = 0;
            match = re2.exec(t); //# search for the next heading
            if (match)
                t = t.substr(0, match.index - 1); //# don't include final \n
            return t;
        }
        return defaultText;
    }
    if (defaultText != undefined)
        return defaultText;
    return null;
};

TiddlyWiki.prototype.getRecursiveTiddlerText = function(title, defaultText, depth) {
    var bracketRegExp = new RegExp("(?:\\[\\[([^\\]]+)\\]\\])", "mg");
    var text = this.getTiddlerText(title, null);
    if (text == null)
        return defaultText;
    var textOut = [];
    var lastPos = 0;
    do {
        var match = bracketRegExp.exec(text);
        if (match) {
            textOut.push(text.substr(lastPos, match.index - lastPos));
            if (match[1]) {
                if (depth <= 0)
                    textOut.push(match[1]);
                else
                    textOut.push(this.getRecursiveTiddlerText(match[1], "[[" + match[1] + "]]", depth - 1));
            }
            lastPos = match.index + match[0].length;
        } else {
            textOut.push(text.substr(lastPos));
        }
    } while (match);
    return textOut.join("");
};

TiddlyWiki.prototype.slicesRE = /(?:^([\'\/]{0,2})~?([\.\w]+)\:\1\s*([^\n]+)\s*$)|(?:^\|([\'\/]{0,2})~?([\.\w]+)\:?\4\|\s*([^\|\n]+)\s*\|$)/gm;

// @internal
TiddlyWiki.prototype.calcAllSlices = function(title) {
    var slices = {};
    var text = this.getTiddlerText(title, "");
    this.slicesRE.lastIndex = 0;
    var m = this.slicesRE.exec(text);
    while (m) {
        if (m[2])
            slices[m[2]] = m[3];
        else
            slices[m[5]] = m[6];
        m = this.slicesRE.exec(text);
    }
    return slices;
};

// Returns the slice of text of the given name
TiddlyWiki.prototype.getTiddlerSlice = function(title, sliceName) {
    var slices = this.slices[title];
    if (!slices) {
        slices = this.calcAllSlices(title);
        this.slices[title] = slices;
    }
    return slices[sliceName];
};

// Build an hashmap of the specified named slices of a tiddler
TiddlyWiki.prototype.getTiddlerSlices = function(title, sliceNames) {
    var r = {};
    for (var t = 0; t < sliceNames.length; t++) {
        var slice = this.getTiddlerSlice(title, sliceNames[t]);
        if (slice)
            r[sliceNames[t]] = slice;
    }
    return r;
};

TiddlyWiki.prototype.suspendNotifications = function() {
    this.notificationLevel--;
};

TiddlyWiki.prototype.resumeNotifications = function() {
    this.notificationLevel++;
};

// Invoke the notification handlers for a particular tiddler
TiddlyWiki.prototype.notify = function(title, doBlanket) {
    if (!this.notificationLevel) {
        for (var t = 0; t < this.namedNotifications.length; t++) {
            var n = this.namedNotifications[t];
            if ((n.name == null && doBlanket) || (n.name == title))
                n.notify(title);
        }
    }
};

// Invoke the notification handlers for all tiddlers
TiddlyWiki.prototype.notifyAll = function() {
    if (!this.notificationLevel) {
        for (var t = 0; t < this.namedNotifications.length; t++) {
            var n = this.namedNotifications[t];
            if (n.name)
                n.notify(n.name);
        }
    }
};

// Add a notification handler to a tiddler
TiddlyWiki.prototype.addNotification = function(title, fn) {
    for (var i = 0; i < this.namedNotifications.length; i++) {
        if ((this.namedNotifications[i].name == title) && (this.namedNotifications[i].notify == fn))
            return this;
    }
    this.namedNotifications.push({ name: title, notify: fn });
    return this;
};

TiddlyWiki.prototype.removeTiddler = function(title) {
    var tiddler = this.fetchTiddler(title);
    if (tiddler) {
        if (tiddler.id) {
            var result = http.deleteTiddler({ tiddlerId: tiddler.id });
            if (result.error)
                return displayMessage(result.error);
        }
        if (tiddler.hasShadow) {
			merge(tiddler,tiddler.ovs[0]);
			tiddler.currentVer = 0;
			delete tiddler.versions;
			for (var i = 1; i < tiddler.ovs.length; i++)
				delete tiddler.ovs[i];
		}
		else
	        this.deleteTiddler(title);
        this.notify(title, true);
        this.setDirty(true);
    }
};

TiddlyWiki.prototype.setTiddlerTag = function(title, status, tag) {
    var tiddler = this.fetchTiddler(title);
    if (tiddler) {
        var t = tiddler.tags.indexOf(tag);
        if (t != -1)
            tiddler.tags.splice(t, 1);
        if (status)
            tiddler.tags.push(tag);
        tiddler.changed();
        tiddler.incChangeCount(title);
        this.notify(title, true);
        this.setDirty(true);
    }
};

TiddlyWiki.prototype.addTiddlerFields = function(title, fields) {
    var tiddler = this.fetchTiddler(title);
    if (!tiddler)
        return;
    merge(tiddler.fields, fields);
    tiddler.changed();
    tiddler.incChangeCount(title);
    this.notify(title, true);
    this.setDirty(true);
};

TiddlyWiki.prototype.saveTiddler = function(title, newTitle, newBody, modifier, modified, tags, fields) {
    var tiddler = this.fetchTiddler(title);
    if (tiddler) {
        var created = tiddler.created; // Preserve created date
        var versions = tiddler.versions;
        this.deleteTiddler(title);
        tiddler.currentVer++;
    } else {
        var created = modified;
        tiddler = new Tiddler(null,1);
    }
    tiddler.set(newTitle, newBody, modifier, modified, tags, created, fields);

    var result = http.saveTiddler({ tiddlerId: tiddler.id, tiddlerName: newTitle, text: newBody, tags: tags, version: tiddler.currentVer, modifier: modifier, versions: versions, shadow: tiddler.hasShadow ? 1 : 0 });

    if (result.error)
        displayMessage(result.error);
    else
        merge(tiddler, result);

    this.addTiddler(tiddler);
    if (title != newTitle)
        this.notify(title, true);
    this.notify(newTitle, true);
    this.setDirty(true);
    return tiddler;
};

TiddlyWiki.prototype.getLoader = function() {
    if (!this.loader)
        this.loader = new TW21Loader();
    return this.loader;
};

// Load contents of a TiddlyWiki from an HTML DIV
TiddlyWiki.prototype.loadFromDiv = function(src, idPrefix, noUpdate, fn) {
    this.idPrefix = idPrefix;
    var storeElem = (typeof src == "string") ? document.getElementById(src) : src;
    if (!storeElem)
        return;
    var tiddlers = this.getLoader().loadTiddlers(this, storeElem.childNodes, fn);
    this.setDirty(false);
    if (!noUpdate) {
        for (var i = 0; i < tiddlers.length; i++)
            tiddlers[i].changed();
    }
};

TiddlyWiki.prototype.updateTiddlers = function() {
    this.tiddlersUpdated = true;
    this.forEachTiddler(function(title, tiddler) {
        tiddler.changed();
    });
};

// Return an array of tiddlers matching a search regular expression
TiddlyWiki.prototype.search = function(searchRegExp, sortField, excludeTag, match) {
    var candidates = this.reverseLookup("tags", excludeTag, !!match);
    var results = [];
    for (var t = 0; t < candidates.length; t++) {
        if ((candidates[t].title.search(searchRegExp) != -1) || (candidates[t].text.search(searchRegExp) != -1))
            results.push(candidates[t]);
    }
    if (!sortField)
        sortField = "title";
    results.sort(function(a, b) { return a[sortField] < b[sortField] ? -1 : (a[sortField] == b[sortField] ? 0 : +1); });
    return results;
};

// Returns a list of all tags in use
//   excludeTag - if present, excludes tags that are themselves tagged with excludeTag
// Returns an array of arrays where [tag][0] is the name of the tag and [tag][1] is the number of occurances
TiddlyWiki.prototype.getTags = function(excludeTag) {
    var results = [];
    this.forEachTiddler(function(title, tiddler) {
        for (var g = 0; g < tiddler.tags.length; g++) {
            var tag = tiddler.tags[g];
            var n = true;
            for (var c = 0; c < results.length; c++) {
                if (results[c][0] == tag) {
                    n = false;
                    results[c][1]++;
                }
            }
            if (n && excludeTag) {
                var t = this.fetchTiddler(tag);
                if (t && t.isTagged(excludeTag))
                    n = false;
            }
            if (n)
                results.push([tag, 1]);
        }
    });
    results.sort(function(a, b) { return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : (a[0].toLowerCase() == b[0].toLowerCase() ? 0 : +1); });
    return results;
};

// Return an array of the tiddlers that are tagged with a given tag
TiddlyWiki.prototype.getTaggedTiddlers = function(tag, sortField) {
    return this.reverseLookup("tags", tag, true, sortField);
};

// Return an array of the tiddlers that link to a given tiddler
TiddlyWiki.prototype.getReferringTiddlers = function(title, unusedParameter, sortField) {
    if (!this.tiddlersUpdated)
        this.updateTiddlers();
    return this.reverseLookup("links", title, true, sortField);
};

// Return an array of the tiddlers that do or do not have a specified entry in the specified storage array (ie, "links" or "tags")
// lookupMatch == true to match tiddlers, false to exclude tiddlers
TiddlyWiki.prototype.reverseLookup = function(lookupField, lookupValue, lookupMatch, sortField) {
    var results = [];
    this.forEachTiddler(function(title, tiddler) {
        var f = !lookupMatch;
        for (var lookup = 0; lookup < tiddler[lookupField].length; lookup++) {
            if (tiddler[lookupField][lookup] == lookupValue)
                f = lookupMatch;
        }
        if (f && tiddler.currentVer > 0)
            results.push(tiddler);
    });
    if (!sortField)
        sortField = "title";
    results.sort(function(a, b) { return a[sortField] < b[sortField] ? -1 : (a[sortField] == b[sortField] ? 0 : +1); });
    return results;
};

// Return the tiddlers as a sorted array
TiddlyWiki.prototype.getTiddlers = function(field, excludeTag) {
    var results = [];
    this.forEachTiddler(function(title, tiddler) {
        if (excludeTag == undefined || !tiddler.isTagged(excludeTag))
            results.push(tiddler);
    });
    if (field)
        results.sort(function(a, b) { return a[field] < b[field] ? -1 : (a[field] == b[field] ? 0 : +1); });
    return results;
};

// Return array of names of tiddlers that are referred to but not defined
TiddlyWiki.prototype.getMissingLinks = function(sortField) {
    if (!this.tiddlersUpdated)
        this.updateTiddlers();
    var results = [];
    this.forEachTiddler(function(title, tiddler) {
        if (tiddler.isTagged("excludeMissing") || tiddler.isTagged("systemConfig") || tiddler.currentVer == 0)
            return;
        for (var n = 0; n < tiddler.links.length; n++) {
            var link = tiddler.links[n];
            if (this.fetchTiddler(link) == null && !this.isShadowTiddler(link))
                results.pushUnique(link);
        }
    });
    results.sort();
    return results;
};

// Return an array of names of tiddlers that are defined but not referred to
TiddlyWiki.prototype.getOrphans = function() {
    var results = [];
    this.forEachTiddler(function(title, tiddler) {
        if (this.getReferringTiddlers(title).length == 0 && !tiddler.isTagged("excludeLists"))
            if (tiddler.currentVer > 0) results.push(title);
    });
    results.sort();
    return results;
};

// Return an array of names of all the shadow tiddlers
TiddlyWiki.prototype.getShadowed = function() {
    var results = [];
    this.forEachTiddler(function(title, tiddler) {
        if (tiddler.hasShadow)
            results.push(tiddler.title);
    });
    results.sort();
    return results;
};

// Return an array of tiddlers that have been touched since they were downloaded or created
TiddlyWiki.prototype.getTouched = function() {
    var results = [];
    this.forEachTiddler(function(title, tiddler) {
        if (tiddler.isTouched())
            results.push(tiddler);
    });
    results.sort();
    return results;
};

// Resolves a Tiddler reference or tiddler title into a Tiddler object, or null if it doesn't exist
TiddlyWiki.prototype.resolveTiddler = function(tiddler) {
    var t = (typeof tiddler == 'string') ? this.getTiddler(tiddler) : tiddler;
    return t instanceof Tiddler ? t : null;
};

// Filter a list of tiddlers
TiddlyWiki.prototype.filterTiddlers = function(filter) {
    var results = [];
    if (filter) {
        var tiddler;
        var re = /([^\s\[\]]+)|(?:\[([ \w]+)\[([^\]]+)\]\])|(?:\[\[([^\]]+)\]\])/mg;
        var match = re.exec(filter);
        while (match) {
            if (match[1] || match[4]) {
                var title = match[1] || match[4];
                tiddler = this.fetchTiddler(title);
                if (tiddler) {
                    results.pushUnique(tiddler);
                } else if (this.isShadowTiddler(title)) {
                    tiddler = new Tiddler();
                    tiddler.set(title, this.getTiddlerText(title));
                    results.pushUnique(tiddler);
                }
            } else if (match[2]) {
                switch (match[2]) {
                    case "tag":
                        var matched = this.getTaggedTiddlers(match[3]);
                        for (var m = 0; m < matched.length; m++)
                            results.pushUnique(matched[m]);
                        break;
                    case "sort":
                        results = this.sortTiddlers(results, match[3]);
                        break;
                }
            }
            match = re.exec(filter);
        }
    }
    return results;
};

// Sort a list of tiddlers
TiddlyWiki.prototype.sortTiddlers = function(tiddlers, field) {
    var asc = +1;
    switch (field.substr(0, 1)) {
        case "-":
            asc = -1;
            // Note: this fall-through is intentional
            /*jsl:fallthru*/
        case "+":
            field = field.substr(1);
            break;
    }
    if (TiddlyWiki.standardFieldAccess[field])
        tiddlers.sort(function(a, b) { return a[field] < b[field] ? -asc : (a[field] == b[field] ? 0 : asc); });
    else
        tiddlers.sort(function(a, b) { return a.fields[field] < b.fields[field] ? -asc : (a.fields[field] == b.fields[field] ? 0 : +asc); });
    return tiddlers;
};

// Returns true if path is a valid field name (path),
// i.e. a sequence of identifiers, separated by '.'
TiddlyWiki.isValidFieldName = function(name) {
    var match = /[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)*/.exec(name);
    return match && (match[0] == name);
};

// Throws an exception when name is not a valid field name.
TiddlyWiki.checkFieldName = function(name) {
    if (!TiddlyWiki.isValidFieldName(name))
        throw config.messages.invalidFieldName.format([name]);
};

function StringFieldAccess(n, readOnly, prior) {
    this.set = readOnly ?
        function(t, v) { if (v != t[n]) throw config.messages.fieldCannotBeChanged.format([n]); } :
        function(t, v) { if (v != t[n]) { t[n] = v; return true; } };
    this.get = 
        function(t) { return t[n]; };
}

function DateFieldAccess(n) {
    this.set = function(t, v) {
        var d = v instanceof Date ? v : Date.convertFromYYYYMMDDHHMM(v);
        if (d != t[n]) {
            t[n] = d; return true;
        }
    };
    this.get = function(t) { return t[n] ? t[n].convertToYYYYMMDDHHMM() : undefined; };
}

function LinksFieldAccess(n) {
    this.set = function(t, v) {
        var s = (typeof v == "string") ? v.readBracketedList() : v;
        if (s.toString() != t[n].toString()) {
            t[n] = s; return true;
        }
    };
    this.get = function(t) { return String.encodeTiddlyLinkList(t[n]); };
}

TiddlyWiki.standardFieldAccess = {
    // The set functions return true when setting the data has changed the value.
    "title": new StringFieldAccess("title", true, true),
    // Handle the "tiddler" field name as the title
    "tiddler": new StringFieldAccess("title", true, true),
    "text": new StringFieldAccess("text", false, true),
    "modifier": new StringFieldAccess("modifier"),
    "modified": new DateFieldAccess("modified"),
    "created": new DateFieldAccess("created"),
    "versions": new StringFieldAccess("versions"),
    "id": new StringFieldAccess("id"),
    "version": new StringFieldAccess("version"),
    "comments": new StringFieldAccess("comments"),
    "tags": new LinksFieldAccess("tags")
};

TiddlyWiki.isStandardField = function(name) {
    return TiddlyWiki.standardFieldAccess[name] != undefined;
};

// Sets the value of the given field of the tiddler to the value.
// Setting an ExtendedField's value to null or undefined removes the field.
// Setting a namespace to undefined removes all fields of that namespace.
// The fieldName is case-insensitive.
// All values will be converted to a string value.
TiddlyWiki.prototype.setValue = function(tiddler, fieldName, value) {
    TiddlyWiki.checkFieldName(fieldName);
    var t = this.resolveTiddler(tiddler);
    if (!t)
        return;
    fieldName = fieldName.toLowerCase();
    var isRemove = (value === undefined) || (value === null);
    var accessor = TiddlyWiki.standardFieldAccess[fieldName];
    if (accessor) {
        if (isRemove)
        // don't remove StandardFields
            return;
        var h = TiddlyWiki.standardFieldAccess[fieldName];
        if (!h.set(t, value))
            return;
    } else {
        var oldValue = t.fields[fieldName];
        if (isRemove) {
            if (oldValue !== undefined) {
                // deletes a single field
                delete t.fields[fieldName];
            } else {
                // no concrete value is defined for the fieldName
                // so we guess this is a namespace path.
                // delete all fields in a namespace
                var re = new RegExp('^' + fieldName + '\\.');
                var dirty = false;
                for (var n in t.fields) {
                    if (n.match(re)) {
                        delete t.fields[n];
                        dirty = true;
                    }
                }
                if (!dirty)
                    return;
            }
        } else {
            // the "normal" set case. value is defined (not null/undefined)
            // For convenience provide a nicer conversion Date->String
            value = value instanceof Date ? value.convertToYYYYMMDDHHMMSSMMM() : String(value);
            if (oldValue == value)
                return;
            t.fields[fieldName] = value;
        }
    }
    // When we are here the tiddler/store really was changed.
    this.notify(t.title, true);
    if (!fieldName.match(/^temp\./))
        this.setDirty(true);
};

// Returns the value of the given field of the tiddler.
// The fieldName is case-insensitive.
// Will only return String values (or undefined).
TiddlyWiki.prototype.getValue = function(tiddler, fieldName) {
    var t = this.resolveTiddler(tiddler);
    if (!t)
        return undefined;
    fieldName = fieldName.toLowerCase();
    var accessor = TiddlyWiki.standardFieldAccess[fieldName];
    if (accessor) {
        return accessor.get(t);
    }
    return t.fields[fieldName];
};

// Calls the callback function for every field in the tiddler.
// When callback function returns a non-false value the iteration stops
// and that value is returned.
// The order of the fields is not defined.
// @param callback a function(tiddler,fieldName,value).
TiddlyWiki.prototype.forEachField = function(tiddler, callback, onlyExtendedFields) {
    var t = this.resolveTiddler(tiddler);
    if (!t)
        return undefined;
    var n, result;
    for (n in t.fields) {
        result = callback(t, n, t.fields[n]);
        if (result)
            return result;
    }
    if (onlyExtendedFields)
        return undefined;
    for (n in TiddlyWiki.standardFieldAccess) {
        if (n == "tiddler")
        // even though the "title" field can also be referenced through the name "tiddler"
        // we only visit this field once.
            continue;
        result = callback(t, n, TiddlyWiki.standardFieldAccess[n].get(t));
        if (result)
            return result;
    }
    return undefined;
};

//--
//-- Story functions
//--

function Story(containerId, idPrefix) {
    this.container = containerId;
    this.idPrefix = idPrefix;
    this.highlightRegExp = null;
    this.tiddlerId = function(title) {
        var id = this.idPrefix + title;
        return id == this.container ? this.idPrefix + "_" + title : id;
    };
    this.containerId = function() {
        return this.container;
    };
}

Story.prototype.getTiddler = function(title) {
    return document.getElementById(this.tiddlerId(title));
};

Story.prototype.getContainer = function() {
    return document.getElementById(this.containerId());
};

Story.prototype.forEachTiddler = function(fn) {
    var place = this.getContainer();
    if (!place)
        return;
    var e = place.firstChild;
    while (e) {
        var n = e.nextSibling;
        var title = e.getAttribute("tiddler");
        fn.call(this, title, e);
        e = n;
    }
};

Story.prototype.displayDefaultTiddlers = function() {
    this.displayTiddlers(null, store.filterTiddlers(store.getTiddlerText("DefaultTiddlers")));
};

Story.prototype.displayTiddlers = function(srcElement, titles, template, animate, unused, customFields, toggle) {
    for (var t = titles.length - 1; t >= 0; t--)
        this.displayTiddler(srcElement, titles[t], template, animate, unused, customFields);
};

Story.prototype.displayTiddler = function(srcElement, tiddler, template, animate, unused, customFields, toggle, animationSrc) {
    var title = (tiddler instanceof Tiddler) ? tiddler.title : tiddler;
    var tiddlerElem = this.getTiddler(title);
    if (tiddlerElem) {
        if (toggle)
            this.closeTiddler(title, true);
        else
            this.refreshTiddler(title, template, false, customFields);
    } else {
        var place = this.getContainer();
        var before = this.positionTiddler(srcElement);
        tiddlerElem = this.createTiddler(place, before, title, template, customFields);
    }
    if (animationSrc && typeof animationSrc !== "string") {
        srcElement = animationSrc;
    }
    if (srcElement && typeof srcElement !== "string") {
        if (config.options.chkAnimate && (animate == undefined || animate == true) && anim && typeof Zoomer == "function" && typeof Scroller == "function")
            anim.startAnimating(new Zoomer(title, srcElement, tiddlerElem), new Scroller(tiddlerElem));
        else
            window.scrollTo(0, ensureVisible(tiddlerElem));
    }
    if (!startingUp && title != "LoginDialog")
        this.permaView();
};

Story.prototype.positionTiddler = function(srcElement) {
    var place = this.getContainer();
    var before = null;
    if (typeof srcElement == "string") {
        switch (srcElement) {
            case "top":
                before = place.firstChild;
                break;
            case "bottom":
                before = null;
                break;
        }
    } else {
        var after = this.findContainingTiddler(srcElement);
        if (after == null) {
            before = place.firstChild;
        } else if (after.nextSibling) {
            before = after.nextSibling;
            if (before.nodeType != 1)
                before = null;
        }
    }
    return before;
};

Story.prototype.createTiddler = function(place, before, title, template, customFields) {
    var tiddlerElem = createTiddlyElement(null, "div", this.tiddlerId(title), "tiddler");
    tiddlerElem.setAttribute("refresh", "tiddler");
    if (customFields)
        tiddlerElem.setAttribute("tiddlyFields", customFields);
    place.insertBefore(tiddlerElem, before);
    var defaultText = null;
    this.refreshTiddler(title, template, false, customFields, defaultText);
    return tiddlerElem;
};

Story.prototype.chooseTemplateForTiddler = function(title, template) {
    if (!template)
        template = DEFAULT_VIEW_TEMPLATE;
    if (!isNaN(template)) {
        var tiddler = store.getTiddler(title);
        if (tiddler && tiddler.templates[template])
            template = tiddler.templates[template];
        else
            template = config.tiddlerTemplates[template];
    }
    return template;
};

Story.prototype.getTemplateForTiddler = function(title, template, tiddler) {
    return store.getRecursiveTiddlerText(template, null, 10);
};

Story.prototype.refreshTiddler = function(title, template, force, customFields, defaultText) {
    var tiddlerElem = this.getTiddler(title);
    if (tiddlerElem) {
        if (tiddlerElem.getAttribute("dirty") == "true" && !force)
            return tiddlerElem;
        template = this.chooseTemplateForTiddler(title, template);
        var currTemplate = tiddlerElem.getAttribute("template");
        if ((template != currTemplate) || force) {
            var tiddler = store.getTiddler(title);
            if (!tiddler) {
                tiddler = new Tiddler();
                if (store.isShadowTiddler(title)) {
                    tiddler.set(title, store.getTiddlerText(title), config.views.wikified.shadowModifier, version.date, [], version.date);
                } else {
                    var text = template == "EditTemplate" ?
                            config.views.editor.defaultText.format([title]) :
                            config.views.wikified.defaultText.format([title]);
                    text = defaultText || text;
                    var fields = customFields ? customFields.decodeHashMap() : null;
                    tiddler.set(title, text, config.views.wikified.defaultModifier, version.date, [], version.date, fields);
                }
            }
            tiddlerElem.setAttribute("tags", tiddler.tags.join(" "));
            tiddlerElem.setAttribute("tiddler", title);
            tiddlerElem.setAttribute("template", template);
            tiddlerElem.onmouseover = this.onTiddlerMouseOver;
            tiddlerElem.onmouseout = this.onTiddlerMouseOut;
            tiddlerElem.ondblclick = this.onTiddlerDblClick;
            tiddlerElem[window.event ? "onkeydown" : "onkeypress"] = this.onTiddlerKeyPress;
            tiddlerElem.innerHTML = this.getTemplateForTiddler(title, template, tiddler);
            applyHtmlMacros(tiddlerElem, tiddler);
            if (store.getTaggedTiddlers(title).length > 0)
                addClass(tiddlerElem, "isTag");
            else
                removeClass(tiddlerElem, "isTag");
            if (store.tiddlerExists(title)) {
                removeClass(tiddlerElem, "shadow");
                removeClass(tiddlerElem, "missing");
            } else {
                addClass(tiddlerElem, store.isShadowTiddler(title) ? "shadow" : "missing");
            }
            if (customFields)
                this.addCustomFields(tiddlerElem, customFields);
            forceReflow();
        }
    }
    return tiddlerElem;
};

Story.prototype.addCustomFields = function(place, customFields) {
    var fields = customFields.decodeHashMap();
    var w = document.createElement("div");
    w.style.display = "none";
    place.appendChild(w);
    for (var t in fields) {
        var e = document.createElement("input");
        e.setAttribute("type", "text");
        e.setAttribute("value", fields[t]);
        w.appendChild(e);
        e.setAttribute("edit", t);
    }
};

Story.prototype.refreshAllTiddlers = function(force) {
    var e = this.getContainer().firstChild;
    while (e) {
        var template = e.getAttribute("template");
        if (template && e.getAttribute("dirty") != "true") {
            this.refreshTiddler(e.getAttribute("tiddler"), force ? null : template, true);
        }
        e = e.nextSibling;
    }
};

Story.prototype.onTiddlerMouseOver = function(e) {
    if (window.addClass instanceof Function)
        addClass(this, "selected");
};

Story.prototype.onTiddlerMouseOut = function(e) {
    if (window.removeClass instanceof Function)
        removeClass(this, "selected");
};

Story.prototype.onTiddlerDblClick = function(ev) {
    var e = ev || window.event;
    var target = resolveTarget(e);
    if (target && target.nodeName.toLowerCase() != "input" && target.nodeName.toLowerCase() != "textarea") {
        if (document.selection && document.selection.empty)
            document.selection.empty();
        config.macros.toolbar.invokeCommand(this, "defaultCommand", e);
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        return true;
    }
    return false;
};

Story.prototype.onTiddlerKeyPress = function(ev) {
    var e = ev || window.event;
    clearMessage();
    var consume = false;
    var title = this.getAttribute("tiddler");
    var target = resolveTarget(e);
    switch (e.keyCode) {
        case 9: // Tab
            if (config.options.chkInsertTabs && target.tagName.toLowerCase() == "textarea") {
                replaceSelection(target, String.fromCharCode(9));
                consume = true;
            }
            if (config.isOpera) {
                target.onblur = function() {
                    this.focus();
                    this.onblur = null;
                };
            }
            break;
        case 13: // Ctrl-Enter
        case 10: // Ctrl-Enter on IE PC
        case 77: // Ctrl-Enter is "M" on some platforms
            if (e.ctrlKey) {
                blurElement(this);
                config.macros.toolbar.invokeCommand(this, "defaultCommand", e);
                consume = true;
            }
            break;
        case 27: // Escape
            blurElement(this);
            config.macros.toolbar.invokeCommand(this, "cancelCommand", e);
            consume = true;
            break;
    }
    e.cancelBubble = consume;
    if (consume) {
        if (e.stopPropagation) e.stopPropagation(); // Stop Propagation
        e.returnValue = true; // Cancel The Event in IE
        if (e.preventDefault) e.preventDefault(); // Cancel The Event in Moz
    }
    return !consume;
};

Story.prototype.getTiddlerField = function(title, field) {
    var tiddlerElem = this.getTiddler(title);
    var e = null;
    if (tiddlerElem) {
        var children = tiddlerElem.getElementsByTagName("*");
        for (var t = 0; t < children.length; t++) {
            var c = children[t];
            if (c.tagName.toLowerCase() == "input" || c.tagName.toLowerCase() == "textarea") {
                if (!e)
                    e = c;
                if (c.getAttribute("edit") == field)
                    e = c;
            }
        }
    }
    return e;
};

Story.prototype.focusTiddler = function(title, field) {
    var e = this.getTiddlerField(title, field);
    if (e) {
        e.focus();
        e.select();
    }
};

Story.prototype.blurTiddler = function(title) {
    var tiddlerElem = this.getTiddler(title);
    if (tiddlerElem && tiddlerElem.focus && tiddlerElem.blur) {
        tiddlerElem.focus();
        tiddlerElem.blur();
    }
};

Story.prototype.setTiddlerField = function(title, tag, mode, field) {
    var c = this.getTiddlerField(title, field);
    var tags = c.value.readBracketedList();
    tags.setItem(tag, mode);
    c.value = String.encodeTiddlyLinkList(tags);
};

Story.prototype.setTiddlerTag = function(title, tag, mode) {
    this.setTiddlerField(title, tag, mode, "tags");
};

Story.prototype.closeTiddler = function(title, animate, unused) {
    var tiddlerElem = this.getTiddler(title);
    if (tiddlerElem) {
        clearMessage();
        this.scrubTiddler(tiddlerElem);
        if (config.options.chkAnimate && animate && anim && typeof Slider == "function")
            anim.startAnimating(new Slider(tiddlerElem, false, null, "tiddler"));
        else {
            removeTiddlerNode(tiddlerElem);
            forceReflow();
        }
    }
};

Story.prototype.scrubTiddler = function(tiddlerElem) {
    tiddlerElem.id = null;
};

Story.prototype.setDirty = function(title, dirty) {
    var tiddlerElem = this.getTiddler(title);
    if (tiddlerElem)
        tiddlerElem.setAttribute("dirty", dirty ? "true" : "false");
};

Story.prototype.isDirty = function(title) {
    var tiddlerElem = this.getTiddler(title);
    if (tiddlerElem)
        return tiddlerElem.getAttribute("dirty") == "true";
    return null;
};

Story.prototype.areAnyDirty = function() {
    var r = false;
    this.forEachTiddler(function(title, element) {
        if (this.hasChanges(title))
            r = true;
    });
    return r;
};

Story.prototype.closeAllTiddlers = function(exclude) {
    clearMessage();
    this.forEachTiddler(function(title, element) {
        if ((title != exclude) && element.getAttribute("dirty") != "true")
            this.closeTiddler(title);
    });
    window.scrollTo(0, ensureVisible(this.container));
};

Story.prototype.isEmpty = function() {
    var place = this.getContainer();
    return place && place.firstChild == null;
};

Story.prototype.search = function(text, useCaseSensitive, useRegExp) {
    this.closeAllTiddlers();
    highlightHack = new RegExp(useRegExp ? text : text.escapeRegExp(), useCaseSensitive ? "mg" : "img");
    var matches = store.search(highlightHack, "title", "excludeSearch");
    this.displayTiddlers(null, matches);
    highlightHack = null;
    var q = useRegExp ? "/" : "'";
    if (matches.length > 0)
        displayMessage(config.macros.search.successMsg.format([matches.length.toString(), q + text + q]));
    else
        displayMessage(config.macros.search.failureMsg.format([q + text + q]));
};

Story.prototype.findContainingTiddler = function(e) {
    while (e && !hasClass(e, "tiddler"))
        e = e.parentNode;
    return e;
};

Story.prototype.gatherSaveFields = function(e, fields) {
    if (e && e.getAttribute) {
        var f = e.getAttribute("edit");
        if (f)
            fields[f] = e.value.replace(/\r/mg, "");
        if (e.hasChildNodes()) {
            var c = e.childNodes;
            for (var t = 0; t < c.length; t++)
                this.gatherSaveFields(c[t], fields);
        }
    }
};

Story.prototype.hasChanges = function(title) {
    var e = this.getTiddler(title);
    if (e) {
        var fields = {};
        this.gatherSaveFields(e, fields);
        var tiddler = store.fetchTiddler(title);
        if (!tiddler)
            return false;
        for (var n in fields) {
            if (store.getValue(title, n) != fields[n])
                return true;
        }
    }
    return false;
};

Story.prototype.saveTiddler = function(title, minorUpdate) {
    var tiddlerElem = this.getTiddler(title);
    if (tiddlerElem) {
        var fields = {};
        this.gatherSaveFields(tiddlerElem, fields);
        var newTitle = fields.title || title;
        if (!store.tiddlerExists(newTitle))
            newTitle = newTitle.trim();
        if (store.tiddlerExists(newTitle) && newTitle != title) {
            if (!confirm(config.messages.overwriteWarning.format([newTitle.toString()])))
                return null;
        }
        if (newTitle != title)
            this.closeTiddler(newTitle, false);
        tiddlerElem.id = this.tiddlerId(newTitle);
        tiddlerElem.setAttribute("tiddler", newTitle);
        tiddlerElem.setAttribute("template", DEFAULT_VIEW_TEMPLATE);
        tiddlerElem.setAttribute("dirty", "false");
        if (config.options.chkForceMinorUpdate)
            minorUpdate = !minorUpdate;
        if (!store.tiddlerExists(newTitle))
            minorUpdate = false;
        var newDate = new Date();
        var extendedFields = store.tiddlerExists(newTitle) ? store.fetchTiddler(newTitle).fields : (newTitle != title && store.tiddlerExists(title) ? store.fetchTiddler(title).fields : config.defaultCustomFields);
        for (var n in fields) {
            if (!TiddlyWiki.isStandardField(n))
                extendedFields[n] = fields[n];
        }
        var tiddler = store.saveTiddler(title, newTitle, fields.text, minorUpdate ? undefined : config.options.txtUserName, minorUpdate ? undefined : newDate, fields.tags, extendedFields);
        return newTitle;
    }
    return null;
};

Story.prototype.permaView = function() {
    var links = [];
    this.forEachTiddler(function(title, element) {
        links.push(String.encodeTiddlyLink(title));
    });
    var t = encodeURIComponent(links.join(" "));
    if (t == "")
        t = "#";
    if (window.location.hash != t)
        window.location.hash = t;
};

Story.prototype.switchTheme = function(theme) {
    if (safeMode)
        return;

    var isAvailable = function(title) {
        var s = title ? title.indexOf(config.textPrimitives.sectionSeparator) : -1;
        if (s != -1)
            title = title.substr(0, s);
        return store.tiddlerExists(title) || store.isShadowTiddler(title);
    };

    var getSlice = function(theme, slice) {
        var r;
        if (readOnly)
            r = store.getTiddlerSlice(theme, slice + "ReadOnly") || store.getTiddlerSlice(theme, "Web" + slice);
        r = r || store.getTiddlerSlice(theme, slice);
        if (r && r.indexOf(config.textPrimitives.sectionSeparator) == 0)
            r = theme + r;
        return isAvailable(r) ? r : slice;
    };

    var replaceNotification = function(i, name, theme, slice) {
        var newName = getSlice(theme, slice);
        if (name != newName && store.namedNotifications[i].name == name) {
            store.namedNotifications[i].name = newName;
            return newName;
        }
        return name;
    };

    var pt = config.refresherData.pageTemplate;
    var vi = DEFAULT_VIEW_TEMPLATE;
    var vt = config.tiddlerTemplates[vi];
    var ei = DEFAULT_EDIT_TEMPLATE;
    var et = config.tiddlerTemplates[ei];

    for (var i = 0; i < config.notifyTiddlers.length; i++) {
        var name = config.notifyTiddlers[i].name;
        switch (name) {
            case "PageTemplate":
                config.refresherData.pageTemplate = replaceNotification(i, config.refresherData.pageTemplate, theme, name);
                break;
            case "StyleSheet":
                removeStyleSheet(config.refresherData.styleSheet);
                config.refresherData.styleSheet = replaceNotification(i, config.refresherData.styleSheet, theme, name);
                break;
            case "ColorPalette":
                config.refresherData.colorPalette = replaceNotification(i, config.refresherData.colorPalette, theme, name);
                break;
            default:
                break;
        }
    }
    config.tiddlerTemplates[vi] = getSlice(theme, "ViewTemplate");
    config.tiddlerTemplates[ei] = getSlice(theme, "EditTemplate");
    if (!startingUp) {
        if (config.refresherData.pageTemplate != pt || config.tiddlerTemplates[vi] != vt || config.tiddlerTemplates[ei] != et) {
            refreshAll();
            this.refreshAllTiddlers(true);
        } else {
            setStylesheet(store.getRecursiveTiddlerText(config.refresherData.styleSheet, "", 10), config.refreshers.styleSheet);
        }
        config.options.txtTheme = theme;
        saveOptionCookie("txtTheme");
    }
};

//--
//-- Message area
//--

function getMessageDiv() {
    var msgArea = document.getElementById("messageArea");
    if (!msgArea)
        return null;
    if (!msgArea.hasChildNodes())
        createTiddlyButton(createTiddlyElement(msgArea, "div", null, "messageToolbar"),
        config.messages.messageClose.text,
        config.messages.messageClose.tooltip,
        clearMessage);
    msgArea.style.display = "block";
    return createTiddlyElement(msgArea, "div");
}

function displayMessage(text, linkText) {
    var e = getMessageDiv();
    if (!e) {
        alert(text);
        return;
    }
    if (linkText) {
        var link = createTiddlyElement(e, "a", null, null, text);
        link.href = linkText;
        link.target = "_blank";
    } else {
        e.innerHTML = text; //e.appendChild(document.createTextNode(text));
    }
}

function clearMessage() {
    var msgArea = document.getElementById("messageArea");
    if (msgArea) {
        removeChildren(msgArea);
        msgArea.style.display = "none";
    }
    return false;
}

//--
//-- Refresh mechanism
//--

config.notifyTiddlers = [
{ name: "StyleSheetLayout", notify: refreshStyles },
{ name: "StyleSheetColors", notify: refreshStyles },
{ name: "StyleSheet", notify: refreshStyles },
{ name: "StyleSheetPrint", notify: refreshStyles },
{ name: "PageTemplate", notify: refreshPageTemplate },
{ name: "SiteTitle", notify: refreshPageTitle },
{ name: "SiteSubtitle", notify: refreshPageTitle },
{ name: "ColorPalette", notify: refreshColorPalette },
{ name: null, notify: refreshDisplay }
];

config.refreshers = {
    link: function(e, changeList) {
        var title = e.getAttribute("tiddlyLink");
        refreshTiddlyLink(e, title);
        return true;
    },

    tiddler: function(e, changeList) {
        var title = e.getAttribute("tiddler");
        var template = e.getAttribute("template");
        if (changeList && changeList.indexOf(title) != -1 && !story.isDirty(title))
            story.refreshTiddler(title, template, true);
        else
            refreshElements(e, changeList);
        return true;
    },

    content: function(e, changeList) {
        var title = e.getAttribute("tiddler");
        var force = e.getAttribute("force");
        if (force != null || changeList == null || changeList.indexOf(title) != -1) {
            removeChildren(e);
            wikify(store.getTiddlerText(title, ""), e, null, store.fetchTiddler(title));
            return true;
        } else
            return false;
    },

    macro: function(e, changeList) {
        var macro = e.getAttribute("macroName");
        var params = e.getAttribute("params");
        if (macro)
            macro = config.macros[macro];
        if (macro && macro.refresh)
            macro.refresh(e, params);
        return true;
    }
};

config.refresherData = {
    styleSheet: "StyleSheet",
    defaultStyleSheet: "StyleSheet",
    pageTemplate: "PageTemplate",
    defaultPageTemplate: "PageTemplate",
    colorPalette: "ColorPalette",
    defaultColorPalette: "ColorPalette"
};

function refreshElements(root, changeList) {
    var nodes = root.childNodes;
    for (var c = 0; c < nodes.length; c++) {
        var e = nodes[c], type = null;
        if (e.getAttribute && (e.tagName ? e.tagName != "IFRAME" : true))
            type = e.getAttribute("refresh");
        var refresher = config.refreshers[type];
        var refreshed = false;
        if (refresher != undefined)
            refreshed = refresher(e, changeList);
        if (e.hasChildNodes() && !refreshed)
            refreshElements(e, changeList);
    }
}

function applyHtmlMacros(root, tiddler) {
    var e = root.firstChild;
    while (e) {
        var nextChild = e.nextSibling;
        if (e.getAttribute) {
            var macro = e.getAttribute("macro");
            if (macro) {
                e.removeAttribute("macro");
                var params = "";
                var p = macro.indexOf(" ");
                if (p != -1) {
                    params = macro.substr(p + 1);
                    macro = macro.substr(0, p);
                }
                invokeMacro(e, macro, params, null, tiddler);
            }
        }
        if (e.hasChildNodes())
            applyHtmlMacros(e, tiddler);
        e = nextChild;
    }
}

function refreshPageTemplate(title) {
    var stash = createTiddlyElement(document.body, "div");
    stash.style.display = "none";
    var display = story.getContainer();
    var nodes, t;
    if (display) {
        nodes = display.childNodes;
        for (t = nodes.length - 1; t >= 0; t--)
            stash.appendChild(nodes[t]);
    }
    var wrapper = document.getElementById("contentWrapper");

    var isAvailable = function(title) {
        var s = title ? title.indexOf(config.textPrimitives.sectionSeparator) : -1;
        if (s != -1)
            title = title.substr(0, s);
        return store.tiddlerExists(title) || store.isShadowTiddler(title);
    };
    if (!title || !isAvailable(title))
        title = config.refresherData.pageTemplate;
    if (!isAvailable(title))
        title = config.refresherData.defaultPageTemplate; //# this one is always avaialable
    wrapper.innerHTML = store.getRecursiveTiddlerText(title, null, 10);
    applyHtmlMacros(wrapper);
    refreshElements(wrapper);
    display = story.getContainer();
    removeChildren(display);
    if (!display)
        display = createTiddlyElement(wrapper, "div", story.containerId());
    nodes = stash.childNodes;
    for (t = nodes.length - 1; t >= 0; t--)
        display.appendChild(nodes[t]);
    removeNode(stash);
}

function refreshDisplay(hint) {
    if (typeof hint == "string")
        hint = [hint];
    var e = document.getElementById("contentWrapper");
    refreshElements(e, hint);
}

function refreshPageTitle() {
    document.title = getPageTitle();
}

function getPageTitle() {
    var st = wikifyPlain("SiteTitle");
    var ss = wikifyPlain("SiteSubtitle");
    return st + ((st == "" || ss == "") ? "" : " - ") + ss;
}

function refreshStyles(title, doc) {
    setStylesheet(title == null ? "" : store.getRecursiveTiddlerText(title, "", 10), title, doc || document);
}

function refreshColorPalette(title) {
    if (!startingUp)
        refreshAll();
}

function refreshAll() {
    refreshPageTemplate();
    refreshDisplay();
    refreshStyles("StyleSheetLayout");
    refreshStyles("StyleSheetColors");
    refreshStyles(config.refresherData.styleSheet);
    refreshStyles("StyleSheetPrint");
}


//--
//-- Options stuff
//--

config.optionHandlers = {
    'txt': {
        get: function(name) { return encodeCookie(config.options[name].toString()); },
        set: function(name, value) { config.options[name] = decodeCookie(value); }
    },
    'chk': {
        get: function(name) { return config.options[name] ? "true" : "false"; },
        set: function(name, value) { config.options[name] = value == "true"; }
    }
};

function loadOptionsCookie() {
    if (safeMode)
        return;
    var cookies = document.cookie.split(";");
    for (var c = 0; c < cookies.length; c++) {
        var p = cookies[c].indexOf("=");
        if (p != -1) {
            var name = cookies[c].substr(0, p).trim();
            var value = cookies[c].substr(p + 1).trim();
            var optType = name.substr(0, 3);
            if (config.optionHandlers[optType] && config.optionHandlers[optType].set)
                config.optionHandlers[optType].set(name, value);
        }
    }
}

function saveOptionCookie(name) {
    if (safeMode)
        return;
    var c = name + "=";
    var optType = name.substr(0, 3);
    if (config.optionHandlers[optType] && config.optionHandlers[optType].get)
        c += config.optionHandlers[optType].get(name);
    c += "; expires=Fri, 1 Jan 2038 12:00:00 UTC; path=/";
    document.cookie = c;
}

function encodeCookie(s) {
    return escape(convertUnicodeToHtmlEntities(s));
}

function decodeCookie(s) {
    s = unescape(s);
    var re = /&#[0-9]{1,5};/g;
    return s.replace(re, function($0) { return String.fromCharCode(eval($0.replace(/[&#;]/g, ""))); });
}


config.macros.option.genericCreate = function(place, type, opt, className, desc) {
    var typeInfo = config.macros.option.types[type];
    var c = document.createElement(typeInfo.elementType);
    if (typeInfo.typeValue)
        c.setAttribute("type", typeInfo.typeValue);
    c[typeInfo.eventName] = typeInfo.onChange;
    c.setAttribute("option", opt);
    c.className = className || typeInfo.className;
    if (config.optionsDesc[opt])
        c.setAttribute("title", config.optionsDesc[opt]);
    place.appendChild(c);
    if (desc != "no")
        createTiddlyText(place, config.optionsDesc[opt] || opt);
    c[typeInfo.valueField] = config.options[opt];
    return c;
};

config.macros.option.genericOnChange = function(e) {
    var opt = this.getAttribute("option");
    if (opt) {
        var optType = opt.substr(0, 3);
        var handler = config.macros.option.types[optType];
        if (handler.elementType && handler.valueField)
            config.macros.option.propagateOption(opt, handler.valueField, this[handler.valueField], handler.elementType, this);
    }
    return true;
};

config.macros.option.types = {
    'txt': {
        elementType: "input",
        valueField: "value",
        eventName: "onchange",
        className: "txtOptionInput",
        create: config.macros.option.genericCreate,
        onChange: config.macros.option.genericOnChange
    },
    'chk': {
        elementType: "input",
        valueField: "checked",
        eventName: "onclick",
        className: "chkOptionInput",
        typeValue: "checkbox",
        create: config.macros.option.genericCreate,
        onChange: config.macros.option.genericOnChange
    }
};

config.macros.option.propagateOption = function(opt, valueField, value, elementType, elem) {
    config.options[opt] = value;
    saveOptionCookie(opt);
    var nodes = document.getElementsByTagName(elementType);
    for (var t = 0; t < nodes.length; t++) {
        var optNode = nodes[t].getAttribute("option");
        if (opt == optNode && nodes[t] != elem)
            nodes[t][valueField] = value;
    }
};

config.macros.option.handler = function(place, macroName, params, wikifier, paramString) {
    params = paramString.parseParams("anon", null, true, false, false);
    var opt = (params[1] && params[1].name == "anon") ? params[1].value : getParam(params, "name", null);
    var className = (params[2] && params[2].name == "anon") ? params[2].value : getParam(params, "class", null);
    var desc = getParam(params, "desc", "no");
    var type = opt.substr(0, 3);
    var h = config.macros.option.types[type];
    if (h && h.create)
        h.create(place, type, opt, className, desc);
};

config.macros.options.handler = function(place, macroName, params, wikifier, paramString) {
    params = paramString.parseParams("anon", null, true, false, false);
    var showUnknown = getParam(params, "showUnknown", "no");
    var wizard = new Wizard();
    wizard.createWizard(place, this.wizardTitle);
    wizard.addStep(this.step1Title, this.step1Html);
    var markList = wizard.getElement("markList");
    var chkUnknown = wizard.getElement("chkUnknown");
    chkUnknown.checked = showUnknown == "yes";
    chkUnknown.onchange = this.onChangeUnknown;
    var listWrapper = document.createElement("div");
    markList.parentNode.insertBefore(listWrapper, markList);
    wizard.setValue("listWrapper", listWrapper);
    this.refreshOptions(listWrapper, showUnknown == "yes");
};

config.macros.options.refreshOptions = function(listWrapper, showUnknown) {
    var opts = [];
    for (var n in config.options) {
        var opt = {};
        opt.option = "";
        opt.name = n;
        opt.lowlight = !config.optionsDesc[n];
        opt.description = opt.lowlight ? this.unknownDescription : config.optionsDesc[n];
        if (!opt.lowlight || showUnknown)
            opts.push(opt);
    }
    opts.sort(function(a, b) { return a.name.substr(3) < b.name.substr(3) ? -1 : (a.name.substr(3) == b.name.substr(3) ? 0 : +1); });
    var listview = ListView.create(listWrapper, opts, this.listViewTemplate);
    for (n = 0; n < opts.length; n++) {
        var type = opts[n].name.substr(0, 3);
        var h = config.macros.option.types[type];
        if (h && h.create) {
            h.create(opts[n].colElements['option'], type, opts[n].name, null, "no");
        }
    }
};

config.macros.options.onChangeUnknown = function(e) {
    var wizard = new Wizard(this);
    var listWrapper = wizard.getValue("listWrapper");
    removeChildren(listWrapper);
    config.macros.options.refreshOptions(listWrapper, this.checked);
    return false;
};

// If there are unsaved changes, force the user to confirm before exitting
function confirmExit() {
    hadConfirmExit = true;
    if (story && story.areAnyDirty && story.areAnyDirty())
        return config.messages.confirmExit;
}

//--
//-- TiddlyWiki-specific utility functions
//--

function formatVersion(v) {
    v = v || version;
    return v.major + "." + v.minor + "." + v.revision + (v.beta ? " (beta " + v.beta + ")" : "");
}

function compareVersions(v1, v2) {
    var a = ["major", "minor", "revision"];
    for (var i = 0; i < a.length; i++) {
        var x1 = v1[a[i]] || 0;
        var x2 = v2[a[i]] || 0;
        if (x1 < x2)
            return 1;
        if (x1 > x2)
            return -1;
    }
    x1 = v1.beta || 9999;
    x2 = v2.beta || 9999;
    if (x1 < x2)
        return 1;
    return x1 > x2 ? -1 : 0;
}

function createTiddlyButton(parent, text, tooltip, action, className, id, accessKey, attribs) {
    var btn = document.createElement("a");
    if (action) {
        if (typeof action == "string")
			btn.setAttribute("href", action);
        else {
			btn.onclick = action;
			btn.setAttribute("href", "javascript:;");
		}
    }
    if (tooltip)
        btn.setAttribute("title", tooltip);
    if (text)
        btn.appendChild(document.createTextNode(text));
    btn.className = className || "button";
    if (id)
        btn.id = id;
    if (attribs) {
        for (var i in attribs) {
            btn.setAttribute(i, attribs[i]);
        }
    }
    if (parent)
        parent.appendChild(btn);
    if (accessKey)
        btn.setAttribute("accessKey", accessKey);
    return btn;
}

function createTiddlyLink(place, title, includeText, className, isStatic, linkedFromTiddler, noToggle) {
    var text = includeText ? title : null;
    var i = getTiddlyLinkInfo(title, className);
    var btn = isStatic ? createExternalLink(place, store.getTiddlerText("SiteUrl", null) + "#" + title) : createTiddlyButton(place, text, i.subTitle, i.href || onClickTiddlerLink, i.classes);
    if (isStatic)
        btn.className += ' ' + className;
    btn.setAttribute("refresh", "link");
    btn.setAttribute("tiddlyLink", title);
    if (noToggle)
        btn.setAttribute("noToggle", "true");
    if (linkedFromTiddler) {
        var fields = linkedFromTiddler.getInheritedFields();
        if (fields)
            btn.setAttribute("tiddlyFields", fields);
    }
    return btn;
}

function refreshTiddlyLink(e, title) {
    var i = getTiddlyLinkInfo(title, e.className);
    e.className = i.classes;
    e.title = i.subTitle;
}

function getTiddlyLinkInfo(title, currClasses) {
    var classes = currClasses ? currClasses.split(" ") : [];
    var link;
    classes.pushUnique("tiddlyLink");
    var tiddler = store.fetchTiddler(title);
    var subTitle;
    if (tiddler) {
        subTitle = tiddler.getSubtitle();
        classes.pushUnique("tiddlyLinkExisting");
        classes.remove("tiddlyLinkNonExisting");
        classes.remove("shadow");
    } else if (config.pages[title]) {
        subTitle = config.pages[title].innerText;
        link = config.pages[title].href;
        classes.pushUnique("tiddlyLinkExisting");
        classes.remove("tiddlyLinkNonExisting");
        classes.remove("shadow");
    } else {
        classes.remove("tiddlyLinkExisting");
        classes.pushUnique("tiddlyLinkNonExisting");
        if (store.isShadowTiddler(title)) {
            subTitle = config.messages.shadowedTiddlerToolTip.format([title]);
            classes.pushUnique("shadow");
        } else {
            subTitle = config.messages.undefinedTiddlerToolTip.format([title]);
            classes.remove("shadow");
        }
    }
    if (typeof config.annotations[title] == "string")
        subTitle = config.annotations[title];
    return { classes: classes.join(" "), subTitle: subTitle, href: link };
}

function createExternalLink(place, url) {
    var link = document.createElement("a");
    link.className = "externalLink";
    link.href = url;
    link.title = config.messages.externalLinkTooltip.format([url]);
    if (config.options.chkOpenInNewWindow)
        link.target = "_blank";
    place.appendChild(link);
    return link;
}

// Event handler for clicking on a tiddly link
function onClickTiddlerLink(ev) {
    var e = ev || window.event;
    var target = resolveTarget(e);
    var link = target;
    var title = null;
    var fields = null;
    var noToggle = null;
    do {
        title = link.getAttribute("tiddlyLink");
        fields = link.getAttribute("tiddlyFields");
        noToggle = link.getAttribute("noToggle");
        link = link.parentNode;
    } while (title == null && link != null);
    if (!store.isShadowTiddler(title)) {
        var f = fields ? fields.decodeHashMap() : {};
        fields = String.encodeHashMap(merge(f, config.defaultCustomFields, true));
    }
    if (title) {
        var toggling = e.metaKey || e.ctrlKey;
        if (config.options.chkToggleLinks)
            toggling = !toggling;
        if (noToggle)
            toggling = false;
        t = store.getTiddler(title)
        if (t)
            t.display(target,fields,toggling);
        else
            story.displayTiddler(target, title, null, true, null, null, toggling);
    }
    return false;
}

// Create a button for a tag with a popup listing all the tiddlers that it tags
function createTagButton(place, tag, excludeTiddler, title, tooltip) {
    var btn = createTiddlyButton(place, title || tag, (tooltip || config.views.wikified.tag.tooltip).format([tag]), onClickTag);
    btn.setAttribute("tag", tag);
    if (excludeTiddler)
        btn.setAttribute("tiddler", excludeTiddler);
    return btn;
}

// Event handler for clicking on a tiddler tag
function onClickTag(ev) {
    var e = ev || window.event;
    var popup = Popup.create(this);
    var tag = this.getAttribute("tag");
    var title = this.getAttribute("tiddler");
    if (popup && tag) {
        var tagged = store.getTaggedTiddlers(tag);
        var titles = [];
        var li, r;
        for (r = 0; r < tagged.length; r++) {
            if (tagged[r].title != title)
                titles.push(tagged[r].title);
        }
        var lingo = config.views.wikified.tag;
        if (titles.length > 0) {
            var openAll = createTiddlyButton(createTiddlyElement(popup, "li"), lingo.openAllText.format([tag]), lingo.openAllTooltip, onClickTagOpenAll);
            openAll.setAttribute("tag", tag);
            createTiddlyElement(createTiddlyElement(popup, "li", null, "listBreak"), "div");
            for (r = 0; r < titles.length; r++) {
                createTiddlyLink(createTiddlyElement(popup, "li"), titles[r], true);
            }
        } else {
            createTiddlyText(createTiddlyElement(popup, "li", null, "disabled"), lingo.popupNone.format([tag]));
        }
        createTiddlyElement(createTiddlyElement(popup, "li", null, "listBreak"), "div");
        var h = createTiddlyLink(createTiddlyElement(popup, "li"), tag, false);
        createTiddlyText(h, lingo.openTag.format([tag]));
    }
    Popup.show();
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    return false;
}

// Event handler for 'open all' on a tiddler popup
function onClickTagOpenAll(ev) {
    var tiddlers = store.getTaggedTiddlers(this.getAttribute("tag"));
    story.displayTiddlers(this, tiddlers);
    return false;
}

function onClickError(ev) {
    var e = ev || window.event;
    var popup = Popup.create(this);
    var lines = this.getAttribute("errorText").split("\n");
    for (var t = 0; t < lines.length; t++)
        createTiddlyElement(popup, "li", null, null, lines[t]);
    Popup.show();
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    return false;
}

function createTiddlyDropDown(place, onchange, options, defaultValue) {
    var sel = createTiddlyElement(place, "select");
    sel.onchange = onchange;
    for (var t = 0; t < options.length; t++) {
        var e = createTiddlyElement(sel, "option", null, null, options[t].caption);
        e.value = options[t].name;
        if (options[t].name == defaultValue)
            e.selected = true;
    }
    return sel;
}

function createTiddlyPopup(place, caption, tooltip, tiddler) {
    if (tiddler.text) {
        createTiddlyLink(place, caption, true);
        var btn = createTiddlyButton(place, glyph("downArrow"), tooltip, onClickTiddlyPopup, "tiddlerPopupButton");
        btn.tiddler = tiddler;
    } else {
        createTiddlyText(place, caption);
    }
}

function onClickTiddlyPopup(ev) {
    var e = ev || window.event;
    var tiddler = this.tiddler;
    if (tiddler.text) {
        var popup = Popup.create(this, "div", "popupTiddler");
        wikify(tiddler.text, popup, null, tiddler);
        Popup.show();
    }
    if (e) e.cancelBubble = true;
    if (e && e.stopPropagation) e.stopPropagation();
    return false;
}

function createTiddlyError(place, title, text) {
    var btn = createTiddlyButton(place, title, null, onClickError, "errorButton");
    if (text) btn.setAttribute("errorText", text);
}

function merge(dst, src, preserveExisting) {
    for (var i in src) {
        if (!preserveExisting || dst[i] === undefined)
            dst[i] = src[i];
    }
    return dst;
}

// Returns a string containing the description of an exception, optionally prepended by a message
function exceptionText(e, message) {
    var s = e.description || e.toString();
    return message ? "%0:\n%1".format([message, s]) : s;
}

// Displays an alert of an exception description with optional message
function showException(e, message) {
    alert(exceptionText(e, message));
}

function glyph(name) {
    var g = config.glyphs;
    var b = g.currBrowser;
    if (b == null) {
        b = 0;
        while (!g.browsers[b]() && b < g.browsers.length - 1)
            b++;
        g.currBrowser = b;
    }
    if (!g.codes[name])
        return "";
    return g.codes[name][b];
}

if (!window.console) {
    console = { log: function(message) { displayMessage(message); } };
}

//-
//- Animation engine
//-

function Animator() {
    this.running = 0; // Incremented at start of each animation, decremented afterwards. If zero, the interval timer is disabled
    this.timerID = 0; // ID of the timer used for animating
    this.animations = []; // List of animations in progress
    return this;
}

// Start animation engine
Animator.prototype.startAnimating = function() //# Variable number of arguments
{
    for (var t = 0; t < arguments.length; t++)
        this.animations.push(arguments[t]);
    if (this.running == 0) {
        var me = this;
        this.timerID = window.setInterval(function() { me.doAnimate(me); }, 10);
    }
    this.running += arguments.length;
};

// Perform an animation engine tick, calling each of the known animation modules
Animator.prototype.doAnimate = function(me) {
    var a = 0;
    while (a < me.animations.length) {
        var animation = me.animations[a];
        if (animation.tick()) {
            a++;
        } else {
            me.animations.splice(a, 1);
            if (--me.running == 0)
                window.clearInterval(me.timerID);
        }
    }
};

Animator.slowInSlowOut = function(progress) {
    return (1 - ((Math.cos(progress * Math.PI) + 1) / 2));
};

//--
//-- Morpher animation
//--

// Animate a set of properties of an element
function Morpher(element, duration, properties, callback) {
    this.element = element;
    this.duration = duration;
    this.properties = properties;
    this.startTime = new Date();
    this.endTime = Number(this.startTime) + duration;
    this.callback = callback;
    this.tick();
    return this;
}

Morpher.prototype.assignStyle = function(element, style, value) {
    switch (style) {
        case "-tw-vertScroll":
            window.scrollTo(findScrollX(), value);
            break;
        case "-tw-horizScroll":
            window.scrollTo(value, findScrollY());
            break;
        default:
            element.style[style] = value;
            break;
    }
};

Morpher.prototype.stop = function() {
    for (var t = 0; t < this.properties.length; t++) {
        var p = this.properties[t];
        if (p.atEnd !== undefined) {
            this.assignStyle(this.element, p.style, p.atEnd);
        }
    }
    if (this.callback)
        this.callback(this.element, this.properties);
};

Morpher.prototype.tick = function() {
    var currTime = Number(new Date());
    var progress = Animator.slowInSlowOut(Math.min(1, (currTime - this.startTime) / this.duration));
    for (var t = 0; t < this.properties.length; t++) {
        var p = this.properties[t];
        if (p.start !== undefined && p.end !== undefined) {
            var template = p.template || "%0";
            switch (p.format) {
                case undefined:
                case "style":
                    var v = p.start + (p.end - p.start) * progress;
                    this.assignStyle(this.element, p.style, template.format([v]));
                    break;
                case "color":
                    break;
            }
        }
    }
    if (currTime >= this.endTime) {
        this.stop();
        return false;
    }
    return true;
};

//--
//-- Zoomer animation
//--

function Zoomer(text, startElement, targetElement, unused) {
    var e = createTiddlyElement(document.body, "div", null, "zoomer");
    createTiddlyElement(e, "div", null, null, text);
    var winWidth = findWindowWidth();
    var winHeight = findWindowHeight();
    var p = [
    { style: 'left', start: findPosX(startElement), end: findPosX(targetElement), template: '%0px' },
    { style: 'top', start: findPosY(startElement), end: findPosY(targetElement), template: '%0px' },
    { style: 'width', start: Math.min(startElement.scrollWidth, winWidth), end: Math.min(targetElement.scrollWidth, winWidth), template: '%0px', atEnd: 'auto' },
    { style: 'height', start: Math.min(startElement.scrollHeight, winHeight), end: Math.min(targetElement.scrollHeight, winHeight), template: '%0px', atEnd: 'auto' },
    { style: 'fontSize', start: 8, end: 24, template: '%0pt' }
];
    var c = function(element, properties) { removeNode(element); };
    return new Morpher(e, config.animDuration, p, c);
}

//--
//-- Scroller animation
//--

function Scroller(targetElement) {
    var p = [{ style: '-tw-vertScroll', start: findScrollY(), end: ensureVisible(targetElement)}];
    return new Morpher(targetElement, config.animDuration, p);
}

//--
//-- Slider animation
//--

// deleteMode - "none", "all" [delete target element and it's children], [only] "children" [but not the target element]
function Slider(element, opening, unused, deleteMode) {
    element.style.overflow = 'hidden';
    if (opening)
        element.style.height = '0px'; // Resolves a Firefox flashing bug
    element.style.display = 'block';
    var left = findPosX(element);
    var width = element.scrollWidth;
    var height = element.scrollHeight;
    var winWidth = findWindowWidth();
    var p = [];
    var c = null;
    if (opening) {
        p.push({ style: 'height', start: 0, end: height, template: '%0px', atEnd: 'auto' });
        p.push({ style: 'opacity', start: 0, end: 1, template: '%0' });
        p.push({ style: 'filter', start: 0, end: 100, template: 'alpha(opacity:%0)' });
    } else {
        p.push({ style: 'height', start: height, end: 0, template: '%0px' });
        p.push({ style: 'display', atEnd: 'none' });
        p.push({ style: 'opacity', start: 1, end: 0, template: '%0' });
        p.push({ style: 'filter', start: 100, end: 0, template: 'alpha(opacity:%0)' });
        switch (deleteMode) {
            case "tiddler":
                c = function(element, properties) { removeTiddlerNode(element); };
                break;
            case "all":
                c = function(element, properties) { removeNode(element); };
                break;
            case "children":
                c = function(element, properties) { removeChildren(element); };
                break;
        }
    }
    return new Morpher(element, config.animDuration, p, c);
}

//--
//-- Popup menu
//--

var Popup = {
    stack: [] // Array of objects with members root: and popup:
};

Popup.create = function(root, elem, className) {
    var stackPosition = this.find(root, "popup");
    Popup.remove(stackPosition + 1);
    var popup = createTiddlyElement(document.body, elem || "ol", "popup", className || "popup");
    popup.stackPosition = stackPosition;
    Popup.stack.push({ root: root, popup: popup });
    return popup;
};

Popup.onDocumentClick = function(ev) {
    var e = ev || window.event;
    if (e.eventPhase == undefined)
        Popup.remove();
    else if (e.eventPhase == Event.BUBBLING_PHASE || e.eventPhase == Event.AT_TARGET)
        Popup.remove();
    return true;
};

Popup.show = function(valign, halign, offset) {
    var curr = Popup.stack[Popup.stack.length - 1];
    this.place(curr.root, curr.popup, valign, halign, offset);
    addClass(curr.root, "highlight");
    if (config.options.chkAnimate && anim && typeof Scroller == "function")
        anim.startAnimating(new Scroller(curr.popup));
    else
        window.scrollTo(0, ensureVisible(curr.popup));
};

Popup.place = function(root, popup, valign, halign, offset) {
    if (!offset)
        var offset = { x: 0, y: 0 };
    if (popup.stackPosition >= 0 && !valign && !halign) {
        offset.x = offset.x + root.offsetWidth;
    } else {
        offset.x = (halign == 'right') ? offset.x + root.offsetWidth : offset.x;
        offset.y = (valign == 'top') ? offset.y : offset.y + root.offsetHeight;
    }
    var rootLeft = findPosX(root);
    var rootTop = findPosY(root);
    var popupLeft = rootLeft + offset.x;
    var popupTop = rootTop + offset.y;
    var winWidth = findWindowWidth();
    if (popup.offsetWidth > winWidth * 0.75)
        popup.style.width = winWidth * 0.75 + "px";
    var popupWidth = popup.offsetWidth;
    var scrollWidth = winWidth - document.body.offsetWidth;
    if (popupLeft + popupWidth > winWidth - scrollWidth - 1) {
        if (halign == 'right')
            popupLeft = popupLeft - root.offsetWidth - popupWidth;
        else
            popupLeft = winWidth - popupWidth - scrollWidth - 1;
    }
    popup.style.left = popupLeft + "px";
    popup.style.top = popupTop + "px";
    popup.style.display = "block";
};

Popup.find = function(e) {
    var pos = -1;
    for (var t = this.stack.length - 1; t >= 0; t--) {
        if (isDescendant(e, this.stack[t].popup))
            pos = t;
    }
    return pos;
};

Popup.remove = function(pos) {
    if (!pos) var pos = 0;
    if (Popup.stack.length > pos) {
        Popup.removeFrom(pos);
    }
};

Popup.removeFrom = function(from) {
    for (var t = Popup.stack.length - 1; t >= from; t--) {
        var p = Popup.stack[t];
        removeClass(p.root, "highlight");
        removeNode(p.popup);
    }
    Popup.stack = Popup.stack.slice(0, from);
};

//--
//-- Wizard support
//--

function Wizard(elem) {
    if (elem) {
        this.formElem = findRelated(elem, "wizard", "className");
        this.bodyElem = findRelated(this.formElem.firstChild, "wizardBody", "className", "nextSibling");
        this.footElem = findRelated(this.formElem.firstChild, "wizardFooter", "className", "nextSibling");
    } else {
        this.formElem = null;
        this.bodyElem = null;
        this.footElem = null;
    }
}

Wizard.prototype.setValue = function(name, value) {
    if (this.formElem)
        this.formElem[name] = value;
};

Wizard.prototype.getValue = function(name) {
    return this.formElem ? this.formElem[name] : null;
};

Wizard.prototype.createWizard = function(place, title) {
    this.formElem = createTiddlyElement(place, "form", null, "wizard");
    createTiddlyElement(this.formElem, "h1", null, null, title);
    this.bodyElem = createTiddlyElement(this.formElem, "div", null, "wizardBody");
    this.footElem = createTiddlyElement(this.formElem, "div", null, "wizardFooter");
};

Wizard.prototype.clear = function() {
    removeChildren(this.bodyElem);
};

Wizard.prototype.setButtons = function(buttonInfo, status) {
    removeChildren(this.footElem);
    for (var t = 0; t < buttonInfo.length; t++) {
        createTiddlyButton(this.footElem, buttonInfo[t].caption, buttonInfo[t].tooltip, buttonInfo[t].onClick);
        insertSpacer(this.footElem);
    }
    if (typeof status == "string") {
        createTiddlyElement(this.footElem, "span", null, "status", status);
    }
};

Wizard.prototype.addStep = function(stepTitle, html) {
    removeChildren(this.bodyElem);
    var w = createTiddlyElement(this.bodyElem, "div");
    createTiddlyElement(w, "h2", null, null, stepTitle);
    var step = createTiddlyElement(w, "div", null, "wizardStep");
    step.innerHTML = html;
    applyHtmlMacros(step, tiddler);
};

Wizard.prototype.getElement = function(name) {
    return this.formElem.elements[name];
};

//--
//-- ListView gadget
//--

var ListView = {};

// Create a listview
ListView.create = function(place, listObject, listTemplate, callback, className) {
    var table = createTiddlyElement(place, "table", null, className || "listView twtable");
    var thead = createTiddlyElement(table, "thead");
    var r = createTiddlyElement(thead, "tr");
    for (var t = 0; t < listTemplate.columns.length; t++) {
        var columnTemplate = listTemplate.columns[t];
        var c = createTiddlyElement(r, "th");
        var colType = ListView.columnTypes[columnTemplate.type];
        if (colType && colType.createHeader) {
            colType.createHeader(c, columnTemplate, t);
            if (columnTemplate.className)
                addClass(c, columnTemplate.className);
        }
    }
    var tbody = createTiddlyElement(table, "tbody");
    for (var rc = 0; rc < listObject.length; rc++) {
        var rowObject = listObject[rc];
        r = createTiddlyElement(tbody, "tr");
        for (c = 0; c < listTemplate.rowClasses.length; c++) {
            if (rowObject[listTemplate.rowClasses[c].field])
                addClass(r, listTemplate.rowClasses[c].className);
        }
        rowObject.rowElement = r;
        rowObject.colElements = {};
        for (var cc = 0; cc < listTemplate.columns.length; cc++) {
            c = createTiddlyElement(r, "td");
            columnTemplate = listTemplate.columns[cc];
            var field = columnTemplate.field;
            colType = ListView.columnTypes[columnTemplate.type];
            if (colType && colType.createItem) {
                colType.createItem(c, rowObject, field, columnTemplate, cc, rc);
                if (columnTemplate.className)
                    addClass(c, columnTemplate.className);
            }
            rowObject.colElements[field] = c;
        }
    }
    if (callback && listTemplate.actions)
        createTiddlyDropDown(place, ListView.getCommandHandler(callback), listTemplate.actions);
    if (callback && listTemplate.buttons) {
        for (t = 0; t < listTemplate.buttons.length; t++) {
            var a = listTemplate.buttons[t];
            if (a && a.name != "")
                createTiddlyButton(place, a.caption, null, ListView.getCommandHandler(callback, a.name, a.allowEmptySelection));
        }
    }
    return table;
};

ListView.getCommandHandler = function(callback, name, allowEmptySelection) {
    return function(e) {
        var view = findRelated(this, "TABLE", null, "previousSibling");
        var tiddlers = [];
        ListView.forEachSelector(view, function(e, rowName) {
            if (e.checked)
                tiddlers.push(rowName);
        });
        if (tiddlers.length == 0 && !allowEmptySelection) {
            alert(config.messages.nothingSelected);
        } else {
            if (this.nodeName.toLowerCase() == "select") {
                callback(view, this.value, tiddlers);
                this.selectedIndex = 0;
            } else {
                callback(view, name, tiddlers);
            }
        }
    };
};

// Invoke a callback for each selector checkbox in the listview
ListView.forEachSelector = function(view, callback) {
    var checkboxes = view.getElementsByTagName("input");
    var hadOne = false;
    for (var t = 0; t < checkboxes.length; t++) {
        var cb = checkboxes[t];
        if (cb.getAttribute("type") == "checkbox") {
            var rn = cb.getAttribute("rowName");
            if (rn) {
                callback(cb, rn);
                hadOne = true;
            }
        }
    }
    return hadOne;
};

ListView.getSelectedRows = function(view) {
    var rowNames = [];
    ListView.forEachSelector(view, function(e, rowName) {
        if (e.checked)
            rowNames.push(rowName);
    });
    return rowNames;
};

ListView.columnTypes = {};

ListView.columnTypes.String = {
    createHeader: function(place, columnTemplate, col) {
        createTiddlyText(place, columnTemplate.title);
    },
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        if (v != undefined)
            createTiddlyText(place, v);
    }
};

ListView.columnTypes.WikiText = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        if (v != undefined)
            wikify(v, place, null, null);
    }
};

ListView.columnTypes.Tiddler = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        if (v != undefined && v.title)
            createTiddlyPopup(place, v.title, config.messages.listView.tiddlerTooltip, v);
    }
};

ListView.columnTypes.Size = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        if (v != undefined) {
            var t = 0;
            while (t < config.messages.sizeTemplates.length - 1 && v < config.messages.sizeTemplates[t].unit)
                t++;
            createTiddlyText(place, config.messages.sizeTemplates[t].template.format([Math.round(v / config.messages.sizeTemplates[t].unit)]));
        }
    }
};

ListView.columnTypes.Link = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        var c = columnTemplate.text;
        if (v != undefined)
            createTiddlyText(createExternalLink(place, v), c || v);
    }
};

ListView.columnTypes.Date = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        if (v != undefined)
            createTiddlyText(place, v.formatString(columnTemplate.dateFormat));
    }
};

ListView.columnTypes.StringList = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        if (v != undefined) {
            for (var t = 0; t < v.length; t++) {
                createTiddlyText(place, v[t]);
                createTiddlyElement(place, "br");
            }
        }
    }
};

ListView.columnTypes.Selector = {
    createHeader: function(place, columnTemplate, col) {
        createTiddlyCheckbox(place, null, false, this.onHeaderChange);
    },
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var e = createTiddlyCheckbox(place, null, listObject[field], null);
        e.setAttribute("rowName", listObject[columnTemplate.rowName]);
    },
    onHeaderChange: function(e) {
        var state = this.checked;
        var view = findRelated(this, "TABLE");
        if (!view)
            return;
        ListView.forEachSelector(view, function(e, rowName) {
            e.checked = state;
        });
    }
};

ListView.columnTypes.Tags = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var tags = listObject[field];
        createTiddlyText(place, String.encodeTiddlyLinkList(tags));
    }
};

ListView.columnTypes.Boolean = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        if (listObject[field] == true)
            createTiddlyText(place, columnTemplate.trueText);
        if (listObject[field] == false)
            createTiddlyText(place, columnTemplate.falseText);
    }
};

ListView.columnTypes.TagCheckbox = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var e = createTiddlyCheckbox(place, null, listObject[field], this.onChange);
        e.setAttribute("tiddler", listObject.title);
        e.setAttribute("tag", columnTemplate.tag);
    },
    onChange: function(e) {
        var tag = this.getAttribute("tag");
        var tiddler = this.getAttribute("tiddler");
        store.setTiddlerTag(tiddler, this.checked, tag);
    }
};

ListView.columnTypes.TiddlerLink = {
    createHeader: ListView.columnTypes.String.createHeader,
    createItem: function(place, listObject, field, columnTemplate, col, row) {
        var v = listObject[field];
        if (v != undefined) {
            var link = createTiddlyLink(place, listObject[columnTemplate.tiddlerLink], false, null);
            createTiddlyText(link, listObject[field]);
        }
    }
};

//--
//-- Augmented methods for the JavaScript Number(), Array(), String() and Date() objects
//--

// Clamp a number to a range
Number.prototype.clamp = function(min, max) {
    var c = this;
    if (c < min)
        c = min;
    if (c > max)
        c = max;
    return c;
};

// Add indexOf function if browser does not support it
if (!Array.indexOf) {
    Array.prototype.indexOf = function(item, from) {
        if (!from)
            from = 0;
        for (var i = from; i < this.length; i++) {
            if (this[i] === item)
                return i;
        }
        return -1;
    };
}

// Find an entry in a given field of the members of an array
Array.prototype.findByField = function(field, value) {
    for (var t = 0; t < this.length; t++) {
        if (this[t][field] == value)
            return t;
    }
    return null;
};

// Return whether an entry exists in an array
Array.prototype.contains = function(item) {
    return this.indexOf(item) != -1;
};

// Adds, removes or toggles a particular value within an array
//  value - value to add
//  mode - +1 to add value, -1 to remove value, 0 to toggle it
Array.prototype.setItem = function(value, mode) {
    var p = this.indexOf(value);
    if (mode == 0)
        mode = (p == -1) ? +1 : -1;
    if (mode == +1) {
        if (p == -1)
            this.push(value);
    } else if (mode == -1) {
        if (p != -1)
            this.splice(p, 1);
    }
};

// Return whether one of a list of values exists in an array
Array.prototype.containsAny = function(items) {
    for (var i = 0; i < items.length; i++) {
        if (this.indexOf(items[i]) != -1)
            return true;
    }
    return false;
};

// Return whether all of a list of values exists in an array
Array.prototype.containsAll = function(items) {
    for (var i = 0; i < items.length; i++) {
        if (this.indexOf(items[i]) == -1)
            return false;
    }
    return true;
};

// Push a new value into an array only if it is not already present in the array. If the optional unique parameter is false, it reverts to a normal push
Array.prototype.pushUnique = function(item, unique) {
    if (unique === false) {
        this.push(item);
    } else {
        if (this.indexOf(item) == -1)
            this.push(item);
    }
};

Array.prototype.remove = function(item) {
    var p = this.indexOf(item);
    if (p != -1)
        this.splice(p, 1);
};

if (!Array.prototype.map) {
    Array.prototype.map = function(fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for (var i = 0, j = this.length; i < j; ++i) {
            a.push(fn.call(scope, this[i], i, this));
        }
        return a;
    };
}

// Get characters from the right end of a string
String.prototype.right = function(n) {
    return n < this.length ? this.slice(this.length - n) : this;
};

// Trim whitespace from both ends of a string
String.prototype.trim = function() {
    return this.replace(/^\s*|\s*$/g, "");
};

// Convert a string from a CSS style property name to a JavaScript style name ("background-color" -> "backgroundColor")
String.prototype.unDash = function() {
    var s = this.split("-");
    if (s.length > 1) {
        for (var t = 1; t < s.length; t++)
            s[t] = s[t].substr(0, 1).toUpperCase() + s[t].substr(1);
    }
    return s.join("");
};

// Substitute substrings from an array into a format string that includes '%1'-type specifiers
String.prototype.format = function(substrings) {
    var subRegExp = /(?:%(\d+))/mg;
    var currPos = 0;
    var r = [];
    do {
        var match = subRegExp.exec(this);
        if (match && match[1]) {
            if (match.index > currPos)
                r.push(this.substring(currPos, match.index));
            r.push(substrings[parseInt(match[1])]);
            currPos = subRegExp.lastIndex;
        }
    } while (match);
    if (currPos < this.length)
        r.push(this.substring(currPos, this.length));
    return r.join("");
};

// Escape any special RegExp characters with that character preceded by a backslash
String.prototype.escapeRegExp = function() {
    var s = "\\^$*+?()=!|,{}[].";
    var c = this;
    for (var t = 0; t < s.length; t++)
        c = c.replace(new RegExp("\\" + s.substr(t, 1), "g"), "\\" + s.substr(t, 1));
    return c;
};

// Convert "\" to "\s", newlines to "\n" (and remove carriage returns)
String.prototype.escapeLineBreaks = function() {
    return this.replace(/\\/mg, "\\s").replace(/\n/mg, "\\n").replace(/\r/mg, "");
};

// Convert "\n" to newlines, "\b" to " ", "\s" to "\" (and remove carriage returns)
String.prototype.unescapeLineBreaks = function() {
    return this.replace(/\\n/mg, "\n").replace(/\\b/mg, " ").replace(/\\s/mg, "\\").replace(/\r/mg, "");
};

// Convert & to "&amp;", < to "&lt;", > to "&gt;" and " to "&quot;"
String.prototype.htmlEncode = function() {
    return this.replace(/&/mg, "&amp;").replace(/</mg, "&lt;").replace(/>/mg, "&gt;").replace(/\"/mg, "&quot;");
};

// Convert "&amp;" to &, "&lt;" to <, "&gt;" to > and "&quot;" to "
String.prototype.htmlDecode = function() {
    return this.replace(/&lt;/mg, "<").replace(/&gt;/mg, ">").replace(/&quot;/mg, "\"").replace(/&amp;/mg, "&");
};

// Convert a string to it's JSON representation by encoding control characters, double quotes and backslash. See json.org
String.prototype.toJSONString = function() {
    var m = {
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        '"': '\\"',
        '\\': '\\\\'
    };
    var replaceFn = function(a, b) {
        var c = m[b];
        if (c)
            return c;
        c = b.charCodeAt();
        return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
    };
    if (/["\\\x00-\x1f]/.test(this))
        return '"' + this.replace(/([\x00-\x1f\\"])/g, replaceFn) + '"';
    return '"' + this + '"';
};

// Parse a space-separated string of name:value parameters
// The result is an array of objects:
//   result[0] = object with a member for each parameter name, value of that member being an array of values
//   result[1..n] = one object for each parameter, with 'name' and 'value' members
String.prototype.parseParams = function(defaultName, defaultValue, allowEval, noNames, cascadeDefaults) {
    var parseToken = function(match, p) {
        var n;
        if (match[p]) // Double quoted
            n = match[p];
        else if (match[p + 1]) // Single quoted
            n = match[p + 1];
        else if (match[p + 2]) // Double-square-bracket quoted
            n = match[p + 2];
        else if (match[p + 3]) // Double-brace quoted
            try {
            n = match[p + 3];
            if (allowEval)
                n = window.eval(n);
        } catch (ex) {
            throw "Unable to evaluate {{" + match[p + 3] + "}}: " + exceptionText(ex);
        }
        else if (match[p + 4]) // Unquoted
            n = match[p + 4];
        else if (match[p + 5]) // empty quote
            n = "";
        return n;
    };
    var r = [{}];
    var dblQuote = "(?:\"((?:(?:\\\\\")|[^\"])+)\")";
    var sngQuote = "(?:'((?:(?:\\\\\')|[^'])+)')";
    var dblSquare = "(?:\\[\\[((?:\\s|\\S)*?)\\]\\])";
    var dblBrace = "(?:\\{\\{((?:\\s|\\S)*?)\\}\\})";
    var unQuoted = noNames ? "([^\"'\\s]\\S*)" : "([^\"':\\s][^\\s:]*)";
    var emptyQuote = "((?:\"\")|(?:''))";
    var skipSpace = "(?:\\s*)";
    var token = "(?:" + dblQuote + "|" + sngQuote + "|" + dblSquare + "|" + dblBrace + "|" + unQuoted + "|" + emptyQuote + ")";
    var re = noNames ? new RegExp(token, "mg") : new RegExp(skipSpace + token + skipSpace + "(?:(\\:)" + skipSpace + token + ")?", "mg");
    var params = [];
    do {
        var match = re.exec(this);
        if (match) {
            var n = parseToken(match, 1);
            if (noNames) {
                r.push({ name: "", value: n });
            } else {
                var v = parseToken(match, 8);
                if (v == null && defaultName) {
                    v = n;
                    n = defaultName;
                } else if (v == null && defaultValue) {
                    v = defaultValue;
                }
                r.push({ name: n, value: v });
                if (cascadeDefaults) {
                    defaultName = n;
                    defaultValue = v;
                }
            }
        }
    } while (match);
    // Summarise parameters into first element
    for (var t = 1; t < r.length; t++) {
        if (r[0][r[t].name])
            r[0][r[t].name].push(r[t].value);
        else
            r[0][r[t].name] = [r[t].value];
    }
    return r;
};

// Process a string list of macro parameters into an array. Parameters can be quoted with "", '',
// [[]], {{ }} or left unquoted (and therefore space-separated). Double-braces {{}} results in
// an *evaluated* parameter: e.g. {{config.options.txtUserName}} results in the current user's name.
String.prototype.readMacroParams = function() {
    var p = this.parseParams("list", null, true, true);
    var n = [];
    for (var t = 1; t < p.length; t++)
        n.push(p[t].value);
    return n;
};

// Process a string list of unique tiddler names into an array. Tiddler names that have spaces in them must be [[bracketed]]
String.prototype.readBracketedList = function(unique) {
    var p = this.parseParams("list", null, false, true);
    var n = [];
    for (var t = 1; t < p.length; t++) {
        if (p[t].value)
            n.pushUnique(p[t].value, unique);
    }
    return n;
};

// Returns array with start and end index of chunk between given start and end marker, or undefined.
String.prototype.getChunkRange = function(start, end) {
    var s = this.indexOf(start);
    if (s != -1) {
        s += start.length;
        var e = this.indexOf(end, s);
        if (e != -1)
            return [s, e];
    }
};

// Replace a chunk of a string given start and end markers
String.prototype.replaceChunk = function(start, end, sub) {
    var r = this.getChunkRange(start, end);
    return r ? this.substring(0, r[0]) + sub + this.substring(r[1]) : this;
};

// Returns a chunk of a string between start and end markers, or undefined
String.prototype.getChunk = function(start, end) {
    var r = this.getChunkRange(start, end);
    if (r)
        return this.substring(r[0], r[1]);
};


// Static method to bracket a string with double square brackets if it contains a space
String.encodeTiddlyLink = function(title) {
    return title.indexOf(" ") == -1 ? title : "[[" + title + "]]";
};

// Static method to encodeTiddlyLink for every item in an array and join them with spaces
String.encodeTiddlyLinkList = function(list) {
    if (list) {
        var results = [];
        for (var t = 0; t < list.length; t++)
            results.push(String.encodeTiddlyLink(list[t]));
        return results.join(" ");
    } else {
        return "";
    }
};

// Convert a string as a sequence of name:"value" pairs into a hashmap
String.prototype.decodeHashMap = function() {
    var fields = this.parseParams("anon", "", false);
    var r = {};
    for (var t = 1; t < fields.length; t++)
        r[fields[t].name] = fields[t].value;
    return r;
};

// Static method to encode a hashmap into a name:"value"... string
String.encodeHashMap = function(hashmap) {
    var r = [];
    for (var t in hashmap)
        r.push(t + ':"' + hashmap[t] + '"');
    return r.join(" ");
};

// Static method to left-pad a string with 0s to a certain width
String.zeroPad = function(n, d) {
    var s = n.toString();
    if (s.length < d)
        s = "000000000000000000000000000".substr(0, d - s.length) + s;
    return s;
};

String.prototype.startsWith = function(prefix) {
    return !prefix || this.substring(0, prefix.length) == prefix;
};

// Returns the first value of the given named parameter.
function getParam(params, name, defaultValue) {
    if (!params)
        return defaultValue;
    var p = params[0][name];
    return p ? p[0] : defaultValue;
}

// Returns the first value of the given boolean named parameter.
function getFlag(params, name, defaultValue) {
    return !!getParam(params, name, defaultValue);
}

// Substitute date components into a string
Date.prototype.formatString = function(template) {
    var t = template.replace(/0hh12/g, String.zeroPad(this.getHours12(), 2));
    t = t.replace(/hh12/g, this.getHours12());
    t = t.replace(/0hh/g, String.zeroPad(this.getHours(), 2));
    t = t.replace(/hh/g, this.getHours());
    t = t.replace(/mmm/g, config.messages.dates.shortMonths[this.getMonth()]);
    t = t.replace(/0mm/g, String.zeroPad(this.getMinutes(), 2));
    t = t.replace(/mm/g, this.getMinutes());
    t = t.replace(/0ss/g, String.zeroPad(this.getSeconds(), 2));
    t = t.replace(/ss/g, this.getSeconds());
    t = t.replace(/[ap]m/g, this.getAmPm().toLowerCase());
    t = t.replace(/[AP]M/g, this.getAmPm().toUpperCase());
    t = t.replace(/wYYYY/g, this.getYearForWeekNo());
    t = t.replace(/wYY/g, String.zeroPad(this.getYearForWeekNo() - 2000, 2));
    t = t.replace(/YYYY/g, this.getFullYear());
    t = t.replace(/YY/g, String.zeroPad(this.getFullYear() - 2000, 2));
    t = t.replace(/MMM/g, config.messages.dates.months[this.getMonth()]);
    t = t.replace(/0MM/g, String.zeroPad(this.getMonth() + 1, 2));
    t = t.replace(/MM/g, this.getMonth() + 1);
    t = t.replace(/0WW/g, String.zeroPad(this.getWeek(), 2));
    t = t.replace(/WW/g, this.getWeek());
    t = t.replace(/DDD/g, config.messages.dates.days[this.getDay()]);
    t = t.replace(/ddd/g, config.messages.dates.shortDays[this.getDay()]);
    t = t.replace(/0DD/g, String.zeroPad(this.getDate(), 2));
    t = t.replace(/DDth/g, this.getDate() + this.daySuffix());
    t = t.replace(/DD/g, this.getDate());
    var tz = this.getTimezoneOffset();
    var atz = Math.abs(tz);
    t = t.replace(/TZD/g, (tz < 0 ? '+' : '-') + String.zeroPad(Math.floor(atz / 60), 2) + ':' + String.zeroPad(atz % 60, 2));
    t = t.replace(/\\/g, "");
    return t;
};

Date.prototype.getWeek = function() {
    var dt = new Date(this.getTime());
    var d = dt.getDay();
    if (d == 0) d = 7; // JavaScript Sun=0, ISO Sun=7
    dt.setTime(dt.getTime() + (4 - d) * 86400000); // shift day to Thurs of same week to calculate weekNo
    var n = Math.floor((dt.getTime() - new Date(dt.getFullYear(), 0, 1) + 3600000) / 86400000);
    return Math.floor(n / 7) + 1;
};

Date.prototype.getYearForWeekNo = function() {
    var dt = new Date(this.getTime());
    var d = dt.getDay();
    if (d == 0) d = 7; // JavaScript Sun=0, ISO Sun=7
    dt.setTime(dt.getTime() + (4 - d) * 86400000); // shift day to Thurs of same week
    return dt.getFullYear();
};

Date.prototype.getHours12 = function() {
    var h = this.getHours();
    return h > 12 ? h - 12 : (h > 0 ? h : 12);
};

Date.prototype.getAmPm = function() {
    return this.getHours() >= 12 ? config.messages.dates.pm : config.messages.dates.am;
};

Date.prototype.daySuffix = function() {
    return config.messages.dates.daySuffixes[this.getDate() - 1];
};

// Convert a date to local YYYYMMDDHHMM string format
Date.prototype.convertToLocalYYYYMMDDHHMM = function() {
    return this.getFullYear() + String.zeroPad(this.getMonth() + 1, 2) + String.zeroPad(this.getDate(), 2) + String.zeroPad(this.getHours(), 2) + String.zeroPad(this.getMinutes(), 2);
};

// Convert a date to UTC YYYYMMDDHHMM string format
Date.prototype.convertToYYYYMMDDHHMM = function() {
    return this.getUTCFullYear() + String.zeroPad(this.getUTCMonth() + 1, 2) + String.zeroPad(this.getUTCDate(), 2) + String.zeroPad(this.getUTCHours(), 2) + String.zeroPad(this.getUTCMinutes(), 2);
};

// Convert a date to UTC YYYYMMDD.HHMMSSMMM string format
Date.prototype.convertToYYYYMMDDHHMMSSMMM = function() {
    return this.getUTCFullYear() + String.zeroPad(this.getUTCMonth() + 1, 2) + String.zeroPad(this.getUTCDate(), 2) + "." + String.zeroPad(this.getUTCHours(), 2) + String.zeroPad(this.getUTCMinutes(), 2) + String.zeroPad(this.getUTCSeconds(), 2) + String.zeroPad(this.getUTCMilliseconds(), 4);
};

// Static method to create a date from a UTC YYYYMMDDHHMM format string
Date.convertFromYYYYMMDDHHMM = function(d) {
    var hh = d.substr(8, 2) || "00";
    var mm = d.substr(10, 2) || "00";
    return new Date(Date.UTC(parseInt(d.substr(0, 4), 10),
        parseInt(d.substr(4, 2), 10) - 1,
        parseInt(d.substr(6, 2), 10),
        parseInt(hh, 10),
        parseInt(mm, 10), 0, 0));
};

//--
//-- RGB colour object
//--

// Construct an RGB colour object from a '#rrggbb', '#rgb' or 'rgb(n,n,n)' string or from separate r,g,b values
function RGB(r, g, b) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    if (typeof r == "string") {
        if (r.substr(0, 1) == "#") {
            if (r.length == 7) {
                this.r = parseInt(r.substr(1, 2), 16) / 255;
                this.g = parseInt(r.substr(3, 2), 16) / 255;
                this.b = parseInt(r.substr(5, 2), 16) / 255;
            } else {
                this.r = parseInt(r.substr(1, 1), 16) / 15;
                this.g = parseInt(r.substr(2, 1), 16) / 15;
                this.b = parseInt(r.substr(3, 1), 16) / 15;
            }
        } else {
            var rgbPattern = /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/;
            var c = r.match(rgbPattern);
            if (c) {
                this.r = parseInt(c[1], 10) / 255;
                this.g = parseInt(c[2], 10) / 255;
                this.b = parseInt(c[3], 10) / 255;
            }
        }
    } else {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return this;
}

// Mixes this colour with another in a specified proportion
// c = other colour to mix
// f = 0..1 where 0 is this colour and 1 is the new colour
// Returns an RGB object
RGB.prototype.mix = function(c, f) {
    return new RGB(this.r + (c.r - this.r) * f, this.g + (c.g - this.g) * f, this.b + (c.b - this.b) * f);
};

// Return an rgb colour as a #rrggbb format hex string
RGB.prototype.toString = function() {
    return "#" + ("0" + Math.floor(this.r.clamp(0, 1) * 255).toString(16)).right(2) +
             ("0" + Math.floor(this.g.clamp(0, 1) * 255).toString(16)).right(2) +
             ("0" + Math.floor(this.b.clamp(0, 1) * 255).toString(16)).right(2);
};

//--
//-- DOM utilities - many derived from www.quirksmode.org
//--

function drawGradient(place, horiz, locolors, hicolors) {
    if (!hicolors)
        hicolors = locolors;
    for (var t = 0; t <= 100; t += 2) {
        var bar = document.createElement("div");
        place.appendChild(bar);
        bar.style.position = "absolute";
        bar.style.left = horiz ? t + "%" : 0;
        bar.style.top = horiz ? 0 : t + "%";
        bar.style.width = horiz ? (101 - t) + "%" : "100%";
        bar.style.height = horiz ? "100%" : (101 - t) + "%";
        bar.style.zIndex = -1;
        var p = t / 100 * (locolors.length - 1);
        bar.style.backgroundColor = hicolors[Math.floor(p)].mix(locolors[Math.ceil(p)], p - Math.floor(p)).toString();
    }
}

function createTiddlyText(parent, text) {
    return parent.appendChild(document.createTextNode(text));
}

function createTiddlyCheckbox(parent, caption, checked, onChange) {
    var cb = document.createElement("input");
    cb.setAttribute("type", "checkbox");
    cb.onclick = onChange;
    parent.appendChild(cb);
    cb.checked = checked;
    cb.className = "chkOptionInput";
    if (caption)
        wikify(caption, parent);
    return cb;
}

function createTiddlyElement(parent, element, id, className, text, attribs) {
    var e = document.createElement(element);
    if (className != null)
        e.className = className;
    if (id != null)
        e.setAttribute("id", id);
    if (text != null)
        e.appendChild(document.createTextNode(text));
    if (attribs) {
        for (var n in attribs) {
            e.setAttribute(n, attribs[n]);
        }
    }
    if (parent != null)
        parent.appendChild(e);
    return e;
}

function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() { obj['e' + type + fn](window.event); };
        obj.attachEvent('on' + type, obj[type + fn]);
    } else {
        obj.addEventListener(type, fn, false);
    }
}

function removeEvent(obj, type, fn) {
    if (obj.detachEvent) {
        obj.detachEvent('on' + type, obj[type + fn]);
        obj[type + fn] = null;
    } else {
        obj.removeEventListener(type, fn, false);
    }
}

function addClass(e, className) {
    var currClass = e.className.split(" ");
    if (currClass.indexOf(className) == -1)
        e.className += " " + className;
}

function removeClass(e, className) {
    var currClass = e.className.split(" ");
    var i = currClass.indexOf(className);
    while (i != -1) {
        currClass.splice(i, 1);
        i = currClass.indexOf(className);
    }
    e.className = currClass.join(" ");
}

function hasClass(e, className) {
    if (e.className && e.className.split(" ").indexOf(className) != -1) {
        return true;
    }
    return false;
}

// Find the closest relative with a given property value (property defaults to tagName, relative defaults to parentNode)
function findRelated(e, value, name, relative) {
    name = name || "tagName";
    relative = relative || "parentNode";
    if (name == "className") {
        while (e && !hasClass(e, value)) {
            e = e[relative];
        }
    } else {
        while (e && e[name] != value) {
            e = e[relative];
        }
    }
    return e;
}

// Resolve the target object of an event
function resolveTarget(e) {
    var obj;
    if (e.target)
        obj = e.target;
    else if (e.srcElement)
        obj = e.srcElement;
    if (obj.nodeType == 3) // defeat Safari bug
        obj = obj.parentNode;
    return obj;
}

// Prevent an event from bubbling
function stopEvent(e) {
    var ev = e || window.event;
    ev.cancelBubble = true;
    if (ev.stopPropagation) ev.stopPropagation();
    return false;
}

// Return the content of an element as plain text with no formatting
function getPlainText(e) {
    var text = "";
    if (e.innerText)
        text = e.innerText;
    else if (e.textContent)
        text = e.textContent;
    return text;
}

// Get the scroll position for window.scrollTo necessary to scroll a given element into view
function ensureVisible(e) {
    var posTop = findPosY(e);
    var posBot = posTop + e.offsetHeight;
    var winTop = findScrollY();
    var winHeight = findWindowHeight();
    var winBot = winTop + winHeight;
    if (posTop < winTop) {
        return posTop;
    } else if (posBot > winBot) {
        if (e.offsetHeight < winHeight)
            return posTop - (winHeight - e.offsetHeight);
        else
            return posTop;
    } else {
        return winTop;
    }
}

// Get the current width of the display window
function findWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
}

// Get the current height of the display window
function findWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
}

// Get the current horizontal page scroll position
function findScrollX() {
    return window.scrollX || document.documentElement.scrollLeft;
}

// Get the current vertical page scroll position
function findScrollY() {
    return window.scrollY || document.documentElement.scrollTop;
}

function findPosX(obj) {
    var curleft = 0;
    while (obj.offsetParent) {
        curleft += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    while (obj.offsetParent) {
        curtop += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return curtop;
}

// Blur a particular element
function blurElement(e) {
    if (e && e.focus && e.blur) {
        e.focus();
        e.blur();
    }
}

// Create a non-breaking space
function insertSpacer(place) {
    var e = document.createTextNode(String.fromCharCode(160));
    if (place)
        place.appendChild(e);
    return e;
}

// Remove all children of a node
function removeChildren(e) {
    while (e && e.hasChildNodes())
        removeNode(e.firstChild);
}

// Remove a node and all it's children
function removeNode(e) {
    scrubNode(e);
    e.parentNode.removeChild(e);
}

function removeTiddlerNode(e) {
    scrubNode(e);
    e.parentNode.removeChild(e);
    story.permaView();
}

// Remove any event handlers or non-primitve custom attributes
function scrubNode(e) {
    if (!config.browser.isIE)
        return;
    var att = e.attributes;
    if (att) {
        for (var t = 0; t < att.length; t++) {
            var n = att[t].name;
            if (n !== 'style' && (typeof e[n] === 'function' || (typeof e[n] === 'object' && e[n] != null))) {
                try {
                    e[n] = null;
                } catch (ex) {
                }
            }
        }
    }
    var c = e.firstChild;
    while (c) {
        scrubNode(c);
        c = c.nextSibling;
    }
}

// Add a stylesheet, replacing any previous custom stylesheet
function setStylesheet(s, id, doc) {
    if (!id)
        id = "customStyleSheet";
    if (!doc)
        doc = document;
    var n = doc.getElementById(id);
    if (doc.createStyleSheet) {
        // Test for IE's non-standard createStyleSheet method
        if (n)
            n.parentNode.removeChild(n);
        // This failed without the &nbsp;
        doc.getElementsByTagName("head")[0].insertAdjacentHTML("beforeEnd", "&nbsp;<style id='" + id + "'>" + s + "</style>");
    } else {
        if (n) {
            n.replaceChild(doc.createTextNode(s), n.firstChild);
        } else {
            n = doc.createElement("style");
            n.type = "text/css";
            n.id = id;
            n.appendChild(doc.createTextNode(s));
            doc.getElementsByTagName("head")[0].appendChild(n);
        }
    }
}

function removeStyleSheet(id) {
    var e = document.getElementById(id);
    if (e)
        e.parentNode.removeChild(e);
}

// Force the browser to do a document reflow when needed to workaround browser bugs
function forceReflow() {
    if (config.browser.isGecko) {
        setStylesheet("body {top:0px;margin-top:0px;}", "forceReflow");
        setTimeout(function() { setStylesheet("", "forceReflow"); }, 1);
    }
}

// Replace the current selection of a textarea or text input and scroll it into view
function replaceSelection(e, text) {
    if (e.setSelectionRange) {
        var oldpos = e.selectionStart;
        var isRange = e.selectionEnd > e.selectionStart;
        e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd);
        e.setSelectionRange(isRange ? oldpos : oldpos + text.length, oldpos + text.length);
        var linecount = e.value.split('\n').length;
        var thisline = e.value.substr(0, e.selectionStart).split('\n').length - 1;
        e.scrollTop = Math.floor((thisline - e.rows / 2) * e.scrollHeight / linecount);
    } else if (document.selection) {
        var range = document.selection.createRange();
        if (range.parentElement() == e) {
            var isCollapsed = range.text == "";
            range.text = text;
            if (!isCollapsed) {
                range.moveStart('character', -text.length);
                range.select();
            }
        }
    }
}

// Returns the text of the given (text) node, possibly merging subsequent text nodes
function getNodeText(e) {
    var t = "";
    while (e && e.nodeName == "#text") {
        t += e.nodeValue;
        e = e.nextSibling;
    }
    return t;
}

// Returns true if the element e has a given ancestor element
function isDescendant(e, ancestor) {
    while (e) {
        if (e === ancestor)
            return true;
        e = e.parentNode;
    }
    return false;
}

//--
//-- LoaderBase and SaverBase
//--

function LoaderBase() { }

LoaderBase.prototype.loadTiddler = function(store, node, tiddlers, fn) {
    var title = this.getTitle(store, node);
//    if (safeMode && store.isShadowTiddler(title))
//        return;
    if (title) {
        var tiddler = store.createTiddler(title);
        if (tiddler.hasShadow)
            tiddler.stashVersion();
        this.internalizeTiddler(tiddler, title, node);
        if (fn) fn(tiddler);
        tiddlers.push(tiddler);
    }
};

LoaderBase.prototype.loadTiddlers = function(store, nodes, fn) {
    var tiddlers = [];
    for (var t = 0; t < nodes.length; t++) {
        try {
            this.loadTiddler(store, nodes[t], tiddlers, fn);
        } catch (ex) {
            showException(ex, config.messages.tiddlerLoadError.format([this.getTitle(store, nodes[t])]));
        }
    }
    return tiddlers;
};

//--
//-- TW21Loader (inherits from LoaderBase)
//--

function TW21Loader() { }

TW21Loader.prototype = new LoaderBase();

TW21Loader.prototype.getTitle = function(store, node) {
    var title = null;
    if (node.getAttribute) {
        title = node.getAttribute("title");
        if (!title)
            title = node.getAttribute("tiddler");
    }
    if (!title && node.id) {
        var lenPrefix = store.idPrefix.length;
        if (node.id.substr(0, lenPrefix) == store.idPrefix)
            title = node.id.substr(lenPrefix);
    }
    return title;
};

regexpOpenDblSqb = new RegExp(/\[\[/mg);
regexpCloseDblSqb = new RegExp(/\]\]/mg);

TW21Loader.prototype.internalizeTiddler = function(tiddler, title, node) {
    var e = node.firstChild;
    var text = null;
    if (node.getAttribute("tiddler")) {
        text = getNodeText(e).unescapeLineBreaks();
    } else {
        while (e && e.nodeName != "PRE" && e.nodeName != "pre") {
            if (!tiddler.ace)
                tiddler.ace = [];
            tiddler.ace.push(e);
            e = e.nextSibling;
        }
        if (e)
            text = e.innerHTML.replace(/\r/mg, "").htmlDecode();
    }
    var modifier = node.getAttribute("modifier");
    var c = node.getAttribute("created");
    var m = node.getAttribute("modified");
    var v = node.getAttribute("version") != null ? parseInt(node.getAttribute("version")) : 0;

    var created = c ? Date.convertFromYYYYMMDDHHMM(c) : null;
    var modified = m ? Date.convertFromYYYYMMDDHHMM(m) : created;
    var tags = node.getAttribute("tags");

    tiddler.readOnly = node.getAttribute("readOnly") == "true";
    tiddler.comments = parseInt(node.getAttribute("comments"));
    tiddler.notes = node.getAttribute("notes");
    tiddler.messages = node.getAttribute("messages");
    tiddler.from = node.getAttribute("from");
    
    try { tiddler.id = node.getAttribute("id"); } catch (e) { this.id = ""; }
    try { tiddler.includedFrom = node.getAttribute("includedFrom"); } catch (e) { }
    try { tiddler.templates[DEFAULT_VIEW_TEMPLATE] = node.getAttribute("viewTemplate"); } catch (e) { }
    try { tiddler.templates[DEFAULT_EDIT_TEMPLATE] = node.getAttribute("editTemplate"); } catch (e) { }

    var fields = {};
    var attrs = node.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
        var name = attrs[i].name;
        if (attrs[i].specified && !TiddlyWiki.isStandardField(name)) {
            fields[name] = attrs[i].value.unescapeLineBreaks();
        }
    }
    tiddler.assign(title, text, modifier, modified, tags, created, fields, v, node.id);
    return tiddler;
};

function convertUnicodeToHtmlEntities(s) {
    var re = /[^\u0000-\u007F]/g;
    return s.replace(re, function($0) { return "&#" + $0.charCodeAt(0).toString() + ";"; });
}

function Debugger(a) {	debugger; return a; }

function JsoFromXml(rce) {
    var v =  rce.childNodes.length ? rce.firstChild.nodeValue : "";
    var type = rce.attributes.getNamedItem("type");
    if (type != null && type.value != null)
      switch (type.value) {
        case "int":
            v = parseInt(v);
            break;
        case "bool":
            v = eval(v);
            break;
        case "datetime":
            try {
                v = Date.convertFromYYYYMMDDHHMM(v);
            }
            catch (e) {
                alert(e);
            }
            break;
        case "string[]":
            v = [];
            for (var ae = 0; ae < rce.childNodes.length; ae++)
                v[ae] = rce.childNodes[ae].firstChild.nodeValue;
            break;
        case "object[]":
            v = [];
            for (var ae = 0; ae < rce.childNodes.length; ae++)
                v[ae] = JsoFromXml(rce.childNodes[ae]);
            break;
      }
    else if (rce.childNodes.length && rce.firstChild.nodeType == 1)
    {
        v = {};
        for (var i = 0; i < rce.childNodes.length; i++) {
			var ace = rce.childNodes[i];
            v[ace.nodeName] = JsoFromXml(ace);
        }
    }

	return v;
}

function HttpReply(req) {
    if (typeof(req) != "object")
        return req;
    if (!req.responseXML)
        return req.responseText;
	return JsoFromXml(req.responseXML.documentElement);
}

function HttpGet(args, method) {
    var fields = [];
    if (method)
        fields.push("method=" + method);
    for (var a in args) {
        var v = args[a];
        if (!(v == undefined || typeof(v) == "function"))
            fields.push(a + "=" + encodeURIComponent(v));
    }
    var rs = HttpRequest(fields.join("&"));
    var rp = HttpReply(rs);
    if (rp && rp.Success == false && rp.Message)
    	displayMessage(rp.Message);
  	return rp || rs;
}

function HttpRequest(args,debug) {
    var url = window.location.pathname; // + "?" + args;

    var req;
    try { req = new XMLHttpRequest(); }
    catch (e) {
        try { req = new ActiveXObject("Msxml2.XMLHTTP") }
        catch (e) {
            try { req = new ActiveXObject("Microsoft.XMLHTTP") }
            catch (e) { return }
        }
    }

    req.open("POST", url, false); //"GET", url, false);
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    req.send(args);
    if (req.status >= 400)
        return displayMessage("HttpRequest(" + url + ") failed: " + req.status + "<br>" + req.responseText);
    if (!(debug === undefined)) {
        if (typeof(debug) == "function")
            debug(req);
        else if (debug)
            alert(req.responseText);
    }
    return req;
}

config.macros.history = {
    handler: function(place, macroName, params, wikifier, paramString, tiddler) {
        if (tiddler instanceof Tiddler) {
            var hist = tiddler.version;
            if (hist == undefined || hist == "0") {
                var inclFrom = tiddler["includedFrom"];
                if (inclFrom)
                    wikify("included from [[" + inclFrom + "|" + encodeURIComponent(inclFrom) + window.location.fileType + "#" + encodeURIComponent(String.encodeTiddlyLink(tiddler.title)) + "]]", place);
            }
            else {
                hist = hist - 1;
                if (store.isShadowTiddler(tiddler.title))
                    hist++;
                if (!hist)
                    return;
                createTiddlyText(place, " (");
                var snVersions = hist + " prior " + (hist != "1" ? "versions" : "version");
                if (tiddler.historyLoaded)
                    createTiddlyText(place, snVersions + " listed");
                else {
                    var btn = createTiddlyButton(place, snVersions, "Get prior versions", onClickTiddlerHistory, "tiddlyLink");
                    btn.setAttribute("refresh", "link");
                    btn.setAttribute("tiddlyLink", snVersions);
                    btn.setAttribute("tiddler", tiddler.title);
                }
                createTiddlyText(place, ")");
            }
        }
    }
}

function onClickTiddlerHistory(e) {
    if (!e) var e = window.event;
    var theTarget = resolveTarget(e);
    var t = theTarget.getAttribute("tiddler");
    var tiddler = store.fetchTiddler(t);
    if (!t) return;
    var res = http.tiddlerHistory({ tiddlerId: tiddler.id, shadow: store.isShadowTiddler(t) ? 1 : 0 });

    if (res.error)
        displayMessage(res.error);
    else {
        tiddler.versions = res.versions;
        story.refreshTiddler(t, null, true);
    }
}

function RequestVersion(t, v) {
    return true;
}

function onClickTiddlerVersion(e) {
    if (!e) var e = window.event;
    try {
        var theTarget = resolveTarget(e);
        if (theTarget) {
            var t = theTarget.getAttribute("tiddler");
            var v = theTarget.getAttribute("version");
            if (t && v) {
                var tiddler = store.getTiddler(t);
                var currentVer = tiddler.currentVer;
                tiddler.stashVersion();
                var cv = tiddler.ovs[v];
                if (!cv) {
                    cv = http.tiddlerVersion({ tiddlerId: tiddler.id, version: v });
                    if (cv.error !== undefined)
                        return alert(cv.error);
                    tiddler.ovs[v] = cv;
                }
                merge(tiddler, cv);
                tiddler.title = t;
                tiddler.currentVer = currentVer;
                story.refreshTiddler(t, null, true);
            }
        }
    } catch (ex) {
        displayMessage(ex.toString())
    }
}

config.macros.revision = {
    handler: function(place, macroName, params, wikifier, paramString, tiddler) {
        if (tiddler.version == params[1]) // the currently displayed version
            place = createTiddlyElement(place, "b"); // should be listed in bold face
        var btn = createTiddlyButton(place, params[0], "View version", onClickTiddlerVersion, "tiddlyLink");
        btn.setAttribute("refresh", "link");
        btn.setAttribute("tiddlyLink", "What's this");
        btn.setAttribute("tiddler", tiddler.title);
        btn.setAttribute("version", params[1]);
    }
}

function CheckNewAddress(title) {
	r = http.getNewAddress({title:title});
	if (r.Success)
	    return r.Address;
}

var forms = [];

function formName(e) {
    if (!e) var e = resolveTarget(window.event);
    return story.findContainingTiddler(e).getAttribute("tiddler");
}

function GetForm(fn) {
    if (typeof(fn) != "string")
        fn = formName(fn);
    if (!fn) return;
    if (forms[fn] == undefined)
        forms[fn] = [];
    return forms[fn];
}

function updateForm(id,e,val) {
    var f = GetForm(e);
	if (!f) return;
	var fch = f[id + "_changed"];
    if (fch)
		fch(f,id,val);
	else
		f[id] = val;
}

function setFormFieldValue(f,name,value,vList) {
	f[name] = value != undefined ? value : "";
	var e = f.controls[name];
	if (e.tagName == "A")
		e.firstChild.nodeValue = f[name];
	else
		e.value = f[name];
	if (vList)
		e.setAttribute("values",vList);
}

config.macros.input = {
    handler: function(place, macroName, params, wikifier, paramString, tiddler) {
		if (params.length < 2 || !this[params[0]])
			return createTiddlyLink(place, "GuideToInputMacro", true);
		var type = params.shift();
		var name = params.shift();
        var f = GetForm(place);
		if (params.length == 1 && f && f[name])
             params[1] = f[name]; // get default value from form
		f.controls = f.controls || [];
		f.controls[name]  = this[type](place, name, params, wikifier, paramString, tiddler);
    },
	// <<input text name width text>>
	text: function(place, name, params, wikifier, paramString, tiddler) {
        var c = createTiddlyElement(place,"input",name,null,null, {href: "javascript:;"});
		if (params.length > 0)
			c.size = params[0];
        c.value = params.length > 1 ? params[1] : "";
        c.onchange = this.fieldChanged;
        return c;
	},
	// <<input textarea name rows*cols text>>
	textarea: function(place, name, params, wikifier, paramString, tiddler) {
	    var attribs = { href: "javascript:;" };
        var md = params[0].split('*');
        attribs.rows = md[0];
        if (md.length > 1)
            attribs.cols = md[1];
        var c = createTiddlyElement(place,"textarea",name,null,null, attribs);
        c.value = params.length > 1 ? params[1] : "";
        c.onchange = this.fieldChanged;
        return c;
	},
	checkbox: function(place, name, params, wikifier, paramString, tiddler) {
        var c = createTiddlyElement(place,"input",name,null,null, {href: "javascript:;", type: "checkbox"});
        c.checked = params.length > 1 ? params[1] : "";
        c.onchange = this.fieldChanged;
        return c;
	},
	select: function(place, name, params, wikifier, paramString, tiddler) {
	    var valus = this.parameter(params[0]);
        var value = params.length > 1 && params[1] ? params[1] : valus.split('|')[0];
        var osdo = params.length > 2 ? params[2]: "";
        var cbl = createTiddlyElement(place, "a", name, null, value, {href: "javascript:;", values: valus, onselect: osdo });
        cbl.onclick = this.dropSelect;
        return cbl;
 	},
    dropSelect: function(ev) {
        var e = ev || window.event;
        var me = resolveTarget(e);
        var values = me.getAttribute("values").split("|");
        var popup = Popup.create(this);
        for (var i = 1; i < values.length; i++)
            createTiddlyButton(createTiddlyElement(popup,"li"),values[i],null,config.macros.input.selectChanged);
        popup.setAttribute("owner",me.getAttribute("id"));
        Popup.show();
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        return false;
    },
    selectChanged: function(ev) {
        var e = ev || window.event;
        var me = resolveTarget(e);
        var owner =  me.parentNode.parentNode.getAttribute("owner");
        var val = me.childNodes[0].nodeValue;
        var eOwner = document.getElementById(owner);
        eOwner.firstChild.nodeValue = val;
        updateForm(owner,eOwner,val);
        var action = eOwner.getAttribute("onselect");
        if (action)
			eval(action);
        return false;
    },
    parameter: function(a) {
        if (a.indexOf("javascript:") == 0)
            return eval(a.substr(11));
        return a;
    },
    fieldChanged: function(ev) {
        try {
            var e = ev || window.event;
            var src = resolveTarget(e);
            var v = src.type == "checkbox" ? src.checked : src.value;
            var id = src.getAttribute("id");
            updateForm(id,src,v);
        } catch (x) {
            displayMessage(x.message);
        }
    }
}

config.macros.localDiv = {
	handler: function(place, macroName, params, wikifier, paramString, tiddler) {
		createTiddlyElement(place,params[1] || "div",formName(place) + params[0]);
   }
}

//function onClickCommandButton(e) {
//    if (!e) var e = window.event;
//    var target = resolveTarget(e);
//    if (target) {
//        var fields = {};
//        var cte = story.findContainingTiddler(target);
//        story.gatherSaveFields(cte, fields);
//
//        var ok = true;
//        var validator = target.getAttribute("clientSide");
//        if (validator != null) {
//            try {
//                var hdlr = new Function("args", "target", validator);
//                ok = hdlr(fields, target);
//            }
//            catch (e) {
//                alert("Exception thrown by clientSide handler" + e.toString());
//            }
//        }
//
//        if (ok) {
//            var url = target.getAttribute("serverUrl");
//            var rph = target.getAttribute("replyHandler");
//            HttpRequest(rph ? new Function("resp", "args", "url", "rh", rph) : null, fields, url ? url : undefined, target);
//        }
//    }
//}
//
//config.macros.commandButton = {
//    handler: function(place, macroName, params, wikifier, paramString, tiddler) {
//        var btn = createTiddlyButton(place, params[0], params[1], onClickCommandButton, "tiddlyLink");
//        if (params[2])
//            btn.setAttribute("clientSide", params[2]);
//        if (params[3])
//            btn.setAttribute("replyHandler", params[3]);
//        if (params[4])
//            btn.setAttribute("serverUrl", params[4]);
//        if (tiddler)
//            btn.setAttribute("tiddler", tiddler.title);
//    }
//}

//function newPageRequest(args, target) {
//    var parts = target.parentNode.childNodes;
//    var title, subtitle;
//    for (var i = 0; i < parts.length; i++) {
//        if (parts[i].tagName == "INPUT")
//            switch (parts[i].name) {
//            case "title":
//                title = parts[i].value;
//                break;
//            case "subtitle":
//                subtitle = parts[i].value;
//                break;
//        }
//    }
//    args["html_title"] = title + (subtitle ? (" - " + subtitle) : "");
//
//    if (allPages.find(args["title"]) != null) {
//        if (confirm("This page already exists - open it?"))
//            window.location.href = window.location.folder + args["title"] + window.location.fileType;
//        return false;
//    }
//
//    args["modifier"] = config.options.txtUserName;
//
//    return true;
//}

config.macros.iFrame = {
    handler: function(place,macroName,params,wikifier,paramString,tiddler) 
    {
        var theFrame = document.createElement("IFRAME");
        theFrame.src = params[0];
        theFrame.height = params[1] ? params[1] : 600;
        if (params[2])
            theFrame.name = params[2];
        theFrame.width = "100%";
        theFrame.frameBorder = 0;
        place.appendChild(theFrame);
    }
}

siteMap = [];
config.macros.siteMap = {
    handler: function(place,macroName,params,wikifier,paramString,tiddler) 
    {
		var m = http.siteMap({path: window.location.pathname});
		SiteMapEntry(place,m,0,[]);
	 }
}

function SiteMapEntry(place,m,level,dir)
{
	for (var i=0; i < m.length; i++) {
		var lc = 0;
		var path = m[i].path;
		var p; var r;
		for (p = 0;(r = path.indexOf('/',p+1)) >= 0; p = r)
			lc++; 
		if (path != "/" && p + 1 == path.length) {
			lc--; var img = "/static/plusFolder36.png";
		}
		else
			var img = "/static/plusDoc36.png";
		if (lc == level) {
			AddIconPlusLink(place,img,m[i].title,path);
			dir[lc] = { l: level + 1, ca: [], d: dir };
			siteMap[path] = dir[lc];
		}
		else if (lc > level && dir.length > level) {
			var ca = dir[level].ca;
			ca[ca.length]= m[i];
		}
	}
}

function AddIconPlusLink(place,img,title,url)
{
	var li = createTiddlyElement(place,"div");
	li.style.marginLeft = "1.7em";
	if (img) {
		var im = createTiddlyElement(li,"img");
		li.appendChild(im);
		im.src = img;
		im.onclick = expandFolder;
		im.align = "top";
		im.alt = "Click to expand";
	}
	createTiddlyElement(li,url?"a":"i",null,null,title,{ href: url });
	return li;
}

function expandFolder(ev)
{
    var target = resolveTarget(ev || window.event);
    var href = target.parentNode.childNodes[1].getAttribute("href");
	var sub = siteMap[href];
    switch(leaf(target.src))
    {
    case "plusFolder36.png":
		target.src = "/static/minusFolder36.png";
		sub.div = createTiddlyElement(target.parentNode,"div");
		SiteMapEntry(sub.div,sub.ca,sub.l,sub.d);
		//break;
	case "plusDoc36.png":
		target.src = "/static/minusDoc36.png";
		var div = createTiddlyElement(target.parentNode,"div");
		var tl = http.getTiddlers({page: href});
		if (tl.error)
			AddIconPlusLink(div,null,tl.error);
		else {
			var any = false;
			for (var i = 0; i < tl.length; i++) 
				if (tl[i].search(/SiteTitle|SiteSubtitle|DefaultTiddlers|MainMenu/) == -1) {
					hr = href + "#" + encodeURIComponent(String.encodeTiddlyLink(tl[i]));
					AddIconPlusLink(div,"/static/plusTiddler36.png",tl[i],hr);
					siteMap[hr] = {};
					any = true;
				}
			if (!any)
				AddIconPlusLink(div,null,"this page is empty");
		}
		sub.div = div;
		break;
	case "minusFolder36.png":
		target.src = "/static/plusFolder36.png";
		target.parentNode.removeChild(sub.div);
		break;
	case "minusDoc36.png":
		target.src = "/static/plusDoc36.png";
		target.parentNode.removeChild(sub.div);
		break;
	case "plusTiddler36.png":
		target.src = "/static/minusTiddler36.png";
		var td = http.getTiddler({url:href});
		var li = createTiddlyElement(target.parentNode,"div",null,null);
		li.style.marginLeft = "1.25em";
		wikify(td.text,li);
		sub.div = li;
		break;
	case "minusTiddler36.png":
		target.src = "/static/plusTiddler36.png";
		target.parentNode.removeChild(sub.div);
		break;	
	}
}

function leaf(url)
{
	var a = url.split("/");
	return a[a.length-1];
}

config.macros.image = {
	handler: function(place,macroName,params,wikifier,paramString,tiddler)
	{
		var span = createTiddlyElement(place,"span");
		var hbw = params[3] ? params[3] : "5";
		var vbw = hbw / 2; // heuristic choice
		var vbs = params[4] ? params[4] : "border-bottom: " + hbw + "px solid transparent; border-top: " + hbw + "px solid transparent; ";
		var tat = params[5] ? ' title="' + params[5].htmlEncode() + '"' : '';
		var align = params[1];
		if (align)
		{
			var width = params[2];
			if (!width) width = "60%";
			width = "width: " + width + "; ";
			switch (align.toLowerCase())
			{
				case "<":
				case "left":
					var style = width + "float: left; clear: left; " + vbs + " border-right: " + hbw + "px solid transparent;";
					break;
				case ">":
				case "right":
					var style = width + "float: right; clear: right; " + vbs + " border-left: " + hbw + "px solid transparent;";
					break;
				default:
					var style = vbs + width;
			}
		}
		else
			var style = vbs + "width: 100%";

		var path = params[0];
		span.innerHTML = '<img src="'.concat(path,'"',tat,' style="', style,'"/>');
	}	
}

config.macros.menu = {
	handler: function(place,macroName,params,wikifier,paramString,tiddler) 
	{
		// parameters: text contentTiddler tooltip accesskey condition
		if (params[4] && !eval(params[4]))
			return;
		var btn = createTiddlyButton(place, params[0], params[2], this.onClick, null, null, params[3], { data: params[1] });
	},
	onClick: function(ev)
	{
		var target = resolveTarget(ev || window.event);
		//if (target.childNodes.length > 1)	{ while (target.childNodes.length > 1) removeNode(target.childNodes[1]);}
		var data = target.getAttribute("data");
		if (!data)
			return;
		var text = store.getTiddlerText(data).split('\n');
		for (var i=text.length-1; i >= 0; i--)
		{
			var what = text[i].split("|");
			switch (what.shift())
			{
			case "macro":
				invokeMacro(target,what[0],what[1]);
				break;
			case "tiddler":
				var tn = what[0];
				createTiddlyButton(target,what[1],what[2],config.macros.menu.openTiddler,null,null,what[3],{data:tn});
			}
		}
		var c = target;
		while (target.childNodes.length > 1)
		{
			var mc = target.removeChild(target.childNodes[1]);
			insertAfter(c,mc);
			mc = c;
		}
		removeNode(target);
	},
	openTiddler: function(ev)
	{
		var target = resolveTarget(ev || window.event);
		var data = target.getAttribute("data");
		story.displayTiddler(null,data);
	}
};

config.macros.loginDialog = {
    handler: function(place,macroName,params,wikifier,paramString,tiddler) 
    {
        config.macros.iFrame.handler(place,macroName,
            [http.getLoginUrl({path: window.location.pathname}), 600],
            wikifier,"",tiddler)
    }
}

config.macros.login = {
    handler: function(place,macroName,params,wikifier,paramString,tiddler) 
    {
        if (config.options.txtUserName == null || config.options.txtUserName == "")	{
            var label = "login";
            var tip = "Log in with your Google id";
        }
        else {
            var label = config.options.txtUserName;
            var tip = "logout";
        }
            
        createTiddlyButton(place, label, tip, function() { story.displayTiddler(null,"LoginDialog") });
    }
}

config.macros.userName = {
    handler: function(place,macroName,params,wikifier,paramString,tiddler) 
    {
        place.appendChild(document.createTextNode(config.options.txtUserName))
    }
}

function SetUserName(name,grpmember) {
    var currAccess = config.access;
    config.options.txtUserName = name;
    switch(name) {
      case "", undefined:
        config.access = config.anonAccess;
        break;
      case config.owner:
        config.access = "all";
        break;
      default:
        config.access = grpmember ? config.groupAccess : config.authAccess;
    }
    if (currAccess == "none" && config.access != "none") {
		window.location.reload();
	}
    readOnly = (config.access == "none" || config.access == "view") || (config.owner === undefined);
    if (config.access == "none")
		store.getTiddler("DefaultTiddlers").text = "LoginDialog";
    return currAccess != config.access;
}

function onLogin(usn,path,grpmember)
{
    story.closeTiddler("LoginDialog", true);
    if (SetUserName(usn,grpmember)) {
        story.refreshAllTiddlers();
    }
    refreshAll();
    if (!config.owner)
		story.displayTiddler(null,"PageProperties");
}

function trace(f) {
  var sfv = "";
  for (var fn in f) {
    if (typeof(f[fn]) != 'function')
      sfv = sfv.concat(fn," = ",f[fn],"\n");
  }
  displayMessage(sfv);
}

http = {
  _methods: [],
  _addMethod: function(m) { this[m] = new Function("a","return HttpGet(a,'" + m + "')"); }
}

http._init = function(ms) { for (var i=0; i < ms.length; i++) http._addMethod(ms[i]); }


function OnCreatePage(reply)
{
    if (reply.Success)
        window.location = reply.Url;
    else
        displayMessage(reply.Message);
}

TiddlyWiki.prototype.saveIfChanged = function(title,text) {
    t = this.createTiddler(title);
    if (t.text != text) {
        this.saveTiddler(title,title,text,config.options.txtUserName, new Date());
        return true;
    }
}	

function OnSavePageProperties(reply)
{
	if (!reply) return;
	var sts = store.saveIfChanged("SiteTitle",forms.PageProperties.title);
	var sss = store.saveIfChanged("SiteSubtitle",forms.PageProperties.subtitle);
	if (sts || sss)
		refreshAll();
}

function OnCommitCloseForm(fn,reply)
{
	if (reply.Success) {
		story.closeTiddler(fn);
		if (fn == "PageProperties")
			window.location.reload();
		return reply;
	}
    return false;
}

config.macros.defineGroup = {
    handler: function(place,macroName,params,wikifier,paramString,tiddler) 
    {
		if (config.options.txtUserName != "")
			createTiddlyButton(place,"define group",null,function() {story.displayTiddler(null, "DefineGroup") },"buttonftr")
    }
}

function OnCreateGroup(reply)
{
	if (!reply.Success) return;
	listOfAllGroups = listOfAllGroups + "|" + reply.Group;
	setFormFieldValue(forms.DefineGroup,"groupname",reply.Group,listOfAllGroups);
	setFormFieldValue(forms.DefineGroup,"name","");
}

function addToUserListElement(name,ule,check)
{
	if (!ule)
		ule = document.getElementById("groupMemberList");
	var fc = ule.firstChild;
	if (check)
        var c = createTiddlyElement(ule,"input",null,null,null, {href: "javascript:;", type: "checkbox"});
	createTiddlyElement(ule,"a",null,null,name,{href:"/users/" + encodeURIComponent(name)});
	createTiddlyElement(ule,"br");
	if (!fc) {
		var pte = ule.parentElement;
		if (pte.children.length == 1)
			createTiddlyButton(pte,"Remove selected member(s)","Remove members from group",removeSelectedMembers,"cmdButton");
	}
}

function removeSelectedMembers()
{
	var gml = document.getElementById("groupMemberList");
	var i=0;
	for (var i=0; i < gml.children.length; i+=3) {
		if (gml.children[i].checked) {
			forms.DefineGroup.user = gml.children[i+1].firstChild.nodeValue;
			http.removeGroupMember(forms.DefineGroup);
		}
	}
	ListGroupMembers();
}

function ListGroupMembers(reply)
{
	if (!reply)
		return ListGroupMembers(http.getGroupMembers(forms.DefineGroup));
	gml = document.getElementById("groupMemberList");
	removeChildren(gml);
	if (!reply.length)
		gml.appendChild(document.createTextNode("(no members)"));
	else
		for (var i=0; i < reply.length; i++) {
			addToUserListElement(reply[i],gml,true);
		}
}

function OnAddMember(reply)
{
	gml = document.getElementById("groupMemberList");
	if (gml.innerText == "(no members)")
		gml.removeChild(gml.firstChild);
	var m = forms.DefineGroup.user;
	addToUserListElement(m,gml,true);
}

config.macros.recentChanges = {
	handler: function(place)
	{
		var rcl = http.getRecentChanges();
		if (rcl.Success) {
			var ta = createTiddlyElement(place,"table");
			var tbody = createTiddlyElement(ta,"tbody");
			for (var i = 0; i < rcl.changes.length; i++) {
				var c = rcl.changes[i];
				var tr = createTiddlyElement(tbody,"tr",null,i % 2 ? "evenRow":"oddRow");
				createTiddlyElement(tr,"td",null,null,c.time.substr(0,16));
				createTiddlyElement(tr,"td",null,null,c.who);
				var td = createTiddlyElement(tr,"td");
				var w = "";
				if (c.page == location.pathname)
					createTiddlyLink(td, c.title, true);
				else {
					var a = createTiddlyElement(td,"a",null,null,c.title);
					a.href = c.page + "#" + encodeURIComponent(String.encodeTiddlyLink(c.title));
					w = c.page;
				}
				createTiddlyElement(tr,"td",null,null,w);
			}
		}
	}
}

config.macros.fileList = {
	handler: function(place)
	{
		var files = http.fileList();
		for (var i = 0; i < files.length; i++) {
			createTiddlyElement(place,"a",null,null,files[i],{ href: files[i] });
			createTiddlyElement(place,"br");
		}
	}
}

config.macros.urlFetch = {
    handler: function(place, macroName, params)
    {
        var text = http.urlFetch(
            { url: params[0] } );
        var output = createTiddlyElement(place, "span");
        output.innerHTML = text;
    }
}

config.macros.downloadAsTiddlyWiki = {
    handler: function(place, macroName, params)
    {
		if (window.location.protocol == "file:") 
			return;
		var link = document.createElement("a");
		link.href = location.pathname + "?twd=" + config.options.txtEmptyTiddlyWiki; 
		link.title = "Right-click to download this page as a Tiddlywiki";
		createTiddlyText(link, "Download TiddlyWiki");
		place.appendChild(link);
    }
}


config.macros.uploadFile = {
	onClick: function()
	{
		story.displayTiddler(null,"UploadDialog", DEFAULT_VIEW_TEMPLATE);
		return false;
	},
	handler: function(place)
	{
		if(!readOnly)
			createTiddlyButton(place,"upload file","Upload one or more files",this.onClick);
	}
}

config.macros.uploadDialog = {
	handler: function(place,macroName,params,wikifier,paramString,tiddler) 
	{
		createUploadFrame(place,"");
		createTiddlyElement(place,"DIV","displayUploadResult");
		createTiddlyElement(place,"DIV","displayUploads");
	}
}

function createUploadFrame(place, qs, id)
{
	var theFrame = document.createElement("IFRAME");
	var ts = new Date();
	theFrame.src = "/static/UploadDialog.htm?" + qs + "#" + window.location.pathname;
	theFrame.height = 196;
	theFrame.width = "100%";
	theFrame.frameBorder = 0;
	if (id)
	    theFrame.id = id;
	place.appendChild(theFrame);
}

function InsertTiddlerText(title, text, parentId)
{
	if (parentId)
	{
		var parent = document.getElementById(parentId);
		if (parent)
		{
			var ta = FindChildTextarea(parent);
			if (ta)
			{
				ta.focus();
				if (document.selection) //IE
					document.selection.createRange().text = text;
				else // firefox
					ta.value = ta.value.substr(0,ta.selectionStart) + text + ta.value.substr(ta.selectionStart);
				var fid = document.getElementById(parentId + "iFrame");
				fid.parentNode.removeChild(fid);
				return;
			}
		}
	}
	var curtx = store.getTiddlerText(title);
	if (!curtx)
		store.saveTiddler(title,title,text,config.options["txtUserName"],new Date(), "");
	story.displayTiddler(null,title);
}

function FindChildTextarea(ac)
{
	if (ac.tagName == "TEXTAREA")
		return ac;

	for (var i=0; i<ac.childNodes.length; i++)
	{
		var e = FindChildTextarea(ac.childNodes[i]);
		if (e) return e;
	}
}