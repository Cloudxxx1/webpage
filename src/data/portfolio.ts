export type MediaType = 'image' | 'video'

export interface ProjectMediaImage {
  src: string
  alt: string
  surface: 'theme' | 'paper'
}

export interface ProjectMedia {
  id: string
  type: MediaType
  title: string
  caption: string
  src: string
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  playbackRate?: number
  alt: string
  images?: ProjectMediaImage[]
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  index: string
  title: string
  category: string
  summary: string
  role: string
  background: string
  responsibilities: string[]
  approach: string[]
  results: string[]
  stack: string[]
  metrics: ProjectMetric[]
  media: ProjectMedia[]
  accent: 'violet' | 'pink' | 'coral' | 'amber'
}

export interface TimelineItem {
  period: string
  title: string
  place: string
  description: string
  badge: string
  type: 'work' | 'education'
}

export interface Certificate {
  id: string
  title: string
  category: string
  year: string
  src: string
  alt: string
}

export interface SocialLink {
  label: string
  href: string
  kind: 'email' | 'github' | 'gitee' | 'scholar'
}

export const profile = {
  name: '曹义涛',
  englishName: 'Cao Yitao',
  eyebrow: 'VISUAL ALGORITHM · INTELLIGENT OPTICS',
  headline: '看见复杂世界，\n让算法稳定落地。',
  introduction:
    '专注智能光学图像处理、双模态视觉与高性能推理部署，在研究、软件和真实设备之间建立可靠连接。',
  philosophy:
    '我相信，优秀的视觉系统不仅要在数据中表现出色，更要在复杂光照、真实设备与连续运行中保持可靠。研究是起点，落地才让技术真正产生价值。',
  location: '福建 · 福州',
  email: 'cyt71724@163.com',
}

export const profileStats = [
  { value: '4', label: '代表项目' },
  { value: '3', label: '发明专利' },
  { value: '12+', label: '核心工具链' },
]

