import { blogData } from "./blogData.js";

console.log("✅ blogData 載入成功：", blogData.length);

// 渲染最新文章
let newestIssue = blogData.filter((item) => item.isNewest === true);
const newestIssueArea = document.getElementById("newest-issue");
newestIssue.forEach((item) => {
  // 建立文章區塊
  const container = document.createElement("div");
  container.classList.add("flex", "flex-col", "xl:flex-row");
  container.innerHTML = `
    <img src="${item.img}" alt="最新文章附圖" class="max-w-full w-full object-cover xl:w-1/2" />
    <div class="flex flex-col justify-center py-[3rem] px-[1.5rem] xl:w-1/2">
      <time class="block mb-[0.25rem]">${item.publishDate}</time>
      <div class="flex gap-[0.5rem]" data-tags></div>
      <h3 class="font-[700] text-[1.75rem] mb-[0.5rem]">${item.title}</h3>
      <p class="text-[#4B4B4B] mb-[1rem] card-text">${item.intro}</p>
      <div>
        <a href="./blogFullText.html" class="inline-block border border-[black] rounded-[40px] px-[1rem] py-[0.5rem]">閱讀全文</a>
      </div>
    </div>
  `;

  // 塞 tag 資訊
  const articleTags = container.querySelector("[data-tags]");
  item.tag.forEach((tag) => {
    articleTags.innerHTML += `<span class="text-[#0027D5] text-[1.5rem]">${tag}</span>`;
  });

  if (item.isNewest) {
    articleTags.innerHTML += `<span class="font-[700] bg-[#0027D5] py-[0.375rem] px-[0.75rem] text-[white] rounded-[40px]">最新文章</span>`;
  }

  if (item.isHotIsue) {
    articleTags.innerHTML += `<span class="font-[700] bg-[#0027D5] py-[0.375rem] px-[0.75rem] text-[white] rounded-[40px]">人氣文章</span>`;
  }

  newestIssueArea.appendChild(container);
});

function renderList(array) {
  const cardArea = document.getElementById("card-area");
  cardArea.innerHTML = "";
  array.forEach((item) => {
    const card = document.createElement("li");
    card.classList.add("max-w-[100%]");
    card.classList.add("md:max-w-[48%]");
    card.classList.add("xl:max-w-[32%]");
    card.classList.add("single-card");
    card.classList.add("justify-between");
    card.classList.add("mb-[2.5rem]");

    // 塞基本內容
    card.innerHTML = `
              <div>
              <img
                class="mb-[1rem] w-full h-[200px]"
                src="${item.img}"
                alt=""
              />
              <time class="block mb-[0.25rem]">${item.publishDate}</time>
              <div class="flex gap-[0.5rem]" data-tags></div>
              <h3 class="font-[700] text-[1.75rem] mb-[0.5rem]">${item.title}</h3>
              <p class="text-[#4B4B4B] mb-[1rem] card-text">${item.intro}</p>
              </div>
              <div>
                <a href="./blogFullText.html" class="inline-block border border-[black] rounded-[40px] px-[1rem] py-[0.5rem]">閱讀全文</a>
              </div>
      `;

    // 找到剛剛這張卡片裡的 .article-tags
    const articleTags = card.querySelector("[data-tags]");
    item.tag.forEach((tag) => {
      articleTags.innerHTML += `<span class="text-[#0027D5] text-[1.5rem]">${tag}</span>`;
    });

    if (item.isNewest) {
      articleTags.innerHTML += `<span class="font-[700] bg-[#0027D5] py-[0.375rem] px-[0.75rem] text-[white] rounded-[40px]">最新文章</span>`;
    }

    if (item.isHotIsue) {
      articleTags.innerHTML += `<span class="font-[700] bg-[#0027D5] py-[0.375rem] px-[0.75rem] text-[white] rounded-[40px]">人氣文章</span>`;
    }

    cardArea.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let otherIssue = blogData.filter((item) => item.isNewest === false);
  renderList(otherIssue);
});

const inputKeyword = document.getElementById("input-keyword");
inputKeyword.addEventListener("input", function () {
  const keyword = inputKeyword.value.trim();
  if (keyword === "") {
    let otherIssue = blogData.filter((item) => item.isNewest === false);
    renderList(otherIssue);
    return;
  }
  const pattern = new RegExp(keyword, "i");
  const queryIssue = blogData.filter(
    (item) => item.isNewest === false && pattern.test(item.title)
  );
  renderList(queryIssue);
});
