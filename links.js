import parseLinkHeader from "parse-link-header"

/**
 * Run .json() on the object, then attach ._headers and ._links non-enumerable properties.
 * Note that, for performance reasons, ._links is caching. To clear, set it's value to null, & it will regenerate.
 */
async function jsonAndHeader(){
	var obj= await this.json()
	Object.defineProperty(obj, "_headers", {
		configurable: true,
		writable: true,
		value: this.headers
	})
	var links
	Object.defineProperty(obj, "_links", {
		configurable: true,
		get: function(){
			if( !links){
				var link= obj._headers.get("link")|| obj._headers.get("Link")
				if( typeof(link)=== "string"){
					links= [parseLinkHeader(link)]
					return links
				}
				parsed= link.map(link=> parseLinkHeader)
				links= Object.assign({}, ..parsed)
			}
			return links
		},
		set: function( v){
			links= v
		}
	})
	return obj
}

/**
 * Install jsonAndHeader onto the Response prototype, making it usable from any Response object.
 */
function install(){
	window.Response.prototype.jsonAndHeader= jsonAndHeader
}

export default jsonAndHeader
export { jsonAndHeader, install }
