# parseURL.js
Extend javascript base String object to allow URL parsing.

## How it works?
This small js can be included in any javascript project and allows you to parse any kind of URL to extract every component of those specific URLS.

### Use it on browser projects:

```
<html>
  <head>
    <script src="parseURL.js"></script>
  </head>
  <body>
    <script language="application/javascript">
      console.log("https://www.google.es/search?q=JS+URL+PARSER+LIBRARY".parseURL());
    </script>
  </body>
</html>
```

This will output an object with the following information:

```
Object {
  protocol: "https",
  path: "/search",
  hash: undefined,
  params: Object {
    q: "URL PARSER LIBRARY"
  },
  user: undefined,
  password: undefined,
  port: 443,
  domain: "www.google.es"
}
```

Feel free to use the minified version parseURL.min.js in order to reduce the footprint of the library.