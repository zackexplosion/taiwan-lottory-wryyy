<template>
  <el-row>
    <el-col
      v-for="(o, index) in games"
      :span="8"
      :key="o"
      :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="o.image" class="image">
        <div style="padding: 14px;">
          <!-- <span>{{o.name}}</span> -->
          <div class="bottom clearfix">
            <!-- <time class="time">{{ currentDate }}</time> -->
            <router-link :to="o.path" >
              <el-button type="text" class="button">讓我看看</el-button>
            </router-link>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      games: [
        {
          'image': 'https://via.placeholder.com/200/FF0000/FFFFFF?text=539',
          path: '/games/dailycash',
          name: '539'
        }
      ]
    }
  }
}
</script>
