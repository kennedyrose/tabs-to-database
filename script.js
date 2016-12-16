!function(w, d, u){"use strict"


	var fs = require('fs'),
		gui = require('nw.gui'),
		win = gui.Window.get(),
		path = require('path')
	

	var filePath = 'database/db.csv'


	var nwDir = path.dirname(process.execPath)
	nwDir = nwDir.split('.app')[0]
	nwDir = nwDir + '.app/Contents/Resources/app.nw'
	console.log(nwDir)


	var tab = /\t/g,
		multTab = /\t\t+/g,
		multRet = /\r\r+/g



	var btn = d.getElementById('parse'),
		textarea = d.getElementById('textarea')

	btn.addEventListener('click', function(){

		var val = textarea.value
		val = val.trim()
		// Replace multiple tabs with just one
		val = val.replace(multTab, '\t')

		// Replace multiple new lines with just one
		val = val.replace(multRet, '\n')



		// If field contains comma or double quote, encase in double quotes
		val = val.split('\n')
		for(var i = val.length; i--;){
			val[i] = val[i].split('\t')
			for(var ii = val[i].length; ii--;){
				if(val[i][ii].indexOf(',') > -1 || val[i][ii].indexOf('"') > -1){
					val[i][ii] = '\"' + val[i][ii] + '\"'
				}
			}
			val[i] = val[i].join(',')
		}
		val = val.join('\n')



		console.log(val)
		
		//fs.unlinkSync(filePath)
		fs.writeFile(filePath, val, function(err) {
			if(err) {
				return console.log(err)
			}
			gui.Shell.openItem(nwDir + '/' + filePath)
		})

	})





	var mb = new gui.Menu({type:"menubar"})

	// Create default mac menus
	if('createMacBuiltin' in mb){
		mb.createMacBuiltin('Tabs to Database', {
			hideEdit: false
		})
	}


	
	win.menu = mb


}(window, document)