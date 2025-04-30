// 支持的transform类型
const TRANSFORM_TYPES = ['middleCenter', 'stretchStretch'];

// 支持的按钮颜色
const BUTTON_COLORS = ['green', 'red', 'blue', 'yellow', 'grey'];


// 处理按钮及其参数的组件
function parseButtonParams(params) {
  if (params.length === 0) {
    throw new Error('按钮组件必须提供参数');
  }

  const param = params[0];
  if (BUTTON_COLORS.includes(param)) {
    return {
      type: 'simple',
      color: param
    };
  } else {
    // 如果不是颜色，就认为是标题
    return {
      type: 'complex',
      title: param
    };
  }
}
// 处理自动切图的组件
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
// 处理自定义组件的默认方法
function parseDefaultParams(params) {
  // 这里不检查自定义组件参数是否为空
  const paramObj = {}
  params.forEach(param => {
    const trimmed = param.trim();
    const [key, value] = trimmed.split(":")
    if (value != undefined) {
      paramObj[key.trim()] = value.trim()
    } else {
      // 如果没有值，就认为是一个bool类型并且为true
      paramObj[key.trim()] = true
    }
  });
  return paramObj
}
// 处理组件的通用函数
function parseComponent(componentStr) {
  const [compName, ...compParams] = componentStr.split('/');
  const name = compName.trim();

  // 特殊组件处理，有了这个，就能自定义对组件的特殊处理，从而能方便的进行修改和扩展
  // 当然也可以全部都是默认情况。
  switch (name) {
    case 'button':
      return {
        name,
        parameters: parseButtonParams(compParams)
      };
    case '9slice':
      return {
        name,
        parameters: parse9SliceParams(compParams)
      };
    default:
      return {
        name,
        parameters: parseDefaultParams(compParams)
      };
  }
}

// 用来解析PS中的名字，返回一个对象
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
      console.warn(`警告: 未知的transform类型 '${transform}'，将使用默认值 'middleCenter' 并且名称将不进行解析直接使用原值`);
      transform = TRANSFORM_TYPES[0];
      name = ruleString
    }
  } else {
    name = firstPart;
    transform = TRANSFORM_TYPES[0];// 默认为middleCenter
  }

  // 解析组件
  const components = parts.slice(1)
    .filter(comp => comp.trim())
    .map(parseComponent);

  return {
    // 进行解析之后分离出的名字
    name: name.trim(),
    // 一个string的transform类型
    transform,
    // 一个数组，里面有组件信息
    components
  };
}

// 如果这是个像素图层，那么名字解析之后会对不上，而提取图片的时候，得到的又是原始图片，所以需要在提取图片的时候，如果是像素图层，那么就需要对名字进行修改之后再保存
function getParesedName(name) {
  const parsedRule = parseRule(name);
  return parsedRule.name;
}




module.exports = {
  parseRule,
  getParesedName
};