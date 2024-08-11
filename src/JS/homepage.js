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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHb-kCVOHahc9o2mcEP63zUU5Ee9ZZgbk",
    authDomain: "login-bst-3e753.firebaseapp.com",
    projectId: "login-bst-3e753",
    storageBucket: "login-bst-3e753.appspot.com",
    messagingSenderId: "31952567986",
    appId: "1:31952567986:web:6f4e8ed05be410fad5d3ab"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        document.getElementById('loggedUserFName').innerText = userData.firstName;
                        document.getElementById('loggedUserEmail').innerText = userData.email;
                        document.getElementById('loggedUserLName').innerText = userData.lastName;
                    } else {
                        console.log("No document found matching ID");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        } else {
            console.log("User ID not found in local storage");
        }
    } else {
        window.location.href = 'index.html';
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    console.log('Logout button clicked'); // Cek apakah tombol diklik
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            console.log('User signed out'); // Cek apakah pengguna berhasil sign out
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error); // Tampilkan error di konsol jika sign out gagal
        });
});

