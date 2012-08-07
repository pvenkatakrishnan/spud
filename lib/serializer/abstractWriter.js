'use strict';

var util = require('util'),
	Stream = require('stream');


function AbstractWriter(data) {
	AbstractWriter.super_.call(this);
	this._data = data;
	this._chunks = [];
	this._chunkLength = 0;
}

/*global exports:true*/
exports = module.exports = AbstractWriter;
util.inherits(AbstractWriter, Stream);
/*global exports:false*/

var proto = AbstractWriter.prototype;

proto.__defineSetter__('data', function (value) {
	this._data = value;
});

/**
 * Builder method to generate Readable Stream which emits serialized data
 * @return {Stream} a Read Stream
 */
proto.createReadStream = function () {
	var stream = this._doCreateReadStream(this._data);
	process.nextTick(stream.resume.bind(stream));
	return stream;
};

/**
 * Abstract method for implementors to use in defining their Read Strems
 * @param  {Object} data the data to be serialized
 * @return {Stream}      the Read Stream which will emit the serialized data
 */
proto._doCreateReadStream = function (data) {
	throw new Error('Not implemented.');
};