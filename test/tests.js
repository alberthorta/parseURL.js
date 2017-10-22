describe('String.prototype.parseURIDomain', function () {
    var common_tests = function (parsed_host) {
        expect(parsed_host).to.be.an('object');
        expect(parsed_host).to.only.have.keys('scheme', 'user', 'password', 'host', 'port');
    }
    it('works on empty strings', function () {
        var parsed_host = "".parseURIDomain({scheme: undefined});
        common_tests(parsed_host);
        expect(parsed_host.user).to.be(undefined);
        expect(parsed_host.password).to.be(undefined);
        expect(parsed_host.host).to.be(undefined);
        expect(parsed_host.port).to.be(undefined);
    });
    it('works on only host strings', function () {
        var parsed_host = "thats.the.host.com".parseURIDomain({scheme: 'ftp'});
        common_tests(parsed_host);
        expect(parsed_host.host).to.be('thats.the.host.com');
        expect(parsed_host.user).to.be(undefined);
        expect(parsed_host.password).to.be(undefined);
        expect(parsed_host.port).to.be(21);
    });
    it('works when sending host:port strings', function () {
        var parsed_host = "thats.the.host.com:6767".parseURIDomain({scheme: 'http'});
        common_tests(parsed_host);
        expect(parsed_host.host).to.be('thats.the.host.com');
        expect(parsed_host.user).to.be(undefined);
        expect(parsed_host.password).to.be(undefined);
        expect(parsed_host.port).to.be(6767);
    });
    it('works when sending user:password@host strings', function () {
        var parsed_host = "user:password@thats.the.host.com".parseURIDomain({scheme: 'https'});
        common_tests(parsed_host);
        expect(parsed_host.host).to.be('thats.the.host.com');
        expect(parsed_host.user).to.be('user');
        expect(parsed_host.password).to.be('password');
        expect(parsed_host.port).to.be(443);
    });
    it('works when sending user:password@host:port strings', function () {
        var parsed_host = "user:password@thats.the.host.com:78".parseURIDomain({scheme: 'https'});
        common_tests(parsed_host);
        expect(parsed_host.host).to.be('thats.the.host.com');
        expect(parsed_host.user).to.be('user');
        expect(parsed_host.password).to.be('password');
        expect(parsed_host.port).to.be(78);
    });
});

describe('String.prototype.parseURIParams', function () {
    it('works on empty string', function () {
        var parsed_query = "".parseURIParams();
        expect(parsed_query).to.be.an('object');
    });
    it('works on regular query', function () {
        var parsed_query = "a&b=1&c=hello+world".parseURIParams();
        expect(parsed_query).to.be.an('object');
        expect(parsed_query).to.only.have.keys('a', 'b', 'c');
        expect(parsed_query.a).to.be(undefined);
        expect(parsed_query.b).to.be('1');
        expect(parsed_query.c).to.be('hello world');
    });
    it('works on encoded query', function () {
        var parsed_query = "a=%C3%A4%C3%AB%C3%AF%C3%B6%C3%BC%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%E6%B1%89%E5%AD%97".parseURIParams();
        expect(parsed_query).to.be.an('object');
        expect(parsed_query).to.only.have.keys('a');
        expect(parsed_query.a).to.be("äëïöüáéíóú汉字");
    });
});

describe('String.prototype.parseURL', function () {
    it('works on empty string', function () {
        // just for example of tested value
        var url = '';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.scheme).to.be(undefined);
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.host).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be(undefined);
        expect(parsed_url.query).to.be.an('object');
        expect(parsed_url.query).to.be.empty();
        expect(parsed_url.fragment).to.be(undefined);
    });
    it('works on absolute URLS', function () {
        // just for example of tested value
        var url = '/this/is/a/relative/url.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.scheme).to.be(undefined);
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.host).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be('/this/is/a/relative/url.html');
        expect(parsed_url.query).to.be.an('object');
        expect(parsed_url.query).to.be.empty();
        expect(parsed_url.fragment).to.be(undefined);
    });
    it('works on relative URLS', function () {
        // just for example of tested value
        var url = 'this/is/a/relative/url.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.scheme).to.be(undefined);
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.host).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be('this/is/a/relative/url.html');
        expect(parsed_url.query).to.be.an('object');
        expect(parsed_url.query).to.be.empty();
        expect(parsed_url.fragment).to.be(undefined);
    });
    it('works on full URLS', function () {
        // just for example of tested value
        var url = 'http://user:password@host.com:8080/this/is/the/path.html?param1=1&param2=2&text=Hello+G%C3%BCnter#HASH';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.scheme).to.be('http');
        expect(parsed_url.user).to.be('user');
        expect(parsed_url.password).to.be('password');
        expect(parsed_url.host).to.be('host.com');
        expect(parsed_url.port).to.be(8080);
        expect(parsed_url.path).to.be('/this/is/the/path.html');
        expect(parsed_url.query).to.be.an('object');
        expect(parsed_url.query).to.not.be.empty();
        expect(parsed_url.query).to.only.have.keys('param1', 'param2', 'text');
        expect(parsed_url.query.param1).to.be('1');
        expect(parsed_url.query.param2).to.be('2');
        expect(parsed_url.query.text).to.be('Hello Günter');
        expect(parsed_url.fragment).to.be('HASH');
    });
    it('works on normal URLS', function () {
        // just for example of tested value
        var url = 'https://host.com/this/is/the/path.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.scheme).to.be('https');
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.host).to.be('host.com');
        expect(parsed_url.port).to.be(443);
        expect(parsed_url.path).to.be('/this/is/the/path.html');
        expect(parsed_url.query).to.be.empty();
        expect(parsed_url.fragment).to.be(undefined);
    });
    it('works on file:/// URLS', function () {
        // just for example of tested value
        var url = 'file:///C:/this/is/the/path.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.scheme).to.be('file');
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.host).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be('C:/this/is/the/path.html');
        expect(parsed_url.query).to.be.empty();
        expect(parsed_url.fragment).to.be(undefined);
    });
});