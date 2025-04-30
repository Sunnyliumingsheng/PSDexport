// 不是UXP插件的部分，纯粹是用来在node上进行运行测试的



// 支持的transform类型
const TRANSFORM_TYPES = ['static', 'dynamic'];

// 支持的按钮颜色
const BUTTON_COLORS = ['green', 'red', 'blue', 'yellow', 'grey'];

function parseButtonParams(params) {
  if (params.length === 0) {
    throw new Error('按钮组件必须提供参数');
  }

  const param = params[0];
  if (param.startsWith('title:')) {
    return {
      type: 'complex',
      title: param.substring(6)
    };
  } else if (BUTTON_COLORS.includes(param)) {
    return {
      type: 'simple',
      color: param
    };
  } else {
    throw new Error(`无效的按钮参数: ${param}`);
  }
}

function parse9SliceParams(params) {
  if (params.length !== 4) {
    throw new Error('9slice组件需要4个参数（上下左右）');
  }
  
  const [top, right, bottom, left] = params.map(Number);
  if (params.some(isNaN)) {
    throw new Error('9slice参数必须是数字');
  }
  
  return { top, right, bottom, left };
}

function parseComponent(componentStr) {
  const [compName, ...compParams] = componentStr.split('/');
  const name = compName.trim();
  
  // 特殊组件处理
  switch (name) {
    case 'button':
      return {
        name,
        params: parseButtonParams(compParams)
      };
    case '9slice':
      return {
        name,
        params: parse9SliceParams(compParams)
      };
    default:
      return {
        name,
        params: compParams.map(param => param.trim())
      };
  }
}

function parseRule(ruleString) {
  if (!ruleString) {
    throw new Error('规则字符串不能为空');
  }

  const parts = ruleString.split('>');
  const firstPart = parts[0].trim();
  
  // 解析名称和transform参数
  let name, transform;
  if (firstPart.includes('/')) {
    [name, transform] = firstPart.split('/');
    transform = transform.trim();
    if (!TRANSFORM_TYPES.includes(transform)) {
      throw new Error(`无效的transform类型: ${transform}`);
    }
  } else {
    name = firstPart;
    transform = 'dynamic'; // 默认值
  }
  
  // 解析组件
  const components = parts.slice(1)
    .filter(comp => comp.trim())
    .map(parseComponent);
  
  return {
    name: name.trim(),
    transform,
    components
  };
}

const { parseRule: parseRule1 } = require('./src/rule1');
const { parseRule: parseRule2 } = require('./src/rule2');

// 测试用例
const testCases = [
  // 基本测试
  "name",
  "name/static",
  "name/dynamic",
  
  // 边界情况
  "name/",  // 无效的transform
  "name/unknown",  // 未知的transform类型
  "",  // 空字符串
  "   ",  // 只有空格
  "name/static/extra",  // 多余的参数
  "name>component",  // 包含组件（应该被忽略）
  
  // 特殊字符
  "name with spaces",
  "name-with-hyphen",
  "name_with_underscore",
  "name123",
  "name/static "
];

console.log("=== Testing Version 1 (Simple) ===");
testCases.forEach(rule => {
  try {
    console.log(`\n测试规则: "${rule}"`);
    const result = parseRule1(rule);
    console.log("解析结果:", result);
    
    // 验证基本属性
    console.log("验证结果:");
    console.log("- 是否包含name属性:", 'name' in result);
    console.log("- 是否包含transform属性:", 'transform' in result);
    console.log("- transform是否为有效值:", ['static', 'dynamic'].includes(result.transform));
    console.log("- 是否只包含name和transform:", Object.keys(result).length === 2);
  } catch (error) {
    console.error(`解析失败: ${error.message}`);
  }
});