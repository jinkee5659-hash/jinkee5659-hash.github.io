window.COMMUNITY_SOURCES = {
  rootWiki: "https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e",
  activityArchive: "https://waytoagi.feishu.cn/wiki/So9cwfj9yiuZJ8kSfLZce7a8nrf",
  cityGroups: "https://waytoagi.feishu.cn/wiki/Ta5lw7OrEi9Nvhk6TETcAz6AnPh",
  cityGuests: "https://waytoagi.feishu.cn/wiki/ZYT9wAKXLiQUo3kaPCKcv00vnIc",
  organizerGuide: "https://waytoagi.feishu.cn/wiki/IBgWwlrp2i3lljk2Wfhc7SN6nme",
  chengduOpc: "https://waytoagi.feishu.cn/wiki/JHVywtgA6id620knO3dcovKOn7J",
  hangzhouWorldTour: "https://waytoagi.feishu.cn/wiki/GzY1wcRZtiJ4UDk3Lnqc2iYknKb",
  hangzhouOpening: "https://waytoagi.feishu.cn/wiki/HtVuwirAwia15hkxRWrcy29Rnfg"
};

const S = window.COMMUNITY_SOURCES;

window.COMMUNITY_EVENTS = {
  e16: {
    date: "2025-08-31",
    title: "AI切磋大会第16期 · AI摆摊",
    url: "https://waytoagi.feishu.cn/wiki/SeINwuTYDiSslHkB8PwcChLHnOe"
  },
  e17: {
    date: "2025-09-27",
    title: "AI切磋大会第17期 · AI+行业出圈案例",
    url: "https://waytoagi.feishu.cn/wiki/O7XewbL14iBPBUk32s3cZXxFn4c"
  },
  e18: {
    date: "2025-10-26",
    title: "AI切磋大会第18期 · 全球黑客松",
    url: "https://waytoagi.feishu.cn/wiki/BwygwEWAwiesVekrk5Pcf1qNnad"
  },
  e19: {
    date: "2025-11-30",
    title: "AI切磋大会第19期 · AI脑洞开发赛",
    url: "https://waytoagi.feishu.cn/wiki/SrdBwA4ViicRkLkL66WcDJGVnlb"
  },
  e20: {
    date: "2025-12-28",
    title: "AI切磋大会第20期 · AI年终总结分享",
    url: "https://waytoagi.feishu.cn/wiki/BnNrwKX2bi9RXhkqIwychpMgnUb"
  },
  e21: {
    date: "2026-01-25",
    title: "AI切磋大会第21期 · AI年货节",
    url: "https://waytoagi.feishu.cn/wiki/ZH2CwHTERim1REk1LnBcW2GFnKf"
  },
  e22: {
    date: "2026-03-29",
    title: "AI切磋大会第22期 · 龙虾街区",
    url: "https://waytoagi.feishu.cn/wiki/HYfvwX4LEia8Xlk4pStcUeiynFS"
  },
  e23: {
    date: "2026-04-26",
    title: "AI切磋大会第23期 · 飞书CLI专场",
    url: "https://waytoagi.feishu.cn/wiki/Lc5owNCfZiLYTHkCfJ1c9OYxnol"
  },
  e24: {
    date: "2026-05-31",
    title: "AI切磋大会第24期 · Codex轻造物局",
    url: "https://waytoagi.feishu.cn/wiki/ACKww2aJoiQOInksaD8cYEScnYg"
  }
};

