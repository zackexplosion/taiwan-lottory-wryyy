<template>
  <div>
    <h1>選擇月份計算 539 開出的號碼統計次數</h1>
    <div class="block">
      <el-date-picker
        v-model="monthRange"
        :picker-options="pickerOptions"
        type="monthrange"
        range-separator="到"
        start-placeholder="起始月份"
        end-placeholder="結束月份"/>
    </div>
    <el-divider/>
    <h2>從出現次數多的號碼開始，選擇的範圍內開出了 {{ historyDataLenth }} 期彩卷</h2>
    <div class="tag-group">
      <el-badge
        v-for="(d, index) in displayData"
        :value="`${d.count}`"
        :key="index"
        type="danger"
        class="item">
        <!-- <el-tag>{{ d.count }}: {{ d.occupy }}</el-tag> -->
        <el-button type="warning" round>
          {{ d.number }}
        </el-button>
      </el-badge>
    </div>
    <el-row :gutter="20">
      <el-col :md="12">
        <h2>表格顯示</h2>
        <el-table
          :data="displayData"
          height="350"
          style="width: 100%">
          <el-table-column
            prop="number"
            label="號碼"
          />
          <el-table-column
            prop="count"
            label="開出次數"/>
          <el-table-column
            prop="occupy"
            label="百分比"/>
        </el-table>
      </el-col>
      <el-col :md="12">
        <h2>歷史資料</h2>
        <el-table
          v-infinite-scroll="historyDataRendered"
          :data="historyDataRendered"
          height="350"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="編號"
          />
          <el-table-column
            prop="d"
            label="開獎日期"
          />
          <el-table-column
            prop="number"
            label="號碼"
          >
            <template slot-scope="scope">
              {{ scope.row.numbers.join(',') }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import rawData from '@/../../539/db.json'
import {
  sortCounter,
  createCounter
} from '@/../../539'
import moment from 'moment'
// const historyData = rawData['dailycash']
const end = new Date()
const start = new Date()
start.setMonth(start.getMonth() - 2)
const defaultMonthRange = [start, end]
export default {
  data() {
    return {
      historyDataLenth: 0,
      historyDataRendered: [],
      historyData: [],
      displayData: [],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < new Date(2014, 0, 0) || time.getTime() > new Date().getTime()
        },
        shortcuts: [{
          text: '最近三個月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 2)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近六個月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 5)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近十二個月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 11)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '全部（103年開始)',
          onClick(picker) {
            const end = new Date()
            const start = new Date(2014, 0, 0)
            // start.setMonth(start.getMonth() - 11)
            picker.$emit('pick', [start, end])
          }
        }

        ]
      },
      monthRange: defaultMonthRange
    }
  },
  watch: {
    monthRange(o, n) {
      this.countDisplayData()
    }
  },
  mounted() {
    this.countDisplayData()
  },
  methods: {
    // historyTableScroll() {
    //   console.log('historyTableScroll')
    // },
    updateHistoryDataRendered() {
      var r
      var index = 0
      do {
        r = this.historyData.shift()

        if (r) {
          this.historyDataRendered.push(r)
          index++
        } else {
          break
        }
      } while (r && index < 200)
    },
    countDisplayData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var filteredData = []
      rawData['dailycash'].forEach(v => {
        var date = v.d.split('/').map(d => {
          if (d.length > 2) {
            return parseInt(d) + 1911
          }
          return d
        }).join('/')
        date = moment(date)
        if (date > moment(this.monthRange[0]) && date < moment(this.monthRange[1])) {
          filteredData.push(v)
        }
      })

      // count numbers
      var counter = createCounter()

      filteredData.forEach(r => {
        // console.log(r)
        r.numbers.forEach(n => {
          counter[n]++
        })
      })

      this.historyData = filteredData

      // for display
      this.historyDataLenth = filteredData.length

      // prevent render too much rows at same time
      this.updateHistoryDataRendered()

      // sorting counter final result
      this.displayData = sortCounter(counter)

      setTimeout(() => {
        loading.close()
      }, 500)
    }
  }
}
</script>

<style>
.item {
  margin-right: 30px;
  margin-bottom: 15px;
}
</style>
