The recentComments shadow tiddler

# Introduction #

Shows a list of the most recent comments, site-wide. Buttons are included for paging back in time. Please note that this one doesn't work out of the box, but that's easy to fix:

To make it work, add the line

getRecentComments

to the special tiddler HttpMethods on the start page and before you close it,
click **tag** and add the tag **shadowTiddler**. Refresh any page that you may have open to get the modified HttpMethods special tiddler.