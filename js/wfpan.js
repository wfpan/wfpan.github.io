document.addEventListener('DOMContentLoaded', function () {
    const ol = document.getElementById("journal-pub-list");
    const btn = document.getElementById("toggle-journal-btn");
	
    const items = ol.querySelectorAll(":scope > li");
	
    items.forEach(li => {
        // 找同时拥有 CCFRank 和 badge 的span
        const rankSpan = li.querySelector(".CCFRank.badge");
        // 判断文字是否包含 CCF A
        const isCCFA = rankSpan && (rankSpan.textContent.trim() === "CCF A");
      //  if (!isCCFA) {
		if (!isCCFA) {
            // 标记这条是非A类，初始隐藏
            li.dataset.nonCcfa = "1";
            li.style.display = "none";
        }
    });

    btn.addEventListener("click", function () {
        ol.classList.toggle("expand");
        const expanded = ol.classList.contains("expand");
        btn.innerText = expanded ? "Show Less..." : "Show More...";

        ol.querySelectorAll(':scope > li[data-non-ccfa="1"]').forEach(li => {
            li.style.display = expanded ? "list-item" : "none";
		//	li.style.display = expanded ? "none": "list-item";
        });
    });
	
	const conferenceol = document.getElementById("conference-pub-list");
	const conferencebtn = document.getElementById("toggle-conference-btn");
	const conferenceitems = conferenceol.querySelectorAll(":scope > li");
	
	conferenceitems.forEach(cli => {
        // 找同时拥有 CCFRank 和 badge 的span
        const rankSpan = cli.querySelector(".CCFRank.badge");
        // 判断文字是否包含 CCF A
        const isCCFA = rankSpan && (rankSpan.textContent.trim() === "CCF A");
      //  if (!isCCFA) {
		if (!isCCFA) {
            // 标记这条是非A类，初始隐藏
            cli.dataset.nonCcfa = "1";
            cli.style.display = "none";
        }
    });	
	
	conferencebtn.addEventListener("click", function () {
        conferenceol.classList.toggle("expand");
        const expanded = conferenceol.classList.contains("expand");
        conferencebtn.innerText = expanded ? "Show Less..." : "Show More...";

        conferenceol.querySelectorAll(':scope > li[data-non-ccfa="1"]').forEach(li => {
            li.style.display = expanded ? "list-item" : "none";
		//	li.style.display = expanded ? "none": "list-item";
        });
    });
});
