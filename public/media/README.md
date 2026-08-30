# 素材目录

网站在没有正式素材时会显示风格化占位画面。添加素材后，请在
`src/data/portfolio.ts` 中为对应条目填写相对路径，例如：

```ts
src: './media/projects/fusion/image-01.jpg'
```

建议目录：

- `cartoon-avatar.png`：首屏卡通形象，推荐透明背景 PNG 或 WebP。
- `projects/fusion/`：低照度可见红外融合项目。
- `projects/camouflage/`：双模态伪装目标检测项目。
- `projects/drone/`：无人机光电检测项目。
- `projects/line-scan/`：工业线扫计数设备项目。
- `certificates/`：专利、奖学金和荣誉证书。

项目图片建议统一为 16:10，宽度不低于 1600px。项目视频建议使用
H.264 编码 MP4、1920×1080 或 1600×1000，文件本身可不包含音轨。
证书图片可保留原始纵横比，推荐长边不低于 1600px。
