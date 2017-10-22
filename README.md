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
  scheme: "https",
  path: "/search",
  fragment: undefined,
  query: Object {
    q: "URL PARSER LIBRARY"
  },
  user: undefined,
  password: undefined,
  port: 443,
  host: "www.google.es"
}
```

Feel free to use the minified version parseURL.min.js in order to reduce the footprint of the library.

## External references

[RFC 3986 - Uniform Resource Identifier (URI): Generic Syntax](https://tools.ietf.org/html/rfc3986)