const EVENT_CITY_IDS = {
  e16: [
    "beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "chengdu",
    "zhengzhou", "kunming", "wuhan", "korla", "hefei", "changzhou",
    "nanjing", "zhongshan", "puyang", "xian", "qingdao", "taiyuan",
    "suzhou", "fuzhou", "wenzhou", "huaibei", "chongqing", "ningbo",
    "changsha", "nanchang", "urumqi", "jinan", "changchun", "xiamen",
    "weihai", "cixi", "dali"
  ],
  e17: [
    "beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "chengdu",
    "weihai", "wuhan", "xiangyang", "changsha", "taiyuan", "xiamen",
    "wenzhou", "zhongshan", "fuzhou", "shenyang", "kunming", "cixi",
    "qingdao", "dongguan", "nanjing", "hefei", "xian", "tianjin",
    "urumqi", "nanchang", "ningbo", "suzhou", "jinan", "changzhou",
    "huaibei", "zhengzhou"
  ],
  e18: [
    "beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "chengdu",
    "wuhan", "kunming", "tianjin", "xiangyang", "urumqi", "hefei",
    "changzhou", "cixi", "nanjing", "jinan", "dongguan", "zhongshan",
    "zhuhai", "chongqing", "zhengzhou", "suzhou", "weihai", "ningbo",
    "xian", "nanchang", "changsha", "xiamen", "taiyuan", "wenzhou",
    "fuzhou", "dalian", "shenyang"
  ],
  e19: [
    "beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "chengdu",
    "wuhan", "xiamen", "tianjin", "zhongshan", "zhuhai", "chongqing",
    "suzhou", "xiangyang", "urumqi", "korla", "weihai", "hefei",
    "ningbo", "changzhou", "xian", "nanchang", "nanjing", "jinan",
    "taiyuan", "wenzhou", "dongguan", "fuzhou", "hohhot", "qingdao",
    "puyang"
  ],
  e20: [
    "beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "chengdu",
    "wuhan", "tianjin", "zhuhai", "chongqing", "zhengzhou", "suzhou",
    "xiangyang", "urumqi", "korla", "weihai", "hefei", "ningbo",
    "changzhou", "xian", "nanchang", "nanjing", "jinan", "taiyuan",
    "wenzhou", "dongguan", "fuzhou", "hohhot", "qingdao", "kunming",
    "cixi", "shantou", "xuzhou", "guiyang", "handan", "dali", "yancheng"
  ],
  e21: [
    "beijing", "shanghai", "guangzhou", "shenzhen", "suzhou", "hangzhou",
    "chengdu", "wuhan", "tianjin", "zhuhai", "zhongshan", "chongqing",
    "zhengzhou", "xiangyang", "urumqi", "korla", "weihai", "hefei",
    "ningbo", "changzhou", "xian", "nanchang", "nanjing", "jinan",
    "taiyuan", "wenzhou", "dongguan", "fuzhou", "hohhot", "qingdao",
    "kunming", "cixi", "shantou", "xuzhou", "guiyang", "handan",
    "dali", "dalian", "xiamen", "shijiazhuang", "haikou", "hengshui",
    "huaibei", "yichun", "shenyang", "changchun"
  ],
  e22: [
    "beijing", "shanghai", "guangzhou", "shenzhen", "suzhou", "hangzhou",
    "chengdu", "wuhan", "changsha", "tianjin", "zhuhai", "zhongshan",
    "chongqing", "zhengzhou", "xiangyang", "urumqi", "korla", "weihai",
    "hefei", "ningbo", "changzhou", "xian", "nanchang", "nanjing",
    "jinan", "taiyuan", "wenzhou", "dongguan", "fuzhou", "qingdao",
    "kunming", "cixi", "shantou", "xuzhou", "guiyang", "dali",
    "dalian", "xiamen", "shijiazhuang", "hengshui", "huaibei",
    "shenyang", "changchun", "wuxi", "zhanjiang", "yancheng", "haikou"
  ],
  e23: [
    "nanchang", "jinggangshan", "shenyang", "fuzhou", "zhuhai", "zhongshan",
    "guangzhou", "ganzhou", "beijing", "wenzhou", "guiyang", "kunming",
    "wuxi", "dongguan", "lanzhou", "changchun", "shijiazhuang", "chengdu"
  ],
  e24: [
    "beijing", "shanghai", "tianjin", "shenzhen", "hangzhou", "suzhou",
    "chengdu", "guangzhou", "taiyuan", "haikou", "xiongan", "yancheng",
    "shenyang", "xiamen", "zhanjiang", "kunming", "ganzhou", "changchun",
    "chongqing", "wenzhou", "weihai", "nanjing", "xuzhou", "wuxi",
    "guiyang", "qingdao", "changzhou", "fuzhou", "hengshui",
    "pingdingshan", "shijiazhuang", "harbin", "hongkong-macau", "dalian",
    "jinan", "ningbo", "zhengzhou", "dongguan", "nanchang", "foshan"
  ]
};

