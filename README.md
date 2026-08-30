# 曹义涛个人能力网站

中文为主的单页沉浸式个人档案，使用 Vite、React、TypeScript、Tailwind CSS、Framer Motion、Embla Carousel 与 Lucide React。页面围绕个人介绍、代表项目、能力体系、教育与实习、专利荣誉及联系方式展开。

视觉采用深紫黑背景与紫—粉—珊瑚霓虹渐变。首屏背景视频始终静音，项目视频由访客手动播放且没有声音控制。页面支持键盘操作、移动端导航、减少动态效果偏好以及证书大图查看。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 内容与素材

- 个人信息、项目、证书、经历和专业链接集中在 `src/data/portfolio.ts`。
- `public/profile.png`：关于我区域的真人照片；当前页面在显示层旋转 180°。
- `public/media/cartoon-avatar.png`：首屏透明背景卡通形象。
- `public/media/projects/`：四个项目的图片与静音视频。
- `public/media/certificates/`：专利、奖学金与荣誉证书。
- 更详细的素材命名和尺寸建议见 `public/media/README.md`。

未配置素材时，页面会展示成品风格的占位画面，不会出现失效图片或文件路径。
