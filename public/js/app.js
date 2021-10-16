const likeButtons = document.querySelectorAll(".likeButton");
for (const btn of likeButtons) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = await getUser();
    await axios.post(btn.href, { userId: user._id });
    btn.classList.toggle("liked");
  });
}

async function getUser() {
  const { data } = await axios.get("/api/user_data");
  return data.user;
}
