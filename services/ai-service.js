
// ================= API 配置 =================
const API_CONFIG = {
  // 聚合 API Base URL
  baseUrl: 'https://88996.cloud/v1', 
  // API Key
  apiKey: 'sk-IDXYWt6Fxy27hvULEbIpl5qdbp05svdi009OzdLnufruTp2i', 
  // 对话模型名称
  chatModel: 'deepseek-v3',
  // 图片模型名称
  imageModel: 'cogview-3-flash',
  // 超时时间 (毫秒)
  timeout: 600000
};

export const generateCustomRecipe = (ingredients, customPrompt) => {
  return new Promise((resolve, reject) => {
    const prompt = `你是一位专业的厨师，请根据用户提供的食材和特殊要求，生成详细的菜谱。请严格按照JSON格式返回，不要包含任何其他文字。

用户提供的食材：${ingredients.join('、')}

用户的特殊要求：${customPrompt}

请按照以下JSON格式返回菜谱，不包含营养分析和酒水搭配：
{
  "name": "菜品名称",
  "ingredients": ["食材1", "食材2"],
  "steps": [
    {
      "step": 1,
      "description": "步骤描述",
      "time": 5,
      "temperature": "中火"
    }
  ],
  "cookingTime": 30,
  "difficulty": "简单/中等/困难",
  "desc": "菜品简介（100字以内）",
  "tips": ["技巧1", "技巧2"]
}`;

    wx.request({
      url: `${API_CONFIG.baseUrl}/chat/completions`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.apiKey}`
      },
      timeout: API_CONFIG.timeout,
      data: {
        model: API_CONFIG.chatModel,
        messages: [
          {
            role: 'system',
            content: '你是一位专业的厨师，请根据用户提供的食材和特殊要求，生成详细的菜谱。请严格按照JSON格式返回，不要包含任何其他文字。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: false
      },
      success: (res) => {
        console.log('AI Response:', res);
        if (res.statusCode !== 200) {
          const errorMessage = res.data && res.data.error ? res.data.error.message : `状态码 ${res.statusCode}`;
          reject(new Error(`API请求失败: ${errorMessage}`));
          return;
        }

        try {
          const aiResponse = res.data.choices[0].message.content;
          let cleanResponse = aiResponse.trim();
          // 清理 Markdown 代码块标记
          if (cleanResponse.startsWith('```json')) {
            cleanResponse = cleanResponse.replace(/```json\s*/, '').replace(/```\s*$/, '');
          } else if (cleanResponse.startsWith('```')) {
            cleanResponse = cleanResponse.replace(/```\s*/, '').replace(/```\s*$/, '');
          }

          const recipeData = JSON.parse(cleanResponse);

          // 转换为前端使用的格式
          const recipe = {
            id: `recipe-custom-${Date.now()}`,
            title: recipeData.name || '自定义菜品',
            cuisine: recipeData.cuisine || '融合菜', // 保存菜系信息用于生成图片 Prompt
            tags: ['AI定制', recipeData.difficulty || '简单', `${recipeData.cookingTime || 20}分钟`],
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // 默认图片，后续替换为 AI 生成图
            calories: 300, // 默认值
            time: `${recipeData.cookingTime || 20}min`,
            difficulty: recipeData.difficulty || '简单',
            wine: '推荐搭配清茶或果汁',
            desc: recipeData.desc || `这是一道使用${ingredients.join('、')}精心烹制的美味佳肴。`,
            steps: (recipeData.steps || []).map(step => ({
              title: `步骤${step.step}`,
              desc: step.description,
              time: `${step.time || 5}min`,
              heat: step.temperature || '适中'
            })),
            ingredients: recipeData.ingredients || ingredients, // 保存食材信息
            tips: recipeData.tips || ['根据个人口味调整咸淡', '注意火候控制']
          };

          resolve(recipe);
        } catch (error) {
          console.error('Parse recipe error:', error);
          reject(new Error('解析菜谱数据失败，AI 可能返回了错误的格式'));
        }
      },
      fail: (err) => {
        console.error('Network error:', err);
        reject(new Error('网络请求失败，请检查网络连接'));
      }
    });
  });
};

const buildImagePrompt = (recipe) => {
  // 根据菜谱信息构建详细的图片生成提示词
  const ingredients = (recipe.ingredients || []).join('、');
  const cuisineStyle = (recipe.cuisine || '融合').replace('大师', '').replace('菜', '');

  return `一道精美的${cuisineStyle}菜肴：${recipe.title}，主要食材包括${ingredients}。菜品摆盘精致，色彩丰富，光线柔和，专业美食摄影风格，高清画质，餐厅级别的视觉效果。背景简洁，突出菜品本身的美感。`;
};

export const generateRecipeImage = (recipe) => {
  return new Promise((resolve, reject) => {
    const prompt = buildImagePrompt(recipe);
    const sizeToUse = { width: 1024, height: 1024 }; 

    console.log('Starting image generation with prompt:', prompt);

    wx.request({
      url: `https://open.bigmodel.cn/api/paas/v4/images/generations`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer a835b9f6866d48ec956d341418df8a50.NuhlKYn58EkCb5iP`
      },
      data: {
        model: 'cogview-3-flash',
        prompt: prompt,
        size: `${sizeToUse.width}x${sizeToUse.height}`,
      },
      success: (res) => {
        console.log('Image AI Response:', res);
        if (res.statusCode !== 200) {
           const errorMessage = res.data && res.data.error ? JSON.stringify(res.data.error) : `状态码 ${res.statusCode}`;
           console.error('Image API Error Body:', res.data);
           reject(new Error(`图片生成失败: ${errorMessage}`));
           return;
        }

        try {
          const data = res.data;
          if (data.data && data.data.length > 0) {
             console.log('Image URL:', data.data[0].url);
             resolve({
               url: data.data[0].url,
               id: `${recipe.id}-${Date.now()}`
             });
          } else {
             console.error('Unexpected API Response Structure:', data);
             reject(new Error('API返回数据格式错误'));
          }
        } catch (e) {
           console.error('Parse Image Response Error:', e);
           reject(e);
        }
      },
      fail: (err) => {
        console.error('Image Network error:', err);
        reject(new Error('网络请求失败，请检查网络连接或合法域名配置'));
      }
    });
  });
};
