const grid = document.getElementById("grid");
const btnOpen = document.getElementById("btn_open_folder");
const btnNew = document.getElementById("btn_new_doc");

let directoryHandle = null;

window.onload = async () => {
    const request = indexedDB.open("Docs", 3);
    request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("handles")) db.createObjectStore("handles");
    };
    request.onsuccess = (e) => {
        const db = e.target.result;
        const getHandle = db.transaction("handles").objectStore("handles").get("root");
        getHandle.onsuccess = async () => {
            if (getHandle.result) {
                directoryHandle = getHandle.result;
                if (await directoryHandle.queryPermission() === 'granted' || 
                    await directoryHandle.requestPermission() === 'granted') {
                    await refreshFileList();
                }
            }
        };
    };
};

btnOpen.addEventListener("click", async () => {
    try {
        directoryHandle = await window.showDirectoryPicker();
        await storeFolder(directoryHandle); 
        await refreshFileList();
    } catch (err) {
        console.error("Error:", err);
    }
});

// Create new document
btnNew.addEventListener("click", async () => {
    if (!directoryHandle) {
        alert("Select a folder!");
        return;
    }
    const docName = prompt("New Document Name:");
    if (!docName) return; 

    try {
        const fileName = docName.endsWith('.html') ? docName : `${docName}.html`;
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        
        const initialHTML = `<!DOCTYPE html><html lang="ca"><head><meta charset="UTF-8"></head><body><p>Comença a escriure...</p></body></html>`;
        await writable.write(new Blob([initialHTML], { type: 'text/html;charset=utf-8' }));
        await writable.close();

        await storeFolder(directoryHandle); 
        await refreshFileList();
    } catch (err) {
        console.error("Error al crear:", err);
    }
});

async function refreshFileList() {
    grid.innerHTML = "";
    for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.html')) {
            const card = document.createElement("button");
            card.className = "card";
            card.innerHTML = `<div class="icon">📄</div><span>${entry.name.replace('.html', '')}</span>`;
            
            card.onclick = async () => {
                const file = await entry.getFile();
                const content = await file.text();
                localStorage.setItem('currentFileName', entry.name);
                localStorage.setItem('currentFileContent', content);
                window.location.href = `editor.html`;
            };
            grid.appendChild(card);
        }
    }
}

async function storeFolder(handle) {
    const request = indexedDB.open("Docs", 3);
    request.onsuccess = (e) => {
        const db = e.target.result;
        db.transaction("handles", "readwrite").objectStore("handles").put(handle, "root");
    };
}