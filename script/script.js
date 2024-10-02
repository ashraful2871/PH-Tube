//1. show catagories load and show on html

// create load catagories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// load videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
  // .then((data) => console.log(data));
  // .catch((error) => console.log(error));
};

const cardDemo = {
  category_id: "1001",
  video_id: "aaaa",
  thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
  title: "Shape of You",
  authors: [
    {
      profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
      profile_name: "Olivia Mitchell",
      verified: "",
    },
  ],
  others: {
    views: "100K",
    posted_date: "16278",
  },
  description:
    "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
};

// display videos
const displayVideos = (videos) => {
  //   console.log(videos);
  // show videos in HTML
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    // console.log(video);
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
     <figure>
    <img
      src="${video.thumbnail}"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;
    videoContainer.append(div);
  });
};

// {
// "category_id": "1001",
// "category": "Music"
// }

// display catagories
const displayCategories = (categories) => {
  // show data in html
  const categoriesContainer = document.getElementById("btn-container");
  categories.forEach((items) => {
    //create button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = items.category;

    categoriesContainer.append(button);
  });
};

loadCategories();
loadVideos();
