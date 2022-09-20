import { saveFile, openFile, viewFile, toggleMenu } from '../worker/manager.js'

export default function keyBinding(e) {
    // Save
    if ((e.ctrlKey === true || e.metaKey === true) && e.key === 's') {
        e.preventDefault()
        saveFile()
        return
    }

    // Open
    if ((e.ctrlKey === true || e.metaKey === true) && e.key === 'o') {
        e.preventDefault()
        openFile()
        return
    }

    // Open
    if ((e.ctrlKey === true || e.metaKey === true) && e.key === 'm') {
        e.preventDefault()
        viewFile()
        return
    }
    
	if (e.key === 'Escape') {
		e.preventDefault();
		toggleMenu()
	}
}

/*

	// Save As
	if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyS') {
		e.preventDefault();
		commander.saveFileAs();
		return;
	}



	// Close and new
	if ((e.ctrlKey === true || e.metaKey === true) && e.key === 'n') {
		e.preventDefault();
		commander.newFile();
		return;
	}

	// Quit
	if ((e.ctrlKey === true || e.metaKey === true) && (e.key === 'q')) {
		e.preventDefault();
		commander.quit();
		return;
	}
*/
