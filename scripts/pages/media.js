class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.like = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
}

class MediaImage extends Media {
  constructor(data) {
    super(data);
    this.type = "image";
    this.url = `assets/images/${data.photographerId}/${data.image}`;
  }

  createImageMedia() {
    const mediaImage = document.createElement("img");
    mediaImage.setAttribute("src", this.url);
    mediaImage.setAttribute("alt", this.title);
    return mediaImage;
  }
}

class MediaVideo extends Media {
  constructor(data) {
    super(data);
    this.type = "video";
    this.url = `assets/images/${data.photographerId}/${data.video}`;
  }

  createVideoMedia() {
    const mediaVideo = document.createElement("video");
    mediaVideo.setAttribute("controls", "");
    const sourceVideo = document.createElement("source");
    sourceVideo.setAttribute("src", this.url);
    sourceVideo.setAttribute("type", "video/mp4");
    mediaVideo.appendChild(sourceVideo);
    return mediaVideo;
  }
}

export function createMedia(data) {
  if (data.image) {
    return new MediaImage();
  } else if (data.video) {
    return new MediaVideo();
  } else {
    throw new Error("Invalid media data");
  }
}
