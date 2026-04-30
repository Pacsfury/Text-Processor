
const d = document;

const btn_bold = d.getElementById("btn_bold");
const btn_italic = d.getElementById("btn_italic");
const btn_underl = d.getElementById("btn_underl");
const btn_font = d.getElementById("btn_font");
const btn_color = d.getElementById("btn_color");

const inp_font = d.getElementById("inp_font");
const inp_color = d.getElementById("inp_color");

const inp_name = d.getElementById("inp_name");

const btn_home = d.getElementById("btn_home");

// Load content when opened
window.onload = () => {

    const content = localStorage.getItem('currentFileContent');
    if (content) {
        d.querySelector('p[contenteditable="true"]').innerHTML = content;
    }

    inp_name.value = localStorage.getItem('currentFileName').replace(".html", "");

};

// House Button: save ans quit

btn_home.addEventListener("click", async () => {
    // 1. Recuperem el nom antic (el que teníem al carregar)
    const oldFileName = localStorage.getItem('currentFileName');
    // 2. Agafem el nou nom de l'input
    const newFileName = inp_name.value + ".html";
    
    const editor = d.querySelector('p[contenteditable="true"]');
    const contentToSave = editor.innerHTML; 

    const request = indexedDB.open("Docs", 3);
    request.onsuccess = async (e) => {
        const db = e.target.result;
        const getHandle = db.transaction("handles").objectStore("handles").get("root");

        getHandle.onsuccess = async () => {
            const rootHandle = getHandle.result;
            if (rootHandle) {
                try {
                    if (await rootHandle.requestPermission({mode: 'readwrite'}) === 'granted') {
                        
                        // If name changed, delete the old one
                        if (oldFileName && oldFileName !== newFileName) {
                            try {
                                await rootHandle.removeEntry(oldFileName);
                                console.log("Old file deleted");
                            } catch (e) {
                                console.log("Nohing changed");
                            }
                        }

                        // Save file
                        const fileHandle = await rootHandle.getFileHandle(newFileName, { create: true });
                        const writable = await fileHandle.createWritable();
                        await writable.write(new Blob([contentToSave], { type: 'text/html;charset=utf-8' }));
                        await writable.close();
                        
                        // Update localstorage
                        localStorage.setItem('currentFileName', newFileName);
                        
                        window.location.href = "index.html";
                    }
                } catch (err) {
                    console.error("Error al guardar/renombrar:", err);
                    window.location.href = "index.html";
                }
            } else {
                window.location.href = "index.html";
            }
        };
    };
});

// Formats
btn_bold.addEventListener("click", () => aplicateFormat('bold'));
btn_italic.addEventListener("click", () => aplicateFormat('italic'));
btn_underl.addEventListener("click", () => aplicateFormat('underline'));
btn_font.addEventListener("click", () => aplicateFormat('fontName', inp_font.value ));
btn_color.addEventListener("click", () => aplicateFormat('foreColor', inp_color.value ));

function aplicateFormat(format, extra) {
    if (!extra) {
        document.execCommand(format, false, null);
    } else {
        document.execCommand(format, false, extra);
    }
}

// Update viuals of buttons
function updateButtonStates() {
    // Controlled formats
    const formats = [
        { name: 'bold', btn: btn_bold },
        { name: 'italic', btn: btn_italic },
        { name: 'underline', btn: btn_underl }
    ];

    formats.forEach(f => {
        // document.queryCommandState returns true if format activated
        if (document.queryCommandState(f.name)) {
            f.btn.classList.add('active');
        } else {
            f.btn.classList.remove('active');
        }
    });
}

const editor = d.querySelector('p[contenteditable="true"]');
editor.addEventListener('keyup', updateButtonStates);
editor.addEventListener('mouseup', updateButtonStates);

function aplicateFormat(format, extra) {
    if (!extra) {
        document.execCommand(format, false, null);
    } else {
        document.execCommand(format, false, extra);
    }
    updateButtonStates();
}