const CITY_META = [
  {
    id: "beijing",
    name: "北京",
    province: "北京市",
    region: "华北",
    coords: [116.4074, 39.9042],
    groupAvailable: true,
    organizers: ["陈星", "鲤鱼与鱼周鹏", "Xiang Zhou"],
    address: "望京科技园E座·易蓝空间 / 星地中心 / 大钟寺广场等历史会场"
  },
  {
    id: "shanghai",
    name: "上海",
    province: "上海市",
    region: "华东",
    coords: [121.4737, 31.2304],
    groupAvailable: true,
    organizers: ["陆阿吉", "秦禾屹", "Yuki", "赛博娜娜", "EasonQ"],
    address: "陆家嘴滨江中心 / 漕河泾科技绿洲 / 模速空间等历史会场"
  },
  {
    id: "guangzhou",
    name: "广州",
    province: "广东省",
    region: "华南",
    coords: [113.2644, 23.1291],
    groupAvailable: true,
    organizers: ["王贝", "黄诗程", "陈燊燊"],
    address: "华新中心 / 赫基大厦 / 唯品会总部大厦等历史会场"
  },
  {
    id: "shenzhen",
    name: "深圳",
    province: "广东省",
    region: "华南",
    coords: [114.0579, 22.5431],
    groupAvailable: true,
    organizers: ["韶华", "一枚扣子", "chamelyy"],
    address: "前海深国际前海颐都大厦5F等历史会场"
  },
  {
    id: "hangzhou",
    name: "杭州",
    province: "浙江省",
    region: "华东",
    coords: [120.1551, 30.2741],
    groupAvailable: true,
    organizers: ["DAVI冉伟", "Mona", "俞少"],
    address: "杭州东站未来数智港 / 云谷中心等历史会场",
    extraLinks: [
      { label: "杭州站 AI+X World Tour", url: S.hangzhouWorldTour },
      { label: "杭州云谷龙虾街区", url: S.hangzhouOpening }
    ]
  },
  {
    id: "suzhou",
    name: "苏州",
    province: "江苏省",
    region: "华东",
    coords: [120.5853, 31.2989],
    groupAvailable: true,
    organizers: ["Ecfa"],
    address: "中国苏州创业园 / WaytoAGI苏州OPC社区"
  },
  {
    id: "chengdu",
    name: "成都",
    province: "四川省",
    region: "西南",
    coords: [104.0665, 30.5723],
    groupAvailable: true,
    organizers: ["👍"],
    address: "天府软件园 / 桂溪广场 / 三色路333号等历史会场",
    extraLinks: [{ label: "WaytoAGI 成都 OPC 社区", url: S.chengduOpc }]
  },
  {
    id: "wuhan",
    name: "武汉",
    province: "湖北省",
    region: "华中",
    coords: [114.3054, 30.5928],
    groupAvailable: true,
    organizers: ["夜游榊"],
    address: "鄂港澳青创园5楼报告厅等历史会场"
  },
  {
    id: "xian",
    name: "西安",
    province: "陕西省",
    region: "西北",
    coords: [108.9398, 34.3416],
    groupAvailable: true,
    organizers: ["周西民", "高丹丹"],
    address: "西咸新区文创小镇 / 宁神司茶事等历史会场"
  },
  {
    id: "tianjin",
    name: "天津",
    province: "天津市",
    region: "华北",
    coords: [117.2009, 39.0842],
    groupAvailable: true,
    organizers: ["会魔法的大人"],
    address: "天津西青区智慧山南塔405"
  },
  {
    id: "wenzhou",
    name: "温州",
    province: "浙江省",
    region: "华东",
    coords: [120.6994, 27.9949],
    groupAvailable: true,
    organizers: ["诸格"],
    address: "温州数安港 / 乐清人工智能孵化器 / 未来青年人才社区等历史会场"
  },
  {
    id: "weihai",
    name: "威海",
    province: "山东省",
    region: "华东",
    coords: [122.1204, 37.5131],
    groupAvailable: true,
    organizers: ["小萌", "蜜薯翠shi翠"],
    address: "智慧谷A2国际人才港 / 河西社区党群服务中心等历史会场"
  },
  {
    id: "nanjing",
    name: "南京",
    province: "江苏省",
    region: "华东",
    coords: [118.7969, 32.0603],
    groupAvailable: true,
    organizers: ["袁"],
    address: "阿里中心湖畔会议室 / 玄武模数师学院 / 南京大数据产业基地等历史会场"
  },
  {
    id: "guiyang",
    name: "贵阳",
    province: "贵州省",
    region: "西南",
    coords: [106.6302, 26.647],
    groupAvailable: true,
    organizers: ["枫子"],
    address: "茅台商务中心 / 中天金融城等历史会场"
  },
  {
    id: "zhengzhou",
    name: "郑州",
    province: "河南省",
    region: "华中",
    coords: [113.6254, 34.7466],
    organizers: ["张梦飞", "牛鑫伟"],
    address: "郑州报业大厦 / 华丰灯饰界 / 圆方集团等历史会场"
  },
  {
    id: "kunming",
    name: "昆明",
    province: "云南省",
    region: "西南",
    coords: [102.8329, 24.8801],
    organizers: ["EricChan", "张羽昊"],
    address: "融城优郡A座 / 庾园社区等历史会场"
  },
  {
    id: "korla",
    name: "库尔勒",
    province: "新疆维吾尔自治区",
    region: "西北",
    coords: [86.1746, 41.7264],
    organizers: ["詹国勇"],
    address: "新汇嘉5楼翰林书店小圆厅"
  },
  {
    id: "hefei",
    name: "合肥",
    province: "安徽省",
    region: "华东",
    coords: [117.2272, 31.8206],
    organizers: ["tan", "炭"],
    address: "平安国际金融中心 / 模立方OPC社区等历史会场"
  },
  {
    id: "changzhou",
    name: "常州",
    province: "江苏省",
    region: "华东",
    coords: [119.9741, 31.8112],
    organizers: ["茹九儿", "老周", "小茹", "阿水"],
    address: "金坛区图书馆 / 漫柏未来人才社区 / 新科创中心等历史会场"
  },
  {
    id: "zhongshan",
    name: "中山",
    province: "广东省",
    region: "华南",
    coords: [113.3928, 22.5176],
    organizers: ["江明超"],
    address: "中山青年创业梦工场 / 中山技师学院 / 电子科技大学中山学院等历史会场"
  },
  {
    id: "puyang",
    name: "濮阳",
    province: "河南省",
    region: "华中",
    coords: [115.0292, 35.7618],
    organizers: ["吕昭波"],
    address: "绿探集团等历史会场"
  },
  {
    id: "qingdao",
    name: "青岛",
    province: "山东省",
    region: "华东",
    coords: [120.3826, 36.0671],
    organizers: ["吕杰"],
    address: "北都广场 / 金海牛能源环境产业园 / SCC青岛科技创新园等历史会场"
  },
  {
    id: "taiyuan",
    name: "太原",
    province: "山西省",
    region: "华北",
    coords: [112.5489, 37.8706],
    organizers: ["邦主"],
    address: "君泰时代公馆 / 信达国际金融中心 / 太原市府西街等历史会场"
  },
  {
    id: "fuzhou",
    name: "福州",
    province: "福建省",
    region: "华东",
    coords: [119.2965, 26.0745],
    organizers: ["Westing", "李晓飞", "wst"],
    address: "人工智能产业加速中心 / 洋下党群服务中心 / 双福灯饰智能灯光等历史会场"
  },
  {
    id: "huaibei",
    name: "淮北",
    province: "安徽省",
    region: "华东",
    coords: [116.7983, 33.9562],
    organizers: ["飞书用户2023AT"],
    address: "淮北职业技术学院 / 科创中心科技产业园等历史会场"
  },
  {
    id: "chongqing",
    name: "重庆",
    province: "重庆市",
    region: "西南",
    coords: [106.5516, 29.563],
    organizers: ["张涵", "乐源", "涂超", "大宇", "伏羲"],
    address: "海王星科技大厦博拉AI模创空间 / 自由村社区等历史会场"
  },
  {
    id: "ningbo",
    name: "宁波",
    province: "浙江省",
    region: "华东",
    coords: [121.5504, 29.8746],
    organizers: ["Tanya", "严婷婷"],
    address: "老外滩党群服务中心 / 江北区赋能中心 / 香溢软件园等历史会场"
  },
  {
    id: "changsha",
    name: "长沙",
    province: "湖南省",
    region: "华中",
    coords: [112.9388, 28.2282],
    organizers: ["刘洋", "咯咯哒"],
    address: "世界计算·长沙智谷 / 湖南工商大学 / 海梦岛创新社区等历史会场"
  },
  {
    id: "nanchang",
    name: "南昌",
    province: "江西省",
    region: "华东",
    coords: [115.8582, 28.6829],
    organizers: ["Aiven Yi", "殷磊", "瑶瑶"],
    address: "信通院江西研究院 / 上海正策(南昌)律师事务所 / 江西软件职业技术大学等历史会场",
    wechat: "lanleyao（瑶瑶，5月31日活动页公开）"
  },
  {
    id: "urumqi",
    name: "乌鲁木齐",
    province: "新疆维吾尔自治区",
    region: "西北",
    coords: [87.6168, 43.8256],
    organizers: ["詹国勇", "心一"],
    address: "乌鲁木齐市图书馆三楼研学空间"
  },
  {
    id: "jinan",
    name: "济南",
    province: "山东省",
    region: "华东",
    coords: [117.1201, 36.6512],
    organizers: ["JK", "袁先剑"],
    address: "齐鲁软件园 / 鲁商国奥城 / 济南工匠学院等历史会场"
  },
  {
    id: "changchun",
    name: "长春",
    province: "吉林省",
    region: "东北",
    coords: [125.3235, 43.8171],
    groupAvailable: true,
    organizers: ["田志伟", "赵洋"],
    address: "摆渡创新工厂 / GIGO吉广AI创意产业学院 / 中国一汽等历史会场"
  },
  {
    id: "xiamen",
    name: "厦门",
    province: "福建省",
    region: "华东",
    coords: [118.0894, 24.4798],
    organizers: ["洪"],
    address: "软件园三期 / 鱼粥咖啡 / 新领荟星巴克臻选等历史会场"
  },
  {
    id: "cixi",
    name: "慈溪",
    province: "浙江省",
    region: "华东",
    coords: [121.2665, 30.1697],
    organizers: ["徐琴Jossolo"],
    address: "环创中心湖畔大讲堂 / 观海卫社区教育学院等历史会场"
  },
  {
    id: "dali",
    name: "大理",
    province: "云南省",
    region: "西南",
    coords: [100.2676, 25.6065],
    organizers: ["小孙同学"],
    address: "大理家海房子"
  },
  {
    id: "xiangyang",
    name: "襄阳",
    province: "湖北省",
    region: "华中",
    coords: [112.1441, 32.0422],
    organizers: ["阿蔡"],
    address: "湖北文理学院 / 襄阳人才大厦 / 鸿蒙智行用户体验中心等历史会场"
  },
  {
    id: "zhuhai",
    name: "珠海",
    province: "广东省",
    region: "华南",
    coords: [113.5767, 22.2707],
    organizers: ["江明超"],
    address: "香洲创港中心 / 中电南方软件园 / 北京理工大学珠海校区等历史会场"
  },
  {
    id: "dongguan",
    name: "东莞",
    province: "广东省",
    region: "华南",
    coords: [113.7518, 23.0207],
    organizers: ["黄业博", "林钦明", "陈美欣"],
    address: "松山湖XbotPark / OPark梦想家创业公园 / 全球跨境技术贸易大湾区中心等历史会场",
    wechat: "qq498493287（5月31日活动页公开）"
  },
  {
    id: "hohhot",
    name: "呼和浩特",
    province: "内蒙古自治区",
    region: "华北",
    coords: [111.7492, 40.8426],
    organizers: ["大鹏"],
    address: "水岸小镇D区7号楼模创空间 / 留学人员创业园"
  },
  {
    id: "shantou",
    name: "汕头",
    province: "广东省",
    region: "华南",
    coords: [116.6819, 23.3541],
    organizers: ["张少斌"],
    address: "深汕数字科创产业园12号楼会议中心"
  },
  {
    id: "xuzhou",
    name: "徐州",
    province: "江苏省",
    region: "华东",
    coords: [117.2841, 34.2058],
    organizers: ["Echo"],
    address: "京东云（徐州）AI安全创新科技示范中心 / 江苏淮海科技城等历史会场"
  },
  {
    id: "handan",
    name: "邯郸",
    province: "河北省",
    region: "华北",
    coords: [114.5391, 36.6256],
    organizers: ["宫莉"],
    address: "邯郸市丛台区光明北大街三龙商贸B座15层"
  },
  {
    id: "yancheng",
    name: "盐城",
    province: "江苏省",
    region: "华东",
    coords: [120.1636, 33.3475],
    organizers: ["唐建", "唐舰长"],
    address: "新生OPC文创园 / 盐龙湖人才会客厅 / 数字科创空间等历史会场"
  },
  {
    id: "dalian",
    name: "大连",
    province: "辽宁省",
    region: "东北",
    coords: [121.6147, 38.914],
    organizers: ["赵军", "云旗", "飞书用户7296JT"],
    address: "佳兆业三楼且漾书店等历史会场",
    wechat: "xdd138409（赵军，5月31日活动页公开）"
  },
  {
    id: "shenyang",
    name: "沈阳",
    province: "辽宁省",
    region: "东北",
    coords: [123.4315, 41.8057],
    organizers: ["朴圣堃", "田志伟", "叶宗桂"],
    address: "浑南国际软件园 / 沈阳科技学院 / 闪念书店等历史会场"
  },
  {
    id: "shijiazhuang",
    name: "石家庄",
    province: "河北省",
    region: "华北",
    coords: [114.5149, 38.0428],
    organizers: ["用户449372", "李国宝"],
    address: "融冀中心 / 安吉书院等历史会场"
  },
  {
    id: "haikou",
    name: "海口",
    province: "海南省",
    region: "华南",
    coords: [110.3312, 20.0311],
    organizers: ["刘珍伲", "甲九"],
    address: "多巴胺街 / 和风家园蓝天居等历史会场"
  },
  {
    id: "hengshui",
    name: "衡水",
    province: "河北省",
    region: "华北",
    coords: [115.6689, 37.7399],
    organizers: ["颦儿", "田颖芊"],
    address: "衡水市图书馆 / 九州国际博览城等历史会场"
  },
  {
    id: "yichun",
    name: "宜春奉新",
    province: "江西省",
    region: "华东",
    coords: [115.3899, 28.7007],
    organizers: [],
    address: "江西省宜春市奉新县文体中心"
  },
  {
    id: "wuxi",
    name: "无锡",
    province: "江苏省",
    region: "华东",
    coords: [120.3119, 31.4912],
    organizers: ["唐淼（AMiao）", "薛沣", "王彦桥", "嘉琛", "无锡一棵树"],
    address: "无锡商院物联网学院 / 软件园天鹅座 / 滨湖区图书馆等历史会场"
  },
  {
    id: "zhanjiang",
    name: "湛江",
    province: "广东省",
    region: "华南",
    coords: [110.3594, 21.2707],
    organizers: ["手工编码师", "罗东"],
    address: "融创空间"
  },
  {
    id: "jinggangshan",
    name: "井冈山",
    province: "江西省",
    region: "华东",
    coords: [114.2896, 26.7481],
    organizers: ["龚超", "殷磊"],
    address: "江西软件职业技术大学井冈山校区"
  },
  {
    id: "ganzhou",
    name: "赣州",
    province: "江西省",
    region: "华东",
    coords: [114.935, 25.8311],
    organizers: ["周苏景", "飞书用户7677MT", "陈煜婕"],
    address: "赣州市章贡区长征大道18号赣州移动四楼咖啡厅"
  },
  {
    id: "lanzhou",
    name: "兰州",
    province: "甘肃省",
    region: "西北",
    coords: [103.8343, 36.0611],
    organizers: ["蒋昀杉"],
    address: "南稍门社区党群活动服务中心"
  },
  {
    id: "harbin",
    name: "哈尔滨",
    province: "黑龙江省",
    region: "东北",
    coords: [126.535, 45.8038],
    organizers: ["用户076695", "飞书用户3095QJ"],
    address: "哈尔滨市南岗区军工院船舶大厦"
  },
  {
    id: "pingdingshan",
    name: "平顶山",
    province: "河南省",
    region: "华中",
    coords: [113.1926, 33.7662],
    organizers: ["辰川", "王成龙"],
    address: "平顶山数字产业创新基地一楼路演厅"
  },
  {
    id: "xiongan",
    name: "雄安新区",
    province: "河北省",
    region: "华北",
    coords: [115.94, 39.04],
    organizers: ["郝风飞"],
    address: "雄安新区中关村科技园"
  },
  {
    id: "foshan",
    name: "佛山",
    province: "广东省",
    region: "华南",
    coords: [113.1214, 23.0215],
    organizers: [],
    address: "佛山市顺德区北滘镇丰明中心14F",
    wechat: "wss544--（5月31日活动页公开）"
  },
  {
    id: "hongkong-macau",
    name: "中国港澳",
    province: "港澳地区",
    region: "华南",
    coords: [113.5439, 22.1987],
    organizers: ["Jacky Ma"],
    address: "中国澳门威尼斯人金光会展"
  }
];