export const projects: Project[] = [
  {
    id: 'fusion',
    index: '01',
    title: '低照度道路场景下可见红外图像融合',
    category: '研究生课题 · 双模态增强融合',
    summary:
      '面向低照度、局部过曝与眩光等复杂退化场景，探索可见光增强与红外语义互补的一体化融合方案。',
    role: '课题研究与方案设计',
    background:
      '传统融合方法在极暗区域、强光干扰和局部细节缺失时容易放大噪声或丢失结构，需要在增强与融合之间建立更紧密的协同。',
    responsibilities: [
      '设计光照判别增强子网络',
      '研究跨模态语义引导调制机制',
      '完成训练、消融与可视化验证',
    ],
    approach: [
      '依据光照状态自适应修复可见光退化特征',
      '在频域与空域中联合建模纹理和结构信息',
      '利用红外语义引导关键目标特征表达',
    ],
    results: ['定量结果与对比结论待论文实验完成后补充'],
    stack: ['CNN', 'Transformer', 'PyTorch', 'Retinex', 'Frequency Domain'],
    metrics: [],
    accent: 'violet',
    media: [
      {
        id: 'fusion-scene',
        type: 'image',
        title: '场景与任务',
        caption: '展示复杂低照度道路场景以及可见光、红外输入的任务特征。',
        src: './media/projects/fusion/paper_img1.png',
        alt: '低照度道路场景与可见光、红外输入任务示意',
        images: [
          {
            src: './media/projects/fusion/paper_img1.png',
            alt: '低照度道路场景与可见光、红外输入任务示意',
            surface: 'theme',
          },
        ],
      },
      {
        id: 'fusion-architecture',
        type: 'image',
        title: '网络结构',
        caption: '展示照明判别增强子网络与跨模态语义引导调制模块。',
        src: './media/projects/fusion/paper_img6.png',
        alt: '可见红外图像融合网络结构图',
        images: [
          {
            src: './media/projects/fusion/paper_img6.png',
            alt: '照明判别与增强子网络结构图',
            surface: 'paper',
          },
          {
            src: './media/projects/fusion/paper_img7.png',
            alt: '跨模态语义引导调制模块结构图',
            surface: 'paper',
          },
        ],
      },
      {
        id: 'fusion-comparison',
        type: 'image',
        title: '结果对比',
        caption: '展示不同方法在多组典型低照度场景中的融合结果对比。',
        src: './media/projects/fusion/paper_img2.png',
        alt: '不同图像融合方法结果对比',
        images: [
          {
            src: './media/projects/fusion/paper_img2.png',
            alt: '第一组低照度场景图像融合结果对比',
            surface: 'theme',
          },
          {
            src: './media/projects/fusion/paper_img3.png',
            alt: '第二组低照度场景图像融合结果对比',
            surface: 'theme',
          },
          {
            src: './media/projects/fusion/paper_img4.png',
            alt: '第三组低照度场景图像融合结果对比',
            surface: 'theme',
          },
          {
            src: './media/projects/fusion/paper_img5.png',
            alt: '第四组低照度场景图像融合结果对比',
            surface: 'theme',
          },
        ],
      },
    ],
  },
  {
    id: 'camouflage',
    index: '02',
    title: '双模态伪装目标检测与跟踪系统',
    category: '学生负责人 · 国防科研项目',
    summary:
      '围绕车载与机载双模态感知，完成目标检测、跨模态配准、多目标跟踪与实时推理系统集成。',
    role: '学生负责人',
    background:
      '伪装目标在复杂背景中可见特征弱、尺度变化大，单一模态难以兼顾全天候识别与稳定跟踪。',
    responsibilities: [
      '负责可见光与红外多目标检测方案',
      '完成双模态配准与 ByteTrack 跟踪集成',
      '参与 LibTorch、TensorRT 实时部署与系统联调',
    ],
    approach: [
      '融合双模态互补信息提升复杂背景可辨识度',
      '将检测结果接入多目标轨迹关联',
      '面向应用平台优化模型转换与推理链路',
    ],
    results: ['完成双模态检测、配准与跟踪系统闭环'],
    stack: ['C++', 'YOLO', 'LibTorch', 'TensorRT', 'ByteTrack', 'Qt'],
    metrics: [
      { value: '88.24%', label: '检测精度' },
      { value: '≥ 50 FPS', label: '实时推理' },
    ],
    accent: 'pink',
    media: [
      {
        id: 'camouflage-vehicle',
        type: 'video',
        title: '设备一',
        caption: '车载设备双模态检测与跟踪演示。',
        src: './media/projects/camouflage/vehicle.mp4',
        autoPlay: true,
        loop: true,
        alt: '设备一车载双模态检测与跟踪演示视频',
      },
      {
        id: 'camouflage-airborne',
        type: 'video',
        title: '设备二',
        caption: '机载设备双模态检测与跟踪演示。',
        src: './media/projects/camouflage/airborne.mp4',
        autoPlay: true,
        loop: true,
        playbackRate: 1,
        alt: '设备二机载双模态检测与跟踪演示视频',
      },
    ],
  },
  {
    id: 'drone',
    index: '03',
    title: '无人机光电检测与自动跟踪系统',
    category: '重要参与人 · 国防科研项目',
    summary:
      '连接目标检测、持续跟踪、云台控制与通信模块，构建无人机光电探测和自动居中的完整链路。',
    role: '核心算法与软件参与',
    background:
      '远距离无人机目标尺寸小、运动变化快，需要兼顾检测召回、持续跟踪和云台响应的实时性。',
    responsibilities: [
      '使用 TensorRT 加速目标检测模型',
      '集成 KCF/SOT 单目标持续跟踪',
      '参与云台控制、TCP 通信与子系统协同',
    ],
    approach: [
      '通过检测与跟踪状态切换提高连续感知稳定性',
      '将目标偏差转换为云台自动居中控制量',
      '打通探测、跟踪与反制子系统信息链路',
    ],
    results: ['项目指标与现场验证结果待补充'],
    stack: ['OpenCV', 'TensorRT', 'KCF/SOT', 'TCP', 'Qt / C++'],
    metrics: [],
    accent: 'coral',
    media: [
      {
        id: 'drone-platform',
        type: 'image',
        title: '光电平台',
        caption: '展示无人机光电检测系统的设备平台与现场部署形态。',
        src: './media/projects/drone/platform-01.png',
        alt: '无人机光电检测系统设备平台',
        images: [
          {
            src: './media/projects/drone/platform-01.png',
            alt: '无人机光电检测系统设备平台一',
            surface: 'theme',
          },
          {
            src: './media/projects/drone/platform-02.png',
            alt: '无人机光电检测系统设备平台二',
            surface: 'theme',
          },
          {
            src: './media/projects/drone/platform-03.png',
            alt: '无人机光电检测系统设备平台三',
            surface: 'theme',
          },
        ],
      },
      {
        id: 'drone-joint-demo',
        type: 'video',
        title: '联合演示',
        caption: '展示无人机检测、跟踪与云台联合系统的软件运行界面。',
        src: './media/projects/drone/joint-demo.mp4',
        autoPlay: true,
        loop: true,
        alt: '无人机检测、跟踪与云台联合演示视频',
      },
    ],
  },
  {
    id: 'line-scan',
    index: '04',
    title: '工业线扫相机产品计数包装设备',
    category: '学生负责人 · 校企合作项目',
    summary:
      '从工业成像、视觉计数到上位机与 PLC 联动，完成面向生产现场的整套计数包装设备。',
    role: '学生负责人',
    background:
      '生产线上物料速度快、形态密集，需要稳定计数并与包装执行机构实时协同。',
    responsibilities: [
      '完成工业线扫相机二次开发与成像调试',
      '实现视觉计数算法和 Qt 上位机',
      '完成 Modbus、PLC 联动与现场测试',
    ],
    approach: [
      '结合线扫成像特性完成高速物料视觉采集',
      '针对连续图像设计稳定计数处理流程',
      '以工业通信连接识别结果与包装执行机构',
    ],
    results: ['设备已投入试生产'],
    stack: ['工业相机', 'OpenCV', 'Qt', 'Modbus', 'PLC'],
    metrics: [
      { value: '< 80 ms', label: '单次处理' },
      { value: '< 0.3%', label: '计数误差' },
    ],
    accent: 'amber',
    media: [
      {
        id: 'line-scan-device',
        type: 'image',
        title: '设备全貌',
        caption: '展示工业线扫相机计数包装设备的整体结构与现场形态。',
        src: './media/projects/line-scan/device-01.jpg',
        alt: '工业线扫相机计数包装设备',
        images: [
          {
            src: './media/projects/line-scan/device-01.jpg',
            alt: '工业线扫相机计数包装设备全貌一',
            surface: 'theme',
          },
          {
            src: './media/projects/line-scan/device-02.jpg',
            alt: '工业线扫相机计数包装设备全貌二',
            surface: 'theme',
          },
        ],
      },
      {
        id: 'line-scan-imaging',
        type: 'image',
        title: '检测样品',
        caption: '展示设备进行视觉检测和计数的橡胶圈样品。',
        src: './media/projects/line-scan/sample.jpg',
        alt: '工业线扫相机检测的橡胶圈样品',
      },
      {
        id: 'line-scan-software',
        type: 'video',
        title: '上位机',
        caption: '展示产品计数包装设备 Qt 上位机软件的运行过程。',
        src: './media/projects/line-scan/hmi-software.mp4',
        autoPlay: true,
        loop: true,
        alt: '产品计数包装设备 Qt 上位机软件演示视频',
      },
      {
        id: 'line-scan-demo',
        type: 'video',
        title: '设备演示',
        caption: '展示工业线扫相机计数包装设备的现场运行过程。',
        src: './media/projects/line-scan/device-demo.mp4',
        autoPlay: true,
        loop: true,
        alt: '工业线扫相机计数包装设备现场运行演示视频',
      },
    ],
  },
]

