// English and Simplified Chinese copy for the whole page. "/" is English, "/zh" is Chinese.
// Facts: Drive "CAPPELLA EMBASSY" plans + facilities plan, the older D'Rapport location map
// (distances), and 2026 public listings (completion, units, land, towers, facility totals).
// Owner's rules: no prices, no maintenance fees, tenure not shown, "KLCC" never in prose.

export type Lang = "en" | "zh";

export const lang: Lang =
  typeof window !== "undefined" && /^\/zh(\/|$)/.test(window.location.pathname) ? "zh" : "en";

const WA_NUMBER = "60126579508";
export const whatsapp = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const PHONE_DISPLAY = "+60 12-657 9508";

export type LayoutKey = "A1" | "A2" | "B" | "C" | "D1" | "D2" | "D3" | "BT" | "PH";

const en = {
  nav: { residence: "The Residence", facilities: "Facilities", homes: "Homes", location: "Location", gallery: "Gallery", cta: "Arrange a viewing", ctaShort: "Enquire", other: "中文", otherHref: "/zh", formerly: "formerly D'Rapport Residences", menuOpen: "Open menu", menuClose: "Close menu" },
  hero: {
    where: "Jalan Nipah · Ampang Hilir · Kuala Lumpur",
    line: "1,099 homes in five towers on 9.12 acres of the embassy district, with more than 50 facilities and a sky deck on the rooftop.",
    cta: "Arrange a viewing", see: "See the homes", alt: "Cappella Embassy towers at dusk, artist's impression",
    facts: [["Completed", "2019"], ["Residences", "1,099"], ["Estate", "9.12 acres"], ["Towers", "Five, 38 storeys"]] as [string, string][],
  },
  intro: {
    heading: "Quiet streets, embassy neighbours, the city within reach.",
    body: [
      "Formerly D'Rapport Residences, the estate was renamed Cappella Embassy in 2026. It sits on Jalan Nipah, off Jalan Ampang, among the embassies of Ampang Hilir.",
      "Gleneagles Hospital is about 350 metres away and Great Eastern Mall about 650 metres. The Petronas Twin Towers are about 3.9 km by road.",
    ],
    alt: "Arrival drop-off at Cappella Embassy, artist's impression",
  },
  fac: {
    eyebrow: "Facilities",
    heading: "More than 50 facilities across about 280,000 sq ft.",
    intro: "About 70,000 sq ft of it is indoors, in Blocks D and E. The rest is a park deck on Level 3 and a sky deck on the Block E rooftop.",
    plan: "View the facilities plan",
    zones: [
      { name: "Level 3 park deck", note: "Outdoors, across the podium", items: ["Swimming pool", "Kids' pool", "Tennis court", "Basketball court", "Central park", "The Forest", "Tai chi walk", "Hydrotherapy spa", "Reading lounge", "BBQ areas", "Children's playground"] },
      { name: "Block D · Level 2", note: "Courts and gatherings", items: ["Badminton courts", "Squash courts", "Multipurpose hall", "Pre-function room", "Kids' room"] },
      { name: "Block D · Level 2U", note: "Fitness and golf", items: ["Gymnasium", "Yoga room", "Sauna", "Gym lounge", "Golf simulators", "Mini golf"] },
      { name: "Block E · Level 2U", note: "Work and play", items: ["Co-working seating", "Meeting room", "Entertainment lounge", "Gaming room", "Karaoke room", "Activity room"] },
      { name: "Block E · Level 38A", note: "The rooftop", items: ["Sky bar", "Sky garden", "Sky wellness deck", "Sky terrace party deck", "Sky observatory deck", "Pool"] },
    ],
  },
  res: {
    eyebrow: "Homes",
    heading: "Seven layouts, from two bedrooms to three plus one.",
    intro: "Choose a layout to see its plan. Tap the plan to view it full size.",
    special: "Special layouts",
    sqft: "sq ft", bed: "bed", bath: "bath", towers: "Towers", price: "Price list on request", ask: "Ask about this layout",
    notes: {
      A1: "Wet and dry kitchens, family hall, utility room", A2: "Wet and dry kitchens, study, utility room", B: "Wet and dry kitchens, utility room",
      C: "Dry kitchen, utility room", D1: "Dry kitchen, study", D2: "Dry kitchen, walk-in closet", D3: "Dry kitchen",
      BT: "Two homes behind one entrance", PH: "Three levels with a private pool",
    } as Record<LayoutKey, string>,
    towerList: { A1: "C, D", A2: "C, D", B: "A, B", C: "A – E", D1: "E", D2: "E", D3: "E", BT: "—", PH: "—" } as Record<LayoutKey, string>,
    names: { BT: "Dual key B-T", PH: "Triplex penthouse" } as Partial<Record<LayoutKey, string>>,
    type: "Type",
    showUnits: "Show units",
    showC: "Type C show unit", showD2: "Type D2 show unit",
  },
  loc: {
    eyebrow: "Location",
    heading: "In the embassy district of Ampang Hilir.",
    intro: "Distances are approximate, from the location map.",
    places: [
      ["Gleneagles Hospital Kuala Lumpur", "350 m"], ["Great Eastern Mall", "650 m"], ["The International School of Kuala Lumpur", "1.6 km"],
      ["Petronas Twin Towers", "3.9 km"], ["Prince Court Medical Centre", "4.2 km"], ["Royal Selangor Golf Club", "4.3 km"],
      ["National Heart Institute", "4.4 km"], ["Pavilion Kuala Lumpur", "4.6 km"], ["The Exchange TRX", "5.4 km"],
    ] as [string, string][],
    map: "Location map",
  },
  gal: {
    eyebrow: "Gallery", heading: "The estate, the rooms, the view.", note: "All images are artist's impressions.",
    close: "Close", prev: "Previous", next: "Next", open: "View full size",
    caps: {
      aerial: "The estate from above", gate: "Arrival gate at night", arrival: "Arrival gallery", lobby: "Lift lobby", interior: "Residence interior",
      pool: "Poolside pavilion", deck: "Pool deck", gym: "Gymnasium", golf: "Golf simulators", lounge: "Social lounge", skybar: "Sky bar",
      theatre: "Theatre room", games: "Games room", kids: "Kids' zone", hall: "Multipurpose hall", playground: "Children's playground",
    } as Record<string, string>,
  },
  reg: {
    eyebrow: "Enquire", heading: "Arrange a viewing, or ask for the price list.",
    agent: "Yee Woei Shyan · REN 46305 · IQI Realty Sdn Bhd",
    intents: ["Viewing", "Price list", "Rent or buy"],
    name: "Name", phone: "Phone / WhatsApp", email: "Email (optional)", layout: "Layout (optional)", any: "Any layout",
    send: "Send enquiry", sending: "Sending…", ok: "Thank you. We will contact you shortly.", err: "Something went wrong. Please WhatsApp us instead.",
    needName: "Please enter your name.", needPhone: "Please enter a phone number.",
    wa: "Or WhatsApp",
  },
  faq: {
    eyebrow: "Questions",
    items: [
      ["Where is Cappella Embassy?", "On Jalan Nipah, off Jalan Ampang, in Ampang Hilir, Kuala Lumpur 55000, among the embassies of the embassy district."],
      ["Is it the same as D'Rapport Residences?", "Yes. D'Rapport Residences was renamed Cappella Embassy in 2026."],
      ["When was it completed?", "Vacant possession was delivered around 2019, so homes are ready to move in."],
      ["How big is the development?", "Five towers of 38 storeys with 1,099 residences on 9.12 acres."],
      ["What layouts are there?", "Seven layouts, from 1,109 sq ft with two bedrooms to 2,260 sq ft with three bedrooms plus one, and two special layouts: a 3,918 sq ft dual-key home and a 10,635 sq ft triplex penthouse."],
      ["What facilities are there?", "More than 50, across about 280,000 sq ft: a park deck with a pool and courts on Level 3, indoor facilities in Blocks D and E, and a sky deck on the Block E rooftop."],
      ["How do I get the price list?", "Send an enquiry on this page or WhatsApp +60 12-657 9508."],
    ] as [string, string][],
  },
  foot: { line: "Independent agent site · Yee Woei Shyan REN 46305, IQI Realty Sdn Bhd · Not the developer's website · Artist's impressions" },
  float: { label: "WhatsApp", msg: "Hi, I'm interested in Cappella Embassy (D'Rapport Residences)." },
};

