<template>
  <div class="wrapbox">
    <br />
    <a-form>
      <a-row>
        <a-col :span="spanCol">
          <a-form-item
            label="编号"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.paperNo}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          &nbsp;
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="标题"
            :labelCol="{span: 3}"
            :wrapperCol="{span: 20}"
          >
            {{model.paperTitle}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-item
            label="类型"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.classNo}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item
            label="类别"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.paperType}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="图片"
            :labelCol="{span: 3}"
            :wrapperCol="{span: 20}"
          >
            {{model.paperPoster}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="描述"
            :labelCol="{span: 3}"
            :wrapperCol="{span: 20}"
          >
            {{model.paperDesc}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-item
            label="得分"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.paperTscore}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item
            label="排序"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.orderNo}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-item
            label="试题数量"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.questNums}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item
            label="状态"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.checkState}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="备注"
            :labelCol="{span: 3}"
            :wrapperCol="{span: 20}"
          >
            {{model.comments}}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-divider />
    <div class="btnbox">
      <a-button @click="doClose">关闭</a-button>
    </div><br /><br />
  </div>
</template>

<script>
import { getPaperinfo } from '@/api/collect/paperinfo'

export default {
  name: 'Detail',
  props: {
    layerid: {// 自动注入的layerid
      type: String,
      default: ''
    },
    id: {// 传递的数据
      type: String,
      default: ''
    },
    lydata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      spanCol: 12,
      model: {
        paperNo: '0',
        paperTitle: '',
        paperPoster: '',
        paperDesc: '',
        paperType: '1',
        dataFrom: '',
        viewType: '',
        classNo: undefined,
        orderNo: 1,
        questNums: 1,
        paperQuests: '',
        paperTscore: 1,
        paperRusers: '',
        checkState: '1',
        comments: ''
      }
    }
  },
  methods: {
    doClose () {
      this.$layer.close(this.layerid)
    }
  },
  mounted () {
    if (this.id !== '') {
      const that = this
      getPaperinfo(this.id).then(response => {
        that.model = response.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapbox {
  margin: 0;
  padding: 10px;
  width: 100%;
}
.btnbox {
  text-align: center;
}
</style>
