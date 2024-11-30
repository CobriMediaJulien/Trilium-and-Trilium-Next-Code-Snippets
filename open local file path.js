// Readme: 
// Create one JavaScript front-type code note in your Trilium, 
// and add the #widget attribute to it.

async function OpenLocalPath(event) {
    // Check if the event was a Ctrl+double click.
    if (event.ctrlKey) {
        const path = event.target.innerText;
        console.log(`>> ctrl + double_click get line content:\n${path}`);
        
        // Check if the text content contains a file path.
        if (/[A-Z]:\\.*/.test(path)) {
            const matchedPath = path.match(/[A-Z]:\\.*/)[0];
            console.log(`>> Open local path: ${matchedPath}`);
            
            // Use the PathLinkerApi to open the file at the path.
            await document.PathLinkerApi.runAsyncOnBackendWithManualTransactionHandling(async (path) => {
                const { shell } = await import('electron'); // Dynamically import
                await shell.openPath(path);
            }, [matchedPath]);
        }
    }
}

const TEMPLATE = `
    <div style="padding: 10px; border-top: 1px solid var(--main-border-color); contain: none;">
    <script>
    ${OpenLocalPath.toString()}
    document.addEventListener('dblclick', OpenLocalPath);
    </script>
    </div>`;

class PathLinkerWidget extends api.NoteContextAwareWidget {
    constructor(...args) {
        super(...args);
        this.balloonEditorCreate = null;
    }

    get position() {
        // Higher value means position towards the bottom/right
        return 100;
    }

    get parentWidget() {
        return 'center-pane';
    }

    doRender() {
        this.$widget = $(TEMPLATE);
        this.$widget.hide();

        // Store API in document to access it from callback
        document.PathLinkerApi = api;
        return this.$widget;
    }
}

// Export the widget for Trilium to use
const widget = new PathLinkerWidget();
console.log(">> Loaded PathLinkerWidget");
module.exports = widget
