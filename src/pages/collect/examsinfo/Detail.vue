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
            {{model.branchNo}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          &nbsp;
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-item
            label="名称"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.branchName}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item
            label="类型"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.branchType}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-item
            label="负责人"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.master}}
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
            label="电话"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.telephone}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-item
            label="邮箱"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.email}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="简介"
            :labelCol="{span: 3}"
            :wrapperCol="{span: 20}"
          >
            {{model.summary}}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-item
            label="状态"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 16}"
          >
            {{model.checkState}}
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          &nbsp;
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
    </div>
  </div>
</template>

<script>
import { getExamsinfo } from '@/api/collect/examsinfo'

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
        branchNo: '0',
        branchName: '',
        branchType: '00',
        orderNo: 1,
        master: '',
        telephone: '',
        email: '',
        summary: '',
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
      getExamsinfo(this.id).then(response => {
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
