<template>
  <ListTop @searchResults="getSearchResults" />
  <ListSort @sort-change="sortFn" />
  <!-- <div class="list-content" v-if="collectInfo.length ">
    <RoomItem v-for="item in collectInfo" :key="collectInfo.id" :goods='item' />
  </div> -->

  <div class="list-content" v-if="searchResults||searchResults.length ">
    <RoomItem v-for="item in searchResults" :key="searchResults.id" :goods='item' />
  </div>
  <div class="list-content" v-if="allInfo">
    <RoomItem v-for="item in allInfo" :key="allInfo.id" :goods='item' />
  </div>
  <div class="list-content" v-else>
    <h3>无结果</h3>
  </div>
</template>

<script>
import RoomItem from './components/room-item.vue'
import ListTop from '../../components/list-top.vue'
import ListSort from './components/list-sort.vue'
// import ListContent from './components/list-content'
import { getHomestays } from '@/api/homestays'
import { ref, watch } from 'vue'
import { getCollectNum } from '@/api/collect'
export default {
  name: 'ListIndex',
  components: {
    ListTop, ListSort, RoomItem
  },
  props: {
    // searchResults: {
    //   type: Array
    // }
  },
  setup () {
    const allInfo = ref([])
    const searchResults = ref([])
    // console.log(searchResults.value.length);

    // 数组对象拷贝
    function copy (obj) {
      var newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      }
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? copy(obj[i]) : obj[i];
      }
      return newobj
    }

    const testInfo = ref([])
    // 得到搜索内容结果
    const getSearchResults = (value) => {
      allInfo.value = []
      searchResults.value = value.filter(item => item.status === '0')
      testInfo.value = copy(value)
    }

    // 内容 
    if (searchResults.value.length === 0) {
      // 没有搜索 默认全部民宿信息
      getHomestays().then((data) => {
        // console.log(data);
        allInfo.value = data.data.filter(item => item.status === '0')
        testInfo.value = copy(data.data)
        // console.log(homestays.value);
      })
    }


    // 排序
    /**数组根据数组对象中的某个属性值进行排序的方法 
     * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
     * @param attr 排序的属性 如number属性
     * @param rev true表示升序排列，false降序排序
     * */
    function sortBy (attr, rev) {
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    }
    const haveNum = ref([])
    const collectInfo = ref([])

    const sortFn = async (value) => {
      console.log(value.sortField, value.sortMethod);
      if (searchResults.value.length > 0) {
        //  有搜索结果
        if (value.sortField === null) {
          // 默认
          console.log('111111', testInfo.value);
          searchResults.value = []
          searchResults.value = copy(testInfo.value)
        } else if (value.sortField === 'shoucang') {
          // 收藏数
          await getCollectNum().then(data => {
            //   console.log('111', data);
            haveNum.value = data.data.results.filter(item => item.status === '0')
            if (data.data.status === 0) {
              searchResults.value.forEach(item => {
                item.nums = 0
                haveNum.value.forEach(i => {
                  if (i.id === item.id) {
                    item.nums = i.nums
                  }
                })
              })
            }
            searchResults.value = searchResults.value.sort(sortBy('nums', false))
          })

        } else if (value.sortField === 'jiage' && value.sortMethod === 'asc') {
          // 价格正序
          console.log('价格shengxu');
          console.log('asc', searchResults.value);
          searchResults.value = searchResults.value.sort(sortBy('price', false))
        } else if (value.sortField === 'jiage' && value.sortMethod === 'desc') {
          // 价格倒序
          console.log('价格倒序');
          console.log('desc', searchResults.value);
          searchResults.value = searchResults.value.sort(sortBy('price'))
        }
      } else {
        // 全部民宿信息排序
        if (value.sortField === null) {
          // 默认
          allInfo.value = []
          allInfo.value = copy(testInfo.value)
        } else if (value.sortField === 'shoucang') {
          // 收藏数
          await getCollectNum().then(data => {
            console.log('111', data);
            haveNum.value = data.data.results
            console.log('haveNum', haveNum);
            if (data.data.status === 0) {
              allInfo.value.forEach(item => {
                item.nums = 0
                haveNum.value.forEach(i => {
                  if (i.id === item.id) {
                    item.nums = i.nums
                  }
                })
              })
            }
            allInfo.value = allInfo.value.sort(sortBy('nums', false))
          })
        } else if (value.sortField === 'jiage' && value.sortMethod === 'asc') {
          // 价格正序
          console.log('价格shengxu');
          allInfo.value = allInfo.value.sort(sortBy('price', false))
        } else if (value.sortField === 'jiage' && value.sortMethod === 'desc') {
          // 价格倒序
          allInfo.value = allInfo.value.sort(sortBy('price'))
        }
      }
    }
    return { getSearchResults, searchResults, sortFn, sortFn, testInfo, allInfo }
  }
}
</script>

<style lang="less" scoped>
.room-list {
  width: 1350px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.list-content {
  width: 1350px;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
h3 {
  font-size: 26px;
  margin-top: 30px;
}
</style>