describe('String.prototype.parseURIDomain', function () {
    var common_tests = function (parsed_domain) {
        expect(parsed_domain).to.be.an('object');
        expect(parsed_domain).to.only.have.keys('protocol', 'user', 'password', 'domain', 'port');
    }
    it('works on empty strings', function () {
        var parsed_domain = "".parseURIDomain({protocol: undefined});
        common_tests(parsed_domain);
        expect(parsed_domain.user).to.be(undefined);
        expect(parsed_domain.password).to.be(undefined);
        expect(parsed_domain.domain).to.be(undefined);
        expect(parsed_domain.port).to.be(undefined);
    });
    it('works on only domain strings', function () {
        var parsed_domain = "thats.the.domain.com".parseURIDomain({protocol: 'ftp'});
        common_tests(parsed_domain);
        expect(parsed_domain.domain).to.be('thats.the.domain.com');
        expect(parsed_domain.user).to.be(undefined);
        expect(parsed_domain.password).to.be(undefined);
        expect(parsed_domain.port).to.be(21);
    });
    it('works when sending domain:port strings', function () {
        var parsed_domain = "thats.the.domain.com:6767".parseURIDomain({protocol: 'http'});
        common_tests(parsed_domain);
        expect(parsed_domain.domain).to.be('thats.the.domain.com');
        expect(parsed_domain.user).to.be(undefined);
        expect(parsed_domain.password).to.be(undefined);
        expect(parsed_domain.port).to.be(6767);
    });
    it('works when sending user:password@domain strings', function () {
        var parsed_domain = "user:password@thats.the.domain.com".parseURIDomain({protocol: 'https'});
        common_tests(parsed_domain);
        expect(parsed_domain.domain).to.be('thats.the.domain.com');
        expect(parsed_domain.user).to.be('user');
        expect(parsed_domain.password).to.be('password');
        expect(parsed_domain.port).to.be(443);
    });
    it('works when sending user:password@domain:port strings', function () {
        var parsed_domain = "user:password@thats.the.domain.com:78".parseURIDomain({protocol: 'https'});
        common_tests(parsed_domain);
        expect(parsed_domain.domain).to.be('thats.the.domain.com');
        expect(parsed_domain.user).to.be('user');
        expect(parsed_domain.password).to.be('password');
        expect(parsed_domain.port).to.be(78);
    });
});

describe('String.prototype.parseURIParams', function () {
    it('works on empty string', function () {
        var parsed_params = "".parseURIParams();
        expect(parsed_params).to.be.an('object');
    });
    it('works on regular params', function () {
        var parsed_params = "a&b=1&c=hello+world".parseURIParams();
        expect(parsed_params).to.be.an('object');
        expect(parsed_params).to.only.have.keys('a', 'b', 'c');
        expect(parsed_params.a).to.be(undefined);
        expect(parsed_params.b).to.be('1');
        expect(parsed_params.c).to.be('hello world');
    });
    it('works on encoded params', function () {
        var parsed_params = "a=%C3%A4%C3%AB%C3%AF%C3%B6%C3%BC%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%E6%B1%89%E5%AD%97".parseURIParams();
        expect(parsed_params).to.be.an('object');
        expect(parsed_params).to.only.have.keys('a');
        expect(parsed_params.a).to.be("äëïöüáéíóú汉字");
    });
});

describe('String.prototype.parseURL', function () {
    it('works on empty string', function () {
        // just for example of tested value
        var url = '';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.protocol).to.be(undefined);
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.domain).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be(undefined);
        expect(parsed_url.params).to.be.an('object');
        expect(parsed_url.params).to.be.empty();
        expect(parsed_url.hash).to.be(undefined);
    });
    it('works on absolute URLS', function () {
        // just for example of tested value
        var url = '/this/is/a/relative/url.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.protocol).to.be(undefined);
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.domain).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be('/this/is/a/relative/url.html');
        expect(parsed_url.params).to.be.an('object');
        expect(parsed_url.params).to.be.empty();
        expect(parsed_url.hash).to.be(undefined);
    });
    it('works on relative URLS', function () {
        // just for example of tested value
        var url = 'this/is/a/relative/url.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.protocol).to.be(undefined);
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.domain).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be('this/is/a/relative/url.html');
        expect(parsed_url.params).to.be.an('object');
        expect(parsed_url.params).to.be.empty();
        expect(parsed_url.hash).to.be(undefined);
    });
    it('works on full URLS', function () {
        // just for example of tested value
        var url = 'http://user:password@domain.com:8080/this/is/the/path.html?param1=1&param2=2&text=Hello+G%C3%BCnter#HASH';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.protocol).to.be('http');
        expect(parsed_url.user).to.be('user');
        expect(parsed_url.password).to.be('password');
        expect(parsed_url.domain).to.be('domain.com');
        expect(parsed_url.port).to.be(8080);
        expect(parsed_url.path).to.be('/this/is/the/path.html');
        expect(parsed_url.params).to.be.an('object');
        expect(parsed_url.params).to.not.be.empty();
        expect(parsed_url.params).to.only.have.keys('param1', 'param2', 'text');
        expect(parsed_url.params.param1).to.be('1');
        expect(parsed_url.params.param2).to.be('2');
        expect(parsed_url.params.text).to.be('Hello Günter');
        expect(parsed_url.hash).to.be('HASH');
    });
    it('works on normal URLS', function () {
        // just for example of tested value
        var url = 'https://domain.com/this/is/the/path.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.protocol).to.be('https');
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.domain).to.be('domain.com');
        expect(parsed_url.port).to.be(443);
        expect(parsed_url.path).to.be('/this/is/the/path.html');
        expect(parsed_url.params).to.be.empty();
        expect(parsed_url.hash).to.be(undefined);
    });
    it('works on file:/// URLS', function () {
        // just for example of tested value
        var url = 'file:///C:/this/is/the/path.html';
        var parsed_url = url.parseURL();
        expect(parsed_url).to.be.an('object');
        expect(parsed_url.protocol).to.be('file');
        expect(parsed_url.user).to.be(undefined);
        expect(parsed_url.password).to.be(undefined);
        expect(parsed_url.domain).to.be(undefined);
        expect(parsed_url.port).to.be(undefined);
        expect(parsed_url.path).to.be('C:/this/is/the/path.html');
        expect(parsed_url.params).to.be.empty();
        expect(parsed_url.hash).to.be(undefined);
    });
});