const shareBtn = document.querySelector('.share-btn');
const shareOption = document.querySelector('.share-option');

shareBtn.addEventListener('click', () => {
	shareOption.classList.toggle('active');
})