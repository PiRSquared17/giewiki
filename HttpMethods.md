# Introduction #

The special tiddler HttpMethods defines the list of server methods (one per line) that may be called from the browser script. These methods all appear as methods on the global object **http**. They are added to this object during startup by the method http._init(), using the special tiddler HttpMethods as input._

To add another method to the http object to to be called from javascript, you can simply add it to the HttpMethods tiddler. Or, if you are writing a plugin you could call http._addMethod('name-of-method') in your systemConfig code. To call your http method with parameters, enclose those parameters as properties on an object that you pass as the one and only parameter to your method, like so:_

```
  http.helloWorld({name: 'Poul', title: 'King'}); 
```

These parameters, together with the parameter named **method** are passed to the server in the usual way, i.e. as name=value&name=value. The output of the method is expected to be xml, which is converted into a javascript object for your convenience. Furthermore, if the reply root element has an element named 'Success' with the value 'false' and an element named 'Message', that latter element is passed to displayMessage().