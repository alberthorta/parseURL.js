/**
 * Parses Domain part of an URI.
 *
 * @param {object} out_obj Containing the object that will be used to return the parsing in a form:
 *        out_obj = {
 *        	user     : {string | undefined} Username, 
 *          password : {string | undefined} Password,  
 *          host     : {string | undefined} Host, 
 *          port     : {string | undefined} Port
 *        }
 * @return {object} out_obj
 */
String.prototype.parseURIDomain = function (out_obj) {
    var domain_components, domain_and_port, user_and_password;
    out_obj.user = undefined;
    out_obj.password = undefined;
    out_obj.port = undefined;
    out_obj.host = undefined;
    out_obj.port = (out_obj.scheme === 'http' ? 80 : (out_obj.scheme === 'https' ? 443 : (out_obj.scheme === 'ftp' ? 21 : undefined)));
    if (this && this.length > 0) {
        domain_components = ("@" + this).split("@");
        domain_and_port = domain_components.pop().split(":", 2);
        out_obj.host = domain_and_port[0] !== "" ? domain_and_port[0] : undefined;
        out_obj.port = (domain_and_port[1] !== undefined) ? parseInt(domain_and_port[1]) : out_obj.port;
        user_and_password = domain_components.pop().split(":", 2);
        out_obj.user = user_and_password[0] !== "" ? user_and_password[0] : undefined;
        out_obj.password = user_and_password[1];
    }
    return out_obj;
};

/**
 * Parses URI Params part of an URI.
 *
 * @return {object} Containing the parsed params.
 */
String.prototype.parseURIParams = function () {
    return decodeURIComponent(this).replace(/\+/g, ' ').split("&").reduce(function (out, current_value, current_index, initial_array) {
        var param = initial_array[current_index].split("=", 2);
        out[param.shift()] = param.pop();
        return out;
    }, {});
};

/**
 * Parses full URL
 *
 * @return {object} Containing the parsed URL in a form:
 *        {
 *        	user     : {string | undefined} Username, 
 *          password : {string | undefined} Password,  
 *          host     : {string | undefined} Host, 
 *          port     : {string | undefined} Port,
 *          query    : {object | undefined} Parsed GET Query Parameters,
 *          path     : {string | undefined} Absolute path,
 *          scheme   : {string | undefined} Scheme ("http" | "https" | "file" | ... ) <lowercase>,
 *          fragment : {string | undefined} Fragment
 *        }
 */
String.prototype.parseURL = function () {
    var uri_components = (/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/g).exec(this);
    return (uri_components[4] || "").parseURIDomain({
        scheme: uri_components[2] !== undefined ? uri_components[2].toLowerCase() : undefined,
        path: (uri_components[2] || "").toLowerCase() === 'file' ? uri_components[5].slice(1) : uri_components[5] || undefined,
        fragment: uri_components[9],
        query: (!uri_components[7] || uri_components[7].length === 0) ? {} : uri_components[7].parseURIParams()
    });
};