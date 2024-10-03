function timeString(time) {
  // get hour and rest second
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const min = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${min} min ${remainingSecond} sec ago`;
}

const removeActiveClasses = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
    // btn.classList.remove("bg-red-500", "text-white");
  }
  console.log(buttons);
};
//1.show catagories load and show on html

// create load catagories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
  // .catch((error) => console.log(error));
};

// load videos
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
  // .then((data) => console.log(data));
  // .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove all class when button active
      removeActiveClasses();
      // id class is should be active
      const activeBtn = document.getElementById(`btn-${id}`);
      // console.log(activeBtn);
      activeBtn.classList.add("active");
      // activeBtn.classList.add("bg-red-500", "text-white");
      displayVideos(data.category);
    });
};

const loadDetails = async (videoId) => {
  console.log(videoId);

  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetail(data.video);
};
const displayDetail = (video) => {
  const detailContainer = document.getElementById("modal-content");

  // way 1
  // document.getElementById("showModalData").click();

  // way 2
  document.getElementById("customModal").showModal();
  detailContainer.innerHTML = `
  <img class="mb-5 w-full" src="${video.thumbnail}"/>
  <p>${video.description}<p/>
  `;
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
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="mt-32 min-h-[300px] flex items-center justify-center flex-col">
            <div class="mb-8">
                <img src="asset/Icon.png" alt="">
            </div>
            <h1 class="font-bold text-3xl text-center">
                Oops!! Sorry, There is no<br>
                content here.
            </h1>

        </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    // console.log(video);
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
     <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}/>

      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute bg-black text-white rounded p-1 text-xs bottom-2 right-2">
          ${timeString(video.others.posted_date)}
      </span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-4">
    <div class="">
      <img class="h-10 w-10 rounded-full object-cover" src=${
        video.authors[0].profile_picture
      } alt="">
    </div>

    <div>
      <h2 class="font-bold mb-2">${video.title}</h2>
      <div class="flex gap-2 items-center mb-2">
        <div>
          <p class="text-gray-500">${video.authors[0].profile_name} </p>
        </div>
          <div class="h-5 w-5">
          ${
            video.authors[0].verified == true
              ? '<img class="w-full object-cover" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">'
              : ""
          }

          </div>
        </div>
        <p>
          ${video.others.views} views
        </p>
      
    </div>
    
  </div>

  <div>
    <p>
        <button class="btn btn-sm active text-white" onclick="loadDetails('${
          video.video_id
        }')">Details</button>
    </p>
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
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${items.category_id}" onclick=loadCategoryVideos(${items.category_id}) class="btn category-btn">
        ${items.category}
      </button>
    `;

    categoriesContainer.append(buttonContainer);
  });
};
document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});
loadCategories();
loadVideos();