window.COMMUNITY_CITIES = CITY_META.map((city) => {
  const eventIds = getEventIds(city.id);
  const activities = eventIds
    .map((eventId) => ({ id: eventId, ...window.COMMUNITY_EVENTS[eventId] }))
    .sort((a, b) => b.date.localeCompare(a.date));
  const latest = activities[0];
  const links = [
    ...(latest ? [{ label: "最近活动页", url: latest.url }] : []),
    { label: "城市组织人指南", url: S.organizerGuide },
    ...(city.groupAvailable ? [{ label: `${city.name}城市群入口`, url: S.cityGroups }] : []),
    { label: "城市嘉宾页", url: S.cityGuests },
    ...(city.extraLinks || [])
  ];

  return {
    ...city,
    status: getStatus(activities.length, city.groupAvailable),
    activities,
    activityCount: activities.length,
    nextEvent: latest ? latest.title : "",
    links,
    phone: city.phone || "",
    wechat: city.wechat || "",
    notes: [
      `已从知识库活动页汇总 ${activities.length} 条历史活动记录。`,
      city.groupAvailable ? "知识库中已有城市群入口。" : "城市群入口待进一步补充。",
      "负责人仅收录公开活动页或组织人指南中出现的名称，未公开的手机号/微信保持空白。"
    ].join("")
  };
});

function getEventIds(cityId) {
  return Object.entries(EVENT_CITY_IDS)
    .filter(([, cityIds]) => cityIds.includes(cityId))
    .map(([eventId]) => eventId);
}

function getStatus(activityCount, groupAvailable) {
  if (activityCount >= 7) return "hub";
  if (activityCount >= 4) return "active";
  if (activityCount > 0) return "history";
  if (groupAvailable) return "group";
  return "directory";
}
