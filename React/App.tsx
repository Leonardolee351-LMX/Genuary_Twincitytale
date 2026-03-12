import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Mr. Hu's images
import imgHuCard from "./images/imgHuCard.png";
import imgHuPortrait from "./images/imgHuPortrait.png";
import imgHuTL1 from "./images/imgHuTL (1).png";
import imgHuTL2 from "./images/imgHuTL (2).png";
import imgHuTL3 from "./images/imgHuTL (3).png";
import imgHuTL4 from "./images/imgHuTL (4).png";
import imgHuTL5 from "./images/imgHuTL (5).png";
import imgHuTL6 from "./images/imgHuTL (6).png";
import imgHuTL7 from "./images/imgHuTL (7).png";
import imgHuTL8 from "./images/imgHuTL (8).png";

// Lei Lei's images
import imgLeiCard from "./images/imgLeiCard.png";
import imgLeiPortrait from "./images/imgLeiPortrait.png";
import imgLeiTL1 from "./images/imgLeiTL (1).png";
import imgLeiTL2 from "./images/imgLeiTL (2).png";
import imgLeiTL3 from "./images/imgLeiTL (3).png";
import imgLeiTL4 from "./images/imgLeiTL (4).png";
import imgLeiTL5 from "./images/imgLeiTL (5).png";
import imgLeiTL6 from "./images/imgLeiTL (6).png";
import imgLeiTL7 from "./images/imgLeiTL (7).png";
import imgLeiTL8 from "./images/imgLeiTL (8).png";

// Zhang's images
import imgZhangCard from "./images/imgZhangCard.png";
import imgZhangPortrait from "./images/imgZhangPortrait.png";
import imgZhangTL1 from "./images/imgZhangTL (1).png";
import imgZhangTL2 from "./images/imgZhangTL (2).png";
import imgZhangTL3 from "./images/imgZhangTL (3).png";
import imgZhangTL4 from "./images/imgZhangTL (4).png";
import imgZhangTL5 from "./images/imgZhangTL (5).png";
import imgZhangTL6 from "./images/imgZhangTL (6).png";
import imgZhangTL7 from "./images/imgZhangTL (7).png";
import imgZhangTL8 from "./images/imgZhangTL (8).png";
import imgZhangTL9 from "./images/imgZhangTL (9).png";

// Polin's images
import imgPolinCard from "./images/imgPolinCard.png";
import imgPolinPortrait from "./images/imgPolinPortrait.png";

interface PersonaData {
  id: string;
  name: string;
  nameEn: string;
  age: number;
  role: string;
  description: string;
  heroImage: string;
  avatarImage: string;
  avatarOverlay?: string;
  motivation: string;
  adaptLiving: string[];
  challenges: string[];
  thoughts: string[];
  timeline: TimelineItem[];
}

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  image: string;
}

