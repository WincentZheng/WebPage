// 倫敦 2026 自由行 - 旅程核心資料庫 (依據 SPEC 規範)
const DEFAULT_TRIP_DATA = {
  meta: {
    title: "🇬🇧 倫敦 2026 自由行",
    subtitle: "12 天 10 夜 多人伴旅手冊",
    startDate: "2026-10-04",
    endDate: "2026-10-15",
    totalDays: 12,
    baseCurrency: "GBP",
    targetCurrency: "TWD",
    defaultExchangeRate: 42.15, // 1 GBP ≈ 42.15 TWD
    hotel: {
      name: "帕丁頓住宿 (Paddington Stay)",
      address: "150 Sussex Gardens, London, W2 1TU, UK",
      postcode: "W2 1TU",
      phone: "+44 20 7723 8000",
      checkIn: "2026/10/04 15:00",
      checkOut: "2026/10/15 11:00",
      mapsQuery: "150 Sussex Gardens, London W2 1TU",
      station: "Paddington Station (步行約 5 分鐘)",
      transportTips: "希斯洛機場可搭乘 Heathrow Express (15分鐘) 或 Elizabeth Line (28分鐘) 直達帕丁頓車站，出站步行即抵達。"
    }
  },

  // 預設旅行團成員 (可動態新增/編輯)
  members: [
    { id: "m1", name: "德德", role: "👑 團長", avatar: "👨🏻‍💻", color: "#3b82f6" },
    { id: "m2", name: "大熊", role: "🐻 副團長", avatar: "🐻", color: "#10b981" }
  ],

  // 12 天完整行程表 (精準參照 SPEC)
  itinerary: [
    {
      day: "D1",
      dayNum: 1,
      date: "2026/10/04",
      weekday: "週日 (Sun)",
      theme: "抵達倫敦 ‧ 帕丁頓進駐 ‧ 西區漫步",
      tags: ["啟程", "希斯洛機場", "飯店入住", "時差調整"],
      morning: "抵達倫敦希斯洛機場辦理過關，乘車入城",
      afternoon: "前往飯店寄存行李：附近超市採買，傍晚逛西區商圈",
      evening: "早點休息，調整時差",
      dinner: "帕丁頓車站周邊小吃或超商熱食 (推薦 M&S Food 或 Pret)",
      transport: "地鐵 / 火車 / 步行 (Heathrow Express / Elizabeth Line)",
      notes: "買 Oyster Card 或感應支付 (Contactless)；留意隨身行李與防竊；早點回飯店休息補充體力。",
      places: [
        { name: "希斯洛機場 (LHR)", query: "Heathrow Airport London", desc: "入境通關、領取行李、搭乘快線" },
        { name: "帕丁頓住宿 (150 Sussex Gardens)", query: "150 Sussex Gardens London W2 1TU", desc: "寄存行李、辦理入住" },
        { name: "倫敦西區商圈", query: "West End London", desc: "傍晚漫步、超市採買" }
      ]
    },
    {
      day: "D2",
      dayNum: 2,
      date: "2026/10/05",
      weekday: "週一 (Mon)",
      theme: "泰晤士河遊船 ‧ 波羅市場 ‧ 倫敦眼落日",
      tags: ["泰晤士遊船", "波羅美食", "碎片大廈", "倫敦眼預約"],
      morning: "帕丁頓 → 泰晤士河遊船 (50 分鐘享受河岸風光)",
      afternoon: "波羅市場 午餐 → 倫敦橋 / 碎片大廈 / 泰晤士河岸散步",
      evening: "17:15 預約：倫敦眼看夕陽及百萬璀璨夜景",
      dinner: "倫敦眼附近：泰式特色餐廳",
      transport: "地鐵 / 遊船 / 步行",
      notes: "遊船沿河風景優美；波羅市場美食眾多（炸魚薯條、生蠔、烤起司三明治）；⚠️ 倫敦眼預約 17:15 請提前 20 分鐘報到！",
      places: [
        { name: "波羅市場 (Borough Market)", query: "Borough Market London", desc: "百年傳統美食市場，品嚐道地街頭美食" },
        { name: "倫敦橋 (London Bridge)", query: "London Bridge", desc: "泰晤士河經典地標漫步" },
        { name: "碎片大廈 (The Shard)", query: "The Shard London", desc: "英國第一高樓，壯麗現代天際線" },
        { name: "倫敦眼 (London Eye)", query: "London Eye", desc: "🌟 17:15 預定場次！俯瞰大笨鐘與倫敦全景" }
      ]
    },
    {
      day: "D3",
      dayNum: 3,
      date: "2026/10/06",
      weekday: "週二 (Tue)",
      theme: "大英博物館 ‧ 柯芬園 ‧ 音樂劇與夜生活",
      tags: ["大英博物館", "柯芬園", "中國城", "音樂劇", "Soho酒吧"],
      morning: "10:20 大英博物館 (導覽專場) (1 小時前先取票及吃點小點心)",
      afternoon: "柯芬園市集逛街 → 萊斯特廣場 → 中國城 / 蘇活區 (Soho)",
      evening: "欣賞經典音樂劇 (哈利波特被詛咒的孩子 或 其他)，Ku Bar / Circa Soho (倫敦同志酒吧街體驗，感受英倫夜生活魅力)",
      dinner: "中國城附近平價美食 (燒臘、點心、拉麵)",
      transport: "公車 / 地鐵 / 步行",
      notes: "大英博物館 1 樓集合；提早取音樂劇門票；夜晚在 Soho 區熱鬧精彩但人潮較多，注意隨身財物。",
      places: [
        { name: "大英博物館 (British Museum)", query: "British Museum London", desc: "🌟 10:20 導覽！羅塞塔石碑、帕德嫩神廟雕塑" },
        { name: "柯芬園 (Covent Garden)", query: "Covent Garden London", desc: "文創市集、街頭藝人表演、下午茶" },
        { name: "萊斯特廣場 (Leicester Square)", query: "Leicester Square London", desc: "戲院核心區、樂高旗艦店、M&M世界" },
        { name: "中國城 (Chinatown)", query: "Chinatown London", desc: "亞洲美味餐廳聚集地" },
        { name: "Ku Bar", query: "Ku Bar London", desc: "Soho區著名酒吧，氣氛輕鬆愜意" },
        { name: "Circa Soho", query: "Circa Soho London", desc: "充滿活力的潮流酒吧，暢飲英倫精釀" }
      ]
    },
    {
      day: "D4",
      dayNum: 4,
      date: "2026/10/07",
      weekday: "週三 (Wed)",
      theme: "溫莎皇家城堡 ‧ 牛津街 ‧ 攝政街時尚巡禮",
      tags: ["溫莎城堡", "英國王室", "牛津街", "皮卡迪利圓環"],
      morning: "溫莎城堡半日遊 (搭火車出發，預訂 10:00 門票入場)",
      afternoon: "市區逛街行程：牛津街 (Oxford St) → 攝政街 (Regent St)",
      evening: "皮卡迪利圓環 (Piccadilly Circus)，欣賞璀璨巨幕霓虹夜景",
      dinner: "牛津街周邊英倫餐館 / 漢堡料理",
      transport: "火車 (Paddington/Waterloo出發) / 地鐵 / 步行",
      notes: "⚠️ 溫莎城堡 10:00 準時場次，務必提早購買國鐵火車票並提早候車。聖喬治禮拜堂值得細細品味。",
      places: [
        { name: "溫莎城堡 (Windsor Castle)", query: "Windsor Castle", desc: "🌟 預訂 10:00 入場！現存最古老仍有人居住的皇家城堡" },
        { name: "牛津街 (Oxford Street)", query: "Oxford Street London", desc: "歐洲最繁忙的購物街，百貨與旗艦店林立" },
        { name: "攝政街 (Regent Street)", query: "Regent Street London", desc: "壯觀弧形新古典建築街景，精品與玩具名店" },
        { name: "皮卡迪利圓環", query: "Piccadilly Circus London", desc: "倫敦時代廣場，標誌性愛神雕像與LED螢幕" }
      ]
    },
    {
      day: "D5",
      dayNum: 5,
      date: "2026/10/08",
      weekday: "週四 (Thu)",
      theme: "聖保羅 ‧ 泰特現代 ‧ 倫敦塔與天空花園",
      tags: ["千禧橋", "泰特現代藝術館", "倫敦塔橋", "空中花園預約"],
      morning: "09:00 聖保羅大教堂 → 千禧橋漫步 → 泰特現代藝術館 (Tate Modern)",
      afternoon: "利德賀市場 (哈利波特斜角巷取景地) → 倫敦塔橋 → 倫敦塔外圍漫步",
      evening: "17:00-19:00 預約：空中花園 (Sky Garden) 免費登頂觀賞日落金黃天際線",
      dinner: "倫敦橋附近英式酒館美食 (Pie & Mash)",
      transport: "公車 / 地鐵 / 泰晤士步行大道",
      notes: "空中花園需憑預約確認信與護照身分證明入場；泰特現代美術館常設展免費參觀，頂樓露台景觀極佳。",
      places: [
        { name: "聖保羅大教堂 (St Paul's)", query: "St Paul's Cathedral London", desc: "巴洛克建築代表作，巨大穹頂宏偉莊嚴" },
        { name: "千禧橋 (Millennium Bridge)", query: "Millennium Bridge London", desc: "哈利波特電影名場景，行人專用景觀吊橋" },
        { name: "泰特現代藝術館 (Tate Modern)", query: "Tate Modern London", desc: "發電廠改建的世界級現代美術館" },
        { name: "倫敦塔橋 (Tower Bridge)", query: "Tower Bridge London", desc: "倫敦最著名的哥德式雙塔吊橋" },
        { name: "倫敦塔 (Tower of London)", query: "Tower of London", desc: "近千年古堡、王冠珠寶珍藏之地" },
        { name: "空中花園 (Sky Garden)", query: "Sky Garden London", desc: "🌟 預約 17:00-19:00！35層室內花園360度全景" }
      ]
    },
    {
      day: "D6",
      dayNum: 6,
      date: "2026/10/09",
      weekday: "週五 (Fri)",
      theme: "西敏政經心臟 ‧ 白金漢宮 ‧ Flat Iron 牛排盛宴",
      tags: ["西敏寺", "大笨鐘", "白金漢宮衛兵", "國家美術館", "Flat Iron牛排"],
      morning: "10:00 西敏寺 (入內參觀皇家婚禮與加冕地) → 大笨鐘 / 國會大廈 → 聖詹姆斯公園 → 白金漢宮",
      afternoon: "特拉法加廣場 → 國家美術館 (賞梵谷向日葵) → 攝政街補貨閒逛",
      evening: "晚餐前往排隊人氣名店 Flat Iron 牛排 (Southbank店)，隨後前往 Sweetbox Soho (同志酒吧街感受倫敦週末狂歡氛圍)",
      dinner: "Flat Iron 牛排 (Southbank店，超值多汁牛排 + 招牌爆米花/冰淇淋)",
      transport: "地鐵 / 步行",
      notes: "看白金漢宮皇家衛兵交接需提前卡位；Flat Iron 不接受訂位，建議傍晚五點多前往登記排隊入座。",
      places: [
        { name: "西敏寺 (Westminster Abbey)", query: "Westminster Abbey London", desc: "🌟 10:00 入內參觀！牛頓、霍金安息地" },
        { name: "大笨鐘 (Big Ben)", query: "Big Ben London", desc: "新哥德式伊莉莎白塔，倫敦最著名聲音" },
        { name: "白金漢宮 (Buckingham Palace)", query: "Buckingham Palace London", desc: "英國君主辦公居住所，氣派皇家鐵門" },
        { name: "國家美術館 (National Gallery)", query: "National Gallery London", desc: "收藏達文西、梵谷名畫，免費入館" },
        { name: "Flat Iron Southbank", query: "Flat Iron Southbank London", desc: "超人氣排隊名店，平價美味英倫平鐵牛排" },
        { name: "Sweetbox Soho", query: "Sweetbox Soho London", desc: "氛圍極佳的派對酒吧，週末人氣爆棚" }
      ]
    },
    {
      day: "D7",
      dayNum: 7,
      date: "2026/10/10",
      weekday: "週六 (Sat)",
      theme: "學院人文古城 ‧ 劍橋康河撐篙一日遊",
      tags: ["劍橋大學", "國王十字車站", "康河撐篙", "徐志摩詩碑"],
      morning: "早起前往國王十字車站 (King's Cross) 搭乘國鐵火車直奔歷史古城劍橋 (車程約 50 分鐘)",
      afternoon: "劍橋漫步：國王學院禮拜堂、三一學院牛頓蘋果樹、康河撐篙 (Punting) 仰望數學橋與嘆息橋",
      evening: "搭乘火車返回倫敦，返回飯店休息整理",
      dinner: "劍橋市集道地英式肉派或返倫敦享用熱騰騰餐點",
      transport: "火車 (King's Cross ⇌ Cambridge) / 康河遊船 / 步行",
      notes: "早點抵達國王十字車站，順便到 9¾ 月台打卡拍照；康河撐篙可請帥哥學院船夫導覽，省力又能聽歷史故事。",
      places: [
        { name: "國王十字車站 (9¾ 月台)", query: "King's Cross Station London", desc: "哈利波特月台推車拍照、搭往劍橋火車" },
        { name: "劍橋大學 (University of Cambridge)", query: "University of Cambridge", desc: "英倫頂尖學府群，感受濃郁學術氣息" },
        { name: "國王學院禮拜堂 (King's College Chapel)", query: "King's College Chapel Cambridge", desc: "最宏偉的垂直哥德式建築與扇形拱頂" },
        { name: "康河撐篙 (Punting on the Cam)", query: "Punting Cambridge", desc: "划船穿越嘆息橋與數學橋，詩意浪漫" }
      ]
    },
    {
      day: "D8",
      dayNum: 8,
      date: "2026/10/11",
      weekday: "週日 (Sun)",
      theme: "肯頓龐克市集 ‧ 櫻草丘 ‧ 哈利波特魔法影城",
      tags: ["肯頓市集", "櫻草丘", "哈利波特影城", "華納兄弟"],
      morning: "肯頓市集 (Camden Market) 挖寶感受龐克搖滾氛圍 → 櫻草丘 (Primrose Hill) 俯瞰倫敦全景",
      afternoon: "14:00 重磅場次：華納兄弟哈利波特影城 (Warner Bros. Studio Tour London)",
      evening: "霍格華茲大廳、九又四分之三月台、斜角巷全體驗，參觀完返回倫敦市區",
      dinner: "肯頓市集多元街頭小吃 / 影城奶油啤酒與魔法簡餐",
      transport: "地鐵 / 國鐵 (Euston → Watford Junction) / 專屬影城雙層接駁車",
      notes: "⚠️ 14:00 進場！必須於 12:30 從市區出發搭車至 Watford Junction 轉乘接駁車，需抓充裕交通時間！影城內奶油啤酒必喝！",
      places: [
        { name: "肯頓市集 (Camden Market)", query: "Camden Market London", desc: "龐克潮流文化、世界各地特色街頭美食" },
        { name: "櫻草丘 (Primrose Hill)", query: "Primrose Hill London", desc: "綠草如茵的小山丘，遠眺倫敦天際線" },
        { name: "哈利波特影城 (Warner Bros. Studio)", query: "Warner Bros. Studio Tour London", desc: "🌟 14:00 入場！全世界哈迷聖地，走進魔法世界" }
      ]
    },
    {
      day: "D9",
      dayNum: 9,
      date: "2026/10/12",
      weekday: "週一 (Mon)",
      theme: "夢想尖塔之城 ‧ 牛津大學與基督堂學院",
      tags: ["牛津一日遊", "基督教堂學院", "嘆息橋", "博德利圖書館"],
      morning: "火車出發前往英語世界最古老大學城——牛津 (Oxford, 約1小時車程)",
      afternoon: "漫步牛津 Old Town、參觀基督教堂學院 (Christ Church，哈利波特大禮堂原型)、瑞德克里夫之家、嘆息橋",
      evening: "搭乘火車返回倫敦，整理幾日購物的行李與戰利品",
      dinner: "牛津百年英式酒館 (The Eagle and Child / Turf Tavern) 或返倫敦",
      transport: "火車 (Paddington ⇌ Oxford) / 步行",
      notes: "牛津基督教會學院參觀記得提早購票；牛津各學院下午開放時間不同，注意參觀動線。",
      places: [
        { name: "牛津大學 (University of Oxford)", query: "University of Oxford", desc: "世界最古老頂尖學府之一，迷人石造學院" },
        { name: "基督教堂學院 (Christ Church)", query: "Christ Church Oxford", desc: "🌟 霍格華茲大禮堂取景原型與壯麗教堂" },
        { name: "嘆息橋 (Bridge of Sighs Oxford)", query: "Bridge of Sighs Oxford", desc: "連結赫特福學院的典雅天橋" },
        { name: "瑞德克里夫圓樓 (Radcliffe Camera)", query: "Radcliffe Camera Oxford", desc: "牛津最具辨識度之圓頂圖書館建築" }
      ]
    },
    {
      day: "D10",
      dayNum: 10,
      date: "2026/10/13",
      weekday: "週二 (Tue)",
      theme: "跨越本初子午線 ‧ 格林威治 ‧ 自然史博物館恐龍",
      tags: ["本初子午線", "格林威治市集", "卡蒂薩克號", "自然史博物館"],
      morning: "前往格林威治皇家天文台 (Royal Observatory Greenwich)，雙腳跨越東西半球本初子午線",
      afternoon: "格林威治市集品嚐美食、參觀傳奇飛剪帆船卡蒂薩克號，午後搭乘輕軌+地鐵轉往南肯辛頓 (South Kensington) 參觀自然史博物館 (Natural History Museum, V&A博物館備選)",
      evening: "18:00 前返回市區，在優雅的肯辛頓街區漫步",
      dinner: "南肯辛頓周邊精緻英歐式義大利餐館",
      transport: "地鐵 / 碼頭輕軌 (DLR) / 步行",
      notes: "格林威治天文台視野開闊可俯瞰金絲雀碼頭摩天大樓群；自然史博物館中庭藍鯨骨架與恐龍化石館極為震撼且免費入場。",
      places: [
        { name: "格林威治皇家天文台", query: "Royal Observatory Greenwich London", desc: "世界標準時間起點，腳踏本初子午線拍照" },
        { name: "格林威治市集 (Greenwich Market)", query: "Greenwich Market London", desc: "手作工藝品與豐富異國美食街" },
        { name: "卡蒂薩克號 (Cutty Sark)", query: "Cutty Sark London", desc: "最後存世的19世紀傳奇運茶快速帆船" },
        { name: "自然史博物館 (Natural History Museum)", query: "Natural History Museum London", desc: "大教堂般壯麗展廳，巨大藍鯨與恐龍骨架" }
      ]
    },
    {
      day: "D11",
      dayNum: 11,
      date: "2026/10/14",
      weekday: "週三 (Wed)",
      theme: "海德公園漫步 ‧ 龐德街 ‧ 倫敦伴手禮大採購",
      tags: ["海德公園", "龐德街", "Fortnum&Mason", "伴手禮採買", "打包整理"],
      morning: "在住宿旁的帕丁頓出發，清晨漫步海德公園 (Hyde Park) 與肯辛頓花園，看天鵝與九曲湖畔美景",
      afternoon: "龐德街 (Bond Street) / 特拉法加廣場周邊：皇家認證茶葉 Fortnum & Mason、Jo Malone 香水、Whittard 茶包採買伴手禮",
      evening: "皮卡迪利與攝政街享受最後一夜倫敦燈火，回飯店打包行李進行戰利品收納",
      dinner: "帕丁頓住宿周邊經典英式酒館 (喝最後一杯正統英式愛爾啤酒)",
      transport: "地鐵 / 雙層巴士 / 步行",
      notes: "放鬆愜意的一天，將想買的禮品一次補齊；晚上將行李磅秤稱重，預防機場行李超重。",
      places: [
        { name: "海德公園 (Hyde Park)", query: "Hyde Park London", desc: "倫敦最大皇家公園，漫步湖畔野鴨天鵝相伴" },
        { name: "龐德街 (Bond Street)", query: "Bond Street London", desc: "國際精品旗艦街與經典英倫品牌" },
        { name: "Fortnum & Mason (皮卡迪利總店)", query: "Fortnum and Mason Piccadilly London", desc: "英國皇家認證茶葉、奶油酥餅與伴手禮首選" },
        { name: "皮卡迪利街區", query: "Piccadilly London", desc: "感受倫敦迷人夜色與最後巡禮" }
      ]
    },
    {
      day: "D12",
      dayNum: 12,
      date: "2026/10/15",
      weekday: "週四 (Thu)",
      theme: "道別倫敦 ‧ 希斯洛機場退稅 ‧ 平安返台",
      tags: ["退房", "機場快線", "希斯洛退稅", "長途航班"],
      morning: "飯店悠閒退房，拉行李前往帕丁頓車站搭乘快線直奔希斯洛機場 (Heathrow Airport)",
      afternoon: "抵達機場航廈辦理登機報到、行李託運與退稅手續，逛免稅店補充最後紀念品",
      evening: "登上返台長途班機，在機上放鬆休息看電影，細細回味12天的英倫旅程記憶",
      dinner: "長程國際航班飛機餐",
      transport: "火車 (Heathrow Express / Elizabeth Line) / 機場航廈步行",
      notes: "⚠️ 建議提前 3~3.5 小時抵達希斯洛機場！退稅與安檢排隊需要時間，請確認護照、電子登機證及退稅單齊全。",
      places: [
        { name: "希斯洛機場 (Heathrow Airport)", query: "Heathrow Airport Terminal London", desc: "辦理登機、退稅、回味美好旅程" }
      ]
    }
  ],

  // 實用指引與急難資訊
  guide: {
    transport: [
      {
        title: "💳 交通卡與感應支付 (Contactless)",
        desc: "倫敦市區公車與地鐵全面不收現金。直接使用支援海外刷卡的感應式信用卡 (Apple Pay / Google Pay / 實體信用卡) 或 Oyster Card 即可，每個人必須持有一張自己的卡感應（一人一卡不可共用同一張）。",
        highlight: "感應信用卡與 Oyster Card 享有相同的「每日扣款上限 (Daily Cap)」，刷滿上限當日後續搭乘免費！"
      },
      {
        title: "🚇 地鐵 (Tube) & 伊莉莎白線 (Elizabeth Line)",
        desc: "從帕丁頓住宿前往希斯洛機場，可搭乘伊莉莎白線 (約 28 分鐘，約 £13.30) 或 Heathrow Express 快線 (15 分鐘，提早買早鳥票有優惠)。地鐵尖峰時段 (Peak: 06:30-09:30, 16:00-19:00) 費率較高，離峰搭乘更省錢。",
        highlight: "帕丁頓是超大交會站，共有 Bakerloo, Circle, District, Hammersmith & City, Elizabeth Line 以及國鐵火車。"
      },
      {
        title: "🚌 雙層紅色巴士 (London Bus)",
        desc: "單趟固定 £1.75（不分距離），且享有 1 小時內免費轉乘其他公車 (Hopper Fare) 優惠。坐在二樓第一排可欣賞倫敦街景，是省錢又浪漫的交通方式。",
        highlight: "搭公車只需上車刷卡一次，下車不需再刷卡！"
      },
      {
        title: "🚆 郊區國鐵火車 (劍橋 / 牛津 / 溫莎)",
        desc: "前往劍橋 (國王十字站出發)、牛津 (帕丁頓出發)、溫莎 (帕丁頓或滑鐵盧出發) 建議提前使用 Trainline 或 National Rail 購買 Advance 便宜票，現場買票價格通常翻倍。",
        highlight: "出發前可下載 Trainline App 隨時掌握月台與誤點資訊。"
      }
    ],
    emergency: [
      { name: "駐英國台北代表處 (緊急急難救助電話)", tel: "+44 7889 802162", note: "專供車禍、搶劫、護照遺失等緊急危難求助" },
      { name: "駐英國台北代表處 (代表處代表號)", tel: "+44 20 7839 1866", note: "領事事務、護照換發諮詢" },
      { name: "英國緊急求助專線 (報警/火警/救護車)", tel: "999", note: "生命安全有立即危險時撥打 (免費)" },
      { name: "英國非緊急報警電話", tel: "101", note: "財物遭竊、非緊急案件報案備案" },
      { name: "英國國民健保諮詢專線 (NHS)", tel: "111", note: "身體不適需要尋求醫療評估但非立即生命危險" }
    ],
    tips: [
      { title: "🔌 電壓與轉接頭", content: "英國電壓 230V、50Hz，插頭為「三腳扁型 (Type G 英規插頭)」。建議攜帶含多個 USB / Type-C 輸出的萬國轉接頭。" },
      { title: "☔ 天氣與穿著", content: "10 月倫敦氣溫約 9°C ~ 16°C，偶有陣雨。採洋蔥式穿法，建議攜帶防風防潑水連帽外套、好走防滑的球鞋與輕便摺疊傘。" },
      { title: "📱 網路與通訊", content: "建議開通中華/遠傳/台灣大哥大漫遊 eSIM，或購買英國在地 EE / Vodafone / Giffgaff eSIM，確保 Google 地圖與叫車連線順暢。" },
      { title: "⚠️ 治安與隨身安全", content: "牛津街、Soho 區、大英博物館等熱門景點留意飛車搶手機 (不要在馬路邊低頭滑手機)、後背包請置於前方或加上防盜扣。" },
      { title: "💵 現金準備", content: "英國幾乎 99.9% 商家皆收信用卡/Apple Pay，只需準備 £50 ~ £100 英鎊現鈔備用即可，多數路邊攤連買一瓶可樂都能刷卡。" }
    ]
  },

  // 多人行前清單與裝備打卡
  checklists: [
    { id: "c1", text: "護照有效期限 6 個月以上", category: "證件機票", done: true },
    { id: "c2", text: "英國 ETA 電子旅遊許可 (如適用)", category: "證件機票", done: true },
    { id: "c3", text: "電子機票行程單 & 帕丁頓飯店訂房確認信 (紙本+PDF)", category: "證件機票", done: true },
    { id: "c4", text: "海外高回饋信用卡 2~3 張 (確認已開通國外刷卡與PIN碼)", category: "金錢金融", done: true },
    { id: "c5", text: "英鎊現鈔 £50~100", category: "金錢金融", done: false },
    { id: "c6", text: "英國 Type G 三腳轉接頭 + 延長線 + 行動電源", category: "電子器材", done: true },
    { id: "c7", text: "英國網卡 / eSIM 設定開通", category: "電子器材", done: true },
    { id: "c8", text: "保暖防風連帽外套、羽絨背心、輕便折疊傘", category: "衣物生活", done: false },
    { id: "c9", text: "好穿耐走的運動鞋 (每天步數常超過 15,000 步)", category: "衣物生活", done: false },
    { id: "c10", text: "個人常備藥 (止痛消炎、感冒藥、腸胃藥、暈車藥、B群、OK繃)", category: "健康藥品", done: false },
    { id: "c11", text: "大英博物館 10:20、哈利波特影城 14:00、溫莎 10:00 門票確認憑證", category: "票券預約", done: true }
  ],

  // 多人購物願望清單
  shoppingList: [
    { id: "s1", name: "Fortnum & Mason 皇家茶葉 & 經典音樂茶罐", target: "F&M 總店", priceEst: "£25", buyer: "德德", bought: false },
    { id: "s2", name: "Jo Malone 香水 (英國梨與小蒼蘭 / 鼠尾草海鹽)", target: "機場免稅店 / 專賣店", priceEst: "£55", buyer: "大熊", bought: false },
    { id: "s3", name: "大英博物館：羅塞塔石碑周邊小物 / 埃及貓神擺飾", target: "大英博物館紀念品店", priceEst: "£18", buyer: "所有人", bought: false },
    { id: "s4", name: "哈利波特影城：葛來芬多圍巾 & 互動魔杖", target: "華納兄弟影城", priceEst: "£42", buyer: "德德", bought: false },
    { id: "s5", name: "Whittard of Chelsea 熱可可粉 & 伯爵茶包", target: "柯芬園店", priceEst: "£15", buyer: "大熊", bought: false },
    { id: "s6", name: "Harrods 百貨綠色經典泰迪熊 & 購物提袋", target: "哈洛德百貨", priceEst: "£30", buyer: "所有人", bought: false }
  ],

  // 初始分帳紀錄 (範例真實數據)
  initialExpenses: [
    {
      id: "exp-1",
      date: "2026/10/04",
      amountGBP: 36.00,
      category: "交通",
      desc: "希斯洛機場前往帕丁頓快線車票 (2人)",
      payerId: "m1", // 德德
      splitWith: ["m1", "m2"] // 2人平分
    },
    {
      id: "exp-2",
      date: "2026/10/04",
      amountGBP: 18.50,
      category: "餐飲",
      desc: "帕丁頓車站 M&S 超市熱食餐盒與礦泉水",
      payerId: "m2", // 大熊
      splitWith: ["m1", "m2"]
    },
    {
      id: "exp-3",
      date: "2026/10/05",
      amountGBP: 74.00,
      category: "門票",
      desc: "倫敦眼 17:15 夕陽快速通關預約票 (2人)",
      payerId: "m1", // 德德
      splitWith: ["m1", "m2"]
    }
  ]
};

// 匯出常數給瀏覽器與模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_TRIP_DATA };
}
