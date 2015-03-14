If you think TiddlyWiki is wonderful, except that it isn't a real wiki in the classic sense, this could be the wiki engine for you. giewiki tries to be a real wiki: You get preview and versioning of tiddlers, any number of pages in any hierarchy, auto-generated sitemap, comments on tiddlers, fine-grained access control, image upload, recent changes, etc. The utterly incomplete documentation, that may still shed some light on whether it is of any potential use to you - spiced with assorted sillyness - is how I chose to demo it at http://giewiki.appspot.com

The backend is currently written in Python, but help in creating a Java version is welcome. As for the browser script, here are some TechnicalDetails.

Getting your own copy up and running on Google App Engine's free hosting domain is easy, as described in the DeploymentGuide. **Beware that if you have an earlier version installed already, you need to visit http://appengine.google.com in order to make the new version the active one (via the _versions_ list)**. If you already have 10 deployed versions, you need to delete one or more old ones before you can deploy another.

The lastest and greatest features of the download ought to be listed in the ChangeLog, but that's something I've neglected for a long while. http://giewiki.appspot.com is more likely to be up-to-date. You may find even newer stuff in Subversion via the Source tab, but use it at your own risk.

Care to join the efford ? -mail me at poul [dot](dot.md) staugaard [at](at.md) gmail [dot](dot.md) com.