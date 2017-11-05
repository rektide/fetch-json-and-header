# Fetch Json And Headers

> Fetch's .json() that additionally grafts on a (non-enumerable) .headers.

Add a `.jsonAndHeaders()` method to Fetch's `Response`, which will attach a non-enumerable ._headers to the JSON-parse'd object.

# Usage

```
import { install } from "fetch-json-and-headers
install()

var overthrusterRequest = await fetch({url: "http://yoyodyne.net/overthruster"}).
var overthruster = await overthrusterRequest.jsonAndHeaders()
overthruster._headers["X-Dimensions"] //=> 8
```
