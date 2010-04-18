﻿# this:	tiddler.py
# by:	Poul Staugaard
# URL:	http://code.google.com/p/giewiki
# ver.:	1.3.0

from google.appengine.ext import db
from google.appengine.api import users

class Tiddler(db.Model):
  "Unit of text storage"
  title = db.StringProperty()
  page = db.StringProperty()
  sub = db.StringProperty()
  author = db.UserProperty()
  author_ip = db.StringProperty()
  version = db.IntegerProperty()
  current = db.BooleanProperty()
  public = db.BooleanProperty()
  locked = db.BooleanProperty()
  text = db.TextProperty()
  created = db.DateTimeProperty(auto_now_add=True)
  modified = db.DateTimeProperty(auto_now_add=True)
  tags = db.StringProperty()
  id = db.StringProperty()
  comments = db.IntegerProperty(0)
  messages = db.StringProperty()
  notes = db.StringProperty()
  def todict(s,d):
	d['title'] = s.title
	d['page'] = s.page
	d['sub'] = s.sub
	d['author'] = s.author
	d['author_ip'] = s.author_ip
	d['version'] = s.version
	d['current'] = s.current
	d['public'] = s.public
	d['locked'] = s.locked
	d['text'] = s.text
	d['created'] = s.created
	d['modified'] = s.modified
	d['tags'] = s.tags
	d['id'] = s.id
	d['comments'] = s.comments
	d['messages'] = s.messages
	d['notes'] = s.notes

class SiteInfo(db.Model):
  title = db.StringProperty()
  description = db.StringProperty()
  def todict(s,d):
	d['title'] = s.title
	d['description'] = s.description
	
class ShadowTiddler(db.Model):
  tiddler = db.ReferenceProperty(Tiddler)
  path = db.StringProperty()
  id = db.StringProperty()
  def todict(s,d):
	d['path'] = s.path
	d['id'] = s.id
	
class EditLock(db.Model):
  id = db.StringProperty(Tiddler)
  user = db.UserProperty()
  user_ip = db.StringProperty()
  time = db.DateTimeProperty(auto_now_add=True)
  duration = db.IntegerProperty()

class Page(db.Model):
  NoAccess = 0
  ViewAccess = 2
  CommentAccess = 4
  AddAccess = 6
  EditAccess = 8
  AllAccess = 10
  access = { "all":10, "edit":8, "add":6, "comment":4, "view":2, "none":0,
             10:"all", 8:"edit", 6:"add", 4:"comment", 2:"view", 0:"none" }
    
  path = db.StringProperty()
  sub = db.StringProperty()
  owner = db.UserProperty()
  ownername = db.StringProperty()
  title = db.StringProperty()
  subtitle = db.StringProperty()
  locked = db.BooleanProperty()
  anonAccess = db.IntegerProperty()
  authAccess = db.IntegerProperty()
  groupAccess = db.IntegerProperty()
  groups = db.StringProperty()
  def todict(s,d):
	d['path'] = s.path
	d['sub'] = s.sub
	d['owner'] = s.owner
	d['title'] = s.title
	d['subtitle'] = s.subtitle
	d['locked'] = s.locked
	d['anonAccess'] = s.anonAccess
	d['authAccess'] = s.authAccess
	d['groupAccess'] = s.groupAccess
	d['groups'] = s.groups

  def Update(self,tiddler):
	if tiddler.title == "SiteTitle":
		self.title = tiddler.text
	elif tiddler.title == "SiteSubtitle":
		self.subtitle = tiddler.text
	else:
		return
	self.put()
  
  def UpdateViolation(self):
	if users.get_current_user() == None and self.anonAccess < 6:
		return "You cannot change this page"
	if users.get_current_user() != self.owner and self.authAccess < 6 and (self.groupAccess < 6 or HasGroupAccess(self.groups,userWho()) == False):
		return "Edit access is restricted"
	return None
	
class Comment(db.Model):
  tiddler = db.StringProperty()
  version = db.IntegerProperty()
  text = db.TextProperty()
  created = db.DateTimeProperty(auto_now_add=True)
  author = db.UserProperty()
  ref = db.StringProperty()
  def todict(s,d):
	d['tiddler'] = s.tiddler
	d['version'] = s.version
	d['text'] = s.text
	d['created'] = s.created
	d['author'] = s.author
	d['ref'] = s.ref
	
class Include(db.Model):
  page = db.StringProperty()
  id = db.StringProperty()
  version = db.IntegerProperty()
  @staticmethod
  def Unique(apage,aid):
	"Finds or creates instance"
	ev = Include.all().filter("page =", apage).filter("id =",aid).get()
	if ev == None:
		return Include(page = apage, id = aid)
	return ev
  # Unique = staticmethod(Unique)
  
class Note(Comment):
  revision = db.IntegerProperty()
  def todict(s,d):
	Comment.todict(s,d)
	d['revision'] = s.revision
  
class Message(Comment):
  receiver = db.UserProperty()
  def todict(s,d):
	Comment.todict(s,d)
	d['receiver'] = s.receiver

class Group(db.Model):
  name = db.StringProperty()
  admin = db.UserProperty()
  def todict(s,d):
	d['name'] = s.name
	d['admin'] = s.admin
		
class GroupMember(db.Model):
  name = db.StringProperty()
  group = db.StringProperty()
  def todict(s,d):
	d['name'] = s.name
	d['group'] = s.group

class UploadedFile(db.Model):
  owner = db.UserProperty()
  path = db.StringProperty()
  mimetype = db.StringProperty()
  data = db.BlobProperty()
  date = db.DateTimeProperty(auto_now_add=True)
  
class LogEntry(db.Model):
	when = db.DateTimeProperty(auto_now_add=True)
	what = db.StringProperty()
	text = db.StringProperty()
	
def truncateModel(m):
	while m.all().get() != None:
		db.delete(m.all())

def truncateAllData():
	truncateModel(Message)
	truncateModel(Note)
	truncateModel(Comment)
	truncateModel(Include)
	truncateModel(EditLock)
	truncateModel(Page)
	truncateModel(ShadowTiddler)
	truncateModel(Tiddler)
	truncateModel(UploadedFile)
	truncateModel(LogEntry)
	
def HasGroupAccess(grps,user):
	if grps != None:
		for ga in grps.split(","):
			if GroupMember.all().filter("group =",ga).filter("name =",user).get():
				return True
	return False
	
def ReadAccessToPage( page, user = users.get_current_user()):
	if page.__class__ == unicode:
		page = Page.all().filter("path =",page).get()
	if page == None: # Un-cataloged page - restricted access
		return users.is_current_user_admin()
	if page.anonAccess >= page.ViewAccess: # anyone can see it
		return True
	if user != None:
		if page.authAccess >= page.ViewAccess: # authenticated users have access
			return True
		if page.owner == user: # owner has access, of course
			return True
		if page.groupAccess >= page.ViewAccess and HasGroupAccess(page.groups,user.nickname()):
			return True
	return False

def AccessToPage( page, user = users.get_current_user()):
	if page.__class__ == unicode:
		page = Page.all().filter("path =",page).get()
	if page == None: # Un-cataloged page - restricted access
		return 'all' if users.is_current_user_admin() else 'none'
	if page.owner == user or users.is_current_user_admin():
		return 'all'
	if user != None:
		access = page.groupAccess if HasGroupAccess(page.groups,user.nickname()) else page.authAccess
	else:
		access = page.anonAccess
	return Page.access[access]
