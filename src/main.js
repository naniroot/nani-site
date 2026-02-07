import './style.css'

console.log('Fun site loaded! 🚀');

// Add a little easter egg or interaction later if needed

// Handle card tilt reset when hovering photo (robust fix)
const photoContainer = document.querySelector('.photo-container');
const profileCard = document.querySelector('.profile-card');

if (photoContainer && profileCard) {
    photoContainer.addEventListener('mouseenter', () => {
        profileCard.classList.add('reset-tilt');
    });

    photoContainer.addEventListener('mouseleave', () => {
        profileCard.classList.remove('reset-tilt');
    });
}
