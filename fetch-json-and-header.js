/**
 * Run .json() on the object, then attach .headers as a (non-enumerable) _headers.
 */
async function jsonAndHeader(){
	var obj= await this.json()
	Object.defineProperty(obj, "_headers", {
		configurable: true,
		writable: true,
		value: this.headers
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
