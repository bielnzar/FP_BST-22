document.addEventListener('DOMContentLoaded', () => {
    const noteTitleInput = document.getElementById('note-title');
    const noteInput = document.getElementById('note-input');
    const saveNoteButton = document.getElementById('save-note');
    const notesContainer = document.getElementById('notes');
    const searchInput = document.getElementById('search-input');
    const modal = document.getElementById('note-modal');
    const modalContent = document.getElementById('modal-note-content');
    const closeModalButton = document.querySelector('.close-btn');

    function addNote(title, content) {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');

        const contentWithLineBreaks = content.replace(/\n/g, '<br>');

        noteItem.innerHTML = `
            <h3>${title}</h3>
            <p>${contentWithLineBreaks.substring(0, 100)}...</p>
            <button class="delete-note">Delete</button>
        `;

        noteItem.addEventListener('click', () => {
            modalContent.innerHTML = `<h3>${title}</h3><p>${contentWithLineBreaks}</p>`;
            modal.style.display = 'block';
        });

        noteItem.querySelector('.delete-note').addEventListener('click', (e) => {
            e.stopPropagation(); 
            notesContainer.removeChild(noteItem);
        });

        notesContainer.appendChild(noteItem);
    }

    saveNoteButton.addEventListener('click', () => {
        const title = noteTitleInput.value.trim();
        const content = noteInput.value.trim();
        if (title && content) {
            addNote(title, content);
            noteTitleInput.value = '';
            noteInput.value = '';
        }
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const notes = document.querySelectorAll('.note-item');

        notes.forEach(note => {
            const title = note.querySelector('h3').innerText.toLowerCase();
            if (title.includes(searchTerm)) {
                note.style.display = '';
            } else {
                note.style.display = 'none';
            }
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});
