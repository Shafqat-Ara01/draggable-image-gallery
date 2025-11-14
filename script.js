const images = [
  {
    id: 1,
    category: "nature",
    img: "https://c4.wallpaperflare.com/wallpaper/796/497/130/landscapes-naturee-seasons-sun-wallpaper-preview.jpg",
  },
  {
    id: 2,
    category: "city",
    img: "https://i.natgeofe.com/n/838dbb82-a2b5-4675-a7c6-ff80b0a1f651/future-cities-shanghai-yanan-expressway.jpg",
  },
  {
    id: 3,
    category: "city",
    img: "https://i.pinimg.com/736x/12/83/c2/1283c2adb0a783b1ff61fd9377495674.jpg",
  },
  {
    id: 4,
    category: "nature",
    img: "https://i.pinimg.com/236x/74/55/2d/74552d9cbee53b65f7a2de7dc8951e8e.jpg",
  },
  {
    id: 5,
    category: "animal",
    img: "https://cdn.britannica.com/94/494-050-A674AD3A/Fallow-deer-dama-dama.jpg",
  },
  {
    id: 6,
    category: "city",
    img: "https://img.freepik.com/free-photo/high-angle-shot-beautiful-cityscape-sunset-new-york-city-usa_181624-42898.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: 7,
    category: "animal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZl1B-iS1VDit60FPpERihwXW2prvm_JKDAg&s",
  },
  {
    id: 8,
    category: "city",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSap8N1i_tr7MtnmproFRxbpCclb44-ICk1788E_8cbDVIbeQANBm88-qNgk6dBFKOl24U&usqp=CAU",
  },
  {
    id: 9,
    category: "animal",
    img: "https://cdn.britannica.com/07/5207-050-5BC9F251/Gray-wolf.jpg",
  },
  {
    id: 10,
    category: "nature",
    img: "https://i.pinimg.com/736x/f1/92/f8/f192f8a80a253da218c1dd24aa2d8101.jpg",
  },
];

const gallery = document.querySelector(".gallery");
const filterBtn = document.querySelectorAll(".filter-btn");
let dragStartId = null;
let dragOverId = null;

function renderImages(imageArray) {
  gallery.innerHTML = "";

  imageArray.forEach((image) => {
    const div = document.createElement("div");
    div.setAttribute("draggable", true);
    div.dataset.id = image.id;

    const picture = document.createElement("img");
    picture.src = image.img;

    div.append(picture);
    gallery.append(div);

    // DRAG EVENTS
    div.addEventListener("dragstart", () => {
      dragStartId = div.dataset.id;
      div.style.opacity = "0.5";
    });

    div.addEventListener("dragend", () => {
      dragStartId = null;
      div.style.opacity = "1";
    });

    div.addEventListener("dragover", (e) => {
      e.preventDefault();
      dragOverId = div.dataset.id;
    });

    div.addEventListener("drop", (e) => {
      e.preventDefault();

      // Swap in original images array
      const index1 = images.findIndex((img) => img.id == dragStartId);
      const index2 = images.findIndex((img) => img.id == dragOverId);

      [images[index1], images[index2]] = [images[index2], images[index1]];

      // Re-render filtered images
      const filterCategory =
        document.querySelector(".filter-btn.active").dataset.filter;
      const filteredImages = images.filter(
        (img) => filterCategory === "all" || img.category === filterCategory
      );
      renderImages(filteredImages);
    });
  });
}

renderImages(images);

filterBtn.forEach((button) => {
  button.addEventListener("click", () => {
    filterBtn.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    const filterCategory = button.dataset.filter;

    const filtered = images.filter((img) => {
      return filterCategory === "all" || filterCategory === img.category;
    });

    renderImages(filtered);
  });
});
