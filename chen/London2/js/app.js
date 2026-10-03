/**
 * 🇬🇧 倫敦 2026 自由行 - 行動伴旅系統 Application Logic
 * Mobile-First Interactive Engine with Multi-Person Splitwise Accounting
 */

(function () {
  'use strict';

  // 1. 本地儲存鍵值
  const STORAGE_KEY = 'london_travel_2026_data_v1';

  // 2. 應用程式全域狀態
  let appState = {
    activeTab: 'itinerary',
    activeDayIndex: 0,
    exchangeRate: 42.15,
    data: null,
    selectedSplitMembers: []
  };

  // 3. 初始化載入
  function init() {
    loadSavedData();
    setupThemeAndFontSize();
    setupEventListeners();
    setupClocks();
    renderCurrentTab();
    renderDayNavigation();
    renderItineraryDay(appState.activeDayIndex);
  }

  // 從 LocalStorage 載入資料，若無則使用 DEFAULT_TRIP_DATA
  function loadSavedData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        appState.data = JSON.parse(saved);
      } else {
        appState.data = JSON.parse(JSON.stringify(DEFAULT_TRIP_DATA));
        saveData();
      }
    } catch (e) {
      console.warn('載入資料異常，重設為預設值', e);
      appState.data = JSON.parse(JSON.stringify(DEFAULT_TRIP_DATA));
    }

    if (appState.data.meta && appState.data.meta.defaultExchangeRate) {
      appState.exchangeRate = appState.data.meta.defaultExchangeRate;
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.data));
    } catch (e) {
      console.error('儲存至 LocalStorage 失敗', e);
    }
  }

  // 4. 外觀主題與字體大小管理
  function setupThemeAndFontSize() {
    // 載入儲存的主題 (預設 dark)
    const savedTheme = localStorage.getItem('london_travel_theme') || 'dark';
    applyTheme(savedTheme);

    // 載入儲存的字級 (預設 normal)
    const savedFs = localStorage.getItem('london_travel_fontsize') || 'normal';
    applyFontSize(savedFs);

    // 點擊主題切換按鈕 (☀️ / 🌙)
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        const target = current === 'light' ? 'dark' : 'light';
        applyTheme(target);
        showToast(target === 'light' ? '已切換為：☀️ 淺色白天皮膚' : '已切換為：🌙 深色夜間皮膚');
      });
    }

    // 點擊頂部字級圖示 (🔤)：依序循環 normal -> large -> xlarge
    const fsToggleBtn = document.getElementById('font-size-toggle-btn');
    if (fsToggleBtn) {
      fsToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-font-size') || 'normal';
        const sequence = ['normal', 'large', 'xlarge'];
        const nextIdx = (sequence.indexOf(current) + 1) % sequence.length;
        const next = sequence[nextIdx];
        applyFontSize(next);
        const labels = { normal: '標準 A', large: '放大 A+', xlarge: '特大 A++' };
        showToast(`字體大小已設定為：${labels[next]}`);
      });
    }

    // 點擊字級膠囊按鈕
    document.querySelectorAll('.fs-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const size = btn.dataset.size;
        applyFontSize(size);
        const labels = { normal: '標準 A', large: '放大 A+', xlarge: '特大 A++' };
        showToast(`字體大小：${labels[size]}`);
      });
    });
  }

  function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);
    localStorage.setItem('london_travel_theme', theme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.textContent = isLight ? '🌙' : '☀️';
      themeBtn.title = isLight ? '切換為深色模式' : '切換為淺色模式';
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isLight ? '#f1f5f9' : '#070b14');
    }
  }

  function applyFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    localStorage.setItem('london_travel_fontsize', size);

    document.querySelectorAll('.fs-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === size);
    });
  }

  // 5. 雙時區時鐘與天氣更新
  function setupClocks() {
    function updateClock() {
      const now = new Date();
      
      // 倫敦時間 (Europe/London)
      const londonTimeStr = now.toLocaleTimeString('zh-TW', {
        timeZone: 'Europe/London',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // 倫敦完整日期 (Europe/London)
      const londonDateStr = now.toLocaleDateString('zh-TW', {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });

      // 台北時間 (Asia/Taipei)
      const tpeTimeStr = now.toLocaleTimeString('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });

      // 更新超醒目 Hero 戰情面板
      const heroLondonTime = document.getElementById('hero-london-time');
      const heroLondonDate = document.getElementById('hero-london-date');
      const heroTpeTime = document.getElementById('hero-tpe-time');

      if (heroLondonTime) heroLondonTime.textContent = londonTimeStr;
      if (heroLondonDate) heroLondonDate.textContent = londonDateStr;
      if (heroTpeTime) heroTpeTime.textContent = tpeTimeStr;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  // 6. 事件監聽設定
  function setupEventListeners() {
    // 底部導覽切換
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.tab;
        switchTab(tab);
      });
    });

    // 匯率切換/修改按鈕
    const exPill = document.getElementById('ex-rate-pill');
    if (exPill) {
      exPill.addEventListener('click', () => {
        openCurrencyConverterModal();
      });
    }

    // 備份與還原按鈕
    const backupBtn = document.getElementById('btn-backup-data');
    if (backupBtn) {
      backupBtn.addEventListener('click', () => {
        openBackupModal();
      });
    }

    // 新增記帳觸發
    const addExpenseBtn = document.getElementById('btn-add-expense-trigger');
    if (addExpenseBtn) {
      addExpenseBtn.addEventListener('click', () => {
        openAddExpenseModal();
      });
    }

    // 關閉所有彈窗
    document.querySelectorAll('.close-modal-btn, .modal-overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el || e.target.closest('.close-modal-btn')) {
          closeAllModals();
        }
      });
    });

    // 防止點擊彈窗內部關閉
    document.querySelectorAll('.modal-sheet').forEach(sheet => {
      sheet.addEventListener('click', e => e.stopPropagation());
    });
  }

  // 6. 分頁切換
  function switchTab(tabId) {
    appState.activeTab = tabId;

    // 更新底部按鈕
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // 切換視圖
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    renderCurrentTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCurrentTab() {
    switch (appState.activeTab) {
      case 'itinerary':
        renderItineraryDay(appState.activeDayIndex);
        break;
      case 'budget':
        renderBudgetTab();
        break;
      case 'guide':
        renderGuideTab();
        break;
      case 'checklist':
        renderChecklistTab();
        break;
    }
  }

  // ================= 7. 行程模組 (Itinerary Tab) =================
  function renderDayNavigation() {
    const container = document.getElementById('day-pill-container');
    if (!container) return;

    container.innerHTML = '';
    appState.data.itinerary.forEach((dayItem, index) => {
      const pill = document.createElement('button');
      pill.className = `day-pill ${index === appState.activeDayIndex ? 'active' : ''}`;
      pill.innerHTML = `
        <span class="dp-day">${dayItem.day}</span>
        <span class="dp-date">${dayItem.date.slice(5)}</span>
      `;
      pill.addEventListener('click', () => {
        appState.activeDayIndex = index;
        document.querySelectorAll('.day-pill').forEach((p, idx) => {
          p.classList.toggle('active', idx === index);
        });
        renderItineraryDay(index);
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      container.appendChild(pill);
    });
  }

  function renderItineraryDay(dayIdx) {
    const dayData = appState.data.itinerary[dayIdx];
    if (!dayData) return;

    const bannerContainer = document.getElementById('day-banner-content');
    const scheduleContainer = document.getElementById('day-schedule-content');
    const placesContainer = document.getElementById('day-places-content');

    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div class="day-banner-top">
          <div class="day-badge-large">
            <span>${dayData.day}</span>
            <span style="font-size: 16px; opacity: 0.85;">Day ${dayData.dayNum}</span>
          </div>
          <div class="day-date-tag">${dayData.date} ‧ ${dayData.weekday}</div>
        </div>
        <div class="day-theme-title">${dayData.theme}</div>
        <div class="day-tags">
          ${dayData.tags.map(t => `<span class="day-tag">#${t}</span>`).join('')}
        </div>
      `;
    }

    if (scheduleContainer) {
      scheduleContainer.innerHTML = `
        <div class="schedule-list">
          <div class="time-card">
            <div class="time-card-header">
              <span class="time-icon">☀️</span>
              <span class="time-period morning">上午 (Morning)</span>
            </div>
            <div class="time-content">${dayData.morning}</div>
          </div>

          <div class="time-card">
            <div class="time-card-header">
              <span class="time-icon">🌤️</span>
              <span class="time-period afternoon">下午 (Afternoon)</span>
            </div>
            <div class="time-content">${dayData.afternoon}</div>
          </div>

          <div class="time-card">
            <div class="time-card-header">
              <span class="time-icon">🌙</span>
              <span class="time-period evening">晚上 (Evening)</span>
            </div>
            <div class="time-content">${dayData.evening}</div>
          </div>

          <div class="time-card">
            <div class="time-card-header">
              <span class="time-icon">🍴</span>
              <span class="time-period dinner">餐飲推薦 (Dining)</span>
            </div>
            <div class="time-content">${dayData.dinner}</div>
          </div>
        </div>

        <div class="sub-info-card">
          <div class="sub-info-row">
            <div class="sub-info-label">🚇 交通方式</div>
            <div class="sub-info-val">${dayData.transport}</div>
          </div>
          <div class="sub-info-row">
            <div class="sub-info-label">💡 備忘提醒</div>
            <div class="sub-info-val">${dayData.notes}</div>
          </div>
        </div>
      `;
    }

    if (placesContainer) {
      placesContainer.innerHTML = `
        <div class="places-section">
          <div class="section-title">📍 當日精選景點與一鍵導航 (${dayData.places.length})</div>
          <div class="places-grid">
            ${dayData.places.map(p => {
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`;
              return `
                <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="place-card">
                  <div class="place-meta">
                    <h4><span>🏛️</span> ${p.name}</h4>
                    <p>${p.desc}</p>
                  </div>
                  <div class="place-action-btn">
                    <span>導航</span> ➔
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  }

  // ================= 8. 多人記帳與分帳結算 (Splitwise Engine) =================
  function renderBudgetTab() {
    const expenses = appState.data.initialExpenses || [];
    const members = appState.data.members || [];
    const rate = appState.exchangeRate || 42.15;

    // 計算總支出
    let totalGBP = 0;
    expenses.forEach(e => {
      totalGBP += Number(e.amountGBP) || 0;
    });
    const totalTWD = totalGBP * rate;

    // 更新總花費 UI
    const totalGbEl = document.getElementById('budget-total-gbp-val');
    const totalTwEl = document.getElementById('budget-total-twd-val');
    const exRateDisplay = document.getElementById('current-ex-rate-display');

    if (totalGbEl) totalGbEl.textContent = `£ ${totalGBP.toFixed(2)}`;
    if (totalTwEl) totalTwEl.textContent = `≈ NT$ ${Math.round(totalTWD).toLocaleString()}`;
    if (exRateDisplay) exRateDisplay.textContent = `匯率 1 : ${rate.toFixed(2)}`;

    // 計算每人已付款與應分攤金額
    // memberStats: { [memberId]: { paid: number, share: number, net: number } }
    const memberStats = {};
    members.forEach(m => {
      memberStats[m.id] = { paid: 0, share: 0, net: 0, info: m };
    });

    expenses.forEach(e => {
      const amt = Number(e.amountGBP) || 0;
      if (memberStats[e.payerId]) {
        memberStats[e.payerId].paid += amt;
      }

      // 平分給 splitWith 成員
      const splitList = e.splitWith && e.splitWith.length > 0 ? e.splitWith : members.map(m => m.id);
      const perShare = amt / splitList.length;
      splitList.forEach(mId => {
        if (memberStats[mId]) {
          memberStats[mId].share += perShare;
        }
      });
    });

    // 渲染各成員付款狀態
    const membersSpendBox = document.getElementById('members-spend-box');
    if (membersSpendBox) {
      membersSpendBox.innerHTML = members.map(m => {
        const stats = memberStats[m.id] || { paid: 0, share: 0 };
        return `
          <div class="member-spend-row">
            <div class="member-tag">
              <span class="member-avatar-circle" style="border: 2px solid ${m.color}">${m.avatar}</span>
              <span>${m.name} (${m.role})</span>
            </div>
            <div class="member-val-paid">
              已付: £ ${stats.paid.toFixed(2)}
              <span style="font-size: 11px; color: var(--text-muted); font-weight: normal;">(應付 £ ${stats.share.toFixed(2)})</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // 計算最佳化多人結算路徑 (Greedy Settle Algorithm)
    // net = paid - share: 正數代表代墊需要收回錢 (Creditor)，負數代表少付需要掏錢 (Debtor)
    const creditors = [];
    const debtors = [];

    members.forEach(m => {
      const net = (memberStats[m.id].paid - memberStats[m.id].share);
      if (net > 0.009) {
        creditors.push({ id: m.id, name: m.name, amount: net });
      } else if (net < -0.009) {
        debtors.push({ id: m.id, name: m.name, amount: -net });
      }
    });

    const debts = [];
    let cIdx = 0;
    let dIdx = 0;

    while (cIdx < creditors.length && dIdx < debtors.length) {
      const c = creditors[cIdx];
      const d = debtors[dIdx];
      const settleAmt = Math.min(c.amount, d.amount);

      debts.push({
        from: d.name,
        to: c.name,
        amountGBP: settleAmt,
        amountTWD: Math.round(settleAmt * rate)
      });

      c.amount -= settleAmt;
      d.amount -= settleAmt;

      if (c.amount < 0.009) cIdx++;
      if (d.amount < 0.009) dIdx++;
    }

    // 渲染結算清單
    const settlementBox = document.getElementById('settlement-results-box');
    if (settlementBox) {
      if (debts.length === 0) {
        settlementBox.className = 'settlement-card no-debts';
        settlementBox.innerHTML = `
          <div class="settlement-title">
            <span>✨ 智慧分帳結算</span>
            <span>已結清</span>
          </div>
          <div class="debt-item" style="color: var(--text-secondary);">
            🎉 太棒了！目前大家收支平衡，沒有人積欠費用。
          </div>
        `;
      } else {
        settlementBox.className = 'settlement-card';
        settlementBox.innerHTML = `
          <div class="settlement-title">
            <span>✨ 智慧分帳結算 (結帳懶人包)</span>
            <button class="copy-settlement-btn" id="btn-copy-settlement">一鍵複製到 LINE</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${debts.map(d => `
              <div class="debt-item">
                <span>👤 <strong>${d.from}</strong> 應轉帳給 <strong>${d.to}</strong>：</span>
                <span class="debt-amount-highlight">£ ${d.amountGBP.toFixed(2)}</span>
                <span style="font-size: 11px; color: var(--text-muted);">(約 NT$ ${d.amountTWD.toLocaleString()})</span>
              </div>
            `).join('')}
          </div>
        `;

        const copyBtn = document.getElementById('btn-copy-settlement');
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            const lines = ['🇬🇧 倫敦 2026 自由行 - 多人分帳結算清單', '-------------------------'];
            debts.forEach(d => {
              lines.push(`• ${d.from} ➔ 轉給 ${d.to}：£ ${d.amountGBP.toFixed(2)} (約 NT$ ${d.amountTWD.toLocaleString()})`);
            });
            lines.push('-------------------------');
            lines.push(`總開銷: £ ${totalGBP.toFixed(2)} (約 NT$ ${Math.round(totalTWD).toLocaleString()})`);
            copyTextToClipboard(lines.join('\n'), '結算明細已複製，可直接貼到 LINE / WhatsApp 群組！');
          });
        }
      }
    }

    // 渲染歷史記帳明細
    const expenseListContainer = document.getElementById('expense-history-list');
    if (expenseListContainer) {
      if (expenses.length === 0) {
        expenseListContainer.innerHTML = `
          <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 13px;">
            尚無記帳紀錄，點選上方「＋ 新增花費」開始記帳
          </div>
        `;
      } else {
        expenseListContainer.innerHTML = expenses.slice().reverse().map(e => {
          const payer = members.find(m => m.id === e.payerId) || { name: '未知', avatar: '👤' };
          const catIcons = {
            '餐飲': '🍽️',
            '交通': '🚇',
            '門票': '🎫',
            '購物': '🛍️',
            '住宿': '🏨',
            '其他': '📦'
          };
          const icon = catIcons[e.category] || '💸';
          const amtTwd = Math.round(Number(e.amountGBP) * rate);

          return `
            <div class="expense-item" data-id="${e.id}">
              <div class="expense-left">
                <div class="expense-cat-icon">${icon}</div>
                <div class="expense-desc">
                  <h5>${escapeHtml(e.desc || e.category)}</h5>
                  <p>${e.date || ''} ‧ 由 ${payer.avatar} ${payer.name} 支付</p>
                </div>
              </div>
              <div class="expense-right">
                <div class="expense-amt-gbp">£ ${(Number(e.amountGBP) || 0).toFixed(2)}</div>
                <div class="expense-amt-twd">≈ NT$ ${amtTwd.toLocaleString()}</div>
                <button class="expense-del-btn" title="刪除此筆" onclick="window.londonApp.deleteExpense('${e.id}')">✕ 刪除</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  // 刪除費用
  function deleteExpense(expId) {
    if (!confirm('確定要刪除這筆花費紀錄嗎？')) return;
    appState.data.initialExpenses = appState.data.initialExpenses.filter(e => e.id !== expId);
    saveData();
    renderBudgetTab();
    showToast('已刪除花費紀錄');
  }

  // ================= 9. 住宿與實用指南 (Guide Tab) =================
  function renderGuideTab() {
    const hotel = appState.data.meta.hotel;
    const hotelContainer = document.getElementById('guide-hotel-content');
    if (hotelContainer) {
      hotelContainer.innerHTML = `
        <div class="hotel-card">
          <div class="hotel-title-row">
            <div class="hotel-name">${hotel.name}</div>
            <div class="hotel-station-badge">${hotel.station}</div>
          </div>
          <div class="hotel-address">
            📍 <strong>地址：</strong>${hotel.address}<br>
            📮 <strong>英國郵遞區號：</strong><code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: var(--accent-gold);">${hotel.postcode}</code> (司機叫車必備)<br>
            🕒 <strong>入住/退房：</strong>${hotel.checkIn} ~ ${hotel.checkOut}
          </div>
          <p style="font-size: 12px; color: #93c5fd; margin-bottom: 12px; line-height: 1.5;">
            💡 <strong>機場直達指引：</strong>${hotel.transportTips}
          </p>
          <div class="hotel-action-buttons">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapsQuery)}" target="_blank" rel="noopener" class="hotel-btn primary">
              🗺️ Google Maps 導航
            </a>
            <a href="https://maps.apple.com/?q=${encodeURIComponent(hotel.mapsQuery)}" target="_blank" rel="noopener" class="hotel-btn secondary">
              🍏 Apple Maps 導航
            </a>
            <button class="hotel-btn secondary" onclick="window.londonApp.copyAddress()">
              📋 複製完整地址
            </button>
            <button class="hotel-btn secondary" onclick="window.londonApp.copyPostcode()">
              📮 複製英式郵遞區號
            </button>
          </div>
        </div>
      `;
    }

    // 渲染緊急聯絡電話
    const emergencyList = document.getElementById('guide-emergency-list');
    if (emergencyList) {
      const items = appState.data.guide.emergency;
      emergencyList.innerHTML = items.map(em => {
        const isTaiwan = em.name.includes('台北代表處');
        return `
          <div class="emergency-card ${isTaiwan ? 'taiwan' : ''}">
            <div class="em-info">
              <h5>${em.name}</h5>
              <p>${em.note} (${em.tel})</p>
            </div>
            <a href="tel:${em.tel.replace(/\s+/g, '')}" class="em-call-btn">
              📞 撥打
            </a>
          </div>
        `;
      }).join('');
    }

    // 渲染交通指引
    const transportList = document.getElementById('guide-transport-list');
    if (transportList) {
      transportList.innerHTML = appState.data.guide.transport.map(tr => `
        <div class="guide-item">
          <div class="guide-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
            <span>${tr.title}</span>
            <span style="font-size: 12px; opacity: 0.6;">▼</span>
          </div>
          <div class="guide-body">
            <div>${tr.desc}</div>
            <div class="highlight-box">🌟 <strong>重點必看：</strong>${tr.highlight}</div>
          </div>
        </div>
      `).join('');
    }

    // 渲染旅遊錦囊
    const tipsList = document.getElementById('guide-tips-list');
    if (tipsList) {
      tipsList.innerHTML = appState.data.guide.tips.map(tp => `
        <div class="guide-item">
          <div class="guide-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
            <span>${tp.title}</span>
            <span style="font-size: 12px; opacity: 0.6;">▼</span>
          </div>
          <div class="guide-body">
            <div>${tp.content}</div>
          </div>
        </div>
      `).join('');
    }
  }

  // ================= 10. 行前清單與購物願望 (Checklist Tab) =================
  function renderChecklistTab() {
    const list = appState.data.checklists || [];
    const doneCount = list.filter(i => i.done).length;
    const totalCount = list.length;
    const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const progressBox = document.getElementById('checklist-progress-box');
    if (progressBox) {
      progressBox.innerHTML = `
        <div class="progress-meta">
          <span>行前裝備整備進度</span>
          <span>${doneCount} / ${totalCount} 項 (${percent}%)</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${percent}%;"></div>
        </div>
      `;
    }

    const itemsContainer = document.getElementById('checklist-items-container');
    if (itemsContainer) {
      itemsContainer.innerHTML = list.map(item => `
        <div class="check-item ${item.done ? 'done' : ''}" onclick="window.londonApp.toggleCheckItem('${item.id}')">
          <div class="custom-checkbox">${item.done ? '✓' : ''}</div>
          <div class="check-title">${item.text}</div>
          <span class="check-cat">${item.category}</span>
        </div>
      `).join('');
    }

    // 渲染購物願望清單
    const shoppingList = appState.data.shoppingList || [];
    const shoppingContainer = document.getElementById('shopping-items-container');
    if (shoppingContainer) {
      shoppingContainer.innerHTML = shoppingList.map(s => `
        <div class="check-item ${s.bought ? 'done' : ''}" onclick="window.londonApp.toggleShoppingItem('${s.id}')">
          <div class="custom-checkbox">${s.bought ? '✓' : ''}</div>
          <div class="check-title">
            <strong>${s.name}</strong>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              📍 地點: ${s.target} ‧ 預估: ${s.priceEst} ‧ 許願者: ${s.buyer}
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  function toggleCheckItem(id) {
    const item = appState.data.checklists.find(i => i.id === id);
    if (item) {
      item.done = !item.done;
      saveData();
      renderChecklistTab();
    }
  }

  function toggleShoppingItem(id) {
    const item = appState.data.shoppingList.find(i => i.id === id);
    if (item) {
      item.bought = !item.bought;
      saveData();
      renderChecklistTab();
    }
  }

  // ================= 11. 彈窗管理 (Modals) =================
  function openAddExpenseModal() {
    const modal = document.getElementById('modal-add-expense');
    if (!modal) return;

    const members = appState.data.members || [];
    const payerSelect = document.getElementById('expense-payer-select');
    const splitContainer = document.getElementById('expense-split-members');

    // 填充付款人選項
    if (payerSelect) {
      payerSelect.innerHTML = members.map(m => `
        <option value="${m.id}">${m.avatar} ${m.name} (${m.role})</option>
      `).join('');
    }

    // 預設平分人（預設全部選取）
    appState.selectedSplitMembers = members.map(m => m.id);
    renderSplitMembersPills();

    // 預設日期為當日
    const dateInput = document.getElementById('expense-date-input');
    if (dateInput) {
      const todayDay = appState.data.itinerary[appState.activeDayIndex];
      dateInput.value = todayDay ? todayDay.date : '2026/10/04';
    }

    modal.classList.add('open');
  }

  function renderSplitMembersPills() {
    const container = document.getElementById('expense-split-members');
    if (!container) return;

    const members = appState.data.members || [];
    container.innerHTML = members.map(m => {
      const isSelected = appState.selectedSplitMembers.includes(m.id);
      return `
        <button type="button" class="member-pill-choice ${isSelected ? 'selected' : ''}" 
          onclick="window.londonApp.toggleSplitMember('${m.id}')">
          <span>${isSelected ? '☑' : '☐'}</span>
          <span>${m.avatar} ${m.name}</span>
        </button>
      `;
    }).join('');
  }

  function toggleSplitMember(mId) {
    if (appState.selectedSplitMembers.includes(mId)) {
      if (appState.selectedSplitMembers.length === 1) {
        alert('至少需有一人分攤此筆費用！');
        return;
      }
      appState.selectedSplitMembers = appState.selectedSplitMembers.filter(id => id !== mId);
    } else {
      appState.selectedSplitMembers.push(mId);
    }
    renderSplitMembersPills();
  }

  // 送出新增費用
  function handleSaveExpense(e) {
    e.preventDefault();
    const amountVal = parseFloat(document.getElementById('expense-amount-input').value);
    const currency = document.getElementById('expense-currency-select').value;
    const category = document.getElementById('expense-cat-select').value;
    const payerId = document.getElementById('expense-payer-select').value;
    const desc = document.getElementById('expense-desc-input').value.trim();
    const date = document.getElementById('expense-date-input').value;

    if (!amountVal || isNaN(amountVal) || amountVal <= 0) {
      alert('請輸入有效金額！');
      return;
    }

    // 轉換為基準貨幣 GBP
    let gbpAmount = amountVal;
    if (currency === 'TWD') {
      gbpAmount = amountVal / (appState.exchangeRate || 42.15);
    }

    const newExp = {
      id: 'exp-' + Date.now(),
      date: date || '2026/10/04',
      amountGBP: Number(gbpAmount.toFixed(2)),
      category: category || '其他',
      desc: desc || category,
      payerId: payerId,
      splitWith: [...appState.selectedSplitMembers]
    };

    appState.data.initialExpenses.push(newExp);
    saveData();
    closeAllModals();
    renderBudgetTab();
    showToast(`已新增花費：£ ${newExp.amountGBP.toFixed(2)} (${newExp.desc})`);

    // 重設表單
    document.getElementById('form-add-expense').reset();
  }

  // 貨幣計算機彈窗
  function openCurrencyConverterModal() {
    const modal = document.getElementById('modal-currency');
    if (!modal) return;

    const rateInput = document.getElementById('input-custom-exrate');
    if (rateInput) rateInput.value = appState.exchangeRate;

    updateQuickConvert(10);
    modal.classList.add('open');
  }

  function updateQuickConvert(gbpVal) {
    const rate = parseFloat(document.getElementById('input-custom-exrate').value) || appState.exchangeRate;
    const resTwd = document.getElementById('convert-result-twd');
    const inputGbp = document.getElementById('convert-input-gbp');

    if (inputGbp) inputGbp.value = gbpVal;
    if (resTwd) resTwd.textContent = `≈ NT$ ${Math.round(gbpVal * rate).toLocaleString()}`;
  }

  function handleSaveExchangeRate() {
    const newRate = parseFloat(document.getElementById('input-custom-exrate').value);
    if (newRate && newRate > 0) {
      appState.exchangeRate = newRate;
      appState.data.meta.defaultExchangeRate = newRate;
      saveData();
      closeAllModals();
      renderBudgetTab();
      showToast(`匯率已更新為 1 GBP = ${newRate.toFixed(2)} TWD`);
    }
  }

  // 備份與還原
  function openBackupModal() {
    const modal = document.getElementById('modal-backup');
    if (modal) modal.classList.add('open');
  }

  function exportTripJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.data, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `London_Trip_Backup_${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
    showToast('備份檔案已成功下載！');
  }

  function importTripJson(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.itinerary && parsed.members) {
          appState.data = parsed;
          saveData();
          closeAllModals();
          init();
          showToast('旅程資料已成功還原！');
        } else {
          alert('檔案格式不符，請選擇正確的備份 JSON 檔案。');
        }
      } catch (err) {
        alert('解析失敗：' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function resetToDefault() {
    if (confirm('確定要清除所有自訂記帳與打卡紀錄，恢復為原廠 SPEC 行程嗎？此動作無法復原！')) {
      localStorage.removeItem(STORAGE_KEY);
      loadSavedData();
      closeAllModals();
      init();
      showToast('已重設為預設行程與分帳資料！');
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  }

  // ================= 12. 輔助函式 =================
  function showToast(msg) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || '已複製到剪貼簿！');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || '已複製到剪貼簿！');
    } catch (e) {
      alert('複製失敗，請手動複製：\n' + text);
    }
    document.body.removeChild(ta);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // 13. 對外公開介面 (供 HTML onclick 呼叫)
  window.londonApp = {
    deleteExpense,
    toggleSplitMember,
    handleSaveExpense,
    handleSaveExchangeRate,
    updateQuickConvert,
    exportTripJson,
    importTripJson,
    resetToDefault,
    toggleCheckItem,
    toggleShoppingItem,
    copyAddress: () => copyTextToClipboard(appState.data.meta.hotel.address, '飯店地址已複製！'),
    copyPostcode: () => copyTextToClipboard(appState.data.meta.hotel.postcode, '英式郵遞區號 W2 1TU 已複製！'),
    openAddMemberModal: () => {
      const name = prompt('請輸入新夥伴的暱稱：');
      if (name && name.trim()) {
        const id = 'm' + (appState.data.members.length + 1);
        const emojis = ['🦊', '🐼', '🐨', '🦁', '🐯', '🐙', '🐰'];
        const avatar = emojis[Math.floor(Math.random() * emojis.length)];
        const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#14b8a6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        appState.data.members.push({ id, name: name.trim(), role: '旅伴', avatar, color });
        saveData();
        renderBudgetTab();
        showToast(`已新增夥伴：${name}`);
      }
    }
  };

  // 啟動應用
  document.addEventListener('DOMContentLoaded', init);
})();
