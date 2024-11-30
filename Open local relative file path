async function OpenLocalPath(event) {
    // Check if the event was a Ctrl+double click.
    if (event.ctrlKey) {
        var path = event.target.innerText;
        console.log(`>> ctrl + double_click get line content:\n${path}`)
        //------ Check if the text content contain a file path.   ------
        if (path.startsWith('./')) {
            const basePath = 'C:\\Users\\you\\trilium\\assets';
            // Remove the './' from the start of the path
            let relativePath = path.substring(2);
            // Combine the base path with the relative path
            let fullPath = `${basePath}\\${relativePath}`;
            console.log(`>> Open local path: ${fullPath}`)
            // Use the PathLinkerApi to open the file at the path.
            await document.PathLinkerApi.runAsyncOnBackendWithManualTransactionHandling(async (fullPath) => { 
                const { shell } = await import('electron'); // Dynamically import
                await shell.openPath(fullPath);
                return;
            }, [fullPath]);
        }
    }
}
