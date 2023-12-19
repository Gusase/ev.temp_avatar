/**
 * Loading module from “http://127.0.0.1:3000/js/minidenticons” was blocked because of a disallowed MIME type (“text/html”) idk why
 */
// import { minidenticon } from "./minidenticons";

import { minidenticon } from "https://cdn.jsdelivr.net/npm/minidenticons@4.2.0/minidenticons.min.js";

const avatar = document.querySelector("#target-img");
const avtSrc = avatar.src;
const usernameInput = document.querySelector("#username");
const usernameLabel = document.querySelector(".username-label");
const svgWrapper = document.querySelector(".svg-wrapper");
const svgEl = document.querySelectorAll(".svg"); //why new insertd elemnt not iteratd

svgEl.forEach((svg) => {
  svg.addEventListener("click", () => {
    // console.info(svg.innerHTML);

    usernameLabel.textContent = svg.getAttribute("username");
    usernameInput.value = svg.getAttribute("username");

    // console.log(svg);

    const svx = svg.childNodes[0];

    // console.log(svx);
    // console.log(input);

    setImageFromSvg(svg, svx);
  });
});

// for (const svg of svgEl) {
//   // console.log(svg.getAttribute("username"));

//   svg.addEventListener("click", () => {
//     // console.info(svg.innerHTML);
//     usernameLabel.textContent = svg.getAttribute("username");

//     // console.log(svg);

//     const svx = svg.childNodes[0];

//     // console.log(svx);
//     // console.log(input);

//     setImageFromSvg(svg, svx);
//   });
// }

function setImageFromSvg(targetSvgWrap, targetSvg) {
  const svgData = new XMLSerializer().serializeToString(targetSvg);
  const blob = new Blob([svgData], { type: "image/svg+xml" });
  const svgDataUrl = URL.createObjectURL(blob);

  // const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)));
  // const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`;

  // console.log(svgData);
  // console.log(encodeURIComponent(svgData));
  // console.log(unescape(encodeURIComponent(svgData)));
  // console.log(btoa(unescape(encodeURIComponent(svgData))));

  const img = new Image();

  img.addEventListener("load", () => {
    const w = targetSvgWrap.getAttribute("data-size");
    const h = targetSvgWrap.getAttribute("data-size");
    const canvas = document.createElement("canvas");

    // console.info(`Image Load: ${w} , ${h}`);

    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, parseInt(w, 10), parseInt(h, 10));

    const dataUrl = canvas.toDataURL();

    // console.log(canvas);
    // console.log(dataUrl);

    /**
     * https://gist.github.com/tatsuyasusukida/1261585e3422da5645a1cbb9cf8813d6#file-main-js-L30
     */
    // avatar.src = dataUrl;
  });

  img.src = svgDataUrl;
  avatar.src = img.src;
}

username.addEventListener("input", () => {
  usernameLabel.textContent = username.value;

  if (username.value !== "") {
    svgWrapper.insertAdjacentHTML(
      "afterbegin",
      `<minidenticon-svg username="${username.value}" saturation="100" lightness="50" title="see console..." class="w-10 h-10 rounded-full inline-block m-2 p-1 bg-gray-800 cursor-pointer svg" onclick="name(this)"></minidenticon-svg>`
    );

    const svzg = document.querySelectorAll(".svg")[0];
    const svzx = svzg.childNodes[0];

    setImageFromSvg(svzg, svzx);
  } else {
    avatar.src = avtSrc;
  }
});