type Copy = typeof en;

const zh: Copy = {
  nav: { residence: "项目", facilities: "设施", homes: "户型", location: "位置", gallery: "图库", cta: "预约看房", ctaShort: "登记", other: "English", otherHref: "/", formerly: "前身 D'Rapport Residences", menuOpen: "打开菜单", menuClose: "关闭菜单" },
  hero: {
    where: "Jalan Nipah · Ampang Hilir · 吉隆坡",
    line: "使馆区 9.12 英亩土地上，五栋大楼共 1,099 个住宅，超过 50 项设施，屋顶设有空中平台。",
    cta: "预约看房", see: "看户型", alt: "Cappella Embassy 大楼黄昏效果图",
    facts: [["竣工", "2019"], ["住宅单位", "1,099"], ["占地", "9.12 英亩"], ["大楼", "五栋，38 层"]],
  },
  intro: {
    heading: "街道安静，使馆为邻，市区近在咫尺。",
    body: [
      "项目前身是 D'Rapport Residences，2026 年更名为 Cappella Embassy。它位于 Jalan Ampang 旁的 Jalan Nipah，四周是 Ampang Hilir 的各国使馆。",
      "Gleneagles 医院约 350 米，Great Eastern Mall 约 650 米，驾车到 Petronas 双峰塔约 3.9 公里。",
    ],
    alt: "Cappella Embassy 落客处效果图",
  },
  fac: {
    eyebrow: "设施",
    heading: "超过 50 项设施，总面积约 280,000 平方英尺。",
    intro: "其中约 70,000 平方英尺在室内，分布在 D 座和 E 座；其余是 3 楼的公园平台和 E 座屋顶的空中平台。",
    plan: "查看设施平面图",
    zones: [
      { name: "3 楼公园平台", note: "户外，整片裙楼平台", items: ["泳池", "儿童泳池", "网球场", "篮球场", "中央公园", "树林步道", "太极步道", "水疗中心", "阅读休息区", "烧烤区", "儿童游乐场"] },
      { name: "D 座 · 2 楼", note: "球场与聚会", items: ["羽毛球场", "壁球场", "多功能厅", "前厅", "儿童室"] },
      { name: "D 座 · 2U 楼", note: "健身与高尔夫", items: ["健身房", "瑜伽室", "桑拿", "健身休息区", "高尔夫模拟器", "迷你高尔夫"] },
      { name: "E 座 · 2U 楼", note: "工作与娱乐", items: ["共享办公区", "会议室", "娱乐休息室", "游戏室", "卡拉 OK 室", "活动室"] },
      { name: "E 座 · 38A 楼", note: "屋顶", items: ["空中酒吧", "空中花园", "空中养生平台", "空中派对露台", "空中观景台", "泳池"] },
    ],
  },
  res: {
    eyebrow: "户型",
    heading: "七种户型，从两房到三房加一。",
    intro: "选一个户型看平面图，点平面图可放大。",
    special: "特别户型",
    sqft: "平方英尺", bed: "房", bath: "卫", towers: "大楼", price: "价格表请向我们索取", ask: "询问这个户型",
    notes: {
      A1: "干湿厨房、家庭厅、工人房", A2: "干湿厨房、书房、工人房", B: "干湿厨房、工人房",
      C: "干厨房、工人房", D1: "干厨房、书房", D2: "干厨房、步入式衣帽间", D3: "干厨房",
      BT: "两户共用一个入口", PH: "三层，附私人泳池",
    },
    towerList: { A1: "C、D", A2: "C、D", B: "A、B", C: "A – E", D1: "E", D2: "E", D3: "E", BT: "—", PH: "—" },
    names: { BT: "双钥匙 B-T", PH: "三层顶楼公寓" },
    type: "户型",
    showUnits: "样板房",
    showC: "C 户型样板房", showD2: "D2 户型样板房",
  },
  loc: {
    eyebrow: "位置",
    heading: "位于 Ampang Hilir 使馆区。",
    intro: "距离为约数，取自位置图。",
    places: [
      ["Gleneagles 医院", "350 米"], ["Great Eastern Mall", "650 米"], ["吉隆坡国际学校（ISKL）", "1.6 公里"],
      ["Petronas 双峰塔", "3.9 公里"], ["Prince Court 医疗中心", "4.2 公里"], ["皇家雪兰莪高尔夫俱乐部", "4.3 公里"],
      ["国家心脏中心（IJN）", "4.4 公里"], ["Pavilion Kuala Lumpur", "4.6 公里"], ["The Exchange TRX", "5.4 公里"],
    ],
    map: "位置图",
  },
  gal: {
    eyebrow: "图库", heading: "项目、室内与景观。", note: "所有图片均为效果图，仅供参考。",
    close: "关闭", prev: "上一张", next: "下一张", open: "放大查看",
    caps: {
      aerial: "项目鸟瞰", gate: "入口大门夜景", arrival: "入口长廊", lobby: "电梯大堂", interior: "住宅室内",
      pool: "泳池凉亭", deck: "泳池平台", gym: "健身房", golf: "高尔夫模拟器", lounge: "社交酒廊", skybar: "空中酒吧",
      theatre: "影音室", games: "游戏室", kids: "儿童区", hall: "多功能厅", playground: "儿童游乐场",
    },
  },
  reg: {
    eyebrow: "登记", heading: "预约看房，或索取价格表。",
    agent: "Yee Woei Shyan · REN 46305 · IQI Realty Sdn Bhd",
    intents: ["看房", "价格表", "租或买"],
    name: "名字", phone: "电话 / WhatsApp", email: "电邮（可不填）", layout: "户型（可不填）", any: "任何户型",
    send: "发送", sending: "发送中…", ok: "谢谢，我们会尽快联系你。", err: "发送失败，请直接 WhatsApp 我们。",
    needName: "请填写名字。", needPhone: "请填写电话。",
    wa: "或直接 WhatsApp",
  },
  faq: {
    eyebrow: "常见问题",
    items: [
      ["Cappella Embassy 在哪里？", "在吉隆坡 Ampang Hilir 使馆区，Jalan Ampang 旁的 Jalan Nipah，邮区 55000。"],
      ["它就是 D'Rapport Residences 吗？", "是的。D'Rapport Residences 在 2026 年更名为 Cappella Embassy。"],
      ["什么时候竣工？", "约 2019 年交屋，现在可以直接入住。"],
      ["项目有多大？", "五栋 38 层大楼，共 1,099 个住宅，占地 9.12 英亩。"],
      ["有哪些户型？", "七种户型，从 1,109 平方英尺两房到 2,260 平方英尺三房加一；另有两种特别户型：3,918 平方英尺双钥匙单位和 10,635 平方英尺三层顶楼公寓。"],
      ["有什么设施？", "超过 50 项，总面积约 280,000 平方英尺：3 楼公园平台有泳池和球场，D 座和 E 座有室内设施，E 座屋顶有空中平台。"],
      ["怎么拿价格表？", "在本页登记，或 WhatsApp +60 12-657 9508。"],
    ],
  },
  foot: { line: "独立代理网站 · Yee Woei Shyan REN 46305，IQI Realty Sdn Bhd · 非发展商官网 · 效果图仅供参考" },
  float: { label: "WhatsApp", msg: "你好，我对 Cappella Embassy（D'Rapport Residences）有兴趣。" },
};

export const t: Copy = lang === "zh" ? zh : en;
