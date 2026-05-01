# Text Processor
A lightweight, browser-based HTML text editor that lets you create and manage documents directly in your file system using the File System Access API. Your documents are stored locally on your computer—no cloud uploads, no servers, just pure local editing.

## ✨ Features

- **📝 Full-Featured Editor**
  - Rich text formatting: **Bold**, *Italic*, <u>Underline</u>
  - Custom font selection from your system fonts
  - Hex color customization for text
  - Real-time formatting toolbar feedback

- **📁 Document Management**
  - Create new documents with a simple dialog
  - Browse and open documents from your selected folder
  - Rename documents on the fly
  - Auto-save functionality on exit

- **💾 Local Storage**
  - Uses your device's file system (File System Access API)
  - No data sent to the cloud
  - Direct access to your documents folder
  - IndexedDB for storing folder permissions

- **🎨 Clean, Intuitive UI**
  - Green-themed modern interface
  - Responsive grid layout for document browsing
  - Button state indicators for active formatting
  - Smooth animations and transitions

## 🚀 Quick Start

### Using the App

1. **Open** `index.html` in your web browser
2. **Select Folder** - Click the "Select Folder" button to choose where your documents will be stored
3. **Create Document** - Click "New Document" and enter a name
4. **Edit** - Use the toolbar to format your text with bold, italic, underline, fonts, and colors
5. **Save** - Click the home button to save your changes and return to the menu

### Requirements

- Modern browser with File System Access API support (Chrome, Edge, Brave)
- Local file system access permissions

## 📂 Project Structure

```
Text-Processor/
├── index.html        # Document menu/dashboard
├── editor.html       # Text editor interface
├── menu.js          # Menu and document management logic
├── script.js        # Editor functionality and formatting
├── style.css        # Styling for both pages
├── img/             # Icons and assets
└── README.md        # This file
```

## 🛠️ Technology Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling and animations
- **JavaScript (Vanilla)** - Editor logic and document management
- **File System Access API** - Local file interaction
- **IndexedDB** - Permission storage

## 💡 How It Works

### Document Creation
1. User selects a folder using the File System Access API
2. The folder handle is stored in IndexedDB for future access
3. New documents are created as HTML files in the selected folder
4. Document list is populated by reading files from the folder

### Editing
1. Document content is loaded from the file system into localStorage
2. User edits the HTML content using `contenteditable`
3. `document.execCommand()` (even if deprecated), applies formatting
4. On save, content is written back to the file system

### Storage
- **Files**: Stored in user's selected folder on disk
- **Permissions**: Cached in IndexedDB to avoid repeated permission requests
- **Session**: Current file info kept in localStorage during editing

## 🎯 Features in Detail

### Text Formatting
- **Bold** - Apply bold formatting (Ctrl+B compatible)
- **Italic** - Apply italic formatting (Ctrl+I compatible)
- **Underline** - Apply underline formatting (Ctrl+U compatible)
- **Font** - Select from installed system fonts
- **Color** - Enter hex color codes (e.g., #FF5733)

### Document Management
- **Grid View** - Visual browsing of all documents with emoji icons
- **Rename on Save** - Change document names without creating duplicates
- **Auto-load** - Documents automatically load their content on open
- **Persistent Storage** - Folder selection persists across browser sessions

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Chromium | ✅ Full |
| Edge | ✅ Full |
| Brave | ✅ Full |
| Firefox | ⚠️ Partial (File System API not fully supported) |
| Safari | ❌ Not supported |

## 📝 Notes & Limitations

- The app uses the **File System Access API**, which is relatively new. Not all browsers support it yet.
- Documents are stored as **HTML files**, which means they preserve formatting but may have some browser-specific differences when opened in other editors.
- The editor uses `contenteditable` and `document.execCommand()`, which are functional but being phased out in favor of modern APIs.
- For best results, keep your document folder organized and avoid moving it while the app is running.

## 🔄 Future Improvements

- [ ] Export to PDF/DOCX formats
- [X] Dark mode theme
- [ ] Keyboard shortcuts reference
- [ ] Undo/Redo history
- [ ] Search and replace
- [ ] Document templates
- [ ] Collaborative editing support
- [ ] Version history/backups

## 💬 Feedback

This is a learning project! If you have suggestions or find bugs, please open an issue or reach out. All feedback is appreciated!

## 📄 License

This project is open source and available under the Apache 2.0 License.

---

**Made with ❤️ for learning and testing**
