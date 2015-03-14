Technical details relative to TiddlyWiki. See also the SourceCodeGuide.

# Introduction #

The browser script is based on TW 2.4.1, but is modified, excluding the local save and backstage stuff, and adding about 20% of other features. My opinion is that if you want to save locally, you should use python and the App Engine SDK for now. That means you will be saving to a local database, and depend on that for presentation also. Import/export to local files should be the the next new feature.


# Details #

Most TW plugins should work, but there is no list of certified plugins.