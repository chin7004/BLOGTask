import { blogData } from "./blogData.js";

// console.log("✅ blogData 載入成功：", blogData.length);

  const cardArea = document.getElementById("card-area");
  blogData.forEach((item) => {
    const card = document.createElement("li");
    card.classList.add("max-w-[416px]", "single-card", "justify-between");

    card.innerHTML = `
      <div>
        <img class="mb-[1rem] w-full h-[200px]" src="${item.img}" alt="" />
        <time class="block mb-[0.25rem]">${item.publishDate}</time>
        <div class="flex gap-[0.5rem]" data-tags></div>
        <h3 class="font-[700] text-[1.75rem] mb-[0.5rem]">${item.title}</h3>
        <p class="text-[#4B4B4B] mb-[1rem] card-text">${item.intro}</p>
      </div>
      <div>
        <a href="./blogFullText.html" class="inline-block border border-[black] rounded-[40px] px-[1rem] py-[0.5rem]">閱讀全文</a>
      </div>
    `;

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

document.addEventListener('DOMContentLoaded', function() {
    const singleCard = document.querySelectorAll('.single-card');
    const prevBtn = document.querySelector('[data-prev-btn]');
    const nextBtn = document.querySelector('[data-next-btn]');

    let currentStartIndex = 0;  // 當前顯示卡片的起始索引
    let displayNumber = 0;

    function displayCard() {
        const screenWidth = window.innerWidth;
        
        // 根據螢幕寬度設定顯示的卡片數量
        if (screenWidth >= 1365) {
            displayNumber = 3;
        } else if (screenWidth >= 930) {
            displayNumber = 2;
        } else {
            displayNumber = 1;
        }

        // 計算可顯示卡片的範圍
        const endIndex = currentStartIndex + displayNumber;

        // 顯示卡片範圍
        singleCard.forEach((card, index) => {
            if (index >= currentStartIndex && index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // 按鈕顯示邏輯：如果到達最前或最後一頁，按鈕應該禁用
        // 禁用 prev 按鈕
        prevBtn.disabled = currentStartIndex === 0;

        // 禁用 next 按鈕
        nextBtn.disabled = endIndex >= singleCard.length;
    }

    // 點擊上一頁
    prevBtn.addEventListener('click', function() {
        if (currentStartIndex > 0) {
            currentStartIndex -= 1;
            displayCard();
        }
    });

    // 點擊下一頁
    nextBtn.addEventListener('click', function() {
        if (currentStartIndex + displayNumber < singleCard.length) {
            currentStartIndex += 1;
            displayCard();
        }
    });

    // 初始化顯示卡片
    displayCard();

    // 當視窗大小變動時，重新顯示卡片
    window.addEventListener('resize', displayCard);
});
