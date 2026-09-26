// Facts: the site's own content and FAQ schema (developer records). Contact numbers in the FAQ are the site's own.
export default {
  siteUrl: "https://www.d-rapport.com",
  title: { en: "Cappella Embassy (formerly D'Rapport Residences), Ampang Hilir, Kuala Lumpur", zh: "Cappella Embassy（前称 D'Rapport Residences），吉隆坡安邦希里" },
  description: { en: "Cappella Embassy: a completed (2020) low-density condominium of 1,099 units in five towers on 9.12 acres at Jalan Nipah, Ampang Hilir, Kuala Lumpur. Sizes 1,108–2,260 sq ft, facilities, FAQ.", zh: "Cappella Embassy：吉隆坡安邦希里 Jalan Nipah 已竣工（2020 年）的低密度公寓，五座塔楼共 1,099 个单位，占地 9.12 英亩。面积 1,108–2,260 平方英尺、设施与常见问题。" },
  tagline: { en: "Completed 2020 · Ampang Hilir, Kuala Lumpur", zh: "2020 年已竣工 · 吉隆坡安邦希里" },
  ogImage: "https://lh3.googleusercontent.com/d/1Vl3T3BzDlKwmKbW3PM4VXxP27Op-cSlm=w1200",
  heroAlt: { en: "Cappella Embassy towers, Ampang Hilir", zh: "Cappella Embassy 塔楼，安邦希里" },
  summary: {
    en: [
      "Cappella Embassy, formerly D'Rapport Residences, is a completed condominium in Ampang Hilir, the embassy district of Kuala Lumpur, on Jalan Nipah off Jalan Ampang. Five towers hold 1,099 units on 9.12 acres; the development was completed in 2020, so units are ready for occupation.",
      "Layouts run from about 1,108 sq ft two-bedroom suites to 2,260 sq ft three-plus-one-bedroom homes, including corner and dual-key units. The project is marketed under TSLAW Land (formerly D'Rapport Residences by Acmar Group). Prices depend on the unit, floor and availability; ask for the current list."
    ],
    zh: [
      "Cappella Embassy 前称 D'Rapport Residences，位于吉隆坡使馆区安邦希里，Jalan Ampang 旁的 Jalan Nipah。五座塔楼共 1,099 个单位，占地 9.12 英亩；项目 2020 年已竣工，单位可即时入住。",
      "户型从约 1,108 平方英尺的两房到 2,260 平方英尺的三加一房，包括角落单位和双钥匙单位。项目以 TSLAW Land 名义销售（前称 Acmar 集团的 D'Rapport Residences）。价格视单位、楼层和库存而定，请索取最新价格表。"
    ]
  },
  facts: [
    { label: { en: "Project", zh: "项目" }, value: "Cappella Embassy (formerly D'Rapport Residences)" },
    { label: { en: "Location", zh: "地点" }, value: { en: "Jalan Nipah, off Jalan Ampang, Ampang Hilir, 55000 Kuala Lumpur", zh: "吉隆坡安邦希里 Jalan Nipah（Jalan Ampang 旁），55000" } },
    { label: { en: "Status", zh: "状态" }, value: { en: "Completed 2020", zh: "2020 年已竣工" } },
    { label: { en: "Units", zh: "单位数" }, value: { en: "1,099 in five towers", zh: "五座塔楼共 1,099 个" } },
    { label: { en: "Land size", zh: "地段面积" }, value: { en: "9.12 acres", zh: "9.12 英亩" } },
    { label: { en: "Built-up", zh: "面积" }, value: { en: "about 1,108 – 2,260 sq ft", zh: "约 1,108 – 2,260 平方英尺" } },
    { label: { en: "Bedrooms", zh: "房数" }, value: { en: "2 to 3+1", zh: "2 至 3+1 房" } },
    { label: { en: "Marketed under", zh: "销售名义" }, value: "TSLAW Land (formerly D'Rapport Residences by Acmar Group)" }
  ],
  highlights: {
    en: ["Completed development: units ready for occupation", "11,000 sq ft gym, indoor badminton arena, squash and basketball courts", "Resort-style Olympic-length lap pool", "Sky gardens on the 38th floor with views towards KL City Centre", "Embassy district location, a short drive from the Petronas Twin Towers"],
    zh: ["已竣工项目，单位可即时入住", "11,000 平方英尺健身房、室内羽毛球馆、壁球场和篮球场", "度假式奥林匹克长度泳池", "38 楼空中花园，可望向吉隆坡市中心", "使馆区位置，驾车不远即达双峰塔"]
  },
  faqs: {
    zh: [
      { q: "Cappella Embassy 在哪里？", a: "吉隆坡安邦希里 Jalan Nipah（Jalan Ampang 旁），邮区 55000，使馆区，驾车不远即达吉隆坡市中心和双峰塔。" },
      { q: "项目竣工了吗？", a: "是，2020 年已竣工，单位可即时入住，不是在建项目。" },
      { q: "项目多大、有多少单位？", a: "占地 9.12 英亩，五座住宅塔楼共 1,099 个单位。" },
      { q: "有哪些户型和面积？", a: "从约 1,108 平方英尺的两房到 2,260 平方英尺的三加一房（四加一浴），包括角落单位和双钥匙单位。" },
      { q: "有什么设施？", a: "11,000 平方英尺健身房、室内羽毛球馆、壁球场和篮球场、度假式奥林匹克长度泳池、38 楼空中花园等。" },
      { q: "发展商是谁？", a: "项目以 TSLAW Land 名义销售（前称 Acmar 集团的 D'Rapport Residences）。" },
      { q: "怎么安排看房？", a: "用本页的登记表格，或 WhatsApp +60 12-657 9508 预约看房并索取价格表和户型图。" }
    ]
  },
  schema: { address: { "@type": "PostalAddress", "streetAddress": "Jalan Nipah, Off Jalan Ampang", "addressLocality": "Ampang Hilir, Kuala Lumpur", "postalCode": "55000", "addressCountry": "MY" }, geo: { latitude: 3.1585, longitude: 101.7371 }, units: 1099 },
  portalUrl: null,
  updated: "September 2026", updatedZh: "2026 年 9 月", gsc: null
};
