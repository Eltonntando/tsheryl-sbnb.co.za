document.querySelectorAll(".post").forEach(post => {
	const postId = post.dataset.postId;
	const ratings = post.querySelectorAll(".post-rating");
	const likeRating = ratings[0];
	
	// Load saved likes/dislikes from local storage
	const savedLikes = JSON.parse(localStorage.getItem(`post_${postId}_likes`)) || 0;
	const savedDislikes = JSON.parse(localStorage.getItem(`post_${postId}_dislikes`)) || 0;
	
	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");
		const count = rating.querySelector(".post-rating-count");
		
		// Set initial counts from saved data
		if (rating === likeRating) {
			count.textContent = savedLikes;
		} else {
			count.textContent = savedDislikes;
		}

		button.addEventListener("click", () => {
			if (rating.classList.contains("post-rating-selected")) {
				return;
			}
			
			const previousCount = Number(count.textContent);
			const newCount = previousCount + 1;
			count.textContent = newCount;

			// Save new counts to local storage
			if (rating === likeRating) {
				localStorage.setItem(`post_${postId}_likes`, JSON.stringify(newCount));
				localStorage.removeItem(`post_${postId}_dislikes`);
			} else {
				localStorage.setItem(`post_${postId}_dislikes`, JSON.stringify(newCount));
				localStorage.removeItem(`post_${postId}_likes`);
			}

			ratings.forEach(rating => {
				if (rating.classList.contains("post-rating-selected")) {
					const count = rating.querySelector(".post-rating-count");
					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("post-rating-selected");
				}
			});

			rating.classList.add("post-rating-selected");
		});
	});
});