const personasData: PersonaData[] = [
  {
    id: "leilei",
    name: "leilei",
    nameEn: "Lei",
    age: 10,
    role: "跨境学童",
    description: "一个充满想象力的小孩",
    heroImage: imgLeiPortrait,
    avatarImage: imgLeiCard,
    motivation: "由于香港的教育资源丰厚，且在深圳获取教育资源需要漫长的排号。跨境接受教育成为了最好的生活模式。磊磊也因此开始了他的跨境生活",
    adaptLiving: [
      "居住决策：搬到口岸附近，压缩通勤时间；",
      "通勤安排：依赖跨境校巴、带队服务（保姆公司）；",
      "家庭日常：证件管理、早起作息高度制度化；",
      "应急准备：预留临时住宿/误点补救方案。"
    ],
    challenges: [
      "'迟到风险'是每天的高压源。早期通关赶小巴。任何环节延误都可能连锁反应。她害怕因为迟到被老师罚站",
      "长期疲惫与健康损耗。早起+长通勤会压缩睡眠；疲惫积累会影响免疫力、注意力与情绪稳定",
      "社交困难与身份认同障碍。课后活动缺席，'夹层感'强。放学后的聚会活动、补习衔接会被返程时间切割；"
    ],
    thoughts: [
      "蕾蕾很喜欢贴在学校公交车上的小贴纸和带队老师给大家的棒棒糖。车上偶尔会有其他小朋友在哭闹，但是她看着好看的贴纸和手上的棒棒糖，感觉一直嘟嘟叫的小巴士里面也是一个别人观察不到的小乐园。",
      "蕾蕾在车上的时候偶尔会想，为什么她不能和别的孩子一样放学一起去小卖部或者游乐园玩，而是要在车上呆着呢？我究竟是属于哪里呢？",
      "实际上，支撑她每天'准点出现'的，是一整套看不见的东西：口岸的分流与查验、学童高峰的组织、跨境校巴的配额与线路、带队服务的劳务网络、家长群里互通的口岸拥挤信息——这些资源拼在一起，才把一个孩子的'上学权利'变成现实。"
    ],
    timeline: [
      {
        time: "6:20",
        title: "Get Up",
        description: "在天还没亮的时候，磊磊就需要从床上匆忙醒来，洗漱吃早饭。对于磊磊和家长来说，一天从'赶'开始。不是'上学'，是'先通关'。任何一个环节卡住就会迟到。",
        image: imgLeiTL1
      },
      {
        time: "6:30",
        title: "Forward to Border",
        description: "为压缩通勤，家里人搬到福田或罗湖等口岸周边；磊磊家到口岸约20分钟。迟到的第一大风险就是起床时间，只要抵达关口，被老师罚站的风险就降低了一分。",
        image: imgLeiTL2
      },
      {
        time: "6:50",
        title: "Waiting for passing",
        description: "口岸对蕾蕾来说不是边界，是'队列'。她习惯了大人们的指令：跟紧、别说话、别乱跑、车上不能吃东西。跨境学童通道中的点名、排队、过闸、再点名，对孩子来说不叫系统，它叫'有人管我'。",
        image: imgLeiTL3
      },
      {
        time: "7:10",
        title: "StudentPort Gather",
        description: "只要上了那辆车，今天大概率就稳了。她坐在靠窗的位置，车厢里有同样穿校服的孩子，大家都困，没人说话，只有塑料袋摩擦的声音和偶尔的打哈欠。",
        image: imgLeiTL4
      },
      {
        time: "8:30",
        title: "Arrive At school",
        description: "到了学校，她反而轻松了。课堂是稳定的、可预测的，老师、同学、钟声、作业——这些都比口岸更像'生活'。",
        image: imgLeiTL5
      },
      {
        time: "12:00",
        title: "Having Dinner",
        description: "香港没有午休的习惯，所以蕾蕾需要尽快吃完午饭，然后立刻开始下午的第一堂课",
        image: imgLeiTL6
      },
      {
        time: "15:00",
        title: "Afterschool",
        description: "在某个午后突然愣一下：同学们放学后去补习、去同学生日会、去公园，她却要和同学说一声拜拜，只为开始第二轮'赶'，尽早回家",
        image: imgLeiTL7
      },
      {
        time: "15:30",
        title: "Afterschool",
        description: "在公交车等待的时间是漫长的，蕾蕾需要在车上写一部分作业，回家后的负担才会没那么大。但是车辆很颠簸，手上的笔迹也颤颤抖抖",
        image: imgLeiTL8
      },
      {
        time: "17:30",
        title: "Cross the Border",
        description: "终于抵达边境。此时的她已经饿了，只希望尽快过边境然后回家等待妈妈的晚饭",
        image: imgLeiTL3
      },
      {
        time: "18:30",
        title: "Go back home",
        description: "过关后坐公交车回家。妈妈还没做好饭于是就看动画片等待饭做完",
        image: imgLeiTL8
      }
    ]
  },
  {
    id: "mrhu",
    name: "胡先生",
    nameEn: "Mr. Hu",
    age: 35,
    role: "跨境工作",
    description: "港深双城生活，职场精英",
    heroImage: imgHuPortrait,
    avatarImage: imgHuCard,
    motivation: "在香港金融行业工作，但选择住在深圳以节省生活成本。深圳的房价相对合理，生活品质也不错，而香港的高薪能支撑更好的生活质量。",
    adaptLiving: [
      "办理了多次往返签注，通关已经非常熟练",
      "在深圳享受更宽敞的居住空间和更低的生活成本",
      "周末会在深圳和朋友聚会，享受内地的便利生活"
    ],
    challenges: [
      "每天通勤消耗大量时间和精力",
      "工作加班时无法及时回家，需要临时住宿",
      "两地医疗和社保制度不同，就医不便"
    ],
    thoughts: [
      "跨境工作让你既能赚香港的薪水，又能享受深圳的生活",
      "希望未来两地融合能更深入，减少通关障碍",
      "这种生活方式需要很强的时间管理能力"
    ],
    timeline: [
      {
        time: "7:20",
        title: "Departure",
        description: "他的早晨永远带着一个隐形倒计时：晚一分钟出门，口岸可能就多排十五分钟；踩不到节奏，9点前到公司的'稳定叙事'就会崩掉。早起就是一场战斗",
        image: imgHuTL1
      },
      {
        time: "7:40",
        title: "Arrived At Border",
        description: "偶尔时间匆忙他会把车开到露天停车场。把车停到海关附近后，整理形象，检查证件，就可以开始刷卡过关了",
        image: imgHuTL2
      },
      {
        time: "7:55",
        title: "Waiting for passing",
        description: "偶尔时间匆忙他会把车开到露天停车场。把车停到海关附近后，整理形象，检查证件，就可以开始刷卡过关了",
        image: imgHuTL3
      },
      {
        time: "8:10",
        title: "Metro Transfer",
        description: "早高峰的地铁人总是很多。但是上班前需要注意形象。跨境后的香港地铁通勤是最漫长的等待时间。有时他也担心会因为地铁而迟到",
        image: imgHuTL4
      }
    ]
  },
  {
    id: "zhang",
    name: "Zhang",
    nameEn: "Zhang",
    age: 23,
    role: "香港硕士",
    description: "赴港深造，爱好逛街与演唱会",
    heroImage: imgZhangPortrait,
    avatarImage: imgZhangCard,
    motivation: "工作一年后来到香港深造。选择来到香港不仅是希望转行Marketing相关行业，同时香港的职场与日常生活对于女性更加友好。",
    adaptLiving: [
      "选课自由，自由时间多。为了能减少通勤开支，她会把课程集中到三天来上课，剩下的时间就可以实习或游乐。",
      "因为课程密集，中午不追求精致午餐，优先解决'能睡一会儿'的地点（图书馆角落/学生中心沙发/空教室）"
    ],
    challenges: [
      "早课=必须准点，任何口岸拥堵/交通延误都会让她整天节奏崩盘。",
      "长期早起+跨境折返，午睡变成刚需；一累就很难保持课堂专注与产出。",
      "由于也有不少人与她一样港读深居，因此社交上不会有过多障碍。但她与香港的生活文化依旧存在一层薄膜。"
    ],
    thoughts: [
      "我不是不想参与同学的after class，我是真的回不去那么晚。而且深圳的饭菜和shopping环境不香吗哈哈",
      "我最羡慕住港岛的同学：他们下课回家就能去海边city-walk，而我只有说下午没课的时候才能偶尔在香港街边种草散步玩耍",
      "幸好在香港还有我的姐妹居住，不然晚上听完演唱会很晚了就没地方住了。晚上的边境口岸并不是所有都会开放，凌晨的深港通勤难度还是很大很大的。"
    ],
    timeline: [
      {
        time: "6:55",
        title: "Departure",
        description: "她在闹钟声模糊醒来，在家里思索需要带什么东西出发去学校。证件，早餐出门前检查一遍。",
        image: imgZhangTL1
      },
      {
        time: "7:30",
        title: "On the way",
        description: "深圳的清晨很安静，她在地铁上上默默吃早餐。香港的公交上不能进食任何食物",
        image: imgZhangTL2
      },
      {
        time: "7:55",
        title: "Arrived at Border",
        description: "人流变成一条线，她开始进入'自动模式'：刷证、走路、跟队。有些时候她会忘记带证件，这对他而言就是毁灭打击。",
        image: imgZhangTL3
      },
      {
        time: "8:10",
        title: "Metro Transfer",
        description: "早高峰的地铁人总是很多。但是上班前需要注意形象。跨境后的香港地铁通勤是最漫长的等待时间。今天她买了优先座，1想坐着慢慢恢复经历",
        image: imgZhangTL4
      },
      {
        time: "9:15",
        title: "Arrive the company",
        description: "进到学校校门的那一刻，她意识到快要上课了，她加快了脚步前往教室",
        image: imgZhangTL5
      },
      {
        time: "12:00",
        title: "Group Work",
        description: "为了减少通勤开支合理支配时间，她选了三堂课在一天同事上完，这也意味着今天她的小组讨论和课程很繁忙。她要坚持不睡午觉。",
        image: imgZhangTL6
      },
      {
        time: "19:25",
        title: "CityWalk Wander",
        description: "下课后她并不着急回家。她想在香港再溜达犹豫一会，呼吸一下新鲜空气。于是用着为数不多的时间citywalk了一会。有时会兴奋忘记回家。",
        image: imgZhangTL7
      },
      {
        time: "20:30",
        title: "Cross the Border",
        description: "依旧是排队，刷卡，等待过境。手机信号往往在这里需要切换。幸好晚上过关速度快，毕竟人没有那么多了。",
        image: imgZhangTL8
      },
      {
        time: "21:00",
        title: "Go back home",
        description: "回到家一边吃外卖一边写作业",
        image: imgZhangTL9
      }
    ]
  },
  {
    id: "polin",
    name: "Polin",
    nameEn: "Polin",
    age: 28,
    role: "北上消费",
    description: "香港居民，深圳购物达人",
    heroImage: imgPolinPortrait,
    avatarImage: imgPolinCard,
    motivation: "作为土生土长的香港人，她发现深圳的消费环境更丰富多样且价格实惠。从美食到购物，从美容到娱乐，深圳都提供了更多选择和性价比。",
    adaptLiving: [
      "周末必定北上，已经办理了深圳通等便利卡",
      "熟悉深圳各大商圈，从罗湖到福田，从南山到前海",
      "和朋友组团消费，分享各种折扣和优惠信息"
    ],
    challenges: [
      "需要合理安排时间，避免在口岸浪费太多通关时间",
      "携带大量购物品过关时需要注意海关规定",
      "有时会因为消费太尽兴而错过最后的过关时间"
    ],
    thoughts: [
      "深圳的消费真的太香了！同样的价格能买到更多东西",
      "每次北上都像是探险，总能发现新的好店和美食",
      "希望通关能更便利，这样就能更频繁地来深圳了"
    ],
    timeline: [
      {
        time: "10:00",
        title: "Start Journey",
        description: "周末早晨睡到自然醒，化个精致的妆，准备今天的北上购物之旅。提前在小红书上做好功课，标记了几家想去的网红店。",
        image: imgZhangTL1
      },
      {
        time: "11:00",
        title: "Arrive Shenzhen",
        description: "顺利过关抵达深圳。用八达通刷卡进地铁，熟练地换乘前往罗湖商圈。深圳的消费氛围让她兴奋不已。",
        image: imgZhangTL2
      },
      {
        time: "12:30",
        title: "Lunch Time",
        description: "和闺蜜在网红餐厅打卡，点了满满一桌菜。相比香港，这里的价格实在太友好了，拍照发朋友圈分享今日份美食。",
        image: imgZhangTL3
      },
      {
        time: "14:00",
        title: "Shopping",
        description: "开始商场扫货模式。从服装到化妆品，从数码产品到家居用品，购物车越来越满。每一件都比香港便宜不少。",
        image: imgZhangTL4
      },
      {
        time: "16:30",
        title: "Beauty Treatment",
        description: "预约好的美容院做facial和美甲。深圳的美容服务专业又实惠，这是她每次北上必做的项目之一。",
        image: imgZhangTL5
      },
      {
        time: "18:00",
        title: "Dinner",
        description: "晚餐和朋友们聚会，去了一家很火的火锅店。边吃边聊今天的战利品，大家都满载而归。",
        image: imgZhangTL6
      },
      {
        time: "20:00",
        title: "Return Home",
        description: "提着大包小包准备回香港。虽然有点累，但看着今天的收获，心情格外愉悦。已经开始期待下个周末的行程了。",
        image: imgZhangTL7
      }
    ]
  }
];

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaData>(personasData[0]);
  const [scrollY, setScrollY] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [activeThoughtIndex, setActiveThoughtIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setScrollY(contentRef.current.scrollTop);
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Reset thought index when persona changes
  useEffect(() => {
    setActiveThoughtIndex(0);
  }, [selectedPersona.id]);

  // Timeline scroll sync
  useEffect(() => {
    if (timelineRef.current) {
      const handleTimelineScroll = () => {
        const container = timelineRef.current;
        if (!container) return;
        
        const scrollLeft = container.scrollLeft;
        const cardWidth = 280 + 24;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveTimelineIndex(index);
      };
      
      const container = timelineRef.current;
      container.addEventListener('scroll', handleTimelineScroll);
      return () => container.removeEventListener('scroll', handleTimelineScroll);
    }
  }, []);

  // Handle mouse wheel horizontal scroll
  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9F9] to-white overflow-hidden">
      {/* Left Column - Hero Background (Fixed, 35vw) */}
      <div className="fixed left-0 top-0 w-[35vw] h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPersona.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <img
              src={selectedPersona.heroImage}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Column - Content Area (Scrollable, 65vw) */}
      <div 
        ref={contentRef}
        className="ml-[35vw] h-screen overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          {/* Persona Selection Cards */}
          <div className="flex justify-between mb-12">
            {personasData.map((persona) => (
              <motion.button
                key={persona.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPersona(persona)}
                className={`relative rounded-[20px] px-6 py-4 flex flex-col items-center gap-3 transition-all duration-300 min-w-[180px] ${
                  selectedPersona.id === persona.id
                    ? 'bg-white/80 ring-2 ring-[#4DB6AC] shadow-[0_8px_32px_rgba(77,182,172,0.3)] backdrop-blur-[10px]'
                    : 'bg-white/60 opacity-60 hover:opacity-100 shadow-[0_4px_16px_rgba(184,214,214,0.2)] backdrop-blur-[10px]'
                }`}
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white/50">
                  <img
                    src={persona.avatarImage}
                    alt={persona.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center">
                  <div className="font-bold text-[#4DB6AC] text-lg">{persona.nameEn}</div>
                  <div className="text-sm text-[#546E7A]">{persona.role}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Persona Content with Fade-in & Slide-up Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPersona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {/* Intro Card - Motivation & Challenges */}
              <div className="bg-white/80 rounded-[20px] p-8 shadow-[0_8px_32px_rgba(184,214,214,0.3)] mb-8 backdrop-blur-[10px]" style={{ backdropFilter: 'blur(10px)' }}>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 ring-4 ring-[#4DB6AC]/20">
                    <img
                      src={selectedPersona.avatarImage}
                      alt={selectedPersona.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-[#2C3E50] mb-2">{selectedPersona.nameEn}</h1>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-lg font-semibold text-[#546E7A]">Age: {selectedPersona.age}</span>
                      <span className="px-4 py-1 bg-[#4DB6AC]/10 text-[#26A69A] rounded-full text-sm font-bold">{selectedPersona.role}</span>
                    </div>
                    <p className="text-[#546E7A]">{selectedPersona.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* Left: Motivation & Adapt Living */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#4DB6AC] rounded-full"></span>
                        动机
                      </h3>
                      <p className="text-[#546E7A] leading-relaxed">{selectedPersona.motivation}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#4DB6AC] rounded-full"></span>
                        适应生活
                      </h3>
                      <ul className="space-y-2">
                        {selectedPersona.adaptLiving.map((item, idx) => (
                          <li key={idx} className="text-[#546E7A] flex items-start gap-2">
                            <span className="text-[#4DB6AC] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Challenges */}
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#4DB6AC] rounded-full"></span>
                      面临挑战
                    </h3>
                    <ul className="space-y-3">
                      {selectedPersona.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-[#546E7A] flex items-start gap-2">
                          <span className="text-[#4DB6AC] mt-1">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Thoughts Section with Interactive Click-to-Switch */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#4DB6AC] rounded-full"></span>
                  Thoughts
                  <span className="text-sm text-[#546E7A] font-normal">
                    (点击切换碎碎念)
                  </span>
                </h2>
                
                <div 
                  onClick={() => setActiveThoughtIndex((prev) => (prev + 1) % selectedPersona.thoughts.length)}
                  className="relative cursor-pointer group"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedPersona.id}-${activeThoughtIndex}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform: `translateY(${scrollY * 0.03}px)`
                      }}
                      className="bg-gradient-to-br from-[#4DB6AC]/10 to-[#26A69A]/5 border-l-4 border-[#4DB6AC] rounded-r-[20px] p-5 shadow-[0_4px_16px_rgba(184,214,214,0.2)] backdrop-blur-[10px] group-hover:shadow-[0_8px_32px_rgba(77,182,172,0.3)] transition-all duration-300"
                    >
                      <p className="text-[#546E7A] leading-relaxed italic text-base">
                        {selectedPersona.thoughts[activeThoughtIndex]}
                      </p>
                      
                      {/* Indicator Dots */}
                      <div className="flex items-center justify-center gap-2 mt-4">
                        {selectedPersona.thoughts.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveThoughtIndex(idx);
                            }}
                            className={`transition-all duration-300 rounded-full ${
                              idx === activeThoughtIndex
                                ? 'w-8 h-2 bg-[#4DB6AC]'
                                : 'w-2 h-2 bg-[#4DB6AC]/30 hover:bg-[#4DB6AC]/50'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Click Hint */}
                      <div className="absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 text-[#4DB6AC] text-sm">
                          <span>点击切换</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Daily Timeline - Horizontal Scroll */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#4DB6AC] rounded-full"></span>
                  Daily Timeline
                </h2>
                
                <div 
                  ref={timelineRef}
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#4DB6AC rgba(184, 214, 214, 0.2)'
                  }}
                >
                  {selectedPersona.timeline.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="flex-none w-[280px] h-[360px] rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(184,214,214,0.3)] group cursor-pointer relative"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Gradient Overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-[#4DB6AC]/90 transition-all duration-300"
                      />

                      {/* Content - Moves up on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 group-hover:-translate-y-8">
                        <div className="text-3xl font-bold mb-1">{item.time}</div>
                        <div className="text-lg font-semibold mb-2">{item.title}</div>
                        
                        {/* Description - Show on hover */}
                        <div className="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-[200px] overflow-hidden">
                          {item.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