export const capabilities = [
  {
    id: 'optics',
    number: '01',
    icon: 'scan',
    title: '智能光学图像处理',
    description: '双模态增强融合、低照度感知、频域分析与跨模态特征调制。',
  },
  {
    id: 'tracking',
    number: '02',
    icon: 'target',
    title: '检测与跟踪',
    description: 'YOLO 目标检测、ByteTrack 多目标跟踪以及 KCF/SOT 单目标跟踪。',
  },
  {
    id: 'deployment',
    number: '03',
    icon: 'cpu',
    title: '高性能推理部署',
    description: 'LibTorch、TensorRT 模型转换优化与 Windows/Linux 跨平台 C++ 部署。',
  },
  {
    id: 'systems',
    number: '04',
    icon: 'code',
    title: '视觉系统开发',
    description: 'Qt 上位机、工业相机、OpenCV、FFmpeg、TCP、Modbus 与 PLC 联调。',
  },
]

export const toolchain = [
  'C / C++',
  'Python',
  'OpenCV',
  'FFmpeg',
  'PyTorch',
  'LibTorch',
  'TensorRT',
  'Qt',
  'Linux',
  'PLC',
  'Modbus',
  'TCP/IP',
]

export const timeline: TimelineItem[] = [
  {
    period: '2025.10 — 2026.10',
    title: '视觉算法应用工程师',
    place: '福建辰光启明科技有限公司',
    description:
      '参与双模态图像处理与目标检测系统研发，负责算法部署、推理适配、Qt 验证平台、结果可视化及 Linux 边缘端调试。',
    badge: '实习经历',
    type: 'work',
  },
  {
    period: '2024.09 — 至今',
    title: '机械工程 · 硕士',
    place: '福州大学（211）',
    description: '中国兵器装备集团先进技术创新研究院，研究方向为智能光学图像处理。',
    badge: 'GPA 3.27 / 4',
    type: 'education',
  },
  {
    period: '2020.09 — 2024.06',
    title: '智能制造工程 · 本科',
    place: '集美大学',
    description: '系统学习智能制造、自动化与机械相关知识，并在项目实践中积累视觉开发经验。',
    badge: 'GPA 3.80 / 4',
    type: 'education',
  },
]

