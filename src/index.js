import loadImage from "blueimp-load-image";

document
  .querySelector("input[type='file']")
  .addEventListener("change", async function () {
    const resizedImage = await loadImage(this.files[0], {
      // resize before sending to PhotoRoom for performance
      maxWidth: 1500,
      maxHeight: 1500,
      canvas: true
    });

    resizedImage.image.toBlob(async function (inputBlob) {
      const formData = new FormData();
      formData.append("image_file", inputBlob);

      const response = await fetch("https://sdk.photoroom.com/v1/segment", {
        method: "POST",
        headers: {
          "x-api-key": "f2413a471e1eb8b978f2aadcee894ad435e87b41"
        },
        body: formData
      });

      // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api#example_fetching_images
      const outputBlob = await response.blob();
      const outputImage = document.createElement("img");
      document.querySelector("#remove-result").appendChild(outputImage);
      outputImage.style.width = "50%";
      outputImage.src = URL.createObjectURL(outputBlob);
    });
  });
  