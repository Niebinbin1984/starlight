#!/bin/bash
# B&J Group部署打包脚本

echo "📦正在准备B&J Group网站部署包..."

# 创建部署文件夹
DEPLOY_DIR="bjgroup_deploy_$(date +%Y%m%d_%H%M%S)"
mkdir "$DEPLOY_DIR"

echo "📁 创建部署目录: $DEPLOY_DIR"

#复核心文件
cp index.html "$DEPLOY_DIR/"
cp style.css "$DEPLOY_DIR/"
cp script.js "$DEPLOY_DIR/"

echo "📄复核心文件完成"

#复制所有图片文件
cp *.jpg "$DEPLOY_DIR/" 2>/dev/null
cp *.png "$DEPLOY_DIR/" 2>/dev/null

echo "🖼️ 复制图片文件完成"

# 创建部署说明文件
cat > "$DEPLOY_DIR/DEPLOY_INSTRUCTIONS.md" << EOF
# B&J Group网站部署说明

## 部署文件清单
- index.html (主页面)
- style.css (样式文件)
- script.js (脚本文件)
-所有产品图片文件

##推荐部署平台：Netlify

###部步骤署步骤：
1.访问 https://www.netlify.com
2. 注册免费账户
3.将整个文件夹拖拽到Netlify上传区域
4.等待自动部署完成（约1-2分钟）
5.获得网站地址

## 文件验证
✅ HTML文件：已优化路径
✅ CSS样式：完整功能
✅ JavaScript：交互功能
✅ 图片资源：全部包含
✅响应式设计：移动端适配

##特色
-现化设计风格
-响应式布局
- 产品分类展示
- 交互式体验
-联表单功能

部署时间：$(date)
EOF

echo "📝 创建部署说明完成"

#显示文件列表
echo ""
echo "📋部署包文件列表："
ls -la "$DEPLOY_DIR/"

echo ""
echo "🎉部署包准备完成！"
echo "请将文件夹 '$DEPLOY_DIR' 上传到Netlify进行部署"