const fs = require('fs');
const path = require('path');

module.exports = function(app) {
	fs.readdirSync('./routes').forEach(function (file) {
		if (file === path.basename(__filename)) { return; }
		require('./' + file)(app);
	});
};
