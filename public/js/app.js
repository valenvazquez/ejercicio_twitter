// ---------- LIKE BUTTONS EVENTS ---------- //
const likeButtons = document.getElementsByClassName("btn-like");
for (const btn of likeButtons) {
  btn.addEventListener("click", likeDislike);
}

async function likeDislike(e) {
  e.preventDefault();
  e.stopPropagation();
  const likesCount = this.querySelector(".likes-count") || document.querySelector("#likes-count");
  if (this.classList.contains("liked")) {
    likesCount ? likesCount.innerHTML-- : null;
    this.classList.toggle("liked");
    await axios.delete(this.href);
  } else {
    likesCount ? likesCount.innerHTML++ : null;
    this.classList.toggle("liked");
    await axios.post(this.href);
  }
}

// ---------- TWEET BUTTON EVENTS -------------- //
const tweetButtonModal = document.querySelector("#tweet-post-modal");
const tweetButton = document.querySelector("#tweet-post");
const tweetContent = document.querySelector("#new-tweet-content");
const tweetContentModal = document.querySelector("#new-tweet-content-modal");
const tweetSection = document.querySelector("#tweets-section");

if (tweetContent) {
  tweetContent.addEventListener("input", function (e) {
    if (this.innerText.length > 0) {
      tweetButton.disabled = false;
    } else {
      tweetButton.disabled = true;
    }
  });
}

if (tweetContentModal) {
  tweetContentModal.addEventListener("input", function (e) {
    if (this.innerText.length > 0) {
      tweetButtonModal.disabled = false;
    } else {
      tweetButtonModal.disabled = true;
    }
  });
}

if (tweetButton) tweetButton.addEventListener("click", postTweet(tweetContent));

if (tweetButtonModal) tweetButtonModal.addEventListener("click", postTweet(tweetContentModal));

function postTweet(content) {
  return async function (e) {
    e.stopPropagation();
    e.preventDefault();
    const { data } = await axios.post("/tweet", { content: content.innerText });
    console.log(data);
    addNewTweet(data);
  };
}

function addNewTweet(tweet) {
  const newTweet = document.createElement("article");
  newTweet.classList.add("tweet", "p-3", "d-flex", "border-bottom", "newTweet");
  newTweet.innerHTML = `
  <div class="me-3 flex-shrink-0">
    <img src="${tweet.user.profile}" alt="No avatar image" class="img-fluid user-image" />
  </div>
  <div class="flex-fill">
    <div class="d-flex justify-content-between align-items-center mb-1">
      <h3 class="fs-7 fw-bold m-0">
        ${tweet.user.firstname + " " + tweet.user.lastname}<span
          class="fw-normal text-secondary ms-1"
          >@${tweet.user.username} &middot; 1m</span
        >
      </h3>
      <a
        href="#"
        class="btn-soft rounded-circle d-inline-flex justify-content-center align-items-center p-1"
      >
        <svg viewBox="0 0 24 24">
          <g>
            <circle cx="5" cy="12" r="2"></circle>
            <circle cx="12" cy="12" r="2"></circle>
            <circle cx="19" cy="12" r="2"></circle>
          </g>
        </svg>
      </a>
    </div>
    <p class="fs-7">${tweet.content}</p>
    <!-- <div class="border rounded-4">
      <img src="/img/bob_marley.jpg" alt="" class="rounded-4 img-fluid w-100" />
    </div> -->
    <div class="d-flex align-items-center justify-content-between tweet-actions">
      <!-- COMMENT -->
      <a href="#" class="btn-soft d-inline-flex align-items-center fs-7"
        ><div
          class="rounded-circle p-2 d-inline-flex justify-content-center align-items-center me-lg-1"
        >
          <svg viewBox="0 0 24 24">
            <g>
              <path
                d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
              ></path>
            </g>
          </svg>
        </div>
        <span>0</span></a
      >
      <!-- RETWEET -->
      <a href="#" class="btn-retweet d-inline-flex align-items-center fs-7"
        ><div
          class="rounded-circle p-2 d-inline-flex justify-content-center align-items-center me-lg-1"
        >
          <svg viewBox="0 0 24 24">
            <g>
              <path
                d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
              ></path>
            </g>
          </svg>
        </div>
        <span>0</span></a
      >
      <!-- LIKES -->
      <a
        class="
          btn-like
          d-inline-flex
          align-items-center
          fs-7
          <%=
          tweet.likes.includes(user.id) ? "liked" : null
         }
        "
        href="/tweet/like/${tweet._id}"
        ><div
          class="rounded-circle p-2 d-inline-flex justify-content-center align-items-center me-lg-1"
        >
          <svg viewBox="0 0 24 24">
            <g>
              <path
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"
              ></path>
            </g>
          </svg>
        </div>
        <span>${tweet.likes.length}</span></a
      >
      <!-- SHARE -->
      <a href="#" class="btn-soft d-inline-flex align-items-center fs-7"
        ><div
          class="rounded-circle p-2 d-inline-flex justify-content-center align-items-center me-lg-1"
        >
          <svg viewBox="0 0 24 24">
            <g>
              <path
                d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"
              ></path>
              <path
                d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"
              ></path>
            </g>
          </svg>
        </div>
        <span>0</span></a
      >
    </div>
  </div>
  `;
  tweetSection.prepend(newTweet);
  likeButtons[0].addEventListener("click", likeDislike);
  tweetContent ? (tweetContent.innerText = "") : null;
  tweetContentModal ? (tweetContentModal.innerText = "") : null;
}

// -------------------- FOLLOW / UNFOLLOW ------------------------ //
const followBtn = document.querySelectorAll(".follow");
const unfollowBtn = document.querySelectorAll(".unfollow");

if (followBtn) {
  followBtn.forEach((btn, i) => {
    btn.addEventListener("click", async function (e) {
      e.stopPropagation();
      e.preventDefault();
      btn.classList.add("d-none");
      unfollowBtn[i].classList.remove("d-none");
      const user = await axios.post(btn.href);
      try {
        document.querySelector("#following-count").innerHTML++;
      } catch (error) {
        console.log(error);
      }
    });
  });
}

if (unfollowBtn) {
  unfollowBtn.forEach((btn, i) => {
    btn.addEventListener("click", async function (e) {
      e.stopPropagation();
      e.preventDefault();
      btn.classList.add("d-none");
      followBtn[i].classList.remove("d-none");
      const user = await axios.delete(btn.href);
      try {
        document.querySelector("#following-count").innerHTML--;
      } catch (error) {
        console.log(error);
      }
    });
  });
}
