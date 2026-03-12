# 跨境生活 Persona 展示页面

## 项目说明

这是一个纯前端的HTML页面，展示跨境学生、工作者和深造人员的日常生活。

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画效果
- **JavaScript (原生)** - 交互逻辑
- **Tailwind CSS CDN** - 快速样式开发

## 使用方法

### 直接在浏览器中打开

1. 在Windows文件资源管理器中找到 `index.html` 文件
2. 双击文件，即可在默认浏览器中打开
3. 或者右键点击文件，选择"打开方式"，选择任意浏览器（Chrome、Edge、Firefox等）

### 使用本地服务器（推荐）

为了更好的体验，建议使用本地服务器：

#### 方法1：使用VS Code的Live Server插件
1. 在VS Code中安装 "Live Server" 插件
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

#### 方法2：使用Python
```bash
# Python 3
python -m http.server 8000

# 然后在浏览器访问 http://localhost:8000
```

#### 方法3：使用Node.js的http-server
```bash
npx http-server
```

## 文件结构

```
project/
├── index.html          # 主页面文件（可直接打开）
├── assets/             # 图片资源文件夹（需要创建）
│   ├── hero-zhang.png      # Zhang的大图
│   ├── hero-leilei.png     # Lei Lei的大图
│   ├── hero-mrhu.png       # Mr. Hu的大图
│   ├── avatar-zhang.png    # Zhang的头像
│   ├── avatar-leilei.png   # Lei Lei的头像
│   ├── avatar-mrhu.png     # Mr. Hu的头像
│   ├── timeline-1.png      # 时间线图片1
│   ├── timeline-2.png      # 时间线图片2
│   └── ...                 # 其他时间线图片
└── README.md           # 说明文档
```

## 图片资源配置

请在项目根目录创建 `assets` 文件夹，并按以下命名放置图片：

### 人物大图（Hero Images）
- `hero-zhang.png` - Zhang的背景大图
- `hero-leilei.png` - Lei Lei的背景大图  
- `hero-mrhu.png` - Mr. Hu的背景大图

### 头像图片（Avatar Images）
- `avatar-zhang.png` - Zhang的头像
- `avatar-leilei.png` - Lei Lei的头像
- `avatar-mrhu.png` - Mr. Hu的头像

### 时间线图片（Timeline Images）
- `timeline-1.png` 到 `timeline-9.png` - 按时间顺序的场景图片

## 功能特性

### ✨ 主要功能

1. **Persona切换** - 点击顶部卡片可切换不同人物
2. **平滑动画** - 页面切换时有淡入淡出效果
3. **视差滚动** - Thoughts卡片随页面滚动产生视差效果
4. **时间轴展示** - 横向滚动查看一日生活作息
5. **响应式设计** - 适配桌面和移动端

### 🎨 设计特性

- 左侧固定的人物大图（35vw宽度）
- 右侧可滚动内容区域
- 毛玻璃效果（Glass Morphism）
- 清新薄荷绿主题色（#4DB6AC）
- 圆角卡片设计（20px圆角）
- 柔和阴影效果

### 🖱️ 交互效果

- Persona卡片悬停上浮效果
- 时间线卡片悬停放大
- 鼠标滚轮在时间线区域自动转为横向滚动
- Thoughts卡片视差滚动

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

建议使用最新版本的现代浏览器以获得最佳体验。

## 自定义内容

如需修改内容，请编辑 `index.html` 中的 `personasData` 数组：

```javascript
const personasData = [
    {
        id: 'zhang',
        name: 'Zhang',
        age: 23,
        role: '香港硕士',
        // ... 其他属性
    }
];
```

## 无需安装依赖

此项目不需要安装任何npm包或运行构建命令，所有依赖都通过CDN加载：

- Tailwind CSS: `https://cdn.tailwindcss.com`

## 故障排除

### 问题：图片无法显示
**解决方案**：
1. 确保 `assets` 文件夹存在
2. 检查图片文件名是否正确
3. 确保图片格式为 PNG 或 JPG

### 问题：样式错乱
**解决方案**：
1. 检查网络连接（Tailwind CSS通过CDN加载）
2. 清除浏览器缓存后重新加载

### 问题：动画不流畅
**解决方案**：
1. 关闭其他占用资源的程序
2. 使用Chrome或Edge浏览器以获得更好性能

## 开发说明

- 所有代码都在单个 HTML 文件中
- JavaScript 代码位于页面底部的 `<script>` 标签内
- CSS 样式位于 `<style>` 标签内
- 可直接在浏览器开发者工具中调试

## 许可证

本项目仅供学习和展示使用。