export const patents = [
  {
    code: 'CN115876803B',
    status: '授权发明专利',
    title: '一种基于变倍显微的铣刀涂层后缺陷检测方法与系统',
  },
  {
    code: 'CN116007533B',
    status: '授权发明专利',
    title: '一种补偿表面微观形貌白光干涉测量方法及系统',
  },
  {
    code: 'CN121353947A',
    status: '实质审查',
    title: '一种基于机载双光谱检测及深度估计的火灾面积反演方法',
  },
]

export const honors = [
  { value: '7', label: '集美大学二等奖学金' },
  { value: '3', label: '集美大学三好学生' },
  { value: '2025', label: '福州大学研究生助研奖' },
  { value: 'Ⅱ', label: '先进技术创新研究院辰光二等奖' },
]

export const certificates: Certificate[] = [
  {
    id: 'outstanding-graduate',
    title: '优秀毕业生证书',
    category: 'HONOR',
    year: '2024',
    src: './media/certificates/outstanding-graduate.jpg',
    alt: '优秀毕业生证书',
  },
  {
    id: 'merit-student-2020-2021',
    title: '2020—2021 学年三好学生证书',
    category: 'HONOR',
    year: '2020—2021',
    src: './media/certificates/merit-student-2020-2021.jpg',
    alt: '2020—2021 学年三好学生证书',
  },
  {
    id: 'merit-student-2021-2022',
    title: '2021—2022 学年三好学生证书',
    category: 'HONOR',
    year: '2021—2022',
    src: './media/certificates/merit-student-2021-2022.jpg',
    alt: '2021—2022 学年三好学生证书',
  },
  {
    id: 'merit-student-2022-2023',
    title: '2022—2023 学年三好学生证书',
    category: 'HONOR',
    year: '2022—2023',
    src: './media/certificates/merit-student-2022-2023.jpg',
    alt: '2022—2023 学年三好学生证书',
  },
  {
    id: 'patent-certificate',
    title: '授权发明专利证书',
    category: 'PATENT',
    year: '发明专利',
    src: './media/certificates/patent-certificate.jpg',
    alt: '授权发明专利证书',
  },
  {
    id: 'scholarship-2020-2021-1',
    title: '2020—2021 学年第一学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2020—2021',
    src: './media/certificates/scholarship-2020-2021-1.jpg',
    alt: '2020—2021 学年第一学期奖学金证书',
  },
  {
    id: 'scholarship-2020-2021-2',
    title: '2020—2021 学年第二学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2020—2021',
    src: './media/certificates/scholarship-2020-2021-2.jpg',
    alt: '2020—2021 学年第二学期奖学金证书',
  },
  {
    id: 'scholarship-2021-2022-1',
    title: '2021—2022 学年第一学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2021—2022',
    src: './media/certificates/scholarship-2021-2022-1.jpg',
    alt: '2021—2022 学年第一学期奖学金证书',
  },
  {
    id: 'scholarship-2021-2022-2',
    title: '2021—2022 学年第二学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2021—2022',
    src: './media/certificates/scholarship-2021-2022-2.jpg',
    alt: '2021—2022 学年第二学期奖学金证书',
  },
  {
    id: 'scholarship-2022-2023-1',
    title: '2022—2023 学年第一学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2022—2023',
    src: './media/certificates/scholarship-2022-2023-1.jpg',
    alt: '2022—2023 学年第一学期奖学金证书',
  },
  {
    id: 'scholarship-2022-2023-2',
    title: '2022—2023 学年第二学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2022—2023',
    src: './media/certificates/scholarship-2022-2023-2.jpg',
    alt: '2022—2023 学年第二学期奖学金证书',
  },
  {
    id: 'scholarship-2023-2024-1',
    title: '2023—2024 学年第一学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2023—2024',
    src: './media/certificates/scholarship-2023-2024-1.jpg',
    alt: '2023—2024 学年第一学期奖学金证书',
  },
  {
    id: 'scholarship-2023-2024-2',
    title: '2023—2024 学年第二学期奖学金证书',
    category: 'SCHOLARSHIP',
    year: '2023—2024',
    src: './media/certificates/scholarship-2023-2024-2.jpg',
    alt: '2023—2024 学年第二学期奖学金证书',
  },
  {
    id: 'software-copyright-1',
    title: '计算机软件著作权登记证书（一）',
    category: 'SOFTWARE COPYRIGHT',
    year: '软件著作权',
    src: './media/certificates/software-copyright-1.jpg',
    alt: '计算机软件著作权登记证书一',
  },
  {
    id: 'software-copyright-2',
    title: '计算机软件著作权登记证书（二）',
    category: 'SOFTWARE COPYRIGHT',
    year: '软件著作权',
    src: './media/certificates/software-copyright-2.jpg',
    alt: '计算机软件著作权登记证书二',
  },
]

export const socialLinks: SocialLink[] = [
  {
    label: '发送邮件',
    href: 'mailto:cyt71724@163.com',
    kind: 'email',
  },
  {
    label: 'GitHub',
    href: '',
    kind: 'github',
  },
  {
    label: 'Gitee',
    href: '',
    kind: 'gitee',
  },
  {
    label: '学术主页',
    href: '',
    kind: 'scholar',
  },
]
