//Creates ana require context in the components directory
//Then loades all .html files (in this case they are tag files) 
//It finds in the subtree under that root

requireFiles( require.context(".", true, /^\.\/.*\.html$/) );

function requireFiles(context) { 
	//Do the include
	context.keys().forEach(context); 

	if (__DEV__) {
		console.info('Loading Riot components from \'./components\'');
		console.group();
		context.keys().forEach(v=>{console.info(v)});
		console.groupEnd();
	}
}