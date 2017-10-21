describe('String.prototype.parseURL', function(){
  it('works on full URLS', function(){
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
	expect(parsed_url.params).to.only.have.keys('param1','param2','text');
	expect(parsed_url.params.param1).to.be('1');
	expect(parsed_url.params.param2).to.be('2');
	expect(parsed_url.params.text).to.be('Hello Günter');
	expect(parsed_url.hash).to.be('HASH');
  });
  it('works on normal URLS', function(){
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
  it('works on relative URLS', function(){
    // just for example of tested value
    var url = '/this/is/the/path.html#HASH2';
	var parsed_url = url.parseURL();
    expect(parsed_url).to.be.an('object');
	expect(parsed_url.protocol).to.be(undefined);
	expect(parsed_url.user).to.be(undefined);
	expect(parsed_url.password).to.be(undefined);
	expect(parsed_url.domain).to.be(undefined);
	expect(parsed_url.port).to.be(undefined);
	expect(parsed_url.path).to.be('/this/is/the/path.html');
	expect(parsed_url.params).to.be.empty();
	expect(parsed_url.hash).to.be('HASH2');
  });
  it('works on file:/// URLS', function(){
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