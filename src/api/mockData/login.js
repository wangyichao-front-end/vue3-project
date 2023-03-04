import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'ad' && password === '123') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: 'home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'home/Home'
            },
            {
              path: 'mail',
              name: 'mail',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mail/Mail'
            },
            {
              path: 'user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User/User'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: 'page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'Page1'
                },
                {
                  path: 'page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'Page2',
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiao' && password === '123') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: 'home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/Home'
            },
            {
              path: 'mail',
              name: 'mail',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mail/Mail'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}