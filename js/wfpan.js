function renderEmail() {
    const user = "wfpan";      // 修改为你的邮箱用户名
    const domain = "zjgsu.edu.cn";  // 修改域名
    const email = user + "@" + domain;
    const el = document.getElementById("my-email");
    if(el) {
        el.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    }
}

function copyBibTex(event) {
    const btn = event.currentTarget; // 获取当前点击的按钮
    const bibText = btn.getAttribute('data-bibtex');
    const originalText = btn.innerText;

    navigator.clipboard.writeText(bibText).then(() => {
        // 复制成功：添加 CSS 类名并修改文字
        btn.classList.add('copied');
        btn.innerText = 'Copied!';
        
        // 2秒后恢复原状
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerText = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy BibTeX: ', err);
        alert('复制失败，请手动复制。');
    });
}


document.addEventListener('DOMContentLoaded', function () {
	renderEmail();
	
	function countCCF(sel){
        const els = document.querySelectorAll(`${sel} li .CCFRank.badge`);
        let A=0,B=0,C=0;
        els.forEach(b=>{
            const t=b.textContent.trim();
            if(t==="CCF A")A++;
            if(t==="CCF B")B++;
            if(t==="CCF C")C++;
        })
        return {A,B,C};
    }
    const j = countCCF('#journal-pub-list');
    const c = countCCF('#conference-pub-list');
    const totalA = j.A + c.A;
    const totalB = j.B + c.B;
    const totalC = j.C + c.C;
    const span = document.getElementById('publication-statistics-id');
    span.textContent = `CCF A: ${totalA} | CCF B: ${totalB} | CCF C: ${totalC}`;
	
	// ----全局链接处理：所有a标签，菜单内除外，全部新开窗口----
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        // 判断：该链接是否在 .main-menu 菜单容器里面
        const isInMenu = link.closest('.container');
        if (!isInMenu) {
            // 不在菜单栏：新标签打开
            link.target = '_blank';
            link.rel = 'noopener noreferrer'; // 安全属性，配套target="_blank"
        }
        // 在菜单栏内：什么都不做，默认当前页面跳转
    });
	
    const ol = document.getElementById("journal-pub-list");
    const btn = document.getElementById("toggle-journal-btn");
	
    const items = ol.querySelectorAll(":scope > li");
	
    items.forEach(li => {
        // ��ͬʱӵ�� CCFRank �� badge ��span
        const rankSpan = li.querySelector(".CCFRank.badge");
        // �ж������Ƿ���� CCF A
        const isCCFA = rankSpan && (rankSpan.textContent.trim() === "CCF A");
      //  if (!isCCFA) {
		if (!isCCFA) {
            // ��������Ƿ�A�࣬��ʼ����
            li.dataset.nonCcfa = "1";
            li.style.display = "none";
        }
    });
	
	// 统计期刊列表被隐藏条数
    const hiddenJournalCount = ol.querySelectorAll(':scope > li[data-non-ccfa="1"]').length;
	
	// ==========新增：页面首次加载，设置按钮初始文本==========
    if(hiddenJournalCount > 0){
        btn.innerText = `Show More (+${hiddenJournalCount})`;
    }else{
        btn.innerText = "Show More";
    }

    btn.addEventListener("click", function () {
        ol.classList.toggle("expand");
        const expanded = ol.classList.contains("expand");
       // btn.innerText = expanded ? "Show Less..." : "Show More...";
		btn.innerText = expanded ? `Show Less (-${hiddenJournalCount})` : `Show More (+${hiddenJournalCount})`;

        ol.querySelectorAll(':scope > li[data-non-ccfa="1"]').forEach(li => {
            li.style.display = expanded ? "list-item" : "none";
		//	li.style.display = expanded ? "none": "list-item";
        });
    });
	
	const conferenceol = document.getElementById("conference-pub-list");
	const conferencebtn = document.getElementById("toggle-conference-btn");
	const conferenceitems = conferenceol.querySelectorAll(":scope > li");
	
	conferenceitems.forEach(cli => {
        // ��ͬʱӵ�� CCFRank �� badge ��span
        const rankSpan = cli.querySelector(".CCFRank.badge");
        // �ж������Ƿ���� CCF A
        const isCCFA = rankSpan && (rankSpan.textContent.trim() === "CCF A");
      //  if (!isCCFA) {
		if (!isCCFA) {
            // ��������Ƿ�A�࣬��ʼ����
            cli.dataset.nonCcfa = "1";
            cli.style.display = "none";
        }
    });	
	// 统计会议列表被隐藏条数
    const hiddenConfCount = conferenceol.querySelectorAll(':scope > li[data-non-ccfa="1"]').length;
	if(hiddenConfCount > 0){
        conferencebtn.innerText = `Show More (+${hiddenConfCount})`;
    }else{
        conferencebtn.innerText = "Show More";
    }
	
	conferencebtn.addEventListener("click", function () {
        conferenceol.classList.toggle("expand");
        const expanded = conferenceol.classList.contains("expand");
       // conferencebtn.innerText = expanded ? "Show Less..." : "Show More...";
		conferencebtn.innerText = expanded ? `Show Less (-${hiddenConfCount})` : `Show More (+${hiddenConfCount})`;

        conferenceol.querySelectorAll(':scope > li[data-non-ccfa="1"]').forEach(li => {
            li.style.display = expanded ? "list-item" : "none";
		//	li.style.display = expanded ? "none": "list-item";
        });
    });
});
